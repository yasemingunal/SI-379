
// Piano variables:
const pianoDiv = document.querySelector('.piano');
const listenDiv = document.querySelector(".listenDiv")


const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];
const keys = ['C', 'C#', 'D', 'D#', 'E', "X", 'F','F#', 'G', 'G#', 'A', 'A#', 'B', 'X'];
const keyNames = ['C', 'C#', 'D', 'D#', 'E', 'F','F#', 'G', 'G#', 'A', 'A#', 'B']

//buttons:
const learnButton = document.querySelector("#learn");
const listenButton = document.querySelector("#listen");

//screens activated via buttons:
let learningDiv = document.querySelector(".learningDiv");
learningDiv.classList.add('disappear');

//functions & default interface setup:
function createPiano() {
    for (let i = 0; i<keys.length; i++){
        const newKey = document.createElement('div');
        newKey.setAttribute('id', keys[i]);
        newKey.classList.add('key');
        pianoDiv.append(newKey);
    }
}
createPiano();


//FREE PLAY: 
const keyDivs = document.querySelectorAll('.key')
for (let key of keyDivs){
    key.addEventListener("click", () => {
        const clickedKeyID = key.id;
        // key.classList.add('clicked');
        key.style.border = "2px red dashed";
        setTimeout(() => {
            key.style.border = 'black solid';
            // key.classList.remove('clicked')
        }, 1000);

    console.log("clicked ", clickedKeyID)});
}

// LEARN TO PLAY: 
learnButton.addEventListener('click', () => {
    learningDiv.classList.remove('disappear');
    learningDiv.classList.add('appear');

    let score = document.createElement("p");
    let instruction = document.createElement("p");
    let scoreNum = 0;


    for (let i=0; i<10; i++){
        let quizNote = keyNames[Math.floor((Math.random()*keyNames.length))]
        console.log(quizNote);
        score.innerText = `Score: ${scoreNum}`;
        instruction.innerText = `Play a ${quizNote}`

        learningDiv.append(instruction);
        learningDiv.append(score);
    }
    
    // for (let key of keyDivs){
    //     key.addEventListener("click", () => {
    //         const clickedKeyID = key.id;
    //         key.classList.add('clicked'); //get the el with the clicked class 
    //         if (quizNote === clickedKeyID){
    //             key.style.border = "2px green dashed";
    //             scoreNum++;
    //             score.innerText = `Score: ${scoreNum}`;               
    //         } else { 
    //             key.style.border = "2px red dashed";
    //         };
    //         setTimeout(() => {
    //             key.style.border = 'black solid';
    //             }, 1000);
    //     console.log("clicked ", clickedKeyID)});
    // }
})

listenButton.addEventListener("click", () => {

    //get three song URLs, append them as buttons the listenDiv element 

    const furUrl = 'https://spotify81.p.rapidapi.com/download_track?q=Fur%20Elise&onlyLinks=1';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd8b3104eb9msh3ecd4325e9378b6p1b25e3jsn9fec64e3cc2c',
            'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
    }
    async function getData() {
        const response = await fetch(furUrl, options);
        const result = await response.json();
        console.log(result[0]['url']);
    }
    
    //getData();
})

	