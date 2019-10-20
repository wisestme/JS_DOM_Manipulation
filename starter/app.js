/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScores, activePlayer, currentScore, winner;
scores = [0, 0];
roundScores = 0;
activePlayer = 0;

let currentScoreAggregate = 0;

function currentScoreDOM() {
	currentScore = document.querySelector(`#current-${activePlayer}`);
}

/*****************************************************************
* SET WINNING SCORE */
let winningScore = document.querySelector('#winning-score');

function nowWinScore () {
	
	return winningScore.value;
}
winningScore.addEventListener('change', nowWinScore)


console.log(winningScore.value);

/*****************************************************************
* WINNING SCORE MODAL
*/
let okButton = document.querySelector('#ok');
let modal = document.querySelector('.modal');

okButton.addEventListener('click', function() {
	modal.style.display = 'none';
})

function showModal () {
	modal.style.display = 'block';
}

// Turn Changer
function switchTurn() {
	let playerPanel0 = document.querySelector(`.player-0-panel`);
	let playerPanel1 = document.querySelector(`.player-1-panel`);
	playerPanel0.classList.toggle('active');
	playerPanel1.classList.toggle('active');
	activePlayer = 1 - activePlayer;
}

function resetCurrentScores() {
	currentScore.textContent = 0;
	currentScoreAggregate = 0;
}


//let diceRoller = document.querySelector('.btn-roll');
let rollButton = document.querySelector('.btn-roll');

rollButton.addEventListener('click', function() {
	nowWinScore();
	if(winningScore.value <= 0) {
		showModal();
	} else {
		let dice = Math.floor(Math.random() * 6) + 1;

	// Display corresponding dice image
	let diceImage = document.querySelector('.dice');
	diceImage.setAttribute('src', `dice-${dice}.png`);
	diceImage.style.display = 'block';

	// display corresponding current score
	//currentScore = document.querySelector(`#current-${activePlayer}`);
	currentScoreDOM();
	currentScore.textContent = dice;

	// get value of current score
	currentScoreValue = parseInt(currentScore.textContent);

	// increment the value of round score and display it
	if(dice !== 1) {
		currentScoreAggregate += currentScoreValue;
		currentScore.textContent = currentScoreAggregate;
	} else {
		//let playerPanel = document.getElementsByClassName(`panel`);
		//console.log(playerPanel);
		switchTurn();
		resetCurrentScores();
	}
	}
	
});

// Use hold button to add current score to player score
let holdButton = document.querySelector('.btn-hold');

holdButton.addEventListener('click', function(){
	if(winningScore.value <= 0) {
		showModal();
	} else {
		let playerScoreDOM = document.querySelector(`#score-${activePlayer}`);
	let playerScore = parseInt(playerScoreDOM.textContent);
	
	currentScoreDOM();
	playerScore += parseInt(currentScore.textContent);
	playerScoreDOM.textContent = playerScore;
	switchTurn();
	resetCurrentScores();

	if(playerScore >= winningScore.value) {
		switchTurn();
		winner = `Player ${activePlayer + 1}`;
		console.log(winner);

		let player = document.querySelector(`#name-${activePlayer}`);
		player.classList.add('winner');
		player.textContent = 'Winner';

		holdButton.style.display = 'none';
		rollButton.style.display = 'none';

		let diceImage = document.querySelector('.dice');
		diceImage.style.display = 'none';
	}
	}
	
})


// USE NEW BUTTON TO RESTART
let newButton = document.querySelector('.btn-new');

newButton.addEventListener('click', function() {
	let playerScoreDOM = document.querySelector(`#score-${activePlayer}`);
	let playerScore = parseInt(playerScoreDOM.textContent);
	
	
		let playerName = document.querySelector('.winner');
		playerName.classList.remove('winner');
	

	resetCurrentScores();

	let allPlayerScore = document.querySelectorAll('.player-score');
	console.log(allPlayerScore);

	allPlayerScore.forEach(function(allPlayerScore) {
		allPlayerScore.textContent = 0;
	});
	activePlayer = 0;
	let playerPanel0 = document.querySelector(`.player-0-panel`);
	let playerPanel1 = document.querySelector(`.player-1-panel`);
	playerPanel0.classList.add('active');
	playerPanel1.classList.remove('active');
	document.querySelector(`#name-0`).textContent = `Player 1`;
	document.querySelector(`#name-1`).textContent = `Player 2`;
	document.querySelector(`#name-0`).classList.add('player-name');
	document.querySelector(`#name-1`).classList.add('player-name');
	
	

	
	
		let diceImage = document.querySelector('.dice');
		diceImage.style.display = 'none';
// Display game controls
		holdButton.style.display = 'block';
		rollButton.style.display = 'block';
})



