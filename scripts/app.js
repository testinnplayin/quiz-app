
'use strict'

var state = {
	currentState: 'index',
	index: 'Click below to start!',
	questions: [
		{
			q : "What word used in a Monty Python sketch came to be used very frequently in internet jargon?",
			a : ["troll", "newb", "spam", "flamewars"],
			answerID: 3,
			questionID: 1
		},
		{
			q: "Which Monty Python movie featured the song Always Look on the Bright Side of Life?",
			a: ["Monty Python's Life of Brian<", "Monty Python and the Holy Grail", "Monty Python's The Meaning of Life", "None, it was in their TV series"],
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
	result: 'result for single question',
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
	final: 'final score',
	button: { index : 'Start Game!', questions : 'Submit!', result : 'Next', final : 'Start New Game!'},
	currQuestion: 0,
	corrAnswers: 0
};

var questionTemplate = (
	'<form class="question-form js-question-form">'
		+ '<fieldset class=".js-question-field">'
			+'<label for="question" id="label"></label><br />'
			+ '<div class="input-group">'
			+ '</div>'
		+ '</fieldset>'
	+ '</form>'
	);

 

//State functions

function getAnswers (state, questionIndex) {
	return state.questions[questionIndex].a;
}

function getQuestion(state, questionIndex) {
	return state.questions[questionIndex].q;
}

//display functions

function displayScore(corrAnswers, arrLng) {
	var score = $('js.score');
	score.find('.js-correct').text(corrAnswers);
	score.find('.js-incorrect').text(arrLng - corrAnswers);
}

function displayAnswers(state, questionIndex, fieldset) {
	var answerArr = getAnswers(state, questionIndex);
	var lng = answerArr.length;
	var inputGroup = '.input-group';
	var corrAnswers = state.corrAnswers;

	for (var i = 0; i < lng; i++) {
		var answer = answerArr[i];
		var answerTemplate = '<input type="radio" name="answer" id="question' + i + '" value="' + answer + '" />' + answer + '<br />';
		
		fieldset.find(inputGroup).append(answerTemplate);
		displayScore(corrAnswers, lng);
	}	
}

function displayQuestion(question, questionTemplate, label) {
	var element = $(questionTemplate);
	element.find(label).text(question);
	return element;
} 

function displayButton(buttonText) {
	var buttonTemplate = '<button type="submit" class="submit-btn js-submit-btn">' + buttonText + '</button>';
	console.log(buttonText);
	return buttonTemplate;
}

function renderQuestionTemplate(questionID, label, container, buttonText, form, currentState, currQuestion) {
	var fieldset = $('.js-question-field');
	var question = getQuestion(state, currQuestion);//(state, 0)
	var questionDisplay = displayQuestion(question, questionTemplate, label);

	container.html(questionDisplay);
	displayAnswers(state, currQuestion, fieldset);
}

function renderIndex(buttonText, state, container) {
	var page = state.index;
	var button = displayButton(buttonText);
	var welcome = "<h1>Monty Python Quiz Game!</h1>"
	+ '<p>' + page + '</p>' + button;

	container.html(welcome);
}

function renderState(buttonText, label, currentState, container, questionID, form, currQuestion) {
	if(state.currentState === 'index') {
		renderIndex(buttonText, state, container);
	} else if (state.currentState === 'questions') {
		renderQuestionTemplate(questionID, label, container, buttonText, form, currentState, currQuestion);//(1, label, container, 'Submit!', form, 'questions', 0)
	}
}

//event handlers

function handleInitialState(state, container, label) {
	var currentState = state.currentState; //index
	var buttonText = state.button[currentState]; //value at index is 'Start Game!'

	renderState(buttonText, label, currentState, container);
}

function handleGameStart(form, currQuestion, label, container, state, submitButton) {
	container.on('click', submitButton, function(e) {
		e.preventDefault();

		currQuestion; //currQuestion is 0
		state.currentState = 'questions';

		var currentState = state.currentState;
		var questionID = state.questions[currQuestion].questionID;
		var buttonText = state.button[currentState];

		renderState(buttonText, label, currentState, container, questionID, form, currQuestion); //('Submit!', label, 'questions', container, 1, form, 0)
	});
}

function handleSubmit(form, currQuestion, label, container, state) { //currQuestion = 0

	form.submit(function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		currQuestion += 1;
		

		

	});
}

function handleActions() {
	var form = $('.js-question-form');
	var label = '#label';
	var questionField = $('.js-question-field');
	var container = $('.js-main-container');
	var submitButton = '.js-submit-btn';
	var currQuestion = state.currQuestion;

	handleInitialState(state, container, label);
	handleGameStart(form, currQuestion, label, container, state, submitButton);
	handleSubmit(form, currQuestion, label, container, state);

}

$(document).ready(handleActions);