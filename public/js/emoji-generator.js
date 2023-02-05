// Arrays
var emojiSets = [];
var randomEmojis = [];
// HTML Elements
var emojiBox = document.querySelector('#emoji-box');
var genButton = document.querySelector('#button-gen');

// Generate Emoji
function emojiGen() {
    setTimeout(function () {
        emojiBox.innerHTML = emojiSets[0]
    }, 150);
    var i;
    for (i = 0; i < 4; i++) {
        var randomIndex = Math.floor(Math.random() * emojiBook.length);
        if (i === 1) {
            randomEmojis += emojiBook[randomIndex] + '<br>';
        } else {
            randomEmojis += emojiBook[randomIndex];
        };
    }
    emojiSets.unshift(randomEmojis)
    randomEmojis = '';
};

// On Load
emojiGen()