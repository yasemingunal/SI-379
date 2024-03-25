const searchInput = document.querySelector("#searchBar");
const searchInpVal = searchInput.value;

const searchButton = document.querySelector("#searchButton");

function getCocktailData(params){
    const finalVal = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${params}`).then(response => response.json());
    console.log(finalVal);
    return finalVal;
};

searchButton.addEventListener("click", () => {
    console.log(getCocktailData(searchInpVal));
});

searchInput.addEventListener("keydown", (ev) => {
    if (ev.key === 'Enter'){
        console.log(getCocktailData(searchInpVal));
    };
})




