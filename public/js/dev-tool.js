// Elements
const iframe = document.getElementById("web-page");
const iframeContainer = document.getElementById("resize-container");
const link = document.getElementById("link");
const search = document.getElementById("search");
const resize = document.getElementById("resize");
const dimensions = document.getElementById("dimensions");


// Search Button
search.addEventListener("click", () => {
    var input = link.value;
    // Check
    if (input == "") {
        link.focus();
        return;
    }
    // Includes Https
    if (!input.includes("https://")) {
        input = "https://" + input;
        link.value = input;
    }
    // Youtube Iframe
    if (input.includes("https://www.youtube.com/")) {
        input = "https://www.youtube.com/embed/" + input.substr(-11);
        link.value = input;
    }
    iframe.src = input;
    localStorage.setItem("devToolLastInput", input);
});

// Resize Button
resize.addEventListener("click", () => {
    if (iframeContainer.style.width == "100vw" && iframeContainer.style.height == "85vh") {
        iframeContainer.style.width = "70vw";
        iframeContainer.style.height = "50vh";
        iframeContainer.classList.add("resizable");
        dimensions.style.display = "block";
    } else {
        iframeContainer.style.width = "100vw";
        iframeContainer.style.height = "85vh";
        iframeContainer.classList.remove("resizable");
        dimensions.style.display = "none";
    }
});

function outputsize() {
    dimensions.innerHTML = `${iframeContainer.offsetWidth}px &#215 ${iframeContainer.offsetHeight}px`;
}
outputsize();

new ResizeObserver(outputsize).observe(iframeContainer);


// On Load
document.addEventListener("DOMContentLoaded", () => {
    // Dimensions
    iframeContainer.style.width = "100vw";
    iframeContainer.style.height = "85vh";

    // Message
    let message = document.createElement("h1");
    message.innerText = "Enter a link in the address bar above.";
    message.style.color = "white";
    message.style.textAlign = "center";
    message.style.padding = "40px";
    iframe.contentWindow.document.body.appendChild(message);

    // Local Storage
    var localStorageInput = localStorage.getItem("devToolLastInput");
    if (localStorageInput != null) {
        link.value = localStorageInput;
        iframe.src = localStorageInput;
    }
});