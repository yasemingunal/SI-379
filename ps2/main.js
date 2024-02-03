const WORD_LENGTH = 5; // How long each guess should be
const inputEl = document.querySelector('#guess-inp'); // The input DOM element

// Will store the correct answer once fetched
let correctAnswer = '';

// Before we have a set answer, disable the input field and show a loading message
inputEl.setAttribute('disabled', true);
showInfoMessage('Loading...');

// Get a random answer from the list
getRandomAnswer((answer) => {
    correctAnswer = answer;              // Once we have it, store it, ...
    inputEl.removeAttribute('disabled'); // enable the input field, ...
    clearInfoMessage();                  // clear the loading message, and...
    inputEl.focus();                     // and focus the input field
    // NOTE : If you use Live Preview, the focus line ☝️ can get annoying because
    //       it will keep focusing the input field every time you edit the file.
    //       You can comment it out.
});

// TODO: Fill in your code here
function displayGuessFeedback(guess){
    console.log(correctAnswer);
    const divGuesses = document.querySelector("#guesses");
    const divElem = document.createElement('div');
    for(let i=0; i<guess.length; i++){
        const spanElem = document.createElement('span');
        spanElem.classList.add('letter');
        const letter = guess[i].toUpperCase();
        const correctLetter = correctAnswer[i].toUpperCase();
        if (letter === correctLetter){
            spanElem.classList.add('correct');
        } else if (correctAnswer.toUpperCase().includes(letter)){
            spanElem.classList.add('present');
        } else {
            spanElem.classList.add('absent');
        }
        spanElem.textContent = letter;
        divElem.appendChild(spanElem);   
    };
    divGuesses.appendChild(divElem);
};

inputEl.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter'){
        const inpVal = inputEl.value;
        console.log(inpVal);
        console.log(correctAnswer);
        if (inpVal.length != WORD_LENGTH){
            showInfoMessage("Your guess must be " + WORD_LENGTH + " letters long.");
        } 
        if (inpVal === correctAnswer){
            showInfoMessage("You win! The answer was {correctAnswer}");
            inputEl.disabled = true;
        }
        if (inpVal != correctAnswer){
            isValidWord(inpVal, (isValid) => {
                if (isValid){
                    displayGuessFeedback(inpVal);
                } else{
                    showInfoMessage(inpVal + " is not a valid word.");
                }
            })
        }
    } else {
        clearInfoMessage();
    };
}
)