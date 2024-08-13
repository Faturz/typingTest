const words = {
    id: generateRandomWords(["kata", "indonesia", "acak", "untuk", "mengetik", "contoh", "teks", "ini", "adalah", "random", "dalam", "bahasa", "kalimat", "berisi", "karakter", "kata", "ujian", "mengetik", "waktu", "detik", "sebagai", "tes", "kecepatan", "ketik", "lima", "puluh", "seratus", "lima", "puluh", "kosong"], 150),
    en: generateRandomWords(["word", "english", "random", "for", "typing", "example", "text", "this", "is", "a", "in", "language", "sentence", "contains", "characters", "words", "test", "typing", "time", "seconds", "as", "speed", "typing", "fifty", "hundred", "fifty", "zero"], 150)
};

let currentWordIndex = 0;
let correctChars = 0;
let totalCharsTyped = 0;
let timerInterval;
let timeLeft = 30;
let selectedTime = 30;
let timerStarted = false;
let isPaused = false;

function generateRandomWords(wordArray, count) {
    let randomWords = [];
    for (let i = 0; i < count; i++) {
        randomWords.push(wordArray[Math.floor(Math.random() * wordArray.length)]);
    }
    return randomWords;
}

function updateTimeLimit() {
    selectedTime = parseInt(document.getElementById('time-select').value);
    resetTimer();
}

function selectLanguage(language) {
    const wordBox = document.getElementById('word-box');
    wordBox.innerHTML = words[language].map(word => `<span>${word} </span>`).join(' ');
    currentWordIndex = 0;
    correctChars = 0;
    totalCharsTyped = 0;
    timerStarted = false;
    document.getElementById('input-area').value = '';
    document.getElementById('input-area').disabled = false;
    resetWordStyles();
    resetTimer();
}

function resetWordStyles() {
    const wordSpans = document.querySelectorAll('#word-box span');
    wordSpans.forEach(span => {
        span.innerHTML = span.textContent.split('').map(char => `<span>${char}</span>`).join('');
    });
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            timerElement.textContent = `Time Left: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endTest();
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = selectedTime;
    document.getElementById('timer').textContent = `Time Left: ${selectedTime}s`;
    document.getElementById('result').textContent = '';
    isPaused = false;
    document.getElementById('pause-btn').textContent = "Pause";
}

function checkInput() {
    if (!timerStarted) {
        timerStarted = true;
        startTimer();
    }

    const inputArea = document.getElementById('input-area');
    const inputText = inputArea.value;
    const wordSpans = document.querySelectorAll('#word-box span span');
    let correct = true;

    for (let i = 0; i < inputText.length; i++) {
        totalCharsTyped++;
        if (inputText[i] === wordSpans[i].textContent) {
            wordSpans[i].className = 'correct';
            correctChars++;
        } else {
            wordSpans[i].className = 'incorrect';
            correct = false;
        }
    }

    // If input is shorter than the current word, reset following characters to default style
    for (let i = inputText.length; i < wordSpans.length; i++) {
        wordSpans[i].className = '';
    }

    if (!isPaused && inputText.length === wordSpans.length) {
        endTest();
    }
}

function endTest() {
    const wpm = (correctChars / 5) * (60 / selectedTime);
    const accuracy = (correctChars / totalCharsTyped) * 100;

    document.getElementById('result').innerHTML = `
        <p>Your WPM: ${wpm.toFixed(2)}</p>
        <p>Accuracy: ${accuracy.toFixed(2)}%</p>
    `;

    document.getElementById('input-area').disabled = true;
}

function pauseTest() {
    isPaused = !isPaused;
    document.getElementById('pause-btn').textContent = isPaused ? "Resume" : "Pause";
}

function restartTest() {
    selectLanguage('en'); // Assuming English as default language; can be set dynamically
}

// Shortcut event listener
document.addEventListener('keydown', function(event) {
    // Tab + Enter for restart
    if (event.key === 'Enter' && event.getModifierState('Tab')) {
        event.preventDefault(); // Prevent default behavior of Enter key
        restartTest();
    }

    // Alt + P for pause
    if (event.key === 'p' && event.altKey) {
        event.preventDefault(); // Prevent default behavior of Alt + P
        pauseTest();
    }
});

// Event listener untuk mengetik
document.getElementById('input-area').addEventListener('input', checkInput);

// Select default language (without starting the timer)
selectLanguage('en');
