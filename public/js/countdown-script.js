// Select elements
const daySelect = document.getElementById("day");
const hourSelect = document.getElementById("hour");
const minuteSelect = document.getElementById("minute");
const secondSelect = document.getElementById("second");

var countDate = new Date("Dec 25, 2022 16:44:00").getTime();
var year = new Date().getFullYear();

function newYear() {
    countDate = new Date(`Jan 1, ${year + 1} 00:00:00`).getTime();
    console.log(countDate);
};
newYear();

var remainingTime = 1;

// countDate = new Date(`Dec 31, ${year} 15:48:02`).getTime();

const countdown = () => {
    if (remainingTime > 0) {
        const now = new Date().getTime();
        remainingTime = countDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const textDay = Math.floor(remainingTime / day);
        const textHour = Math.floor((remainingTime % day) / hour);
        const textMinute = Math.floor((remainingTime % hour) / minute);
        const textSecond = Math.floor((remainingTime % minute) / second);

        daySelect.innerHTML = textDay > 0 ? textDay : 0;
        hourSelect.innerText = textHour > 0 ? textHour : 0;
        minuteSelect.innerText = textMinute > 0 ? textMinute : 0;
        secondSelect.innerText = textSecond > 0 ? textSecond : 0;

        if (daySelect.innerHTML == 0) {
            document.getElementById("container-day").style.display = "none";
            if (hourSelect.innerHTML == 0) {
                document.getElementById("container-hour").style.display = "none";
                if (minuteSelect.innerHTML == 0) {
                    document.getElementById("container-minute").style.display = "none";
                    if (secondSelect.innerHTML == 0) {
                        document.getElementById("container-second").style.animation = "seconds 1s forwards";
                        document.getElementById("countdown-name").style.animation = "padding-none 1s forwards";
                        document.getElementById("second").style.fontSize = "0";
                    };
                };
            };
        };

        console.log(remainingTime)
        if (remainingTime < 0) {
            confetti();
        };
    };
};

// Confetti
function confetti() {
    startConfetti();
    setTimeout(stopConfetti, 5000);
}

// On page load
countdown();

// Refresh
setInterval(countdown, 500);