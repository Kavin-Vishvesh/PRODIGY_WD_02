let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 1000);
    showButton('PAUSE');
}

function pause() {
    clearInterval(timerInterval);
    showButton('PLAY');
}

function reset() {
    clearInterval(timerInterval);
    print('00:00:00');
    elapsedTime = 0;
    lapsContainer.innerHTML = '';
    showButton('PLAY');
}

function lap() {
    const lapTime = timeToString(elapsedTime);
    const lapElement = document.createElement('li');
    lapElement.innerText = lapTime;
    lapsContainer.appendChild(lapElement);
}

function showButton(buttonKey) {
    const playButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');

    if (buttonKey === 'PLAY') {
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
    } else {
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
    }
}

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);

showButton('PLAY');
