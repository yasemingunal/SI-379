
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
// Piano variables:
const pianoDiv = document.querySelector('.piano');
const listenDiv = document.querySelector(".listenDiv")
const instructionsDiv = document.querySelector('.instructions')

const keys = ['C3', 'Db3', 'D3', 'Eb3', 'E3', "X", 'F3','Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'X'];
const keyNames = {'C': 'C3', 'D flat': 'Db3', 'D':'D3',
                    'E flat':'Eb3', 'E': 'E3', 'F':'F3', 'G flat': 'Gb3', 
                    'A flat': 'Ab3', 'A':'A3', 'B flat': 'Bb3', 'B': 'B3'}

const keyNames2 = {'C3':'C', 'Db3':'D flat', 'D3':'D', 'Eb3':'E flat', 'E3':'E',
                    'F3':'F', 'Gb3':'G flat', 'Ab3': 'A flat', 'A3':'A', 'Bb3':'B flat', 'B3':'B'}


//buttons:
const learnButton = document.querySelector("#learn");
const listenButton = document.querySelector("#listen");
const freeplayButton = document.querySelector("#play");
const distortButton = document.querySelector("#distort");
const reverbButton = document.querySelector("#reverb");

//learnButton.classList.add('disappear');
listenButton.classList.add('disappear');
distortButton.classList.add('disappear');
reverbButton.classList.add('disappear');


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
    }
}
createPiano();

//distort the sound: 
function makeDistortionCurve(amount){
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI/180
    for (let i = 0; i<samples; i++){
        let x = i*2 / samples-1;
        curve[i] = (3+amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x))
    }
    return curve;
}
function distortSound(sound){
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(sound);
    const distortion = audioContext.createWaveShaper();
    distortion.curve = makeDistortionCurve(400);
    source.connect(distortion);
    distortion.connect(audioContext.destination);
    sound.play()
}

async function reverbSound(sound){
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioEl = new Audio(sound);
    const source = audioContext.createMediaElementSource(audioEl);
    const convolver = audioContext.createConvolver();

    const response = await fetch(sound);
    const arrayBuffer = await response.arrayBuffer();
    const decodedAudio = await audioContext.decodeAudioData(arrayBuffer);
    convolver.buffer = decodedAudio;
    source.connect(convolver);
    convolver.connect(audioContext.destination);
    audioEl.play();
}


function updateDistortion() {
    if (isDistorted){
        distortButton.innerHTML = "Distort Sound"
        isDistorted = false;
    } else{
        distortButton.innerHTML = "Back to Normal Sound"
        isDistorted = true;
    }
}

function updateReverb(){
    if (isReverbed){
        reverbButton.innerHTML = "Reverb Sound";
        isReverbed = false;
    } else {
        reverbButton.innerHTML = "Back to Normal Sound"
        isReverbed = true;
    }
}


distortButton.addEventListener("click", () => {
    updateDistortion();
})

reverbButton.addEventListener("click", () => {
    updateReverb();
});

const keyDivs = document.querySelectorAll('.key')
let isDistorted = false;
let isReverbed = false;

function playSound(note){
    const sound = new Audio(`notes/piano-mp3_${note}.mp3`);
    sound.play();
}
//normal sound: 
freeplayButton.addEventListener("click", () => {
    learningDiv.classList.remove('appear');
    learningDiv.classList.add('disappear');
    listenDiv.classList.remove('appear');
    listenDiv.classList.add('disappear');

    freeplayButton.classList.remove('appear');
    freeplayButton.classList.add('disappear');
    distortButton.classList.remove('disappear');
    distortButton.classList.add("appear");
    listenButton.classList.remove('disappear');
    listenButton.classList.add("appear");
    learnButton.classList.remove('disappear');
    learnButton.classList.add("appear");
    reverbButton.classList.remove('disappear');
    reverbButton.classList.add("appear");

    for (let key of keyDivs){
        key.removeEventListener('click', () => {
            //learned this concept on stackoverflow
        })
        key.addEventListener("click", () => {
            const note = key.id;
            const sound = new Audio(`notes/piano-mp3_${note}.mp3`);
            if (isDistorted){
                distortSound(sound);
            } else if (isReverbed){
                reverbSound(`notes/piano-mp3_${note}.mp3`);
            } else{
                playSound(note);
            }
            key.style.border = "2px red dashed";
            key.classList.add('clicked');
            setTimeout(() => {
                key.style.border = 'black solid';
                key.classList.remove('clicked');
            }, 1000);
            clickedKey = note;
        })
    }
});


// LEARN TO PLAY: 
learnButton.addEventListener('click', () => {
    // learnButton.classList.remove('appear');
    // learnButton.classList.add('disappear');
    learnButton.innerHTML = "Quiz me again";
    freeplayButton.classList.remove('disappear');
    freeplayButton.classList.add('appear');
    listenDiv.classList.remove('appear');
    listenDiv.classList.add('disappear');
    learningDiv.classList.remove('disappear');
    learningDiv.classList.add('appear');
    

    let score = document.createElement("p");
    let instruction = document.createElement("p");
    let feedback = document.createElement("p");
    let scoreNum = 0;

    let keysList = Object.keys(keyNames);
    let randomIndex = Math.floor(Math.random() * keysList.length);
    let quizNote = keysList[randomIndex];
    console.log("quizNote: ", quizNote);
    let correctKey = keyNames[quizNote];
    console.log("correctKey: ", correctKey)

    instruction.innerText = `Play a ${keysList[randomIndex]}`;
    feedback.innerText = "";

    learningDiv.append(instruction);
    learningDiv.append(feedback);
    for (let key of keyDivs){
        key.addEventListener('click', (ev) => {
            console.log(keyNames2[correctKey]);
            console.log(keyNames2[ev.target.id]);
            if (keyNames2[ev.target.id] === keyNames2[correctKey]){
                //console.log("clicked key: ", keyNames2[ev.target.id]);
                feedback.innerHTML = "Nice!"
                scoreNum++
                score.innerText = `Score: ${scoreNum}`;
                learningDiv.append(feedback);
                learningDiv.append(score);
            } else{
                feedback.innerHTML = `Not quite! That was a ${keyNames2[ev.target.id]}`;
                score.innerText = `Score: ${scoreNum}`;
                learningDiv.append(feedback);
                learningDiv.append(score);
            }
            learningDiv.append(feedback);
            learningDiv.append(score);
            quizNote = "";
            correctKey = "";
        })
    }

});


// LISTEN FEATURE:
listenButton.addEventListener("click", () => {
    freeplayButton.classList.remove('disappear');
    freeplayButton.classList.add('appear');
    listenDiv.classList.remove('disappear');
    listenDiv.classList.add('appear');
    learningDiv.classList.remove('appear')
    learningDiv.classList.add("disappear");
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