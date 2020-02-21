const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.getElementById('overlay');
let missed = 0;
let phrases = [
    'a cat may look at a king',
    'atrike while the iron is hot',
    'aake it til you make it',
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
    for(i = 0; i < letters.length; i++){
        if(letters[i].textContent === buttonPressed.textContent){
            const matchingLetter = letters[i];
            matchingLetter.classList.add('show');
        }

    }
}

// Hide the start overlay
startButton.addEventListener('click', () => {
    if (event.target.textContent === 'Start Game'){
    startButton.style.visibility = "hidden";
    }
});

// add chosen class, disable clicked buttons
qwerty.addEventListener('click', () => {
    let button = event.target;
    if(button.tagName === 'BUTTON'){
        button.classList.add('chosen');
    }
    if(button.className === 'chosen'){
        button.disabled = true;
    }
    console.log(checkLetter(button));
});

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);