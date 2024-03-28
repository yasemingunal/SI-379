//import chroma from "chroma-js";



const quizButton = document.querySelector(".quizButton");
const learnButton = document.querySelector(".learnButton");
const welcomeDiv = document.querySelector("#buttonCont");
const learningDiv = document.querySelector("#learningContent");
const learningCards = document.querySelector("#learningCards");
const divEl = document.querySelector('#quiz');




document.addEventListener("DOMContentLoaded", () => {
    quizButton.addEventListener("click", () =>{
        anime({
            targets: '.circle',
            translateX: 5000,
            duration: 50000
        });
        //getCocktailData();

    });

    learnButton.addEventListener('click', () => {
        anime({
            targets: '.circle',
            translateX: 7000,
            duration: 40000
        });

        let initialQuestion = document.createElement('p');
        initialQuestion.classList.add('questionDisplay');
        initialQuestion.textContent = "Which drink would you like to learn more about?";
        let backButton = document.createElement("button");
        backButton.innerText = "Back";

        const card1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        card1.classList.add('cardStyle')
//     martiniLine1.style.stroke='black';

        setTimeout(() => {
            welcomeDiv.classList.add('disappear');
            learningContent.appendChild(initialQuestion);
            learningDiv.append(backButton)
            learningDiv.append(card1);
        }, 1500)
        
        backButton.addEventListener("click", () => {
            welcomeDiv.classList.remove('disappear');
            learningDiv.classList.add('disappear');
        });



    })
})

// BELOW IS FOR API CALLING
async function getCocktailData(){
    const res1 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`);
    obj1 = await res1.json();
    const res2 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=martini`);
    obj2 = await res2.json();
    const res3 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=negroni`);
    obj3 = await res3.json();
    const res4 = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito`);
    obj4 = await res4.json();

    margarita = obj1.drinks[0]
    martini = obj2.drinks[0]
    negroni = obj3.drinks[0]
    mojito = obj4.drinks[0]
    return [margarita, martini, negroni, mojito]
    //console.log(margarita, martini.strDrink, negroni.strDrink, mojito.strDrink);

}



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