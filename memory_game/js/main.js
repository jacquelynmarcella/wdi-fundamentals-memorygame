var cards = [
{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png"
}
];

var cardsInPlay = [];
var score = 0;

// Define variables we can reference in the code to keep the user informed of their score

var matchOutput = document.getElementById('match-output');
var scoreOutput = document.getElementById('score-output');

// Define buttons for reseting and creating a new game

var resetButton = document.getElementById('reset-game');
var newGameButton = document.getElementById('new-game');


// When user wins the game, make the shuffle button disappear and emphasize the new game button

var gameOver = function () {
	resetButton.className = 'gameover';
	newGameButton.className = 'suggestnewgame';
}

// Check score to see if the user has won game and if so, let them know they won

var checkForWin = function () {
	if (score >= 40) {
		console.log("User has won the game! Current score is " + score);
		matchOutput.textContent = "You won! New game?";
		gameOver();
	}
	else {
		console.log("User has current score of " + score)
	}
}

// To be nice and not let people get deep into the negatives

var noBelowZero = function () {
	if (score < 0) {
		score = 0;
		scoreOutput.textContent = score;
	}
}

// Check to see if cards match and update score accordingly, as well as notify user of match

var checkForMatch = function () {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		score += 10;
		scoreOutput.textContent = score;
		matchOutput.textContent = "You found a match!";
		console.log("User found a match");
		checkForWin();
	} else {
		score -= 5;
		scoreOutput.textContent = score;
		matchOutput.textContent = "Sorry, try again";
		console.log("User did not find a match");
		checkForWin();
		noBelowZero();
	}
};


var flipCard = function () {
	var cardId = this.getAttribute('data-id');
	cardsInPlay.push(cards[cardId].rank);
	console.log("User flipped " + cards[cardId].rank);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);

	this.setAttribute('src', cards[cardId].cardImage);

	if (cardsInPlay.length === 2) {
		checkForMatch();
	}
}

var createBoard = function () {
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);

		// Randomizes the card array

		cards.sort(function() 
			{return 0.5 - Math.random()});
	}
	
};

// Function that clears old board and shuffles the boards for a new round, but not a new game

var resetBoard = function () {
	cardsInPlay = [];
	for (var i = 0; i < cards.length; i++) {
		document.getElementById('game-board').innerHTML = '<p></p>';
	}
	matchOutput.textContent = "Deck shuffled";
	createBoard();
	console.log("User shuffled deck");
}

// Function that resets board and score for an entirely new game

var newGame = function () {
	cardsInPlay = [];
	score = 0;
	for (var i = 0; i < cards.length; i++) {
		document.getElementById('game-board').innerHTML = '<p></p>';
	}
	createBoard();
	resetButton.className = 'gameon';
	newGameButton.className = 'subtlenewgame';
	console.log("User started new game");
	matchOutput.textContent = "You have started a new game";
	scoreOutput.textContent = score;
}

// Listeners to call the functions to either shuffle or reset game

resetButton.addEventListener('click', resetBoard);
newGameButton.addEventListener('click', newGame);


createBoard();









