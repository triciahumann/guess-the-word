// unordered list where player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// button with "Guess" text on it
const guessLetterButton = document.querySelector(".guess");
// text input where user types in letter to guess
const letterInput = document.querySelector(".letter");
// empty paragraph where the word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where remaining guesses are displayed "You have <span> # </span> remaining guesses"
const remainingGuesses = document.querySelector(".remaining");
// span inside paragraph where # of remaining guesses are displayed
const numRemainingGuesses = document.querySelector(".remaining span");
// empty paragraph where messages appear when player guesses letter
const messageToUser = document.querySelector(".message");
// hidden button that appears when prompting player to play again
const playAgainButton = document.querySelector(".play-again");

// Magnolia is the starting wor to test the game out until we fetch words with API
const word = "magnolia";
// Array that'll contain all guessed letters
const guessedLetters = [];

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholdLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholdLetters.push("●");
    }
    wordInProgress.innerText = placeholdLetters.join("");
};

placeholder(word);

// After user inputs a letter in the text box, user clicks "guess" button, this function accepts
// the user input and then clears the text box w/o reloading the webpage
guessLetterButton.addEventListener("click", function (e) {
    // prevents reloading of webpage after button click
    e.preventDefault();
    // empty the text of the messageToUser
    messageToUser.innerText = "";

    // capture the value of user input
    const guess = letterInput.value;
    // logs out the users guess...
    console.log(guess);
    // ...then empties the input box for user to guess again
    
    // ensure a single letter is guessed by user
    const goodGuess = validateUserInput(guess);

    if (goodGuess) {
        // We've got a letter! Let's guess!
        makeGuess(guess)
    }

    letterInput.value = "";

    // calling the function I created that checks user input
    validateUserInput(input);

    // ??? HOW TO "SAVE THE RESULT OF THIS FUNCTION CALL TO A VARIALBE & LOG IT OUT TO THE CONSOLE"
    // STEP 3/6 "VALIDATE INPUT IN THE BUTTON EVENT HANDLER"
});


const validateUserInput = function (input) {
    // a regular expression to ensure user input is a letter
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {
        // Is the input empty?
        messageToUser.innerText = "Please guess a letter.";
    } else if (input.length > 1) {
        // Are multiple letters guessed at a time?
            messageToUser.innerText = "Please guess only 1 letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        // Did user type something other than a letter?
            messageToUser.innerText = "Please enter a letter from A - Z."
    } else {
        // Correctly entered a single letter
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();

    if (guessedLetters.includes(guess)) {
        messageToUser.innerText = "You already guessed this letter. Try again.";
    } else {
        guessedLetters.push(guess)
        console.log(guessedLetters);
    }
};

