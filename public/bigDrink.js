function getSpecificDrink(string){
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${string}`)
    .then(res => res.json())
    .then(data => {
        return data.drinks[0]
    })
    .catch(error =>{
        if(error) console.log(error)
    })
}

function entrify(obj){
    return Object.entries(obj)
}

function getbyReg(entries,regexp){
    return entries
    .filter( pair => regexp.test(pair[0]) )
    .filter(arr => {
        if(arr[1] != null) return arr[1]
    })
    .map(pair => pair[1])
}

class Drink{
    constructor(obj){
        this['thumbnail'] = obj.strDrinkThumb,
        this['name'] = obj.strDrink,
        this['ingredients'] = getbyReg(entrify(obj),/strIngredient/),
        this['glass'] = obj.strGlass,
        this['alcohol'] = obj.strAlcoholic
    }
}

class fullDrink extends Drink{
    constructor(obj) {
        super(obj);
        this.measures = getbyReg(entrify(obj),/strMeasure/),
        this.instructions = obj.strInstructions
    }
}

function makeFullDrink(){
    return getSpecificDrink(localStorage.getItem('latest')).then(res => new fullDrink(res))
}

// window.onload = () => {
//     getSpecificDrink(localStorage.getItem('latest')).then(res => console.log(new fullDrink(res)))
// }

function setPress(name,thumbnail,glass,alcoholic){
    const h1 = document.querySelector('h1.drinkName');
    const img = document.querySelector('img');
    const rGlass = document.querySelector('p.glass')
    const type = document.querySelector('p.type')
    h1.textContent = name;
    img.src = thumbnail;
    rGlass.textContent += glass
    type.textContent = `This beverage is ${alcoholic}`
}

function setIngredients(ingredients,measures){
    const ol = document.querySelector('section.ingredients ol');
    for (let i = 0; i < ingredients.length; i++){
        const li = document.createElement('li');
        li.textContent = `${ingredients[i]}: ${measures[i]}`;
        ol.appendChild(li);
    }
}

function setInstructions(string){
    const article = document.querySelector('article.instructions');
    article.innerHTML = string.split('.').join('<br>')
}

function serveDrink(){
    makeFullDrink().then(drink => {
        setPress(drink.name,drink.thumbnail,drink.glass,drink.alcohol)
        setIngredients(drink.ingredients,drink.measures);
        setInstructions(drink.instructions)
    })
}

serveDrink()