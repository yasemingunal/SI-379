//import chroma from "chroma-js";

const quizButton = document.querySelector(".quizButton");
const learnButton = document.querySelector('.learnButton');
learnButton.classList.add("disappear");
const title = document.querySelector("#title");
const learningSpan = document.querySelector("#learningContent");
const learningCards = document.querySelector("#learningCards");
const divEl = document.querySelector('#quiz');
const card1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
const drinkList = document.querySelector("#drinkList");
const question = document.querySelector("#initialQuestion");
question.textContent = "Which drink would you like to learn more about?";
const searchBar = document.querySelector("#searchBar");
searchBar.style.width = "300px";

function easeOutQuad(t){return t*(2-t);};
function easeInQuad(t){ return t*t;};
function animate(el){
    const animationStarted = Date.now();
    function step(){
        const pct = (Date.now() - animationStarted) / 1000;
        const pos = easeInQuad(pct);
        el.style.opacity = pos;
        if (pct < 1){
            requestAnimationFrame(step);
        }
    }
    step();
} 

function fetchAppendDrinks() {
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    
    for (let i=0; i<4; i++){
        setTimeout(() => {
            fetch(apiUrl).then(response => response.json()).then(data => {
                if (data.drinks && data.drinks.length > 0) {
                    //console.log(data.drinks);
                    let drinkTitle = document.createElement("p");
                    let drinkImg = document.createElement("img");
                    drinkImg.classList.add("drinkThumb");
                    drinkImg.src = data.drinks[0].strDrinkThumb;
                    drinkTitle.classList.add('drinkName');
                    drinkTitle.innerText = data.drinks[0].strDrink;
                    const drinkElement = document.createElement('div');
                    drinkElement.classList.add('cardStyle');
                    drinkElement.append(drinkTitle);
                    drinkElement.append(drinkImg);
                    drinkElement.setAttribute('id', 'randDrink');
                    animate(drinkElement);
                    animate(drinkImg);
                    drinkList.appendChild(drinkElement);
                    let learnMoreButton = document.createElement('button');
                    learnMoreButton.innerText = "Learn More";
                    learnMoreButton.classList.add('button');
                    learnMoreButton.setAttribute('id', 'learnMoreBut');
                    drinkElement.append(learnMoreButton);
                }
            });
        }, 2000 * i);
    }
};

searchBar.addEventListener("keydown", (ev) => {
    if (ev.key === 'Enter'){
        drinkList.classList.add('disappear'); 
        const searchedDrink = searchBar.value;
        let ingredientsList = [];
        searchBar.value = "";
        const searchAPIUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchedDrink}`;
        const drinkElement = document.createElement('div');
        fetch(searchAPIUrl).then(response => response.json()).then(data =>{
            if (data.drinks){
                console.log(data.drinks);
                drinkElement.classList.add('cardStyle');
                let drinkTitle = document.createElement("p");
                drinkTitle.classList.add('drinkName')
                drinkTitle.innerText = data.drinks[0].strDrink;
                drinkElement.append(drinkTitle);
                let drinkImg = document.createElement("img");
                drinkImg.classList.add("drinkThumb");
                drinkImg.src = data.drinks[0].strDrinkThumb;
                drinkElement.append(drinkImg);
                drinkElement.setAttribute('id', 'randDrink');
                animate(drinkElement);
                animate(drinkImg);
                // ingredientsList.push(data.drinks[0].strIngredient1, data.drinks[0].strIngredient2, data.drinks[0].strIngredient3,
                //     data.drinks[0].strIngredient4);
                // }
                // for (let item in ingredientsList){
                //     let newLi = document.createElement('li');
                //     if (ingredientsList[item]){
                //         newLi.innerText = ingredientsList[item];
                //         drinkElement.append(newLi)
                //     }
                // };
                let learnMoreButton = document.createElement('button');
                learnMoreButton.innerText = "Learn More";
                learnMoreButton.classList.add('button');
                learnMoreButton.setAttribute('id', 'learnMoreBut');
                drinkElement.append(learnMoreButton);
                //drinkElement.append(ingredientsList);
                learningSpan.append(drinkElement);
            };
        });
    }});

fetchAppendDrinks();


// BUTTON FUNCTIONALITY:
quizButton.addEventListener("click", () => {
    learnButton.classList.remove("disappear");
    learnButton.classList.add("appear");
    quizButton.classList.remove('appear');
    quizButton.classList.add('disappear');
    learningSpan.classList.remove("appear");
    learningSpan.classList.add("disappear");
    title.classList.remove("disappear");
    title.classList.add("appear");
    title.innerText = "Select Quiz Settings:";

});

learnButton.addEventListener("click", () => {
    learnButton.classList.add("disappear");
    learnButton.classList.remove("appear");
    quizButton.classList.remove('disappear');
    quizButton.classList.add('appear');
    learningSpan.classList.remove('disappear');
    learningSpan.classList.add('appear');
    title.innerText = "Welcome!"
});