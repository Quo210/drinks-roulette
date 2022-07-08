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

function getIngredients(entries){
    const a = entries
    .filter( pair => /strIngredient/.test(pair[0]) )
    return Object.values(a).filter(val => val != null)
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

class fullDrink extends Drink{
    constructor(obj) {
        super(obj);
        this.__verbose
    }
}

window.onload = () => {
    getSpecificDrink(localStorage.getItem('latest')).then(res => console.log(res))
}