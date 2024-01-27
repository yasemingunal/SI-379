let score = 0;
const scoreText = document.querySelector("#score");

// Write code that *every second*, picks a random unwhacked hole (use getRandomUnwhackedHoleId)
// and adds the "needs-whack" class
const interval = setInterval(() => {
    const randomHole = document.getElementById(getRandomUnwhackedHoleId())
    randomHole.classList.add('needs-whack');
}, 1000);

for(const id of getAllHoleIds()) {
    const elemById = document.getElementById(id)
    elemById.addEventListener("click", () => {
        if (elemById.classList.contains("needs-whack")){
            elemById.classList.remove('needs-whack');
            elemById.classList.add('animating-whack');
            setTimeout(() => {
                elemById.classList.remove('animating-whack')}, 500);
            score++;
            scoreText.innerText = score;
            if (score > 46){
                clearInterval(interval);
            }
        }        
        }
    )
    // console.log(`TODO: Add a click listener for #${id} here`);
}

/**
 * @returns a random ID of a hole that is "idle" (doesn't currently contain a mole/buckeye). If there are none, returns null
 */
function getRandomUnwhackedHoleId() {
    const inactiveHoles = document.querySelectorAll('.hole:not(.needs-whack)');  // Selects elements that have class "hole" but **not** "needs-whack"

    if(inactiveHoles.length === 0) {
        return null;
    } else {
        const randomIndex = Math.floor(Math.random() * inactiveHoles.length);
        return inactiveHoles[randomIndex].getAttribute('id');
    }
}

/**
 * @returns a list of IDs (as strings) for each hole DOM element
 */
function getAllHoleIds() {
    const allHoles = document.querySelectorAll('.hole'); 
    const ids = [];
    for(const hole of allHoles) {
        ids.push(hole.getAttribute('id'));
    }
    return ids;
}
