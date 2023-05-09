window.addEventListener("load", () => {
    const sounds = document.querySelectorAll(".sound");
    const pads = document.querySelectorAll("#pads div");
    const visual = document.getElementById("visual");
    const colors = [
        "#00026B",
        "#002582",
        "#003B6B",
        "#025467",
        "#028479",
        "#0c96a5",
    ];

    // Sounds
    pads.forEach((pad, index) => {
        pad.addEventListener("click", function () {
            sounds[index].currentTime = 0;
            sounds[index].play();

            createBubbles(index);
        });
    });

    // Function that makes bubble
    const createBubbles = (index) => {
        const bubble = document.createElement("div");
        visual.appendChild(bubble);
        bubble.style.backgroundColor = colors[index];
        bubble.style.animation = "jump 1s ease";
        bubble.addEventListener("animationend", function () {
            visual.removeChild(this);
        })
    };
});