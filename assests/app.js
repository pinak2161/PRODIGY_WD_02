let tensEl = document.getElementById('tens');
let secondsEl = document.getElementById('seconds');
let minEl = document.getElementById('min');
let lapTimesContainer = document.getElementById('lapTimes');

let startBtn = document.getElementById('start');
let lapBtn = document.getElementById('lap');
let resetBtn = document.getElementById('reset');

let minute = 0;
let seconds = 0;
let tens = 0;
let timer = false;
let lapId = 1;
let interval;
let lapTimes = [];

function startStop() {
    if (timer) {
        clearInterval(interval);
        startBtn.textContent = "START";
        lapBtn.disabled = true;
    } else {
        interval = setInterval(updateStopwatch, 10);
        startBtn.textContent = "STOP";
        lapBtn.disabled = false;
    }
    timer = !timer;
}

function resetTimer() {
    timer = false;
    tens = 0;
    minute = 0;
    seconds = 0;
    updateDisplay();
    clearInterval(interval);
    lapTimes = [];
    updateLapTimes();
    startBtn.textContent = "START";
    lapBtn.disabled = true;
}

function recordLap() {
    if (timer) {
        lapTimes.push({ id: lapId++, time: formatTime(seconds, tens) });
        updateLapTimes();
    }
}

function updateStopwatch() {
    tens++;

    if (tens === 100) {
        tens = 0;
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minute++;
        }
    }

    updateDisplay();
}

function formatTime(seconds, tens) {
    return `${pad(seconds)}.${pad(tens)}`;
}

function pad(value) {
    return value.toString().padStart(2, '0');
}

function updateDisplay() {
    const formattedTime = `${pad(minute)}:${pad(seconds)}.${pad(tens)}`;
    tensEl.textContent = formattedTime.slice(6);
    secondsEl.textContent = formattedTime.slice(3, 5);
    minEl.textContent = formattedTime.slice(0, 2);
}

function updateLapTimes() {
    lapTimesContainer.innerHTML = "<h3>Lap Times</h3>";
    lapTimes.forEach(lap => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lap.id}: ${lap.time}`;
        lapTimesContainer.appendChild(lapItem);
    });
}
