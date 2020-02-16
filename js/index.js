const hiddenWordContainer = document.getElementById('hidden-word-container');
const keyboardContainer = document.getElementById('keyboard-container');
const startGameButton = document.getElementById('start-game');
const restartGameButton = document.getElementById('restart-game');

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

function generalGameLogic() {
    startGameButton.disabled = true;
    let wordToGuess = pickRandomWord(initialHiddenWords);
    console.log(wordToGuess);   
    renderHiddenWordContainer(wordToGuess);
    renderKeyboard(alphabet);

    let guessedWordLettersContainers = document.querySelectorAll('.hidden-letter-container');
    let keyboardLetters = document.querySelectorAll('.keyboard-letter-container');
    let guessedLettersCount = 0;
    keyboardLetters.forEach(function(elem) {
        elem.addEventListener('click', function(e) {                
            let pressedLetter = e.target.innerText;
            console.log(e.target.innerText);
            
            let matchingLettersPositions = [];
            for (let i = 0; i<=wordToGuess.length - 1; i++) {
                if (pressedLetter == wordToGuess[i]){
                    matchingLettersPositions.push(i + 1);
                };
            };

            guessedLettersCount += matchingLettersPositions.length;
            console.log("ugadano: " + guessedLettersCount, "vsegobukv: " + wordToGuess.length);

            if (matchingLettersPositions.length > 0) {
                for (let i = 0; i<=matchingLettersPositions.length-1;i++){
                    console.log(matchingLettersPositions);
                    document.querySelector('.hidden-letter-container:nth-child(' + matchingLettersPositions[i] +')').innerHTML = pressedLetter;
                };
            }

            if (guessedLettersCount == wordToGuess.length) (
                guessedWordLettersContainers.forEach(function(elem){
                        console.log(elem);
                        elem.setAttribute("style", "background-color:#00ffbb; color: red; font-size: 16px");
                    }
                )
            )
        })
    })    
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
            generalGameLogic();
        } else {
            swal("Keep guessing current word!");
        }
    })
}
);  





