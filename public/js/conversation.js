const mainTextInput = document.getElementById("main-text-input");
const messages = document.getElementById("messages");
const conversationTypeSetting = document.getElementById("conversation-type");

// Date and time
const dateText = document.getElementById("date");
const dayOfTheWeekName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function date() {
    const currentDate = new Date();
    var day = dayOfTheWeekName[currentDate.getDay()];
    var month = monthName[currentDate.getMonth()];
    var date = currentDate.getDate();
    // Update Text
    var dateText = `${day}, ${month} ${date}`;
    return dateText;
};

function time() {
    const currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    // Check if number is a digit
    if (hours.toString().length == 1) {
        hours = "0" + hours;
    };
    if (minutes.toString().length == 1) {
        minutes = "0" + minutes;
    };
    var timeText = `${hours} : ${minutes}`;
    return timeText;
};

// Conversation Type 
// 1. Fortune Teller
// 2. Realistic Conversation
var conversationType = "Fortune Teller";
conversationTypeSetting.innerHTML = conversationType;

// Placeholder Messages
const placeholderMessages = ["Let's continue!", "Very interesting conversation so far...", "Anything else?", "You know so many things!", "Do you have anything else?", "I love our conversation!", "Passionating... Anything else?"];

// Send Text
function send() {
    if (mainTextInput.value == "") {
        return;
    };
    var input = mainTextInput.value;
    addText(input);
    var processedAnswer = process(input);
    setTimeout(function () {
        if (processedAnswer != null) {
            addText(processedAnswer);
        };
        // Allow input area
        mainTextInput.readOnly = false;
        // Update Placeholder
        var placeholderAnswer = placeholderMessages[Math.floor(Math.random() * placeholderMessages.length)];
        mainTextInput.placeholder = placeholderAnswer;
    }, 1000);
};

// Add Text
function addText(textToAdd) {
    const newParagraph = document.createElement("p");
    var node = document.createTextNode(textToAdd); newParagraph.appendChild(node);
    messages.insertBefore(newParagraph, messages.firstChild);
};


// Possible answers
var possibleAnswers = ["Yes", "No", "Definitely", "Maybe", "Please ask again later", "Most likely", "Cannot predict now", "Outlook good", "It is certain", "My reply is no", "You may rely on it", "Signs point to yes", "Very Doubtful", "Don't count on it", "Reply hazy, try again"];
var yesAnswers = ["Yes", "Definitely", "Most likely"];
var noAnswers = ["No", "Very doubtful", "My reply is no"];

// Process Text
function process(input) {
    var answer = "Sorry, an error occured. Please try again.";

    // Clear the input area
    mainTextInput.value = "";
    mainTextInput.readOnly = true;
    mainTextInput.placeholder = "Loading...";

    // Process
    // Help
    if (input == "Help" || input == "help") {
        answer = `You are currently in the "${conversationType}" conversation mode. To change the conversation mode, go to Settings (click the gear icon in the top right corner) and select another conversation mode. You can select Fortune Teller or Natural Conversation. Type "commands" to learn our Shortcuts and Actions that you can do!`;
        return answer;
    };

    // Date and time
    if (input.includes("date") || input.includes("time")) {
        answer = `It is currently ${time()} and it is ${date()}.`;
        return answer;
    };

    // Clear Conversation
    if (input == "Clear" || input == "clear") {
        clear();
        return;
    };

    // Commands
    if (input == "Commands" || input == "command") {
        answer = "Some useful commands: To send the message, just hold Ctrl + Enter. To clear the conversation, type 'clear' and send or hold Ctrl + C.";
        return answer;
    };

    // Personal questions
    if (input.includes("Are you")) {
        if (input.includes("smart")) {
            answer = "Am I smart? Well maybe... Let's get back to our conversation.";
        } else if (input.includes("dumb")) {
            answer = "Me? Dumb? How dare you!";
        }
        return answer;
    };

    // Fortune Teller
    if (input.includes(" you ")) {
        answer = "Why are you asking questions about me? I am here to predict your future, not mine!";
    } else if (conversationType == "Fortune Teller") {
        answer = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
    };

    return answer;
};

// Functions
// Clear the messages
function clear() {
    messages.innerHTML = "";
    addText("Ok, conversation cleared. Let's start from the beggining!");
    addText("What is your question?");
};

// Key combination
// For sending
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.shiftKey || event.key == "Enter") {
        send();
    };
});

// TODO
// For clearing
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key == "") {
        clear();
    };
});

// Settings
const backgroundAboutGame = document.getElementById("settings");
const aboutGameContainer = document.getElementById("settings-container");

// Settings Pop-up
function openSettings() {
    backgroundAboutGame.style.zIndex = "200";
    aboutGameContainer.style.opacity = "1";
    backgroundAboutGame.style.opacity = "1";
};
function closeSettings() {
    aboutGameContainer.style.opacity = "0";
    backgroundAboutGame.style.opacity = "0";
    setTimeout(() => {
        backgroundAboutGame.style.zIndex = "-100";
    }, 1000);
};