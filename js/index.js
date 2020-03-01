const hiddenWordContainer = document.getElementById('hidden-word-container');
const keyboardContainer = document.getElementById('keyboard-container');
const startGameButton = document.getElementById('start-game');
const restartGameButton = document.getElementById('restart-game');
const guessedWordsCountContainer = document.getElementById('guesses-words_count');
const guessedLettersCountContainer = document.getElementById('guessed-letters_count');
const remainingLettersCountContainer = document.getElementById('remaining-letters_count');
let guessedWordsCounter = 0;
let guessedLettersCounter = 0;
let remainingLettersCounter = 0;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let initialHiddenWords = ['KAMASUTRA', 'ATMOSPHERE', 'BASKETBALL', 'COMPLETION', 'COMPLIANCE', 'FOUNDATION', 'INSTRUMENT', 'INSTINCT', 'COMPUTER','DEVELOPER'];

function pickRandomWord(wordsArray) {
    return wordsArray[Math.floor(Math.random() * wordsArray.length)]
};

function createLetterContainer(className, whereToCreate, whatToInsert) {
    let div = document.createElement('div');
    div.setAttribute('class', className);
    if (whatToInsert) {
        div.innerHTML = whatToInsert;
    }
    whereToCreate.appendChild(div);
}

function renderHiddenWordContainer(hiddenWord) {
    for (let i = 0; i<=hiddenWord.length - 1; i++) {
        createLetterContainer('hidden-letter-container', hiddenWordContainer);
    }
};

function renderKeyboard (lettersArray) {
    for (let i = 0; i<=lettersArray.length - 1; i++) {
        createLetterContainer('keyboard-letter-container', keyboardContainer, lettersArray[i])
    }
};

function isLetter(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
        return false;
    }
    return true;
};

function generalGameLogic() {
    startGameButton.disabled = true;
    let wordToGuess = pickRandomWord(initialHiddenWords);
    remainingLettersCounter = wordToGuess.length;
    console.log(wordToGuess);   
    renderHiddenWordContainer(wordToGuess);
    renderKeyboard(alphabet);

    let guessedWordLettersContainers = document.querySelectorAll('.hidden-letter-container');
    let keyboardLetters = document.querySelectorAll('.keyboard-letter-container');

    keyboardLetters.forEach(function(elem) {
        elem.addEventListener('click', function actionOnMouseClick(e) {
                let pressedLetter = e.target.innerText;
                
                let matchingLettersPositions = [];
                for (let i = 0; i<=wordToGuess.length - 1; i++) {
                    if (pressedLetter == wordToGuess[i]){
                        matchingLettersPositions.push(i + 1);
                        guessedLettersCounter++;
                        guessedLettersCountContainer.innerHTML = guessedLettersCounter;
                        remainingLettersCounter --;
                        remainingLettersCountContainer.innerHTML = remainingLettersCounter;
                    };
                };


                if (matchingLettersPositions.length > 0) {
                    for (let i = 0; i<=matchingLettersPositions.length-1;i++){
                        console.log(matchingLettersPositions);
                        document.querySelector('.hidden-letter-container:nth-child(' + matchingLettersPositions[i] +')').innerHTML = pressedLetter;
                    };
                }

                if (guessedLettersCounter == wordToGuess.length) {
                    guessedWordLettersContainers.forEach(function(elem){
                            //console.log(elem);
                            elem.setAttribute("style", "background-color:#00ffbb; color: red; font-size: 16px");
                        }
                    );
                    keyboardLetters.forEach(function(elem) {
                            elem.outerHTML = elem.outerHTML;
                        }
                    );                          
                    guessedWordsCounter++;
                    guessedWordsCountContainer.innerHTML = guessedWordsCounter;                
                };

                this.setAttribute('style', 'background-color:#c1b6b6');
                this.removeEventListener('click', actionOnMouseClick);
            }
        );
    })    
    
    window.addEventListener('keypress', function actionOnKeyboardClick(e) {
            if (isLetter(e)){
                console.log(e.key.toUpperCase());
            }
        }
    );
};

startGameButton.addEventListener('click', generalGameLogic);

restartGameButton.addEventListener("click", function() {
    swal({
        title: "Are you sure want to restart the game?",
        text: "Once restarted, you will loose your current progress!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("Poof! Try with another word", {
                icon: "success",
            });
            hiddenWordContainer.innerHTML = "";
            keyboardContainer.innerHTML = "";
            guessedLettersCounter = 0;
            guessedLettersCountContainer.innerHTML = guessedLettersCounter;
            remainingLettersCounter = 0;
            remainingLettersCountContainer.innerHTML = remainingLettersCounter;
            generalGameLogic();
        } else {
            swal("Keep guessing current word!");
        }
    })
}
);  





