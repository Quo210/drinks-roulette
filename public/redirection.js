function getCards(){
    return document.querySelectorAll('div.drink')
}

const enableCards = getCards();
enableCards.forEach(element => {
    element.addEventListener('click', _ => {
        const drinkName = getDrinkName(element);
        localStorage.setItem('latest',drinkName);
        storeLocally(drinkName);
        window.location.href = '/extended.html'
    })
})

function getDrinkName(target){
    return target.children[1].textContent
}

// window.onload = () => {
//     localStorage.removeItem('latest');
//     console.log('localStorage for this website is reset');
// }

function storeLocally(string){
    const memory = localStorage.getItem('memory');
    if(!memory){
        const newMemory = [string];
        localStorage.setItem('memory',
            JSON.stringify(newMemory)
        );
    } else {
        const oldMemory = JSON.parse(memory);
        if(oldMemory.includes(string)) console.log(`${string} exists.`);
        else oldMemory.push(string);
        localStorage.setItem('memory',JSON.stringify(oldMemory))
    }
}

renderHistory()

function renderHistory(){
    const pastDrinks = JSON.parse( localStorage.getItem('memory') );
    if(pastDrinks == null){
        emptyHistoryHandler()
        return
    }
    const target = document.querySelector('div.history');
    for (let i = 0; i < pastDrinks.length; i++){
        const a = document.createElement('a');
        a.classList.add('pastDrink');
        a.textContent = pastDrinks[i];
        a.addEventListener('click', () => {
            localStorage.setItem('latest', a.textContent);
            a.classList.add('rotate3d')
            setTimeout(()=>{
                window.location.href = '/extended.html'
            },2000)
        })
        target.appendChild(a)
    }
}

function emptyHistoryHandler(){
    const target = document.querySelector('div.history');
    target.classList.add('showNormal')
    target.innerHTML = '<h2> ...but it seems your history is empty </h2><br>This might be because this is your first time using the page or you deleted all the information in your browser recently.<hr class="moses">All the drinks in this page are saved locally in your computer.'
}