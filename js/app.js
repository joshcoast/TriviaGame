// load event listeners

window.onload = function () {
	$("#startScreen").click(game.startGame);
	$("#choiceList").on("click", "li", game.gameChoice);
};

// Question Objects

var allQuestions = [
	q0 = {
		image: "roseanne.jpg",
		question: "The plaid-and-knit-embellished bridgewater in this title character's home could use a little love.",
		answers: ["Blossom", "Roseanne", "Daria", "Martin"],
		realAnswer: "Roseanne",
	},
	q1 = {
		image: "that-70s-show.jpg",
		question: "This chartreuse number made a statement in the living room of this era-appropriate sitcom.",
		answers: ["The Wonder Years", "Freaks & Geeks", "That '70s Show", "Full House"],
		realAnswer: "That '70s Show",
	},
	q2 = {
		image: "friends.jpg",
		question: "One character on this show spent almost an entire episode on a plush white sofa while on hold for days with her phone company.",
		answers: ["Growing Pains", "Friends", "Seinfeld", "Ugly Betty"],
		realAnswer: "Friends",
	},
];

var numberOfQuestions = allQuestions.length;
var questionNumber;
var wins = 0;
var losses = 0;
var gameOver = false;

//timer
var clockRunning = false;
var intervalId;
var timerSet = 5;

// Reusable elements
var $messageEl = $(".message");
var $choiceListEl = $("#choiceList ul");
var picPath = "./img/questions/";

game = {
	startGame: function () {
		wins = 0;
		losses = 0;
		gameOver = false;
		questionNumber = 0;
		stopwatch.reset;
		$choiceListEl.empty();
		$("#startScreen").fadeOut();
		game.buildQuestion(allQuestions[questionNumber]);
	},
	buildQuestion: function (questionObject) {
		$(".tv-show img").attr("src", picPath + questionObject.image);
		$(".question p").text(questionObject.question);
		$choiceListEl.empty();

		// create list loop
		for (var i = 0; i < questionObject.answers.length; i++) {
			var listItem = $("<li>");
			listItem.text(questionObject.answers[i]);
			listItem.attr("data-answer", questionObject.answers[i]);
			$choiceListEl.append(listItem);
		}
	},
	gameChoice: function () {
		if (!gameOver) {
			userChoice = $(this).data('answer');
			realAnswer = allQuestions[questionNumber].realAnswer;
			console.log(userChoice);
			console.log(realAnswer);
			questionNumber++;
			console.log("---- Click Event Triggered ---");
			if (userChoice === realAnswer) {
				game.win("<p><strong>Correct! </strong><br><span uk-icon='happy'></span></p>");
			} else {
				game.loss('<p><strong>Nope!</strong><br>Correct answer was:<br><strong>' + realAnswer + '</p>');
			}
		}
	},
	loss: function (lossMessage) {
		losses++;
		$messageEl.html(lossMessage);
		$messageEl.addClass("show").removeClass("hide");

		setTimeout(function () {
			$messageEl.addClass("hide").removeClass("show");
			if (questionNumber === numberOfQuestions) {
				console.log("game over");
				console.log("Right: " + wins);
				console.log("Wrong: " + losses);
				gameOver = true;
			} else {
				game.buildQuestion(allQuestions[questionNumber]);
			}
		}, 3000);
	},
	win: function (winMessage) {
		wins++;
		$messageEl.html(winMessage);
		$messageEl.addClass("show").removeClass("hide");
		setTimeout(function () {
			$messageEl.addClass("hide").removeClass("show");
			if (questionNumber === numberOfQuestions) {
				console.log("game over");
				console.log("Right: " + wins);
				console.log("Wrong: " + losses);
				gameOver = true;
			} else {
				console.log("questionNumber= " + questionNumber);
				console.log("numberOfQuestions= " + numberOfQuestions);
				console.log("allQuestions[questionNumber]= " + allQuestions[questionNumber])
				game.buildQuestion(allQuestions[questionNumber]);
			}
		}, 3000);
	}
}

var stopwatch = {
	time: timerSet,

	reset: function () {
		stopwatch.time = timerSet;
		$('#timerNumber').html(stopwatch.time);
	},

	start: function () {
		if (!clockRunning) {
			intervalId = setInterval(stopwatch.count, 1000);
			clockRunning = true;
		}
	},

	count: function () {
		stopwatch.time--;
		console.log(stopwatch.time);
		$("#timerNumber").html(stopwatch.time);
		if (stopwatch.time === 0) {
			stopwatch.stop();
			game.loss("Oops, too slow Joe!");
		}

	},

	stop: function () {
		clearInterval(intervalId);
		clockRunning = false;
	}
};