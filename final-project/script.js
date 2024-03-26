//document elements:
const searchInput = document.querySelector("#searchBar");
const searchInpVal = searchInput.value;
const rotatingBottle = document.querySelector(".rotatingDrink");
const searchButton = document.querySelector("#searchButton");


//rotate the bottle animation: 
function rotateBottle(){
    setInterval(() => { 
        rotatingBottle.style.WebkitTransitionDuration="4s";
        rotatingBottle.style.WebkitTransform='rotate(30deg)';
    }, 500)
};

rotateBottle();


// function getCocktailData(params){
//     const finalVal = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${params}`).then(response => response.json());
//     console.log(finalVal);
//     searchInpVal.value = ""; // clear search input 
//     return finalVal;
// };

// searchButton.addEventListener("click", () => {
//     console.log(searchInpVal)
//     console.log(getCocktailData(searchInpVal));
// });

// searchInput.addEventListener("keydown", (ev) => {
//     if (ev.key === 'Enter'){
//         console.log(getCocktailData(searchInpVal));
//     };
//     searchInpVal.value = ""; // clear search input 
// })




