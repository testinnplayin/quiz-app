
'use strict'

var state = {
	index: 'start page',
	questions: [
		{
			q : "What word used in a <i>Monty Python</i> sketch came to be used very frequently in internet jargon?",
			a : ["troll", "newb", "spam", "flamewars"],
			answerID: 3
		},
		{
			q: "Which <i>Monty Python</i> movie featured the song <i>Always Look on the Bright Side of Life</i>?",
			a: ["<i>Monty Python's Life of Brian</i>", "<i>Monty Python and the Holy Grail</i>", "<i>Monty Python's The Meaning of Life</i>", "None, it was in their TV series"],
			answerID: 1
		},
		{
			q: "Which 'Python' went on to produce several history series for television?",
			a: ["Eric Idle", "John Cleese", "Terry Gillian", "Terry Jones"],
			answerID: 4
		},
		{
			q: "What year was <i>Monty Python's Flying Circus</i> first shown on television in the United Kingdom?",
			a: ["1975", "1969", "1980", "2001"],
			answerID: 2
		},
		{
			q: "What other British comedy series did Python John Cleese star in?",
			a: ["<i>Absolutely Fabulous</i>", "<i>The New Statesman</i>", "<i>Fawlty Towers</i>", "<i>Little Britain</i>"],
			answerID: 3
		}
	],
	result: 'result for single question',
	final: 'final score'
};

var questionTemplate = (
	'<fieldset class=".js-question-field">'
		+'<label for="question" id="label"></label><br />'
		+ '<div class="input-group">'
		+ '</div>'
	+ '</fieldset>'
	);

function getAnswers (state, questionIndex) {
	return state.questions[questionIndex].a;
}

function getQuestion(state, questionIndex) {
	return state.questions[questionIndex].q;
}

function displayAnswers(state, questionIndex, questionTemplate) {
	var answerArr = getAnswers(state, questionIndex);
	var lng = answerArr.length;

	for (var i = 0; i < lng; i++) {
		var answer = answerArr[i];
		var answerTemplate = '<input type="radio" name="answer" id="question' + i + '" value="' + answer + '" />' + answer + '<br />';
		
		questionTemplate.find('.input-group').append(answerTemplate);
	}
	
}

function displayQuestion(question, questionTemplate, label) {
	var element = $(questionTemplate);
	element.find(label).text(question);
	return element;
} 

function renderQuestion(questionIndex, label, form) {
	var question = getQuestion(state, questionIndex);
	var questionDisplay = displayQuestion(question, questionTemplate, label);
	form.html(questionDisplay);
	displayAnswers(state, questionIndex, questionDisplay);
}

function handleSubmit(form) {
	form.submit(function(e) {
		e.preventDefault();
		e.stopPropagation();


	});
}

function handleActions() {
	var form = $('.question-form');
	var label = 'label';
	var questionField = $('.js-question-field');

	var question = renderQuestion(0, label, form);
}

$(document).ready(handleActions);