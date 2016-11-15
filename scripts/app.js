
'use strict'

var state = {
	currentState: 'index',
	pages: { index : 'Click below to start!', result : 'Here is the result:', final : 'Final Score' },
	questions: [
		{
			q : "What word used in a Monty Python sketch came to be used very frequently in internet jargon?",
			a : ["troll", "newb", "spam", "flamewars"],
			answerID: 3,
			questionID: 1
		},
		{
			q: "Which Monty Python movie featured the song Always Look on the Bright Side of Life?",
			a: ["Monty Python's Life of Brian", "Monty Python and the Holy Grail", "Monty Python's The Meaning of Life", "None, it was in their TV series"],
			answerID: 1,
			questionID: 2
		},
		{
			q: "Which 'Python' went on to produce several history documentaries for television?",
			a: ["Eric Idle", "John Cleese", "Terry Gillian", "Terry Jones"],
			answerID: 4,
			questionID: 3
		},
		{
			q: "What year was Monty Python's Flying Circus first shown on television in the United Kingdom?",
			a: ["1975", "1969", "1980", "2001"],
			answerID: 2,
			questionID: 4
		},
		{
			q: "What other British comedy series did Python John Cleese star in?",
			a: ["Absolutely Fabulous", "The New Statesman", "Fawlty Towers", "Little Britain"],
			answerID: 3,
			questionID: 5
		}
	],
	answerFeedback: [
		{
			questionID: 1,
			answer: "The correct answer was 'spam spam SPAM spam spam-spam spaaaaam'!."
		},
		{
			questionID: 2,
			answer: "The film was Monty Pyton's Life of Brian, about a very naughty, messianic boy."
		},
		{
			questionID: 3,
			answer: "The Python in question was Terry Jones, not to be confused with Terry Gillian, a movie producer. His lastest documentary is Boom Bust Boom!"
		},
		{
			questionID: 4,
			answer: "1969 was the year that changed television comedy for forever."
		},
		{
			questionID: 5,
			answer: "The other comedy series John Cleese starred in and co-wrote with his then wife was about a rather Fawlty hotel owner."
		}
	],
	button: { index : 'Start Game!', questions : 'Submit!', result : 'Next', final : 'Start New Game!'},
	currQuestion: 0,
	corrAnswersTotal: 0
};

var questionTemplate = (
	'<form class="question-form js-question-form">'
		+ '<fieldset class="js-question-field">'
			+'<label for="question" id="label"></label><br />'
			+ '<div class="input-group js-input-group">'
			+ '</div>'
		+ '</fieldset>'
	+ '</form>'
	);



//STATE FUNCTIONS

function getAnswers (questionIndex) {
	return state.questions[questionIndex].a;
}

function getQuestion(questionIndex) {
	return state.questions[questionIndex].q;
}

function getAnswerFeedback(questionID) {
	if (state.answerFeedback.questionID === questionID) {
		return state.answerFeedback.answer;
	}
}

function getQuestionID(questionIndex) {
	return state.questions[questionIndex].questionID;
}

function getAnswerID(questionIndex) {
	return state.questions[questionIndex].answerID;
}



//DISPLAY FUNCTIONS

//Element display functions

function displayScore(element, totalVal, currVal) {
	element.find('.span-1').text(currVal);
	element.find('.span-2').text(totalVal);
	element.removeClass('hidden');
}

function displayAnswers(questionIndex) {
	var answerArr = getAnswers(questionIndex);
	var lng = answerArr.length;
	var inputGroup = '.input-group';
	var button = displayButton(state.button[state.currentState]);

	for (var i = 0; i < lng; i++) {
		var answer = answerArr[i];
		var answerTemplate = '<input type="radio" name="answer" id="' + (i + 1) + '" value="' + (i + 1) + '" required />' + answer + '<br />';

		$('.js-question-form').find(inputGroup).append(answerTemplate);
	}
	$('.js-question-form').find(inputGroup).append(button);
}

function displayQuestion(question, questionTemplate, label) {
	var element = $(questionTemplate);
	element.find(label).text(question);
	return element;
} 

function displayButton(buttonText) {
	var buttonTemplate = '<button type="submit" class="submit-btn js-submit-btn">' + buttonText + '</button>';
	return buttonTemplate;
}

//Template display functions


function renderFinalTemplate(container) {
	var page = state.pages[state.currentState];
	var button = displayButton(state.button[state.currentState]);

	var bye = ("<p>Your final score was: </p><span class='span-1'></span> out of <span class='span-2'></span>");

	container.html(bye);

	displayScore(container, state.corrAnswersTotal, state.currQuestion - state.corrAnswersTotal);
	$('.js-current-ticker, .js-score').addClass('hidden');
}

