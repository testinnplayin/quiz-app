
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

function getAnswers () {
	return state.questions[state.currQuestion].a;
}

function getQuestion() {
	return state.questions[state.currQuestion].q;
}

function getAnswerFeedback() {
	for(var i = 0; i < state.answerFeedback.length; i++)
	{
		if(state.answerFeedback[i]['questionID'] === state.questions[state.currQuestion]['questionID']) {
			return state.answerFeedback[i].answer;
		}
	}
}

function getQuestionID() {
	return state.questions[state.currQuestion].questionID;
}

function getAnswerID() {
	console.log('getanswerID ' + state.questions[state.currQuestion].answerID);
	return state.questions[state.currQuestion].answerID;
}



//DISPLAY FUNCTIONS

//Element display functions

function displayScore(element, totalVal, currVal) {
	element.find('.span-1').text(currVal);
	element.find('.span-2').text(totalVal);
	element.removeClass('hidden');
}

function displayButton() {
	var buttonTemplate = '<button type="submit" class="submit-btn js-submit-btn">' + state.button[state.currentState] + '</button>';
	return buttonTemplate;
}

function displayAnswers() {
	var answerArr = getAnswers();
	var lng = answerArr.length;
	var inputGroup = '.input-group';
	var button = displayButton();

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


//Template display functions


function renderFinalTemplate(container) {
	var page = state.pages[state.currentState];
	var button = displayButton();
	var questionTicker = $('.js-current-ticker');

	var bye = ("<p>Your final score was: </p><span class='span-1'></span> out of <span class='span-2'></span>");

	container.html(bye);

	displayScore(questionTicker, state.questions.length);
	$('.js-current-ticker, .js-score').addClass('hidden');
}

function renderResultTemplate(container) {
	var page = state.pages[state.currentState];
	var button = displayButton();
	var answer = getAnswerFeedback();
	var questionTicker = $('.js-current-ticker');

	var result = ("<p>" + page + "</p>" + "<br />"
		+ "<p>" + answer + "</p><br />"
		+ "<p>You have <span class='span-1'></span> out of <span class='span-2'></span> questions correct."
		+ button);

	container.html(result);

	displayScore(questionTicker, state.questions.length, state.questions[state.currQuestion].questionID);
	displayScore($('.js-score'), state.corrAnswersTotal, state.currQuestion - state.corrAnswersTotal);
}

function renderQuestionTemplate(label, container) {
	var question = getQuestion();
	var questionDisplay = displayQuestion(question, questionTemplate, label);
	var score = $('.js-score');
	var questionTicker = $('.js-current-ticker');

	container.html(questionDisplay);

	displayAnswers();
	displayScore(score, state.corrAnswersTotal, state.currQuestion - state.corrAnswersTotal);
	displayScore(questionTicker, state.questions.length);
}

//Render view functions

function renderIndexView(container) {
	var page = state.pages[state.currentState];
	var button = displayButton();
	var welcome = "<h1>Monty Python Quiz Game!</h1>"
	+ '<p>' + page + '</p>' + button;

	container.html(welcome);
}

function renderState(label, container) {
	if(state.currentState === 'index') {
		renderIndexView(container, state.currentState);
	} else if (state.currentState === 'questions') {
		renderQuestionTemplate(label, container);
	} else if (state.currentState === 'result') {
		renderResultTemplate(container); 
	} else if (state.currentState === 'final' && state.currQuestion === 5) {
		renderFinalTemplate(container);
	}
}


//LOGIC FUNCTIONS

function processResult(userAnswer) {
	var correctAnswer = getAnswerID();

	if (parseInt(userAnswer) === parseInt(correctAnswer)) {
		state.corrAnswersTotal +=1;
	}

	return state.corrAnswersTotal;

}

function checkState(submitButton, label, container) {
	if ((state.currentState === "index") || (state.currentState === "result" && state.currQuestion < 5)) {
		state.currentState = "questions";
		console.log("current currentState " + state.currentState);
		state.currQuestion += 1;
		console.log("current currQuestion" + state.currQuestion);
		handleButtonClick(submitButton, label, container);
		return state.currentState;
	} else if (state.currentState === "questions") {
		state.currentState = "result";
		console.log("result currentState" + state.currentState);
		state.currQuestion += 1;
		handleButtonClick(submitButton, label, container);
		return state.currentState;
	} else if (state.currentState === "result" && state.currQuestion === 5) {
		state.currentState = "final";
		console.log("final current state " + state.currentState);
		handleButtonClick(submitButton, label, container);
		return state.currentState;
	}

}


//EVENT HANDLERS

function handler(label, container) {
	renderState(label,  container);
}

function handleInitialState(container, label, submitButton) { //state.currentState = index

	renderState(label, container);

	handleButtonClick(submitButton, label, container);
}

function handleButtonClick(submitButton, label, container) {

	container.on('click', submitButton, function(e) {
		e.preventDefault();

		var userChoice = $('.js-input-group input[name="answer"]:radio:checked').val();
		var newTotal = processResult(userChoice);
		console.log('newTotal: ' + newTotal);


		var newCurrentState = checkState(submitButton, label, container);
		state.currentState = newCurrentState;
		console.log("click button current state is " + state.currentState);

		handler(label, container);
	});
}

function handleActions() {
	var label = '#label';
	var container = $('.js-main-container');
	var submitButton = '.js-submit-btn';

	console.log("initial state is " + state.currentState);
	console.log("initial question is " + state.currQuestion);

	handleInitialState(container, label, submitButton);
}

$(document).ready(handleActions);
