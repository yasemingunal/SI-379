
const pianoDiv = document.querySelector('.piano');

// document.addEventListener("DOMContentLoaded", function() {
//     const pianoDiv = document.querySelector('.piano');
//     createPiano();
// });

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];
const keys = ['C', 'C#', 'D', 'D#', 'E', "X", 'F','F#', 'G', 'G#', 'A', 'A#', 'B', 'X'];


function createPiano() {
    for (let i = 0; i<keys.length; i++){
        const newKey = document.createElement('div');
        newKey.setAttribute('id', keys[i]);
        newKey.classList.add('key');
        pianoDiv.append(newKey);
    }
}

createPiano();

const keyDivs = document.querySelectorAll('.key')
for (let key of keyDivs){
    key.addEventListener("click", () => {
        key.classList.add('clicked');
        setTimeout(() => {
            key.classList.remove('clicked')}, 800);

    console.log("clicked ", key.id)});
}