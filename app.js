const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
let missed = 0;
let phrases = [
    'a cat may look at a king',
    'strike while the iron is hot',
    'fake it til you make it',
    'zeal without knowledge is fire without light',
    'marry in haste repent at leisure'
];

// Take array of strings, select random index and split into an array of characters
function getRandomPhraseAsArray(array){
    let randomArrayIndex = array[Math.floor(Math.random() * array.length)];
    let splitArray = [...randomArrayIndex];
    return splitArray;
}

// Take phrase characters array, add to list item with 'letter' class unless its a space
function addPhraseToDisplay(array){
    for(i = 0; i < array.length; i++){
        const node = document.createElement('LI');
        const textnode = document.createTextNode(array[i]);
        const ul = document.getElementById('phrase').firstElementChild;
        if (array[i] !== ' '){
            node.classList.add('letter');
        } else if (array[i] == ' '){
            node.classList.add('space');
        }
        node.appendChild(textnode);
        ul.appendChild(node);
    }
}

// Check if parameter matches list item with 'letter' class
function checkLetter(buttonPressed){
    const letters = document.getElementsByClassName('letter');
    let matchingLetter = null;
    for(i = 0; i < letters.length; i++){
        if(letters[i].textContent === buttonPressed.textContent){
            matchingLetter = letters[i];
            matchingLetter.classList.add('show');
        }
    }
    return matchingLetter;
}

// Check if game has been won
function checkWin(){
    const show = document.getElementsByClassName('show');
    const letters = document.getElementsByClassName('letter');
    let gameOver = false;
    if(show.length === letters.length){
        overlay.classList.add('win');
        overlay.children[0].textContent = 'YOU WIN';
        overlay.children[1].textContent = 'Try Again';
        overlay.style.visibility = "visible";
    } else if (missed >= 5) {
        overlay.classList.add('lose');
        overlay.children[0].textContent = 'YOU LOSE';
        overlay.children[1].textContent = 'Try Again';
        overlay.style.visibility = "visible";
    }

}



// Hide the start overlay, reset game if try again is chosen
overlay.addEventListener('click', () => {
    if (event.target.textContent === 'Start Game'){
        overlay.style.visibility = "hidden";
    }
    if (event.target.textContent === 'Try Again'){
        const phraseDiv = document.getElementById('phrase');
        phraseDiv.removeChild(phraseDiv.firstElementChild);
        phraseDiv.appendChild(document.createElement('UL'));
        let phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
        const chosen = document.getElementsByClassName('chosen');
        for(i = chosen.length-1; i >= 0; i--){
            chosen[i].disabled = false;
            chosen[i].classList.remove('chosen');
        }
        missed = 0;
        const tries = document.getElementsByClassName('tries');
        for(i = 4; i >= 0; i--){
            if(tries[i].children[0].src.includes('images/lostHeart.png') === true){
                tries[i].children[0].src = 'images/liveHeart.png';
            }
        
        }
        overlay.style.visibility = "hidden";
        overlay.classList.remove('win');
        overlay.classList.remove('lose');
    }
});



// add chosen class, disable clicked button, if null remove life 
qwerty.addEventListener('click', () => {
    let button = event.target;
    if(button.tagName === 'BUTTON'){
        button.classList.add('chosen');
    }
    if(button.className === 'chosen'){
        button.disabled = true;
    }
    const letterFound = checkLetter(button);
    if(button.tagName === 'BUTTON' && letterFound === null){
        missed += 1;
        const tries = document.getElementsByClassName('tries');
        for(i = 4; i >= 0; i--){
            if(tries[i].children[0].src.includes('images/liveHeart.png') === true){
                tries[i].children[0].src = 'images/lostHeart.png';
                break;
            }
        }
    }
    checkWin();
});

let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);