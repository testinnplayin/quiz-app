
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

function displayScore(element, totalVal, currVal) {
	

	element.find('.span-1').text(currVal);
	element.find('.span-2').text(totalVal);
	element.removeClass('hidden');
}

function displayAnswers(state, questionIndex, buttonText) {
	var answerArr = getAnswers(state, questionIndex);
	var lng = answerArr.length;
	var inputGroup = '.input-group';
	var button = displayButton(buttonText);

	for (var i = 0; i < lng; i++) {
		var answer = answerArr[i];
		var answerTemplate = '<input type="radio" name="answer" id="answer' + i + '" value="' + answer + '" required />' + answer + '<br />';
		console.log(answerTemplate);
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

function renderQuestionTemplate(questionID, label, container, buttonText, currentState, currQuestion, state) {
	var question = getQuestion(state, currQuestion);//(state, 0)
	var questionDisplay = displayQuestion(question, questionTemplate, label);
	var corrAnswers = state.corrAnswers;
	var quesNum = state.questions.length;
	var score = $('.js-score');
	var questionTicker = $('.js-current-ticker');

	container.html(questionDisplay);
	displayAnswers(state, currQuestion, buttonText);
	displayScore(score, quesNum - corrAnswers, corrAnswers);
	displayScore(questionTicker, quesNum, questionID)
}

function renderIndex(buttonText, state, container) {
	var page = state.index;
	var button = displayButton(buttonText);
	var welcome = "<h1>Monty Python Quiz Game!</h1>"
	+ '<p>' + page + '</p>' + button;

	container.html(welcome);
}

function renderState(buttonText, label, currentState, container, questionID, currQuestion) {
	if(currentState === 'index') {
		renderIndex(buttonText, state, container);
	} else if (currentState === 'questions') {
		renderQuestionTemplate(questionID, label, container, buttonText, currentState, currQuestion, state);//(1, label, container, 'Submit!', 'questions', 0)
	}
}

//logic functions

function processResult(answer, questionIndex, state) {
	var correctAnswer = state.questions[currQuestion].answerID;
	
}

//event handlers

function handleInitialState(state, container, label) {
	var currentState = state.currentState; //index
	var buttonText = state.button[currentState]; //value at index is 'Start Game!'
	var questionID = 0;
	var currQuestion = 0;

	renderState(buttonText, label, currentState, container, questionID, currQuestion);
}

//function handleGameStart(currQuestion, label, container, state, submitButton) {
//	container.on('click', submitButton, function(e) {
//		e.preventDefault();
//
//		currQuestion; //currQuestion is 0
//		state.currentState = 'questions';
//
//		var currentState = state.currentState;
//		var questionID = state.questions[currQuestion].questionID;
//		var buttonText = state.button[currentState];
//
//		renderState(buttonText, label, currentState, container, questionID, currQuestion); //('Submit!', label, 'questions', container, 1, 0)
//	});
//}

function handleSubmit(submitButton, currQuestion, state, label, container) { //currQuestion = 0

	container.on('click', submitButton, function(e) {
		e.preventDefault();

		var currentState = state.currentState;
		var questionID = state.questions[currQuestion].questionID;
		var buttonText = state.button[currentState];

		currQuestion;
		console.log(currentState);

		if (currentState === "index") {
			currentState = "questions";
			renderState(buttonText, label, currentState, container, questionID, currQuestion);
		}
		
		


		//var userAnswer = $('input[name="answer"]:radio:checked');
		//alert(userAnswer);
		//processResult(userAnswer, currQuestion, state);
		
		
	});
}

function handleActions() {
	var form = $('.js-question-form');
	var label = '#label';
	var questionField = $('.js-question-field');
	var container = $('.js-main-container');
	var submitButton = '.js-submit-btn';
	var currQuestion = state.currQuestion;

	handleInitialState(state, container, label, form);
	//handleGameStart(currQuestion, label, container, state, submitButton);
	handleSubmit(submitButton, currQuestion, state, label, container);

}

$(document).ready(handleActions);