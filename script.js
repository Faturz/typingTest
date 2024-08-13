const words = {
    id: generateRandomWords(["kursi", "buku", "meja", "hujan", "angin", "pohon", "rumah", "jalan", "mobil", "komputer", "internet", "kamera", "telepon", "kantor", "sekolah", "pasar", "laut", "gunung", "pantai", "sungai", "jembatan", "langit", "awan", "bintang", "bulan", "matahari", "api", "air", "tanah", "udara", "bunga", "kaca", "pintu", "jendela", "tembok", "gedung", "kota", "desa", "negara", "uang", "waktu", "hari", "malam", "siang", "pagi", "sore", "senja", "surga", "neraka", "cinta", "benci", "sedih", "bahagia", "tenang", "marah", "takut", "kangen", "rindu", "senang", "sakit", "lelah", "kenyang", "lapar", "dingin", "panas", "sepi", "ramai", "sendiri", "bersama", "aman", "berbahaya", "cepat", "lambat", "terang", "gelap", "indah", "jelek", "harum", "busuk", "manis", "asin", "asam", "pahit", "gurih", "lembut", "kasar", "besar", "kecil", "panjang", "pendek", "luas", "sempit", "tebal", "tipis", "tinggi", "rendah", "jauh", "dekat", "atas", "bawah", "dalam", "luar", "depan", "belakang", "kanan", "kiri", "selatan", "utara", "timur", "barat", "musim", "tahun", "bulan", "minggu", "hari", "jam", "menit", "detik", "waktu", "tugas", "perjalanan", "liburan", "hobi", "karir", "pekerjaan", "usaha", "bisnis", "ide", "konsep", "rencana", "strategi", "perubahan", "tantangan", "kesempatan", "kesulitan", "kesuksesan", "kegagalan", "pencapaian", "pengalaman", "pelajaran", "kegiatan", "acara", "hiburan", "film", "musik", "buku", "majalah", "koran", "berita", "cerita", "puisi", "novel", "lukisan", "fotografi", "gambar", "suara", "video", "film", "pertunjukan", "teater", "seni", "tarian", "nyanyian", "permainan", "olahraga", "peralatan", "teknologi", "sains", "matematika", "fisika", "kimia", "biologi", "astronomi", "geografi", "sejarah", "politik", "ekonomi", "sosial", "budaya", "bahasa", "agama", "tradisi", "adat", "norma", "etika", "moral", "hukum", "keadilan", "kesehatan", "kebahagiaan", "kesedihan", "kebencian", "kecemasan", "kepercayaan", "kesabaran", "keberanian", "kejujuran", "kesetiaan", "kecintaan", "kesopanan", "ketenangan", "keamanan", "kedamaian", "kebersamaan", "kesendirian", "kerja", "usaha", "bisnis", "pekerjaan", "karir", "tugas", "proyek", "kegiatan", "pengalaman", "pencapaian", "tantangan", "kesempatan", "ide", "rencana", "strategi", "perubahan", "kesuksesan", "kegagalan", "peluang", "risiko", "manajemen", "kepemimpinan", "kerjasama", "motivasi", "inspirasi", "inovasi"], 50),
    en: generateRandomWords(["chair", "book", "table", "rain", "wind", "tree", "house", "street", "car", "computer", "internet", "camera", "phone", "office", "school", "market", "sea", "mountain", "beach", "river", "bridge", "sky", "cloud", "star", "moon", "sun", "fire", "water", "earth", "air", "flower", "glass", "door", "window", "wall", "building", "city", "village", "country", "money", "time", "day", "night", "noon", "morning", "evening", "twilight", "heaven", "hell", "love", "hate", "sadness", "happiness", "calm", "anger", "fear", "miss", "longing", "joy", "pain", "tired", "full", "hungry", "cold", "hot", "quiet", "crowded", "alone", "together", "safe", "dangerous", "fast", "slow", "bright", "dark", "beautiful", "ugly", "fragrant", "rotten", "sweet", "salty", "sour", "bitter", "savory", "soft", "rough", "big", "small", "long", "short", "wide", "narrow", "thick", "thin", "tall", "short", "far", "near", "above", "below", "inside", "outside", "front", "back", "right", "left", "south", "north", "east", "west", "season", "year", "month", "week", "day", "hour", "minute", "second", "task", "journey", "vacation", "hobby", "career", "work", "business", "idea", "concept", "plan", "strategy", "change", "challenge", "opportunity", "difficulty", "success", "failure", "achievement", "experience", "lesson", "activity", "event", "entertainment", "movie", "music", "book", "magazine", "newspaper", "news", "story", "poem", "novel", "painting", "photography", "picture", "sound", "video", "show", "theater", "art", "dance", "song", "game", "sport", "equipment", "technology", "science", "math", "physics", "chemistry", "biology", "astronomy", "geography", "history", "politics", "economy", "society", "culture", "language", "religion", "tradition", "custom", "norm", "ethics", "morality", "law", "justice", "health", "happiness", "sadness", "hatred", "anxiety", "trust", "patience", "courage", "honesty", "loyalty", "love", "politeness", "calmness", "safety", "peace", "togetherness", "solitude", "work", "business", "job", "career", "task", "project", "activity", "experience", "achievement", "challenge", "opportunity", "idea", "plan", "strategy", "change", "success", "failure", "chance", "risk", "management", "leadership", "teamwork", "motivation", "inspiration", "innovation"], 50)
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
            timerElement.textContent = `${timeLeft}s`;

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
    document.getElementById('timer').textContent = `${selectedTime}s`;
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

function setTimeLimit(time) {
    selectedTime = time;
    resetTimer();
    
    // Update active button style
    const buttons = document.querySelectorAll('.time-selector button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
}
