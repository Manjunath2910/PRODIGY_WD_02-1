let startTime;
let updatedTime=0;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function startStopTimer() {
    if (!running) {
        startTime = new Date().getTime() - updatedTime;
        timerInterval = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = null;
    updatedTime = 0;
    difference = null;
    running = false;
    display.textContent = '00:00.00';
    startStopBtn.textContent = 'Start';
    laps = [];
    updateLaps();
}

function lapTime() {
    if (running) {
        const lap = updatedTime;
        laps.push(lap);
        updateLaps();
    }
}

function updateDisplay() {
    if (running){
    updatedTime = new Date().getTime() - startTime;
    const seconds = Math.floor(updatedTime / 1000);
    const milliseconds = Math.floor((updatedTime % 1000) / 10);
    display.textContent = formatTime(seconds, milliseconds);
}}

function formatTime(seconds, milliseconds) {
    const displaySeconds = String(seconds % 60).padStart(2, '0');
    const displayMinutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const displayMilliseconds = String(milliseconds).padStart(2, '0');
    return `${displayMinutes}:${displaySeconds}.${displayMilliseconds}`;
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const seconds = Math.floor(lap / 1000);
        const milliseconds = Math.floor((lap % 1000) / 10);
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${formatTime(seconds, milliseconds)}`;
        lapsList.appendChild(li);
    });
}

startStopBtn.addEventListener('click', startStopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTime);
