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

//init word
let words;

//fetching the words from api

async function fetchWord() {
  const res = await fetch('https://random-word-api.herokuapp.com/word');
  const data = await res.json();
  words = data[0];
  word.innerHTML = words;
}

fetchWord();

//init score
let score = 0;

//update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
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

// Event Listeners

text.addEventListener('input', (e) => {
  const insertedText = e.target.value;
  if (insertedText === words) {
    fetchWord();
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
