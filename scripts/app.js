
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

function getAnswers (state) {
	return state.questions[state.currQuestion].a;
}

function getQuestion(state) {
	return state.questions[state.currQuestion].q;
}

function getAnswerFeedback(questionID) {
	for(var i=0; i<state.answerFeedback.length; i++)
	{
		if(state.answerFeedback[i]['questionID'] === state.questions[state.currQuestion]['questionID']) {
			return state.answerFeedback[i].answer;
		}
	}
}

function getQuestionID(state) {
	return state.questions[state.currQuestion].questionID;
}

function getAnswerID(state) {
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

function displayAnswers(state, questionIndex) {
	var answerArr = getAnswers(state, questionIndex);
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


function renderFinalTemplate(state, container) {
	var page = state.pages[state.currentState];
	var button = displayButton();
	var questionTicker = $('.js-current-ticker');

	var bye = ("<p>Your final score was: </p><span class='span-1'></span> out of <span class='span-2'></span>");

	container.html(bye);

	displayScore(questionTicker, state.questions.length);
	$('.js-current-ticker, .js-score').addClass('hidden');
}

function renderResultTemplate(state, container, questionID) {
	var page = state.pages[state.currentState];
	var button = displayButton();
	var answer = getAnswerFeedback(questionID);
	var questionTicker = $('.js-current-ticker');

	var result = ("<p>" + page + "</p>" + "<br />"
		+ "<p>" + answer + "</p><br />"
		+ "<p>You have <span class='span-1'></span> out of <span class='span-2'></span> questions correct."
		+ button);

	container.html(result);

	displayScore(questionTicker, state.questions.length, questionID);
	displayScore($('.js-score'), state.corrAnswersTotal, state.currQuestion - state.corrAnswersTotal);
}

function renderQuestionTemplate(label, container, state) {
	var question = getQuestion(state);//(state, 0)
	var questionDisplay = displayQuestion(question, questionTemplate, label);
	var score = $('.js-score');
	var questionTicker = $('.js-current-ticker');
	var questionID = getQuestionID(state);

	container.html(questionDisplay);

	displayAnswers(state);
	displayScore(score, state.corrAnswersTotal, state.currQuestion - state.corrAnswersTotal);
	displayScore(questionTicker, state.questions.length, questionID);
}

//Render view functions

function renderIndexView(state, container) {
	var page = state.pages[state.currentState];
	var button = displayButton();
	var welcome = "<h1>Monty Python Quiz Game!</h1>"
	+ '<p>' + page + '</p>' + button;

	container.html(welcome);
}

function renderState(label,  container, questionID) {
	if(state.currentState === 'index') {
		renderIndexView(state, container, state.currentState);
	} else if (state.currentState === 'questions') {
		renderQuestionTemplate(label, container, state);//(1, label, container, 'Submit!', 'questions', 0, state, 0)
	} else if (state.currentState === 'result') {
		renderResultTemplate(state, container, questionID); //('Next', state, container, 1, 'result', 0)
	} else if (state.currentState === 'final' && state.currQuestion === 5) {
		renderFinalTemplate(state, container);
	}
}


//LOGIC FUNCTIONS

function processResult(userAnswer, state) {
	var correctAnswer = getAnswerID(state);

	if (parseInt(userAnswer) === parseInt(correctAnswer)) {
		state.corrAnswersTotal +=1;
	}

	return state.corrAnswersTotal;

}

function checkState(submitButton, state, label, container, questionID) {
	if ((state.currentState === "index") || (state.currentState === "result" && state.currQuestion < 5)) {
		state.currentState = "questions";
		console.log("current currentState " + state.currentState);
		state.currQuestion += 1;
		console.log("current currQuestion" + state.currQuestion);
		handleSubmit(submitButton, state, label, container, questionID);
		return state.currentState;
	} else if (state.currentState === "questions") {
		state.currentState = "result";
		console.log("result currentState" + state.currentState);
		state.currQuestion += 1;
		handleButtonClick(submitButton, state, label, container, questionID);
	} else if (state.currentState === "result" && state.currQuestion === 5) {
		state.currentState = "final";
		console.log("final current state " + state.currentState);
		handleButtonClick(submitButton, state, label, container, questionID);
	}

	return state.currentState;
}


//EVENT HANDLERS

function handler(label, container, questionID) {
	renderState(label,  container, questionID);
}

function handleInitialState(state, container, label, submitButton) { //state.currentState = index
	var questionID = 0;

	renderState(label,  container, questionID);

	handleButtonClick(submitButton, state, label, container, questionID);
}

function handleSubmit(submitButton, state, label, container, questionID) {
	$('.js-question-form').on('submit', submitButton, function(e) {
		e.preventDefault();
		e.stopPropagation();

		console.log("userchoice" + userChoice);
		console.log("newTotal" + newTotal);

		var newCurrentState = checkState(submitButton, state, label, container, questionID);
		state.currentState = newCurrentState;

		handler(label, container, questionID, newTotal);

		return false;

	});
}

function handleButtonClick(submitButton, state, label, container, questionID) {

	container.on('click', submitButton, function(e) {
		e.preventDefault();

		var userChoice = $('.js-input-group input[name="answer"]:radio:checked').val();
		var newTotal = processResult(userChoice, state);
		console.log('newTotal: ' + newTotal);


		var newCurrentState = checkState(submitButton, state, label, container, questionID);
		state.currentState = newCurrentState;

		handler(label, container, questionID);
	});
}

function handleActions() {
	var label = '#label';
	var container = $('.js-main-container');
	var submitButton = '.js-submit-btn';

	console.log("current state is" + state.currentState);
	console.log("current question is" + state.currQuestion);

	handleInitialState(state, container, label, submitButton);
}

$(document).ready(handleActions);
