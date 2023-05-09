// Const
const nameHTML = document.getElementById("name");
const iconHTML = document.getElementById("icon");
const degreeSectionHTML = document.getElementById("degree-section");
const temperatureHTML = document.getElementById("temperature-degree");
const temperatureUnitsHTML = document.getElementById("temperature-units");
const descriptionHTML = document.getElementById("temperature-description");
const quoteHTML = document.getElementById("quote");
const quoteAuthorHTML = document.getElementById("quote-author");
const loaderContainerHTML = document.getElementById("loader-container");
const mainHTML = document.getElementById("forecast");

// Loader
var quoteIndex = Math.floor(Math.random() * 21);
quoteHTML.innerText = weatherQuotes[quoteIndex];
quoteAuthorHTML.innerText = weatherQuotesAuthors[quoteIndex];
document.body.style.cursor = "progress";

// Variables
// Index (time)
var index = 0;
// Forecast
var forecast = null;
// Unit C / F
var unitIsCelcius = true;
if (localStorage.getItem("preferredUnit") != null) {
    if (localStorage.getItem("preferredUnit") == "F") {
        unitIsCelcius = false;
    }
}
// Grid
var grid;

// Fetch Data After Loading
window.addEventListener("load", () => {
    // Coordinates from Browser
    let long;
    let lat;
    if (navigator.geolocation) {
        // Position
        navigator.geolocation.getCurrentPosition(position => {
            if (localStorage.getItem("grid") != null) {
                grid = localStorage.getItem("grid");
                unitsSelect();
            } else {
                long = position.coords.longitude;
                lat = position.coords.latitude;
                const gridAPI = `https://api.weather.gov/points/${lat},${long}`;

                // Convert Coordinates into Grid used by API
                fetch(gridAPI)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        // Store the link with the grid in a variable
                        grid = data.properties.forecastGridData;
                        localStorage.setItem("grid", grid);
                        unitsSelect();
                    });
            }
        });
    } else {
        quoteHTML.innerText = "Location Denied";
        quoteAuthorHTML.innerText = "To get the forecast, please authorize the Location in your browser...";
    }
})

// Select units function
function unitsSelect() {
    console.log(unitIsCelcius)
    // Fetch the forecast
    if (unitIsCelcius) {
        fetchForecast("units=si");
    } else {
        fetchForecast("units=us");
    }
}

// Fetch the forecast function
function fetchForecast(units) {
    fetch(grid + `/forecast?${units}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            forecast = data.properties.periods;
            console.log(forecast);
            // Change Screen
            update(index);
            // Change Tiles
            for (let index = 0; index < 13; index++) {
                var { name, temperature } = forecast[index];
                document.getElementById(index).firstElementChild.innerHTML = name;
                document.getElementById(index).lastElementChild.innerHTML = temperature;
            }
            // Stop Loader
            loaderContainerHTML.style.display = "none";
            mainHTML.classList.add("main-show");
            document.body.style.cursor = "default";
        })
}

// Update Screen Function
function update(index) {
    const { name, temperature, icon, detailedForecast, temperatureUnit } = forecast[index];
    nameHTML.innerText = name;
    iconHTML.src = icon.replace("medium", "large");
    temperatureHTML.innerText = temperature;
    descriptionHTML.innerText = detailedForecast;
    temperatureUnitsHTML.innerText = temperatureUnit;
}

// Update Selected Tile Function
function tileClicked(id) {
    document.getElementById(index).classList.remove("selected");
    index = id;
    document.getElementById(id).classList.add("selected");
    update(id)
}

// Add Tiles
function addTiles() {
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("forecast-tile");
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = text;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Apend To List
    todoList.appendChild(todoDiv);
}

// Units Event Listener
degreeSectionHTML.addEventListener("click", () => {
    unitIsCelcius = !unitIsCelcius;
    if (unitIsCelcius) {
        localStorage.setItem("preferredUnit", "C");
    } else {
        localStorage.setItem("preferredUnit", "F");
    }
    unitsSelect();
})