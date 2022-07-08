function getCards(){
    return document.querySelectorAll('div.drink')
}

const enableCards = getCards();
enableCards.forEach(element => {
    element.addEventListener('click', _ => {
        localStorage.setItem('latest',getDrinkName(element));
        //window.location.href = '/extended.html'
    })
})

function getDrinkName(target){
    return target.children[1].textContent
}

window.onload = () => {
    localStorage.removeItem('latest');
    console.log('localStorage for this website is reset');
}
