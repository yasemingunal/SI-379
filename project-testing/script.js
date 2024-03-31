//import chroma from "chroma-js";

const quizButton = document.querySelector(".quizButton");
const learnButton = document.querySelector(".learnButton");
const welcomeDiv = document.querySelector("#buttonCont");
const learningSpan = document.querySelector("#learningContent");
const learningCards = document.querySelector("#learningCards");
const divEl = document.querySelector('#quiz');
const backButton = document.createElement("button");
backButton.innerText = "Back";
const card1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");

const drinkList = document.querySelector("#drinkList");

function fetchAppendDrinks() {
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const drinkNames = []
    for (let i=0; i<4; i++){
        setTimeout(() => {
            fetch(apiUrl).then(response => response.json()).then(data => {
                if (data.drinks && data.drinks.length > 0) {
                    const drinkName = data.drinks[0].strDrink;
                    drinkNames.push(drinkName);
                    const drinkElement = document.createElement('div');
                    drinkElement.classList.add('cardStyle');
                    drinkElement.textContent = drinkName;
                    drinkList.appendChild(drinkElement);
                }
            });
        }, 2000 * i);
    }
    console.log(drinkNames)
    return drinkNames;
};

const question = document.querySelector("#initialQuestion");
const searchBar = document.querySelector("#searchBar");
searchBar.classList.add('disappear');
learnButton.addEventListener('click', () => {
    question.textContent = "Which drink would you like to learn more about?"; 
    searchBar.style.width = "300px";
    searchBar.classList.remove('disappear');
    searchBar.classList.add('appear');
    learningSpan.classList.add('questionDisplay');
    welcomeDiv.classList.add('disappear');
    fetchAppendDrinks();
})

backButton.addEventListener("click", () => {
    welcomeDiv.classList.remove('disappear');
    welcomeDiv.classList.add('h1');
    learningDiv.classList.add('disappear');
});


// BELOW IS FOR "LEARN TO MIX" PAGES:

// const animationDiv = document.querySelector("svg");
// const fillButton = document.querySelector("#fillGlass");
// function easeOutQuad(t){return t*(2-t);};
// function easeInQuad(t){ return t*t;};

// function createMartiniGlass(){
//     const martiniTriangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
//     martiniTriangle.style.stroke = "black";
//     martiniTriangle.style.fill = 'white';
//     martiniTriangle.style.strokeWidth = '2';
//     animationDiv.appendChild(martiniTriangle);

//     const martiniLine1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
//     const martiniLine2 = document.createElementNS("http://www.w3.org/2000/svg", "line");

//     martiniLine1.setAttribute('x1', "100");
//     martiniLine1.setAttribute('y1', "50");
//     martiniLine1.setAttribute('x2', "100");
//     martiniLine1.setAttribute('y2', "100");

//     martiniLine2.setAttribute('x1', "80");
//     martiniLine2.setAttribute('y1', "100");
//     martiniLine2.setAttribute('x2', "120");
//     martiniLine2.setAttribute('y2', "100");
    
//     martiniLine1.style.strokeWidth='2';
//     martiniLine2.style.strokeWidth='2';
//     martiniLine1.style.stroke='black';
//     martiniLine2.style.stroke='black';
//     animationDiv.appendChild(martiniLine1);
//     animationDiv.appendChild(martiniLine2);

//     const array = arr = [ [ 150,0 ], [ 50,0 ],[ 100,50 ], ];
    
//     for (let value of array) {
//       const point = animationDiv.createSVGPoint();
//       point.x = value[0];
//       point.y = value[1];
//       martiniTriangle.points.appendItem(point);
//     }
// }

// async function addGinToMartini(){
//     return new Promise((resolve) => {
//         const ginTriangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
//         ginTriangle.style.fill = '#e6e3e3';
//         ginTriangle.setAttribute('opacity', 0);

//         //
//         const array = arr = [ [ 140, 10 ], [ 60,10 ],[ 100,50 ], ];
//         //[ [ 125, 25 ], [ 75,25 ],[ 100,50 ], ]
//         for (let value of array) {
//             const point = animationDiv.createSVGPoint();
//             point.x = value[0];
//             point.y = value[1];
//             ginTriangle.points.appendItem(point);
//         }
//         animationDiv.appendChild(ginTriangle);

//         const animationStarted = Date.now();
//         function step(){
//             const pct = (Date.now() - animationStarted) / 2000;
//             const pos = easeInQuad(pct);
//             ginTriangle.setAttribute('opacity', pos);
//             if (pct < 1){
//                 requestAnimationFrame(step);
//             }
//         }
//         requestAnimationFrame(step);
//     });
// };

// createMartiniGlass();
// fillButton.addEventListener("click", () => {
//     addGinToMartini();
//     setTimeout(() => {
//         const olive = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//         olive.setAttribute('cx', "125");
//         olive.setAttribute('cy', "10");
//         olive.setAttribute('r', "5");
//         olive.setAttribute('fill', 'green');
//         animationDiv.append(olive);
//     }, 2000)

// });