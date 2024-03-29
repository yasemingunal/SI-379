/**
 * Cache a fetch() request in localStorage and return the cached data if it's not expired.
 * Useful if you are doing live editing refreshes and don't want to query the API every time.
 * 
 * @param {string} url The URL to fetch
 * @param {*} options The options to pass to fetch()
 * @param {number} cacheDuration The maximum age to use for cached data, in milliseconds
 * @returns A Promise that resolves to a Response object
 */
function fetchWithCache(url, options = {}, cacheDuration = 1000 * 60 * 60) { // Default cache duration is 1 hour
    // Utility function to create a Response object from data (like fetch() would)
    function getResponseObject(data) {
        return new Response(new Blob([JSON.stringify(data)]));
    }

    const cachedData = localStorage.getItem(url); // Check if we have cached data for this URL

    if (cachedData) { // If we do...
        const { timestamp, data } = JSON.parse(cachedData); // Parse the data from the cache
        // Note: This uses destructuring syntax. It's equivalent to:
        // const parsedCachedData = JSON.parse(cachedData);
        // const timestamp = parsedCachedData.timestamp;
        // const data = parsedCachedData.data;

        if (Date.now() - timestamp < cacheDuration) { //...and it's not expired,
            return Promise.resolve(getResponseObject(data)); // Return a promise whose value is the stored data
        } else { // it has expired, so remove it
            localStorage.removeItem(url);
        }
    }

    // If we don't have cached data or it's expired, fetch it from the network
    return fetch(url, options)
        .then((response) => response.json()) // Parse the JSON data from the response
        .then((data) => {
            localStorage.setItem(url, JSON.stringify({ // Store the data in localStorage with a timestamp
                timestamp: Date.now(),
                data
            }));
            return getResponseObject(data);
        });
}

/**
 * A function to randomly shuffle the items in an array and return a copy of the shuffled array.
 * Based on: https://stackoverflow.com/a/12646864
 * 
 * @param {Array} array An array of any type
 * @returns A shuffled copy of the array
 */
function shuffleArray(array) {
    const shuffledArray = array.slice(); // Copy the array

    // Shuffle the copy of the array using https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) { // For each index,
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements i and j
    }
    return shuffledArray; // Return the shuffled copy
}


const quizElement = document.querySelector("#quiz");
const scoreEl = document.querySelector("#score");
let score = 0

function getQuestionData(){
    const finalVal = fetch('https://the-trivia-api.com/v2/questions').then(response => response.json());
    console.log(finalVal);
    return finalVal;
};

function createQuizQuestion(question, answerList, correctAnswer, sectionClassVal){
    const li = document.createElement('li');
    li.setAttribute('class', sectionClassVal);
    const questionDisplay = document.createElement('p');
    const answerDisplay = document.createElement('ul');
    questionDisplay.innerText = question;
    for (let i = 0; i<answerList.length; i++){
        let ansItem = document.createElement('li');
        let ansButton = document.createElement('button');
        let ansContent = answerList[i];
        ansButton.innerHTML = ansContent;
        ansItem.append(ansButton);
        answerDisplay.append(ansItem)
        ansButton.setAttribute('class', sectionClassVal);
        if(ansContent === correctAnswer){
            ansButton.setAttribute('id', 'correctAnswerButton');
        } 
        else{
            ansButton.setAttribute('id', 'wrongAnswerButton');
        }

    };
    li.append(questionDisplay);
    li.append(answerDisplay);

    return li;
}
async function displayQuiz(){
    const response = await getQuestionData();
    let sectionClass = 0;
    for (const result of response) { 
        sectionClass++;
        let answers = result.incorrectAnswers;
        answers.push(result.correctAnswer);
        answers = shuffleArray(answers); 
        let li = createQuizQuestion(result.question.text, answers, result.correctAnswer, "class"+sectionClass);
        quizElement.append(li);
    }
    let numQuestionsAttempted = 0;

    let buttons = document.querySelectorAll('button');
    for (let eachButton of buttons){
        eachButton.addEventListener('click', () =>{
            numQuestionsAttempted++;
            let thisClass = eachButton.className;
            console.log(thisClass);
            if (eachButton.id === 'correctAnswerButton'){
                console.log("correct answer selected");
                score++;
                eachButton.classList.add('correctAnswer');
                eachButton.classList.add('correctAnswer::after');
            }
            else { 
                console.log('wrong answer selected');
                eachButton.classList.add('wrongAnswer');
                eachButton.classList.add('wrongAnswer::after');
            }
            scoreEl.innerHTML = `Your score: ${score} of ${numQuestionsAttempted}`;
            let allSectionButtons = document.querySelectorAll("." + thisClass);
            allSectionButtons.forEach(button => {
                if (button.id === 'correctAnswerButton'){
                    button.classList.add('correctAnswer')
                }
                button.setAttribute('disabled', true);
            })
        })
    }
}

displayQuiz();

