const hiddenWordContainer = document.getElementById('hidden-word-container');
const keyboardContainer = document.getElementById('keyboard-container');
const startGameButton = document.getElementById('start-game');
const restartGameButton = document.getElementById('restart-game');

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

        guessedWordLettersContainers = document.querySelectorAll('.hidden-letter-container');
        keyboardLetters = document.querySelectorAll('.keyboard-letter-container');
        let guessedLettersCount = 0;
        keyboardLetters.forEach(function(elem) {
            elem.addEventListener('click', function(e) {                
                let pressedLetter = e.target.innerText;
                console.log(e.target.innerText);
                
                let matchingLettersPositions = [];
                for (var i = 0; i<=wordToGuess.length - 1; i++) {
                    if (pressedLetter == wordToGuess[i]){
                        matchingLettersPositions.push(i + 1);
                    };
                };

                guessedLettersCount += matchingLettersPositions.length;
                console.log("ugadano: " + guessedLettersCount, "vsegobukv: " + wordToGuess.length);

                if (matchingLettersPositions.length > 0) {
                    for (var i = 0; i<=matchingLettersPositions.length-1;i++){
                        console.log(matchingLettersPositions);
                        document.querySelector('.hidden-letter-container:nth-child(' + matchingLettersPositions[i] +')').innerHTML = pressedLetter;
                    };
                }

                if (guessedLettersCount == wordToGuess.length) (
                    guessedWordLettersContainers.forEach(function(elem){
                            console.log(elem);
                            elem.setAttribute("style", "background-color:#2cbd4e; color: red; font-size: 24px; padding-top: 5px");
                        }
                    )
                )
            })
        })
        
    }
);

