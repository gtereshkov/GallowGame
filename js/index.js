const hiddenWordContainer = document.getElementById('hidden-word-container');
const keyboardContainer = document.getElementById('keyboard-container');
const startGameButton = document.getElementById('start-game');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var initialHiddenWords = ['KAMASUTRA', 'ATMOSPHERE', 'BASKETBALL', 'COMPLETION', 'COMPLIANCE', 'FOUNDATION', 'INSTRUMENT', 'TECHNIQUES'];

function pickRandomWord(wordsArray) {
    return wordsArray[Math.floor(Math.random() * wordsArray.length)]
};

function createLetterContainer(className, whereToCreate, whatToInsert) {
    var div = document.createElement('div');
    div.setAttribute('class', className);
    if (whatToInsert) {
        div.innerHTML = whatToInsert;
    }
    whereToCreate.appendChild(div);
}

function renderHiddenWordContainer(hiddenWord) {
    for (var i = 0; i<=hiddenWord.length - 1; i++) {
        createLetterContainer('hidden-letter-container', hiddenWordContainer);
    }
};

function renderKeyboard (lettersArray) {
    for (var i = 0; i<=lettersArray.length - 1; i++) {
        createLetterContainer('keyboard-letter-container', keyboardContainer, lettersArray[i])
    }
};

startGameButton.addEventListener('click', function() {
        var wordToGuess = pickRandomWord(initialHiddenWords);
        console.log(wordToGuess);   
        renderHiddenWordContainer(wordToGuess);
        renderKeyboard(alphabet);

        keyboardLetters = document.querySelectorAll('.keyboard-letter-container');
        keyboardLetters.forEach(function(elem) {
            elem.addEventListener('click', function(e) {
                console.log(e.target.innerText);
                for (var i = 0; i<=wordToGuess.length - 1; i++){
                    if (wordToGuess.indexOf(e.target.innerText) > 0) {
                        document.querySelector('#hidden-word-container:nth-child(' + wordToGuess.indexOf(e.target.innerText) +')').innerHTML = e.target.innerText;
                    }
                }
            })
        })
        
    }
);

