// Loading Splash Animation
const splash = document.querySelector(".splash");
splash.classList.add("display-none");

splash.classList.remove("display-none");
document.addEventListener("DOMContentLoaded", (e) => {
    setTimeout(() => {
        splash.classList.add("display-none");
    }, 5000);
    localStorage.setItem("firstTime", "false");
});

// Color Generator

const hexvalues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

// Generate Random Color
let randomColor = () => {
    let hex = "#";
    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(hexvalues.length * Math.random());
        let randomValue = hexvalues[randomIndex];
        hex = hex + randomValue;
    }
    return hex;
}

// Update Color
function changeColor() {
    document.getElementById("color-box").style.backgroundColor = randomColor();
}

// On Button Click
let randomColorButton = document.getElementById('generateColorButton');
randomColorButton.onclick = () => {
    changeColor();
};

// On Website Load
changeColor();


// Utensils Generator
const unusedUtensils = ["Pencil", "Markers", "Black pen", "Color pencils", "Pastels"];

// Generate Random Utensil
function randomUtensil() {
    if (unusedUtensils == 0) {
        unusedUtensils.push("Pencil", "Markers", "Black pen", "Color pencils", "Pastels");
    }
    let randomIndex = Math.floor(unusedUtensils.length * Math.random());
    let randomUtensil = unusedUtensils[randomIndex];
    unusedUtensils.splice(randomIndex, 1)
    return randomUtensil;
}

// Update Utensil
function changeUtensil() {
    document.getElementById("utensilText").innerHTML = randomUtensil();
}

// On Button Click
let randomUtensilButton = document.getElementById('generateUtensilButton');
randomUtensilButton.onclick = () => {
    changeUtensil();
};

// On Website Load
changeUtensil();


// Generate Random Style
const unusedStyles = ["Cartoon", "Perspective", "Pointillism", "Photorealism", "Silhouette", "Sketch", "Line", "Doodle", "Fashion", "Architectural", "Anamorphic"];

function randomStyle() {
    if (unusedStyles == 0) {
        unusedStyles.push("Cartoon", "Perspective", "Pointillism", "Photorealism", "Silhouette", "Sketch", "Line", "Doodle", "Fashion", "Architectural", "Anamorphic");
    }
    let randomIndex = Math.floor(unusedStyles.length * Math.random());
    let randomStule = unusedStyles[randomIndex];
    unusedStyles.splice(randomIndex, 1)
    return randomStule;
}

// Update Utensil
function changeStyle() {
    document.getElementById("styleText").innerHTML = randomStyle();
}

// On Website Load
changeStyle();


// Image Generator

// Update Image
function changeImage() {
    document.getElementById("image-box").style.backgroundImage = "url('https://picsum.photos/300/300')";
}

// On Website Load
changeImage();