const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase')
const startButton = document.getElementById('overlay')

let missed = 0;
let phrases = [
    'A cat may look at a king',
    'Strike while the iron is hot',
    'Fake it til you make it',
    'Zeal without knowledge is fire without light',
    'Marry in haste repent at leisure'
]

// Hides the start overlay
startButton.addEventListener('click', () => {
    if (event.target.textContent === 'Start Game'){
    startButton.style.visibility = "hidden";
    console.log('test');
    }
});

