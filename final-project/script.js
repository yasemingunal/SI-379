
// Piano variables:
const pianoDiv = document.querySelector('.piano');
const listenDiv = document.querySelector(".listenDiv")
const instructionsDiv = document.querySelector('.instructions')

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
    let listenInstructions = document.createElement("h1");
    listenInstructions.innerHTML = "Select one of these pieces to listen to: ";
    instructionsDiv.append(listenInstructions);

    //get three song URLs, append them as buttons the listenDiv element 
    //let furButton = document.createElement("button");
    let furTitle = document.createElement("h3");
    let clareTitle = document.createElement("h3");

    let stopFurButton = document.createElement("button");
    let playFurButton = document.createElement("button");
    let stopClareButton = document.createElement("button");
    let playClareButton = document.createElement("button");

    furTitle.innerHTML = "Fur Elise";
    furTitle.classList.add("songTitle");
    clareTitle.innerHTML = "Clare de Lune"
    clareTitle.classList.add("songTitle");

    stopFurButton.innerHTML = 'Stop';
    playFurButton.innerHTML = "Play";
    stopClareButton.innerHTML = 'Stop';
    playClareButton.innerHTML = "Play";

    listenDiv.append(furTitle);
    listenDiv.append(playFurButton);
    listenDiv.append(stopFurButton);
    listenDiv.append(clareTitle);
    listenDiv.append(playClareButton);
    listenDiv.append(stopClareButton);

    stopFurButton.disabled = true;
    stopClareButton.disabled = true;


    playFurButton.addEventListener("click", () => {
        stopFurButton.disabled = false;
        playFurButton.disabled = true;
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
            const url = result[0]['url'];
            const furAud = document.createElement("audio");
            furAud.src = url;
            furAud.play();
            stopFurButton.addEventListener("click", () =>{
                furAud.pause();
                stopFurButton.disabled = true;
                playFurButton.disabled = false;
            })

        getData();
    }})

    playClareButton.addEventListener("click", () => {
        stopClareButton.disabled = false;
        playClareButton.disabled = true;
})
    
});