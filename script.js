// List of words
const wordList = [
    {
        word: "python",
        hint: "programming language",
    },
    {
        word: "guitar",
        hint: "a musical instrument",
    },
    {
        word: "aim",
        hint: "a purpose or intention",
    },
    {
        word: "venus",
        hint: "planet of our solar system",
    },
    {
        word: "gold",
        hint: "a yellow precious metal",
    },
    {
        word: "ebay",
        hint: "online shopping site",
    },
    {
        word: "golang",
        hint: "programming language",
    },
    {
        word: "coding",
        hint: "related to programming",
    },
    {
        word: "matrix",
        hint: "science fiction movie",
    },
    {
        word: "bugs",
        hint: "related to programming",
    },
    {
        word: "avatar",
        hint: "epic science fiction film",
    },
    {
        word: "gif",
        hint: "a file format for image",
    },
    {
        word: "mental",
        hint: "related to the mind",
    },
    {
        word: "map",
        hint: "diagram represent of an area",
    },
    {
        word: "island",
        hint: "land surrounded by water",
    },
    {
        word: "hockey",
        hint: "a famous outdoor game",
    },
    {
        word: "chess",
        hint: "related to an indoor game",
    },
    {
        word: "viber",
        hint: "a social media app",
    },
    {
        word: "github",
        hint: "code hosting platform",
    },
    {
        word: "png",
        hint: "a image file format",
    },
    {
        word: "silver",
        hint: "precious greyish-white metal",
    },
    {
        word: "mobile",
        hint: "an electronic device",
    },
    {
        word: "gpu",
        hint: "computer component",
    },
    {
        word: "java",
        hint: "programming language",
    },
    {
        word: "google",
        hint: "famous search engine",
    },
    {
        word: "venice",
        hint: "famous city of waters",
    },
    {
        word: "excel",
        hint: "microsoft product for windows",
    },
    {
        word: "mysql",
        hint: "a relational database system",
    },
    {
        word: "nepal",
        hint: "developing country name",
    },
    {
        word: "flute",
        hint: "a musical instrument",
    },
    {
        word: "crypto",
        hint: "related to cryptocurrency",
    },
    {
        word: "tesla",
        hint: "unit of magnetic flux density",
    },
    {
        word: "mars",
        hint: "planet of our solar system",
    },
    {
        word: "proxy",
        hint: "related to server application",
    },
    {
        word: "email",
        hint: "related to exchanging message",
    },
    {
        word: "html",
        hint: "markup language for the web",
    },
    {
        word: "air",
        hint: "related to a gas",
    },
    {
        word: "idea",
        hint: "a thought or suggestion",
    },
    {
        word: "server",
        hint: "related to computer or system",
    },
    {
        word: "svg",
        hint: "a vector image format",
    },
    {
        word: "jpeg",
        hint: "a image file format",
    },
    {
        word: "search",
        hint: "act to find something",
    },
    {
        word: "key",
        hint: "small piece of metal",
    },
    {
        word: "egypt",
        hint: "a country name",
    },
    {
        word: "joker",
        hint: "psychological thriller film",
    },
    {
        word: "dubai",
        hint: "developed country name",
    },
    {
        word: "photo",
        hint: "representation of person or scene",
    },
    {
        word: "nile",
        hint: "largest river in the world",
    },
    {
        word: "rain",
        hint: "related to a water",
    },
];

// Variables
const inputs = document.querySelector(".inputs");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");
const resetBtn = document.querySelector(".reset-btn");
const typingInput = document.querySelector(".typing-input");
const results = document.querySelector(".results");

let word;
let maxGuesses;
let incorrectLetters = [];
let correctLetters = [];

// Generate a Random word from the wordList
function randomWord() {
    let randomItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = randomItem.word;

    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = [];
    incorrectLetters = [];
    hint.innerText = randomItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}

randomWord();

// Initiate the game
function initGame(e) {
    let key = e.target.value.toLowerCase();
    if (
        key.match(/^[A-Za-z]+$/) &&
        !incorrectLetters.includes(` ${key}`) &&
        !correctLetters.includes(key)
    ) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";

    setTimeout(() => {
        if (correctLetters.length === word.length) {
            results.innerText =
                "Congrats!👏 You have guessed the correct word!";
            results.style.display = "block";
            results.style.color = "green";
            // return randomWord();
        } else if (maxGuesses < 1) {
            results.innerText = "GAME OVER!💀 You have no guesses left";
            results.style.color = "red";
            results.style.display = "block";

            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

// Event Liteners
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
resetBtn.addEventListener("click", () => {
    randomWord();
    results.style.display = "none";
});