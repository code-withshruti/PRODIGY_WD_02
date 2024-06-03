let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;
let laps = [];

const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const pauseButton = document.getElementById('pauseButton');
const lapButton = document.getElementById('lapButton');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        paused = false;
    }
}

function stopTimer() {
    running = false;
    paused = false;
    clearInterval(tInterval);
    timeDisplay.innerHTML = "00:00:00";
    laps = [];
    lapsContainer.innerHTML = '';
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        paused = true;
        running = false;
    }
}

function lapTimer() {
    if (running) {
        const lapTime = timeDisplay.innerHTML;
        laps.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = lapTime;
        lapsContainer.appendChild(lapElement);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    timeDisplay.innerHTML = `${minutes}:${seconds}:${milliseconds}`;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
lapButton.addEventListener('click', lapTimer);
