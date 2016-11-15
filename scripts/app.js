
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
<<<<<<< HEAD
	if (state.answerFeedback.questionID === questionID) {
		return state.answerFeedback.answer;
=======
	for(var i=0; i<state.answerFeedback.length; i++)
	{
		if(state.answerFeedback[i]['questionID'] === state.questions[state.currQuestion]['questionID']) {
			return state.answerFeedback[i].answer;
		}
>>>>>>> 913869806de0980af20b4899ae877f352f7a8eec
	}
}

function getQuestionID(questionIndex) {
	return state.questions[questionIndex].questionID;
}

<<<<<<< HEAD
function getAnswerID(questionIndex) {
=======
function getAnswerID(state, questionIndex) {
	console.log('--> ' + state.questions[questionIndex].answerID);
>>>>>>> 913869806de0980af20b4899ae877f352f7a8eec
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


<<<<<<< HEAD
function renderFinalTemplate(container) {
	var page = state.pages[state.currentState];
	var button = displayButton(state.button[state.currentState]);
=======
function renderFinalTemplate(buttonText, state, container, corrAnswersTotal,  quesNum) {
	var page = state.pages[state.currentState];
	var button = displayButton(buttonText);
	var questionTicker = $('.js-current-ticker');
>>>>>>> 913869806de0980af20b4899ae877f352f7a8eec

	var bye = ("<p>Your final score was: </p><span class='span-1'></span> out of <span class='span-2'></span>");

	container.html(bye);

	displayScore(container, state.corrAnswersTotal, state.currQuestion - state.corrAnswersTotal);
	$('.js-current-ticker, .js-score').addClass('hidden');
}

<<<<<<< HEAD
function renderResultTemplate(container) {
	var page = state.pages[state.currentState];
	var button = displayButton(state.button[state.currentState]);
	var answer = getAnswerFeedback(state.questions.questionID);
=======
function renderResultTemplate(buttonText, state, container, questionID,  corrAnswersTotal, quesNum, currQuestion) {
	var page = state.pages[state.currentState];
	var button = displayButton(buttonText);
	var answer = getAnswerFeedback(questionID);
>>>>>>> 913869806de0980af20b4899ae877f352f7a8eec
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

<<<<<<< HEAD
function renderQuestionTemplate(label, container) {
	var question = getQuestion(state.currQuestion);//(state, 0)
=======
function renderQuestionTemplate(label, container, buttonText,  currQuestion, state, corrAnswers, quesNum) {
	var question = getQuestion(state, currQuestion);//(state, 0)
>>>>>>> 913869806de0980af20b4899ae877f352f7a8eec
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

<<<<<<< HEAD
function renderIndexView(container) {
	var page = state.pages[state.currentState];
	var button = displayButton(state.button[state.currentState]);
=======
function renderIndexView(buttonText, state, container) {
	var page = state.pages[state.currentState];
	var button = displayButton(buttonText);
>>>>>>> 913869806de0980af20b4899ae877f352f7a8eec
	var welcome = "<h1>Monty Python Quiz Game!</h1>"
	+ '<p>' + page + '</p>' + button;

	container.html(welcome);
}

<<<<<<< HEAD
function renderState(label, container, submitButton) {
	if(state.currentState === 'index') {
		renderIndexView(container);

	} else if (state.currentState === 'questions') {
		renderQuestionTemplate(label, container);
	} else if (state.currentState === 'result') {
		renderResultTemplate(container);
	} else if (state.currentState === 'final') {
		renderFinalTemplate(container);
=======
function renderState(buttonText, label,  container, questionID, currQuestion, corrAnswersTotal, quesNum) {
	if(state.currentState === 'index') {
		renderIndexView(buttonText, state, container, state.currentState);
	} else if (state.currentState === 'questions') {
		renderQuestionTemplate(label, container, buttonText,  currQuestion, state, corrAnswersTotal, quesNum);//(1, label, container, 'Submit!', 'questions', 0, state, 0)
	} else if (state.currentState === 'result') {
		renderResultTemplate(buttonText, state, container, questionID,  corrAnswersTotal, quesNum, currQuestion); //('Next', state, container, 1, 'result', 0)
	} else if (state.currentState === 'final' && currQuestion === 5) {
		renderFinalTemplate(buttonText, state, container, corrAnswersTotal,  quesNum);
>>>>>>> 913869806de0980af20b4899ae877f352f7a8eec
	}
}


//LOGIC FUNCTIONS

function processResult(userAnswer) {
	var correctAnswer = getAnswerID(state.currQuestion);

<<<<<<< HEAD
	if (userAnswer === correctAnswer) {
=======
	if (parseInt(userAnswer) === parseInt(correctAnswer)) {
>>>>>>> 913869806de0980af20b4899ae877f352f7a8eec
		state.corrAnswersTotal +=1;
	}

	return state.corrAnswersTotal;
<<<<<<< HEAD
	
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
=======

}

function checkState(submitButton, currQuestion, state, label, container,  corrAnswersTotal, questionID, buttonText, quesNum) {
	if ((state.currentState === "index") || (state.currentState === "result" && currQuestion < 5)) {
		state.currentState = "questions";
		console.log(state.currentState);
		currQuestion += 1;
		console.log(currQuestion);
		handleSubmit(submitButton, currQuestion, state, label, container,  corrAnswersTotal, questionID, buttonText, quesNum);
	} else if (state.currentState === "questions") {
		state.currentState = "result";
		console.log(state.currentState);
		currQuestion += 1;
		handleButtonClick(submitButton, currQuestion, state, label, container,  corrAnswersTotal, questionID, quesNum);
	} else if (state.currentState === "result" && currQuestion === 5) {
		state.currentState = "final";
		console.log(state.currentState);
		handleButtonClick(submitButton, currQuestion, state, label, container,  corrAnswersTotal, questionID, quesNum);
>>>>>>> 913869806de0980af20b4899ae877f352f7a8eec
	}

	return state.currentState;
}


//EVENT HANDLERS

<<<<<<< HEAD
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
=======
function handler( buttonText, label, container, questionID, currQuestion, corrAnswersTotal, quesNum) {
	buttonText = state.button[state.currentState];
	renderState(buttonText, label,  container, questionID, currQuestion, corrAnswersTotal, quesNum);
}

function handleInitialState(state, container, label, submitButton, currQuestion,  corrAnswersTotal, quesNum) { //state.currentState = index
	var buttonText = state.button[state.currentState]; //value at index is 'Start Game!'
	var questionID = 0;

	renderState(buttonText, label,  container, questionID, currQuestion, quesNum);

	handleButtonClick(submitButton, currQuestion, state, label, container,  corrAnswersTotal, questionID, buttonText, quesNum);
}

function handleSubmit(submitButton, currQuestion, state, label, container,  corrAnswersTotal, questionID, buttonText, quesNum) {
	$('.js-question-form').on('submit', submitButton, function(e) {
		e.preventDefault();
		e.stopPropagation();

		console.log(userChoice);
		console.log(newTotal);

		var newCurrentState = checkState(submitButton, currQuestion, state, label, container,  corrAnswersTotal, questionID, buttonText, quesNum);
		state.currentState = newCurrentState;

		handler( buttonText, label, container, questionID, currQuestion, newTotal, quesNum);

		return false;

	});
}

function handleButtonClick(submitButton, currQuestion, state, label, container,  corrAnswersTotal, questionID, buttonText, quesNum) { //currQuestion = 0
>>>>>>> 913869806de0980af20b4899ae877f352f7a8eec

	container.on('click', submitButton, function(e) {
		e.preventDefault();

<<<<<<< HEAD
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
=======
		var userChoice = $('.js-input-group input[name="answer"]:radio:checked').val();
		var newTotal = processResult(userChoice, currQuestion, state, corrAnswersTotal);
		console.log('newTotal: ' + newTotal);


		var newCurrentState = checkState(submitButton, currQuestion, state, label, container,  corrAnswersTotal, questionID, buttonText);
		state.currentState = newCurrentState;

		handler( buttonText, label, container, questionID, currQuestion, corrAnswersTotal, quesNum);
>>>>>>> 913869806de0980af20b4899ae877f352f7a8eec
	});
}

function handleActions() {
	var label = '#label';
	var container = $('.js-main-container');
	var submitButton = '.js-submit-btn';

<<<<<<< HEAD
	handleInitialState(container, label, submitButton);	
=======
	var currQuestion = state.currQuestion;
	var corrAnswersTotal = state.corrAnswersTotal;
	var buttonText = state.button[state.currentState];
	var quesNum = state.questions.length;

	console.log(state.currentState);
	console.log(currQuestion);

	handleInitialState(state, container, label, submitButton, currQuestion,  corrAnswersTotal, quesNum);
>>>>>>> 913869806de0980af20b4899ae877f352f7a8eec
}

$(document).ready(handleActions);
