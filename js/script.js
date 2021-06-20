"use strict";
// !! *********************** All Targeted Html Elements *******************************
// TODO: Players complete Sections 
const player1Sec = document.querySelector('.player1');
const player2Sec = document.querySelector(".player2");
// TODO: Targetting buttons 
const newGameBtn = document.querySelector('.reset-button');
const rollDiceBtn = document.querySelector('.roll-button');
const holdBtn = document.querySelector('.hold-button');
// TODO: Targetting current score 
const currScoreP1 = document.querySelector('.current-1');
const currScoreP2 = document.querySelector('.current-2');
// TODO: Targetting Total Score
const totalScoreP1 = document.querySelector('.tot-1');
const totalScoreP2 = document.querySelector('.tot-2');
// TODO: Targetting Dice Image
const diceImg = document.querySelector('.dice');

// !! ************************* Basic variables ************************
let curr = 0;
let activePlayer = 1;
let totalScore = [0, 0];
let stateOfGame = true;


// !! ********************* Manipulation Functions *********************** 
document.querySelector(`.PP-${activePlayer}`).style.fontWeight = '900';
// TODO: Switch Player Function
const switchPlayer = function () {
    curr = 0;
    document.querySelector(`.current-${activePlayer}`).textContent = curr;
    document.querySelector(`.PP-${activePlayer}`).style.removeProperty('font-weight');
    activePlayer = (activePlayer === 1 ? 2 : 1);
    document.querySelector(`.PP-${activePlayer}`).style.fontWeight = '900';
    player1Sec.classList.toggle('active-player');
    player2Sec.classList.toggle('active-player');
}
// TODO: logical to implement on Roll-Dice button
const onRollDice = function () {
    if (stateOfGame) {

        const randDiceNo = Math.trunc((Math.random() * 6) + 1);
        // console.log(randDiceNo);
        diceImg.classList.remove('hidden');
        diceImg.src = `img/dice-${randDiceNo}.png`;
        if (randDiceNo !== 1) {
            curr += randDiceNo;
            document.querySelector(`.current-${activePlayer}`).textContent = curr;
        } else {
            switchPlayer();
        }
    }
}
// TODO: logical to implement on Hold Button
const onHold = function () {
    if (stateOfGame) {
        totalScore[activePlayer - 1] += curr;
        document.querySelector(`.tot-${activePlayer}`).textContent = totalScore[activePlayer - 1];
        if (totalScore[activePlayer - 1] >= 50) {
            stateOfGame = false;
            document.querySelector(`.player${activePlayer}`).style.background = "black";
            document.querySelector(`.player${activePlayer} h3`).style.color = " #c7365f ";
            document.querySelector(`.tot-${activePlayer}`).textContent = "Winner";
            diceImg.classList.add('hidden');
            newGameBtn.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
        } else {
            switchPlayer();
        }
    }
}
// TODO: logical to implement on New-Game Button
const onNewGame = function () {
    curr = 0;
    totalScore[0] = 0;
    totalScore[1] = 0;
    currScoreP1.textContent = 0;
    currScoreP2.textContent = 0;
    totalScoreP1.textContent = 0;
    totalScoreP2.textContent = 0;
    newGameBtn.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
    document.querySelector(`.player${activePlayer}`).style.removeProperty("background");
    document.querySelector(`.player${activePlayer} h3`).style.removeProperty('color');
    diceImg.classList.add('hidden');
    stateOfGame = true;
    document.querySelector(`.PP-${activePlayer}`).style.removeProperty('font-weight');
    activePlayer = 1;
    document.querySelector(`.PP-${activePlayer}`).style.fontWeight = '900';
    if (player2Sec.classList.contains('active-player')) {
        player2Sec.classList.remove('active-player');
        player1Sec.classList.add('active-player');
    }
}
// TODO: On clicking Roll Dice Button
rollDiceBtn.addEventListener('click', onRollDice);
// TODO: On Clicking Hold Button
holdBtn.addEventListener('click', onHold);
// TODO: On clicking New Game Button
newGameBtn.addEventListener('click', onNewGame);