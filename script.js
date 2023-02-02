'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //   console.log(dice);

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      // current0El.textContent = currentScore; // change later
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Holding dice functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // scores[`${activePlayer}`] += currentScore;
    // document.getElementById(`score--${activePlayer}`).textContent = scores`${activePlayer}`;
    // console.log(scores);

    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    //   console.log(scores);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// 1.
// Resetting dice functionality
btnNew.addEventListener('click', init);

// // 2.
// // Resetting dice functionality
// btnNew.addEventListener('click', () => {

//   // 1. Set players to be zero
//   score0El.textContent = 0;
//   score1El.textContent = 0;

//   // 2. Remove dark background from player winner
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   // activePlayer = document.querySelector(`.player--${activePlayer}`) === 0 ?1:0;
//   //   document
//   //     .querySelector(`.player--${activePlayer === 0 ? 1 : 0}`)
//   //     .classList.add('player--active');
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.add('player--active');

//   // 3. Set current to be zero
//   currentScore = 0;
//   for (let i = 0; i < scores.length; i++) scores[i] = 0;
//   //   scores[0]=0
//   //   scores[1]=0
//   document.getElementById(`current--${activePlayer}`).textContent =
//     currentScore;
//   // 4. Set playing to true
//   playing = true;
// });
