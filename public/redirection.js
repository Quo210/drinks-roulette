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
