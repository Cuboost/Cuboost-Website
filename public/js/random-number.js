// HTML Elements
const button = document.getElementById("button");
const number = document.getElementById("number");

// Generate Number
var result;

function generateNumber() {
    number.classList.remove("number-animation");
    setTimeout(function () {
        var min = parseInt(document.getElementById("min").value);
        var max = parseInt(document.getElementById("max").value);
        result = Math.floor(Math.random() * (max - min + 1)) + min;
        number.innerHTML = result;
        number.classList.add("number-animation");
    }, 50)
};

// On Load
generateNumber()