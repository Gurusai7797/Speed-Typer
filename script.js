const stBtn = document.getElementById('st-btn'),
  st = document.getElementById('settings');

const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
// const settingsBtn = document.getElementById('settings-btn');
// const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//List of words
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

// initialize word
let randomWord;
//init score
let score = 0;
//init time
let time = 10;

let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Focus on text on start

text.focus();

//start counting down
const timeInterval = setInterval(updateTime, 1000);

// update time

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';
  if (time === 0) {
    clearInterval(timeInterval);

    // end game
    gameOver();
  }
}

//Game over, show end screen

function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick='location.reload()'>Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

addWordToDom();

// Event Listeners

//Typing

text.addEventListener('input', (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 200;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 4;
    }
    updateTime();
  }
});

//setting btn
stBtn.addEventListener('click', () => {
  // if (st.classList.contains('hide')) {
  //   st.classList.remove('hide');
  // } else {
  //   st.classList.add('hide');
  // }
  // or use toggle()
  st.classList.toggle('hide');
});

//settings select

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
