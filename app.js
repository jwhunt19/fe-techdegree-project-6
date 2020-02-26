const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.getElementById('overlay');
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

// Hide the start overlay
startButton.addEventListener('click', () => {
    if (event.target.textContent === 'Start Game'){
    startButton.style.visibility = "hidden";
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
    if(letterFound === null){
        missed += 1;
        const tries = document.getElementsByClassName('tries');
        for(i = 4; i >= 0; i--){
            if(tries[i].children[0].src.includes('images/liveHeart.png') === true){
                tries[i].children[0].src = 'images/lostHeart.png';
                break;
            }
        }
    }
});

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);