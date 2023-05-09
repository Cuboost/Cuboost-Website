// Navigation
const mySidenavStyle = document.getElementById("mySidenav").style;
const closeBtnStyle = document.getElementById("closeBtn").style;
const openBtnStyle = document.getElementById("openBtn").style;
const mainStyle = document.getElementById("main").style;

function openNav() {
    openBtnStyle.opacity = "0";
    closeBtnStyle.fontSize = "36px";
    mySidenavStyle.width = "250px";
    mySidenavStyle.boxShadow = "8px 8px var(--black)";
    mainStyle.marginLeft = "250px";
}

function closeNav() {
    openBtnStyle.opacity = "1";
    closeBtnStyle.fontSize = "0";
    mySidenavStyle.width = "0";
    mySidenavStyle.boxShadow = "none";
    mainStyle.marginLeft = "50px";
}

// Elements
// Coin
const headsStats = document.querySelector("#heads h3");
const tailsStats = document.querySelector("#tails h3");
const resetCoin = document.querySelector("#flip-a-coin .tiles-container .tile button");

// Random
const randomNumber = document.querySelector("#random-number .tiles-container .tile h1");
const trueFalse = document.getElementById("true-false");
const trueFalseButton = document.getElementById("true-false-button");

// Clock
const timeElement = document.getElementById("time");

// Tiles and Cards
//Movement Animation to happen
const cards = document.querySelectorAll(".card, .tile");
const containers = document.querySelectorAll(".card-container");
//Items
const titles = document.querySelectorAll(".title");
const images = document.querySelectorAll(".image-card img");
const discovers = document.querySelectorAll(".discover");
const descriptions = document.querySelectorAll(".info h3");

// Update Coin Statistics
function updateCoinStats() {
    if (localStorage.getItem("heads") != null && localStorage.getItem("tails") != null) {
        headsStats.innerText = localStorage.getItem("heads");
        tailsStats.innerText = localStorage.getItem("tails");
    }
}

// Random Number
function generateNumber() {
    randomNumber.innerHTML = Math.floor(Math.random() * 10) + 1;
}

// True False
function generateBool() {
    trueFalse.innerText = "...";
    trueFalseButton.disabled = true;
    setTimeout(() => {
        trueFalse.innerText = Math.random() > 0.5 ? "True" : "False";
        trueFalseButton.disabled = false;
    }, 1000)
}

// Time
function getTime() {
    const current = new Date();
    var hours = current.getHours();
    var minutes = current.getMinutes();
    var seconds = current.getSeconds();
    // Check if number is a digit
    if (hours.toString().length == 1) {
        hours = "0" + hours;
    };
    if (minutes.toString().length == 1) {
        minutes = "0" + minutes;
    };
    if (seconds.toString().length == 1) {
        seconds = "0" + seconds;
    };
    timeElement.innerText = `${hours} : ${minutes} : ${seconds}`;
}

// On Page Load
window.addEventListener("load", () => {
    // Coin
    // Coin Section
    updateCoinStats();

    // Reset Button
    resetCoin.addEventListener("click", () => {
        localStorage.setItem("heads", 0);
        localStorage.setItem("tails", 0);
        updateCoinStats();
    })

    // True False
    trueFalseButton.addEventListener("click", generateBool);
    generateBool();

    // Generate Number
    generateNumber();

    // Time
    getTime();
    setInterval(getTime, 900);

    // Cards
    containers.forEach(container => {
        //Moving Animation Event
        container.addEventListener("mousemove", (e) => {
            // Get the bounding rectangle of target
            const rect = container.getBoundingClientRect();

            // Mouse position
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            let xAxis = (container.clientWidth / 2 - x) / 25;
            let yAxis = (container.clientHeight / 2 - y) / 25;
            cards.forEach(card => {
                card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            })
        });

        //Animate In
        container.addEventListener("mouseenter", () => {
            cards.forEach(card => {
                card.style.transition = "all 0.1s ease";
            })
            setTimeout(() => {
                cards.forEach(card => {
                    card.style.transition = "none";
                })
            }, 500);

            //Popout
            titles.forEach(title => {
                title.style.transform = "translateZ(150px)";
            })
            images.forEach(image => {
                image.style.transform = "translateZ(200px) rotateZ(-5deg)";
            })
            descriptions.forEach(description => {
                description.style.transform = "translateZ(125px)";
            })
            discovers.forEach(discover => {
                discover.style.transform = "translateZ(100px)";
            })
        });

        //Animate Out
        container.addEventListener("mouseleave", () => {
            cards.forEach(card => {
                card.style.transition = "all 0.5s ease";
                card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            })
            //Popback
            titles.forEach(title => {
                title.style.transform = "translateZ(0px)";
            })
            images.forEach(image => {
                image.style.transform = "translateZ(0px) rotateZ(0deg)";
            })
            descriptions.forEach(description => {
                description.style.transform = "translateZ(0px)";
            })
            discovers.forEach(discover => {
                discover.style.transform = "translateZ(0px)";
            })
        });
    })
})




// Carousel Elements
// const tilesCarousel = document.getElementById("tiles");
// const tiles = document.querySelectorAll(".tile");
// const buttons = document.querySelectorAll("[data-carousel-button]")

// buttons.forEach(button => {
//     button.addEventListener("click", () => {
//         const offset = button.dataset.carouselButton === "next" ? 1 : -1
//         const slides = button
//             .closest("[data-carousel]")
//             .querySelector("[data-slides]")

//         const activeSlide = slides.querySelector("[data-active]")
//         let newIndex = [...slides.children].indexOf(activeSlide) + offset
//         if (newIndex < 0) newIndex = slides.children.length - 1
//         if (newIndex >= slides.children.length) newIndex = 0

//         slides.children[newIndex].dataset.active = true
//         delete activeSlide.dataset.active
//     })
// })