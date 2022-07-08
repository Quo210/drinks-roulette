// www.thecocktaildb.com/api/json/v1/1/random.php RANDOM 

/*
For the values on the initial presentation card choosing:
- Preview = strDrinkThumb
- drink name = strDrink
- first 2 ingredients = strIngredient1, ...
- serving glass = strGlass
- alcoholic = strAlcoholic
*/

function getRandomDrinks(){
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
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

function getIngredients(entries){
    return entries
    .filter( pair => /strIngredient/.test(pair[0]) )
    .filter(arr => {
        if(arr[1] != null) return arr[1]
    })
    .map(pair => pair[1])
}



class Drink{
    constructor(obj){
        this['thumbnail'] = obj.strDrinkThumb,
        this['name'] = obj.strDrink,
        this['ingredients'] = getIngredients(entrify(obj)),
        this['glass'] = obj.strGlass,
        this['alcohol'] = obj.strAlcoholic,
        this.__verbose = obj
    }
}

function getCardChildren(target){
    const elements = target.children; /* img,name,ingredients,glass,type */
    const [img,name,ingredients,glass,type] = [elements[0],elements[1],elements[2],elements[3],elements[4]];
    return {img,name,ingredients,glass,type} 
}

function buildCard(target){
    const children = getCardChildren(target);
    getRandomDrinks()
    .then(response => {
        return new Drink(response)
    })
    .then(drink => {
        children.img.src = drink.thumbnail;
        children.name.textContent = drink.name;
        children.ingredients.innerHTML = '<h3>Ingredients:</h3>';
        for(let i = 0; i < drink.ingredients.length; i++){
            const li = document.createElement('li');
            li.textContent = drink.ingredients[i]
            children.ingredients.appendChild(li)
        }
        children.glass.textContent += `${drink.glass}`;
        children.type.textContent += `${drink.alcohol}`;
    })
    .catch(err => console.error(err) )
}

function getDrinkDiv(num){
    return document.querySelector(`[data-key="${num}"]`)
}

function tripleCall(){
    const f = getDrinkDiv; // In the name of DRY
    const divs = [f(1),f(2),f(3)];
    divs.forEach(div => buildCard(div))
}

tripleCall()


