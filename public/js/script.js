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

// Make a screen appear
if (localStorage.getItem("firstTime") == null) {
    splash.classList.remove("display-none");
    body.classList.add("disable-scroll");
    document.addEventListener("DOMContentLoaded", (e) => {
        setTimeout(() => {
            splash.classList.add("display-none");
            body.classList.remove("disable-scroll");
        }, 5000);
        localStorage.setItem("firstTime", "false");
        localStorage.setItem("lastOpened", currentDate.toString());
        cuboostHeaderStyle.animationDelay = "5.5s";
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