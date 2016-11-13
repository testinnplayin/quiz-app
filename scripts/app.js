
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
			answerID: 3
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
	'<fieldset class=".js-question-field">'
		+'<label for="question" id="label"></label><br />'
		+ '<div class="input-group">'
		+ '</div>'
	+ '</fieldset>'
	);

//State functions

function getAnswers (state, questionIndex) {
	return state.questions[questionIndex].a;
}

function getQuestion(state, questionIndex) {
	return state.questions[questionIndex].q;
}

//displayfunctions

function displayScore(corrAnswers, arrLng) {
	$('.js-score').find('.js-correct').text(corrAnswers);
	$('.js-score').find('.js-incorrect').text(arrLng - corrAnswers);
}

function displayAnswers(state, questionIndex, questionTemplate) {
	var answerArr = getAnswers(state, questionIndex);
	var lng = answerArr.length;
	var inputGroup = '.input-group';

	for (var i = 0; i < lng; i++) {
		var answer = answerArr[i];
		var answerTemplate = '<input type="radio" name="answer" id="question' + i + '" value="' + answer + '" />' + answer + '<br />';
		
		questionTemplate.find(inputGroup).append(answerTemplate);
		displayScore(corrAnswers, lng);
	}	
}

function displayQuestion(question, questionTemplate, label) {
	var element = $(questionTemplate);
	element.find(label).text(question);
	return element;
} 

function displayButton(button, state, currentState, form) {
	var buttonText = state.button.currentState;

	form.find(button).text(buttonText);
}

function renderQuestionTemplate(questionIndex, label, form, button) {
	var question = getQuestion(state, questionIndex);
	var questionDisplay = displayQuestion(question, questionTemplate, label);
	form.html(questionDisplay);
	displayAnswers(state, questionIndex, questionDisplay);
}

function renderIndex(button, state, form) {
	var currentState = state.index;
	var welcome = "<h1>Monty Python Quiz Game!</h1>"
	+ '<p>' + currentState + '</p>';
	$('.main-container').html(welcome);
	displayButton(button, state, currentState, form);
}

function renderState(button, state, form, label, currentState) {
	if(state.currentState == 'index') {
		renderIndex(button, state, form);
	} else if (state.currentState === 'questions') {
		renderQuestionTemplate(questionIndex, label, form, button);
	}
}

//event handlers

function handleState(state, currentState, button, container, form, label) {
	currentState = (typeof (state.currentState) != 'undefined') ? state.currentState : 'index';
	renderState(button, state, form, label, currentState);
}

function handleSubmit(form) {
	form.submit(function(e) {
		e.preventDefault();
		e.stopPropagation();


	});
}

function handleActions() {
	var form = $('.js-question-form');
	var label = '#label';
	var questionField = $('.js-question-field');
	var button = $('.js-submit-btn');
	var container = $('.js-main-container');

	var currentState = state.currentState;

	handleState(state, currentState, button, container, form, label);
}

$(document).ready(handleActions);