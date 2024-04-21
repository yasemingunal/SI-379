// const { random } = require("animejs");

// Piano variables:
const pianoDiv = document.querySelector('.piano');
const listenDiv = document.querySelector(".listenDiv")
const instructionsDiv = document.querySelector('.instructions')

const keys = ['C3', 'Db3', 'D3', 'Eb3', 'E3', "X", 'F3','Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'X'];
const keyNames = {'C': 'C3', 'D flat': 'Db3', 'D':'D3',
                    'E flat':'Eb3', 'E': 'E3', 'F':'F3', 'G flat': 'Gb3', 
                    'A flat': 'Ab3', 'A':'A3', 'B flat': 'Bb3', 'B': 'B3'}


//buttons:
const learnButton = document.querySelector("#learn");
const listenButton = document.querySelector("#listen");

//screens activated via buttons:
let learningDiv = document.querySelector(".learningDiv");
learningDiv.classList.add('disappear');
let clickedKey = null;
//functions & default interface setup:
function createPiano() {
    for (let i = 0; i<keys.length; i++){
        const newKey = document.createElement('div');
        newKey.setAttribute('id', keys[i]);
        newKey.classList.add('key');
        pianoDiv.append(newKey);

        newKey.addEventListener('click', () => {
            const note = newKey.id;
            playSound(note)
            newKey.style.border = "2px red dashed";
            newKey.classList.add('clicked');
            setTimeout(() => {
                newKey.style.border = 'black solid';
                newKey.classList.remove('clicked');
            }, 1000);
            clickedKey = note;
        })
    }
    function playSound(note){
        const sound = new Audio(`notes/piano-mp3_${note}.mp3`);
        sound.play();
    }
}
createPiano();
const keyDivs = document.querySelectorAll('.key')

// LEARN TO PLAY: 
learnButton.addEventListener('click', () => {
    learningDiv.classList.remove('disappear');
    learningDiv.classList.add('appear');

    let score = document.createElement("p");
    let instruction = document.createElement("p");
    let scoreNum = 0;

    for (let i=0; i<10; i++){
        let keysList = Object.keys(keyNames);
        let randomIndex = Math.floor(Math.random() * keysList.length)
        let quizNote = keyNames[randomIndex]
        console.log(quizNote);
        score.innerText = `Score: ${scoreNum}`;
        instruction.innerText = `Play a ${keysList[randomIndex]}`

        learningDiv.append(instruction);
        learningDiv.append(score);
        if (clickedKey === quizNote){
            scoreNum++;
            score.innerText = `Score: ${scoreNum}`;
            console.log('correct');
        } else {
            console.log('incorrect');
        }
    }
})


// LISTEN FEATURE: *this is completed*
listenButton.addEventListener("click", () => {
    let listenInstructions = document.createElement("h1");
    listenInstructions.innerHTML = "Select one of these pieces to listen to: ";
    instructionsDiv.append(listenInstructions);

    //get three song URLs, append them as buttons the listenDiv element 
    let furTitle = document.createElement("h3");
    let clareTitle = document.createElement("h3");
    let moonTitle = document.createElement("h3");

    let stopFurButton = document.createElement("button");
    let playFurButton = document.createElement("button");
    let stopClareButton = document.createElement("button");
    let playClareButton = document.createElement("button");
    let stopMoonButton = document.createElement("button");
    let playMoonButton = document.createElement("button");

    furTitle.innerHTML = "Fur Elise";
    furTitle.classList.add("songTitle");
    clareTitle.innerHTML = "Clare de Lune"
    clareTitle.classList.add("songTitle");
    moonTitle.innerHTML = "Moonlight Sonata"
    moonTitle.classList.add("songTitle");

    stopFurButton.innerHTML = 'Stop';
    playFurButton.innerHTML = "Play";
    stopClareButton.innerHTML = 'Stop';
    playClareButton.innerHTML = "Play";
    stopMoonButton.innerHTML = 'Stop';
    playMoonButton.innerHTML = "Play";

    listenDiv.append(furTitle);
    listenDiv.append(playFurButton);
    listenDiv.append(stopFurButton);
    listenDiv.append(clareTitle);
    listenDiv.append(playClareButton);
    listenDiv.append(stopClareButton);
    listenDiv.append(moonTitle);
    listenDiv.append(playMoonButton);
    listenDiv.append(stopMoonButton);

    stopFurButton.disabled = true;
    stopClareButton.disabled = true;
    stopMoonButton.disabled = true;


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
    }
    getData();
})

    playClareButton.addEventListener("click", () => {
        stopClareButton.disabled = false;
        playClareButton.disabled = true;
        const clareUrl = 'https://spotify23.p.rapidapi.com/tracks/?ids=7ep7SSfuXsJAOW8CFTSJ2Q';
        const options = {
	    method: 'GET',
	    headers: {
		'X-RapidAPI-Key': 'd8b3104eb9msh3ecd4325e9378b6p1b25e3jsn9fec64e3cc2c',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	    }
    };
        async function getClareData(){
            const resp = await fetch(clareUrl, options);
            const result2 = await resp.json();
            console.log(result2['tracks'])
            const clareLink = result2['tracks'][0]['preview_url'];
            const clareAud = document.createElement("audio");
            clareAud.src = clareLink;
            clareAud.play();
            stopClareButton.addEventListener("click", () => {
                clareAud.pause();
                stopClareButton.disabled = true;
                playClareButton.disabled = false;
            })
        }
        getClareData();

})

    playMoonButton.addEventListener("click", () => {
        stopMoonButton.disabled = false;
        playMoonButton.disabled = true;

        const moonUrl = 'https://spotify23.p.rapidapi.com/tracks/?ids=1j2M5ekufbxpzGYzuorgKt';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd8b3104eb9msh3ecd4325e9378b6p1b25e3jsn9fec64e3cc2c',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };
        async function getMoonData(){
            const resp2 = await fetch(moonUrl, options);
            const result3 = await resp2.json();
            console.log(result3['tracks'])
            const moonLink = result3['tracks'][0]['preview_url'];
            const moonAud = document.createElement("audio");
            moonAud.src = moonLink;
            moonAud.play();
            stopMoonButton.addEventListener("click", () => {
                moonAud.pause();
                stopMoonButton.disabled = true;
                playMoonButton.disabled = false;
            })
        }
        getMoonData();
    })
});