// Clock and Analog Important Features
// 
// 

// Update Time
setInterval(setTime, 1000);

// Settings Variables
function setDefaultVariables() {
    showDate.checked = true;
    showSeconds.checked = true;
};

// Updating Time and Date Functions
// Date
const dateText = document.getElementById("date");
const dayOfTheWeekName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function setDate() {
    // Check Settings
    if (showDate.checked) {
        // Show Date
        dateText.style.display = "block";
        const currentDate = new Date();
        var day = dayOfTheWeekName[currentDate.getDay()];
        var month = monthName[currentDate.getMonth()];
        var date = currentDate.getDate();
        // Update Text
        dateText.innerHTML = `${day} - ${month} ${date}`;
    } else {
        // Hide Date
        dateText.style.display = "none";
    }
}

// Clock Hands
const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');

// Time
const timeText = document.getElementById("time");

function setTime() {
    const currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
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
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
    if (showSeconds.checked) {
        timeText.innerHTML = `${hours} : ${minutes} : ${seconds}`;
    } else {
        timeText.innerHTML = `${hours} : ${minutes}`;
    };
};

// Clock Hands Rotation
function setRotation(element, rotationRatio) {
    if (rotationRatio == 0) {
        element.style.transition = "none";
    };
    element.style.setProperty('--rotation', rotationRatio * 360);
    if (rotationRatio != 0) {
        element.style.transition = "all 0.3s";
    };
};

// 
// 
// Other Features
// 
// 

// Zoom In and Out
const clock = document.getElementById("clock");
const analog = document.getElementById("analog");

var zoomedClock = false;
function clockZoom() {
    if (zoomedClock) {
        analog.style.display = "block";
        analog.style.opacity = "1";
        clock.style.width = "40vw";
        clock.style.height = "40vw";
        zoomedClock = false;
    } else {
        analog.style.display = "block";
        analog.style.opacity = "0";
        analog.style.display = "none";
        clock.style.width = "60vw";
        clock.style.height = "60vw";
        zoomedClock = true;
    };
};

var zoomedAnalog = false;
function analogZoom() {
    if (zoomedAnalog) {
        clock.style.display = "block";
        clock.style.opacity = "1";
        analog.style.width = "40vh";
        analog.style.background = "rgb(51, 72, 125)";
        analog.style.boxShadow = "10px 10px 10px rgba(0, 0, 0, 0.6)";
        analog.style.fontSize = "1rem";
        zoomedAnalog = false;
    } else {
        clock.style.opacity = "0";
        analog.style.width = "60vh";
        clock.style.display = "none";
        analog.style.background = "transparent";
        analog.style.boxShadow = "none";
        analog.style.fontSize = "2rem";
        zoomedAnalog = true;
    };
};

// Settings

// Show and Hide Date
const showDate = document.getElementById("show-date");
showDate.addEventListener("change", function (e) {
    setDate();
});

// Show and Hide Seconds
const showSeconds = document.getElementById("show-seconds");
showSeconds.addEventListener("change", function (e) {
    setTime();
});


// Background and Colors
// Const
const root = document.querySelector(':root');
const primary = document.getElementById("primary");
const secondary = document.getElementById("secondary");
const body = document.body;

// Colors
// Primary Color Picker
primary.addEventListener("input", function (e) {
    console.groupCollapsed("Primary Color Changed");
    // Get the styles (properties and values) for the root
    var rs = getComputedStyle(root);
    var primaryColor = rs.getPropertyValue('--primary');
    // Update Primary Color
    root.style.setProperty("--primary", `${e.target.value}`);
    // Console Log the value of the primary variable
    console.log("The value of the primary color was changed to " + primaryColor);
    // Change the Secondary Color
    var newSecondaryColor = LightenDarkenColor(primaryColor, 50);
    // Check if color exists
    if (isColor(newSecondaryColor)) {
        root.style.setProperty("--secondary", `${newSecondaryColor}`);
        // Console Log the value of the secondary variable
        console.log("The value of the secondary color was changed to " + newSecondaryColor);
    } else {
        console.log("The color that was generated (" + newSecondaryColor + ") does not exist.");
    };
    // Update the color picker
    updateColorPickers(rs.getPropertyValue('--primary'), rs.getPropertyValue('--secondary'));
    // Console Log the succesful color update
    console.log("Color Pickers were successfully updated!");
    console.groupEnd();
});

// Secondary Color Picker
secondary.addEventListener("input", function (e) {
    console.groupCollapsed("Secondary Color Changed");
    root.style.setProperty("--secondary", `${e.target.value}`);
    // Get the styles (properties and values) for the root
    var rs = getComputedStyle(root);
    // Console Log the value of the primary variable
    console.log("The value of the secondary color was changed to " + rs.getPropertyValue('--secondary'));
    // Update the color picker
    updateColorPickers(rs.getPropertyValue('--primary'), rs.getPropertyValue('--secondary'));
    // Console Log the succesful color update
    console.log("Color Pickers were successfully updated!");
    console.groupEnd();
});

// Lighten or Darken Colors
function LightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

// Check if color exists
const isColor = (strColor) => {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== '';
};

// Update Color Pickers
function updateColorPickers(newPrimaryColor, newSecondayColor) {
    primary.value = newPrimaryColor;
    secondary.value = newSecondayColor;
}

// Background Image
const image = document.getElementById("image");

image.addEventListener("input", function () {
    console.groupCollapsed("Background Image Changed");
    // Check if URL is in the input
    if (image.value) {
        if (checkImage(image.value)) {
            console.log(checkImage(image.value));
            // Apply the URL
            body.style.background = `url("${image.value}") center/cover fixed`;
            console.log("Background image is set to " + image.value);
        } else {
            // Set a color background
            console.log("Background image being removed...");
            setColorBackground();
            console.log("Background color set");
            console.groupEnd();
        };
    }
});


// Check if image exists
function checkImage(url) {
    console.log("Checking URL...");
    var image = new Image();
    image.onload = function () {
        if (this.width > 0) {
            console.log("The image with the URL " + url + " exists");
            console.groupEnd();
            return true;
        } else {
            console.log("The image with the URL " + url + " doesn't exist");
            return false;
        };
    };
};


// Set Color Background
function setColorBackground() {
    body.style.background = "linear-gradient(to right, var(--primary), var(--secondary))";
};

// 
// 
// On Page Load
// 
// 

setDefaultVariables();
setTime();
setDate();