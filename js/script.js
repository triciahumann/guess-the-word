//Simple Javacript Word game tat alows user to play a word guessing game.
//Uses a word list to generate a random word and user has 8 tries toguess the word.
//Want to add a hint functionality that allows player to get a hint of a letter in the word
//Also case expression. Currently the word appears in console.
//Turn off this feature by commenting out line 32


// unordered list where player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// button with "Guess" text on it
const guessLetterButton = document.querySelector(".guess");
// text input where user types in letter to guess
const letterInput = document.querySelector(".letter");
// empty paragraph where the word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where remaining guesses are displayed "You have <span> # </span> remaining guesses"
const remainingGuessesElement = document.querySelector(".remaining");
// span inside paragraph where # of remaining guesses are displayed
const numRemainingGuesses = document.querySelector(".remaining span");
// empty paragraph where messages appear when player guesses letter
const messageToUser = document.querySelector(".message");
// hidden button that appears when prompting player to play again
const playAgainButton = document.querySelector(".play-again");

// Magnolia is the starting wor to test the game out until we fetch words with API
let word = "magnolia";
// Array that'll contain all guessed letters
let guessedLetters = [];
let remainingGuesses = 7;

// fetch data from file to select random word
const getWord = async function () {
    const response = await fetch (
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await response.text();
    //console.log(data);
    // Grab a random word from data
    // First need to transform the data I fetched into an array and separate each word by a newline (line break)
    const wordArray = words.split("\n");
    //console.log(wordArray);
    // Pull a random word from the array
    // Math.floor = rounds a number down to next whole number
    // Math.random = produces random number btwn 0 - 1
    const selectRandomWord = Math.floor(Math.random() * wordArray.length);
    // Remove any extra white space around the word from the text file
    // Reassign word to this new random word
    word = wordArray[selectRandomWord].trim();
    numRemainingGuesses.innerText = "8 guesses";
    placeholder(word);
};

// Begin game
getWord();  



// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholdLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholdLetters.push("●");
    }
    wordInProgress.innerText = placeholdLetters.join("");
};


// After user inputs a letter in the text box, user clicks "guess" button, this function accepts
// the user input and then clears the text box w/o reloading the webpage
guessLetterButton.addEventListener("click", function (e) {
    // prevents reloading of webpage after button click
    e.preventDefault();
    // empty the text of the messageToUser
    messageToUser.innerText = "";
    // capture the value of user input
    const guess = letterInput.value;
    // double check input was captured by logging out the users guess...
    // console.log(guess);
    
    // ensure a single letter is guessed by user
    const goodGuess = validateUserInput(guess);

    if (goodGuess) {
        // We've got a letter! Let's guess!
        makeGuess(guess)
    };

    // ...then empties the input box for user to guess again
    letterInput.value = "";
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
        // letter displays when it hasn't been guessed before
        displayGuessedLetters();
        countRemainingGuesses(guessedLetters);
        updateWordInProgress(guessedLetters);
    }
};

// function to update the page with the letters the play guesses 
const displayGuessedLetters = function () {
    // empty the list where the players guesses are displayed
    guessedLettersElement.innerHTML = "";
    // create a new list item for each letter inside my guessedLetters array 
    // then add them to the unordered list (guessedLettersElement)
    for (const letter of guessedLetters) {
        const listItem = document.createElement("li");
        listItem.innerText = letter;
        guessedLettersElement.append(listItem);
    } 
};

// updates the word in progress and replaces the circle symbols with correctly guessed letters
const updateWordInProgress = function (guessedLetters) {
    // changes our selected word to guess to uppercase
    const wordUpper = word.toUpperCase();
    // splits the word string into an array so the letter can appear in the guessedLetters array
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    // check if the wordArray contains any letters from the guessedLetters array, if yes, 
    // update the circle symbol with correct letter
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    playerSuccessful();
};

// function to count guesses remaining 
const countRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
    //    messageToUser.innerText = `Sorry, the word has no ${guess}`;
       remainingGuesses -= 1;
    } else {
        messageToUser.innerText = `Great job! The letter ${guess} is in the word!`
    }
    
    if (remainingGuesses === 0) {
        messageToUser.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        numRemainingGuesses.innerText = `${remainingGuesses} guesses`;
        startOver();
    } else if (remainingGuesses === 1) {
        numRemainingGuesses.innerText = `${remainingGuesses} guess`;
    } else {
        numRemainingGuesses.innerText = `${remainingGuesses} guess`;
    }
};

// check if the player successfully guess the word and won the game
const playerSuccessful = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messageToUser.classList.add("win");
        messageToUser.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
        startOver();
    }
};

// Function to hide and show "Guess" button when game is over and restarts
const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
}

// When "play again" button is clicked, the game restarts
playAgainButton.addEventListener("click", function () {
    // reset all values
    messageToUser.classList.remove(".win");
    messageToUser.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    numRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    // selects new word
    getWord();
});