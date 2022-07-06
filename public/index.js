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
    .filter( pair => pair[1] != null)
}

getRandomDrinks()
.then(response => {
    return new Drink(response)
})
.then(res => console.log(res) )
.catch(err => console.error(err) )

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