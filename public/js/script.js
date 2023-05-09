// Splash Screen
// Const
const splash = document.querySelector(".splash");
const cuboostSplash = document.querySelector(".cuboost-splash");
const body = document.body;
const cuboostHeaderStyle = document.getElementById("cuboost-header-title").style;

// Get today's date
let newDate = new Date();
const currentDay = newDate.getDate();
const currentMonth = newDate.getMonth() + 1;
const currentYear = newDate.getFullYear();
const currentDate = currentMonth + " / " + currentDay + " / " + currentYear;
console.log("The current date is: " + currentDate);

// Make a splash appear
if (localStorage.getItem("lastOpened") == null) {
    splash.classList.remove("display-none");
    body.classList.add("disable-scroll");
    document.addEventListener("DOMContentLoaded", (e) => {
        setTimeout(() => {
            splash.classList.add("display-none");
            body.classList.remove("disable-scroll");
        }, 2500);
        localStorage.setItem("lastOpened", currentDate.toString());
        cuboostHeaderStyle.animationDelay = "3s";
    });
} else if (localStorage.getItem("lastOpened") != null && localStorage.getItem("lastOpened") != currentDate.toString()) {
    cuboostSplash.classList.remove("display-none");
    body.classList.add("disable-scroll");
    document.addEventListener("DOMContentLoaded", (e) => {
        setTimeout(() => {
            cuboostSplash.classList.add("display-none");
            body.classList.remove("disable-scroll");
        }, 2500);
        cuboostHeaderStyle.animationDelay = "3s";
        localStorage.setItem("lastOpened", currentDate.toString());
    });
} else {
    console.log("No Splash Screen because the site was was already opened today...");
};

// Scroll Appear
function scrollAppear() {
    var element = document.querySelector(".scroll-appear");
    var elementPosition = element.getBoundingClientRect().top;
    var screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
        element.classList.add("scroll-appear-show")
    }
}

window.addEventListener("scroll", scrollAppear)


// Nav
const menuButton = document.getElementById("menu-button");
const nav = document.getElementById("main-nav");
const navLinksContainer = document.getElementById("nav-links");
const navLinks = document.querySelectorAll("#nav-links li")

const navSlide = () => {
    menuButton.addEventListener("click", () => {
        // Toggle Nav
        navLinksContainer.classList.toggle("nav-active");
        // Toggle Nav Blur
        nav.classList.add("no-filter");
        setTimeout(() => {
            if (!navLinksContainer.classList.contains("nav-active")) {
                nav.classList.toggle("no-filter");
            }
        }, 500)
        // Link Animations
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `nav-link 0.5s ease forwards ${index / 5 + 0.6}s`;
            }
        });
        // Menu Button Animation
        menuButton.classList.toggle("toggle");
    });
}
window.addEventListener("scroll", function () {
    if (window.scrollY < window.innerHeight / 5) {
        nav.classList.add("nav-fixed");
    } else {
        nav.classList.remove("nav-fixed")
    }
})

navSlide();

// Feedback
const rateButton = document.getElementById("feedback-pop-up");
const rateButtonText = rateButton.querySelector("h4");
const ratingForm = document.getElementById("feedback");
const ratingCloseButton = rateButton.querySelector("button");
const seeRatingButton = document.getElementById("feedbackResultsButton");

rateButton.addEventListener("click", () => {
    ratingCloseButton.style.display = "block";
    rateButtonText.style.display = "none";
    ratingForm.style.display = "block";
    ratingForm.style.display = "block";
    seeRatingButton.style.display = "block";
})

ratingCloseButton.addEventListener("click", () => {
    rateButton.style.display = "none";
})