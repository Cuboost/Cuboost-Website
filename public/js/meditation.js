const app = () => {
    const sound = document.querySelector("#sound");
    const play = document.getElementById("play");
    const outline = document.querySelector("#moving-outline circle");
    const video = document.querySelector("#vid-container video");

    // Sounds
    const sounds = document.querySelectorAll("#sound-picker button");
    // Time Display
    const timeDisplay = document.getElementById("time-display");
    const timeSelect = document.querySelectorAll("#time-select button");
    // Get the length of the outline
    const outlineLength = outline.getTotalLength();
    // Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function () {
            sound.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            soundPlay(true);
        })
    })

    // Play sound
    play.addEventListener("click", () => {
        checkPlaying(sound);
    })

    // Select time
    timeSelect.forEach(option => {
        option.addEventListener("click", function () {
            fakeDuration = this.getAttribute("data-time");
            let seconds = Math.floor(fakeDuration % 60);
            let minutes = Math.floor(fakeDuration / 60);
            updateTimeDisplay(minutes, seconds);
        })
    })

    // Function specific to stop and play sounds
    const checkPlaying = sound => {
        if (sound.paused) {
            soundPlay(true);
        } else {
            soundPlay(false);
        }
    }

    function soundPlay(playBool) {
        if (playBool) {
            sound.play();
            video.play();
            play.src = "css/images/pause.svg";
        } else {
            sound.pause();
            video.pause();
            play.src = "css/images/play.svg";
        }
    }

    // Animate Circle
    sound.ontimeupdate = () => {
        let currentTime = sound.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        updateTimeDisplay(minutes, seconds);

        if (currentTime >= fakeDuration) {
            sound.currentTime = 0;
            soundPlay(false);
        }
    }

    function updateTimeDisplay(minutes, seconds) {
        // Check if number is a digit
        if (seconds.toString().length == 1) {
            seconds = "0" + seconds;
        };

        // Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;
    }
}

app()