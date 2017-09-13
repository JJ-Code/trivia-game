//Game variables

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What is another name for Superman?", "What is Superman's only weakness?", "What is the name of Batman's secret identity?", "Just as Superman has been known by other names, so has Batman. For this question, can you find the one name that has NOT been traditionally associated with Batman?", "Batman protects what city?", "How did Spiderman get his superpowers?", "This superhero's supertools included bullet-proof bracelets and a magic lasso.  Who is she?", "Besides Alan Scott and Hal Jordan, The Green Lantern has also used this name as a secret identity?"];

var answerArray = [["The Red Redeemer", "The Masked Avenger", "The Caped Crusader", "The Man of Steel"], ["Samsonite","Cosmonite","Kryptonite","Plutonite"], ["Bruce Devon", "Bruce Wayne", "Bruce Davis", "Devon Bruce"], ["World/'s Greatest Vigilante","The Dark Knight","The Caped Crusader","World/'s Greatest Detective"], ["Chicago", "Metropolis", "Gotham City", "New York City"], ["He was bombarded by cosmic rays.","He was born with his powers.","He was caught in a chemical explosion.","He was bitten by a radioactive spider."], ["Wonder Woman", "Super Girl", "Catwoman", "Elastigirl"], ["Barry Allen","Kyle Rayner","John Dickering","Britt Reid"]];

var correctAnswers = ["D. The Man of Steel", "C. Kryptonite", "B. Bruce Wayne", "D. World's Greatest Detective", "C. Gotham City", "B. He was born with his powers.", "A. Wonder Woman", "B. Kyle Rayner"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

var correctImage = '<image class="result-image" src="assets/images/pow.png">'
var incorrectImage = '<image class="result-image" src="assets/images/splat.jpg">'
var timeOutImage =  '<image class="result-image" src="assets/images/zero-time.jpg">'








$(document).ready(function() {
// Create a function that creates the start button and initial screen

function startingScreen() {
	startScreen = "<p><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".gameArea").html(startScreen);
}

startingScreen();

//Create a function, generateHTML(), that is triggered by the start button.

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // don't count the originial click allow answers to be selected disgards the start click
	generateHTML();
	timerWrapper();
}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//Answered Correctly
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		clearInterval(theClock);
		generateWin();
	}
	else {
		clearInterval(theClock);
		generateLoss();
	}
});

$("body").on("click", ".reset-button", function(event){
	resetGame();
});
});  //  Closes main function of game

//Function to keep track of Timeouts and what happens when there is a timeout
function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML =
	//Timer
	"<p>Time Remaining: <span class='timer'>" + counter + "</span></p>" +
	//Correct Answer Solution
	"<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" +
	timeOutImage; 	//Image of when answer is timeout

	$(".gameArea").html(gameHTML); //continues the game
	setTimeout(wait, 4500);
}

//Function to keep track of correct answers and what happens when there is correct
function generateWin() {
	correctTally++;
	gameHTML =
	//Timer
	"<p>Time Remaining: <span class='timer'>" + counter + "</span></p>" +
//Correct Answer Solution
	"<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" +
//Image of when answer is correct
	correctImage;

	$(".gameArea").html(gameHTML); //continues the game
	setTimeout(wait, 4500);
}
//Function to keep track of incorrect answers and what happens when there is incorrect
function generateLoss() {
	incorrectTally++;
	gameHTML =
	//Timer
	"<p>Time Remaining: <span class='timer'>" + counter + "</span></p>" +
	//Correct Answer Solution
	"<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] +"</p>" +
//Image of when answer is incorrect
	incorrectImage;

	$(".gameArea").html(gameHTML); //continues the game
	setTimeout(wait, 4500);
}
function generateHTML() {
	gameHTML =
	//Timer
	"<p>Time Remaining: <span class='timer'>30</span></p> <p class='text-center'>" +
	//Question to be displayed
	questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".gameArea").html(gameHTML);
}

function finalScreen() {
	gameHTML =
		//Timer
	"<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" +
	//Results
	"<p class='text-center'>Were you a superhero in this trivia or a zero?" + "</p>" +
	"<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" +
	"<p>Wrong Answers: " + incorrectTally + "</p>" +
	"<p>Unanswered: " + unansweredTally + "</p>" +
	//Reset trivia game
	"<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".gameArea").html(gameHTML);
}

//Reset game function
function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

//Timer
function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}
