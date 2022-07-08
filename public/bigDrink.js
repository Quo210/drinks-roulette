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
        this.measures = getbyReg(entrify(obj),/strMeasure/)
    }
}

window.onload = () => {
    getSpecificDrink(localStorage.getItem('latest')).then(res => console.log(new fullDrink(res)))
}