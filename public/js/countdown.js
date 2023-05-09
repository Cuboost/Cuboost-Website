// Select elements
const daySelect = document.getElementById("day");
const hourSelect = document.getElementById("hour");
const minuteSelect = document.getElementById("minute");
const secondSelect = document.getElementById("second");
const backgroundDropdown = document.getElementById("countdown-background-dropdown");
const creditLink = document.getElementById("credit");
const creditName = document.querySelector("#credit p");
const root = document.querySelector(':root');

var countDate = new Date("Dec 25, 2022 16:44:00").getTime();
var year = new Date().getFullYear();

function newYear() {
    countDate = new Date(`Jan 1, ${year + 1} 00:00:00`).getTime();
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
window.addEventListener("load", () => {
    countdown();

    // Refresh
    setInterval(countdown, 500);

    // Set Default Background
    backgroundOption1();
})

// Change Background Image
backgroundDropdown.addEventListener('change', (event) => {
    if (event.target.value == 1) {
        backgroundOption1();
    } else if (event.target.value == 2) {
        backgroundOption2()
    } else {
        console.error("Option background not found...")
    }
});

function backgroundOption1() {
    // Background
    root.style.setProperty('--background-image', 'linear-gradient(rgba(230, 230, 230, 0.2), rgba(170, 170, 170, 0.2)), url("images/new-year.jpg") right/cover fixed');
    // Credit
    creditLink.href = "https://www.pexels.com/photo/selective-focus-photography-of-spark-1234390/";
    creditName.innerText = "Photo by Malte Luk";
    // Confetti Color
    confettiOption1();
    // Change Meta Theme Color
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#D2B275');
}

function backgroundOption2() {
    // Background
    root.style.setProperty('--background-image', 'linear-gradient(rgba(230, 230, 230, 0.1), rgba(170, 170, 170, 0.1)), url("images/fireworks.jpg") center/cover fixed');
    // Credit
    creditLink.href = "https://www.pexels.com/photo/timelapse-photography-of-fireworks-40663/";
    creditName.innerText = "Photo by Pixabay";
    // Confetti Color
    confettiOption2();
    // Change Meta Theme Color
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#020873');
}