let heads = 0;
let tails = 0;
if (localStorage.getItem("heads") != null || localStorage.getItem("tails") != null) {
    heads = Number(localStorage.getItem("heads"));
    tails = Number(localStorage.getItem("tails"));
    updateStats();
};

let coin = document.querySelector(".coin");
let flipButton = document.querySelector("#flip-button");
let resetButton = document.querySelector("#reset-button");

flipButton.addEventListener("click", () => {
    let i = Math.floor(Math.random() * 2);
    coin.style.animation = "none";
    if (i) {
        setTimeout(function () {
            coin.style.animation = "spin-heads 3s forwards";
        }, 100);
        heads++;
    }
    else {
        setTimeout(function () {
            coin.style.animation = "spin-tails 3s forwards";
        }, 100);
        tails++;
    }
    setTimeout(updateStats, 3000);
    disableButton();
});

function updateStats() {
    document.querySelector("#heads-count").textContent = `Heads: ${heads}`;
    localStorage.setItem("heads", heads);
    document.querySelector("#tails-count").textContent = `Tails: ${tails}`;
    localStorage.setItem("tails", tails);
};

function disableButton() {
    flipButton.disabled = true;
    setTimeout(function () {
        flipButton.disabled = false;
    }, 3000);
};
resetButton.addEventListener("click", () => {
    coin.style.transform = "rotateX(0)";
    heads = 0;
    tails = 0;
    updateStats();
});