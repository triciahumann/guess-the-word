// unordered list where player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
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


guessLetterButton.addEventListener("click", function (e) {
    // prevents reloading of webpage after button click
    e.preventDefault();

    // capture the value of user input
    const userGuess = letterInput.value;
    // logs out the users guess...
    console.log(userGuess);
    // ...then empties the input box for user to guess again
    letterInput.value = "";
});