function renderResultTemplate(container) {
	var page = state.pages[state.currentState];
	var button = displayButton(state.button[state.currentState]);
	var answer = getAnswerFeedback(state.questions.questionID);
	var questionTicker = $('.js-current-ticker');

	var result = ("<p>" + page + "</p>" + "<br />" 
		+ "<p>" + answer + "</p><br />"
		+ "<p>You have <span class='span-1'></span> out of <span class='span-2'></span> questions correct."
		+ button);

	container.html(result);

	displayScore(questionTicker, state.questions.length, state.questions.length);
	displayScore(container, state.corrAnswersTotal, state.currQuestion - state.corrAnswersTotal);
	displayScore($('.js-score'), state.corrAnswersTotal, state.currQuestion - state.corrAnswersTotal);
}

function renderQuestionTemplate(label, container) {
	var question = getQuestion(state.currQuestion);//(state, 0)
	var questionDisplay = displayQuestion(question, questionTemplate, label);
	var score = $('.js-score');
	var questionTicker = $('.js-current-ticker');
	var questionID = getQuestionID(state.currQuestion);

	container.html(questionDisplay);

	displayAnswers(state.currQuestion);
	displayScore(score, state.corrAnswersTotal, state.currQuestion - state.corrAnswersTotal);
	displayScore(questionTicker, state.questions.length, state.questions[state.currQuestion].questionID);
}

//Render view and state functions

function renderIndexView(container) {
	var page = state.pages[state.currentState];
	var button = displayButton(state.button[state.currentState]);
	var welcome = "<h1>Monty Python Quiz Game!</h1>"
	+ '<p>' + page + '</p>' + button;

	container.html(welcome);
}

function renderState(label, container, submitButton) {
	if(state.currentState === 'index') {
		renderIndexView(container);

	} else if (state.currentState === 'questions') {
		renderQuestionTemplate(label, container);
	} else if (state.currentState === 'result') {
		renderResultTemplate(container);
	} else if (state.currentState === 'final') {
		renderFinalTemplate(container);
	}
}


//LOGIC FUNCTIONS

function processResult(userAnswer) {
	var correctAnswer = getAnswerID(state.currQuestion);

	if (userAnswer === correctAnswer) {
		state.corrAnswersTotal +=1;
	}

	return state.corrAnswersTotal;
	
}

function checkState(submitButton, label, container, currentState) {
	if ((currentState === "index") || (currentState === "result" && state.currQuestion < 5)) {
		currentState = "questions";
		state.currQuestion;
		console.log("old current state " + currentState);
		console.log("old current question " + state.currQuestion);
		handleButtonClick(submitButton, label, container, currentState);
	} else if (currentState === "questions") {
		currentState = "result";
		console.log("switch to " + currentState);
		state.currQuestion += 1;
		console.log("switch to currQuestion " + state.currQuestion);
		handleButtonClick(submitButton, label, container, currentState);
	} else if (currentState === "result" && currQuestion === 5) {
		currentState = "final";
		console.log("This is the last state " + currentState);
		console.log("The final currQuestion index is " + state.currQuestion);
	}

	return currentState;
}


//EVENT HANDLERS

function handler(label, container, submitButton) {
	renderState(label, container, submitButton);
}

function handleInitialState(container, label, submitButton) { 
	var questionID = 0;

	console.log("initial state " + state.currentState);
	console.log("initial currQuestion " + state.currQuestion);
	renderState(label, container);

	handleButtonClick(submitButton, label, container, state.currentState);
}

function handleButtonClick(submitButton, label, container, currentState) { 

	container.on('click', submitButton, function(e) {
		e.preventDefault();

		state.currQuestion;
		console.log("middle curr state " + currentState);
		console.log("middle curr question " + state.currQuestion);
		var userChoice = $('.js-input-group input[name="answer"]:radio:checked').val();
		var newTotal = processResult(userChoice);

		console.log("new button currQuestion " + state.currQuestion);
		var newCurrentState = checkState(submitButton, label, container, currentState);
		state.currentState = newCurrentState;
		console.log("New button currentState " + state.currentState);

		handler(label, container);
	});
}

function handleActions() {
	var label = '#label';
	var container = $('.js-main-container');
	var submitButton = '.js-submit-btn';

	handleInitialState(container, label, submitButton);	
}

$(document).ready(handleActions);