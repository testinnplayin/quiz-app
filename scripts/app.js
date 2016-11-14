
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
	result: 'Here is the result:',
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
	corrAnswersTotal: 0
};

var questionTemplate = (
	'<form class="question-form js-question-form">'
		+ '<fieldset class="js-question-field">'
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

function getAnswerFeedback(state, questionID) {
	if (state.answerFeedback.questionID === questionID) {
		return state.answerFeedback.answer;
	}
}

function getAnswerID(state, questionIndex) {
	return state.questions[questionIndex].answerID;
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
		var answerTemplate = '<input type="radio" name="answer" id="' + (i + 1) + '" value="' + answer + '" required />' + answer + '<br />';

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

function renderResultTemplate(buttonText, state, container, questionID, corrAnswersTotal) {
	var page = state.result;
	var button = displayButton(buttonText);
	var answer = getAnswerFeedback(state, questionID);
	var quesNum = state.questions.length;

	var result = ("<p>" + page + "</p>" + "<br />" 
		+ "<p>" + answer + "</p><br />"
		+ "<p>You have <span class='span-1'></span> out of <span class='span-2'></span> questions correct."
		+ button);
	container.html(result);
	displayScore(container, quesNum, corrAnswersTotal);
}

function renderQuestionTemplate(questionID, label, container, buttonText, currentState, currQuestion, state, corrAnswers) {
	var question = getQuestion(state, currQuestion);//(state, 0)
	var questionDisplay = displayQuestion(question, questionTemplate, label);
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

function renderFinalTemplate(buttonText, state, container, corrAnswersTotal) {
	var page = state.final;
	var button = displayButton(buttonText);
	var bye = ("<p>Your final score was: </p><span class='span-1'></span> out of <span class='span-2'></span>");
}

function renderState(buttonText, label, currentState, container, questionID, currQuestion, corrAnswersTotal) {
	if(currentState === 'index') {
		renderIndex(buttonText, state, container);
	} else if (currentState === 'questions') {
		renderQuestionTemplate(questionID, label, container, buttonText, currentState, currQuestion, state, corrAnswersTotal);//(1, label, container, 'Submit!', 'questions', 0, state, 0)
	} else if (currentState === 'result') {
		renderResultTemplate(buttonText, state, container, questionID); //('Next', state, container, 1)
	} else if (currentState === 'final') {
		renderFinalTemplate(buttonText, state, container, corrAnswersTotal);
	}
}

//logic functions

function processResult(userAnswer, currQuestion, state, corrAnswersTotal) {
	var correctAnswer = getAnswerID(state, currQuestion);

	if (userAnswer === correctAnswer) {
		corrAnswersTotal +=1;
	}

	return corrAnswersTotal;
	
}

//event handlers

function handler(currentState, buttonText, label, container, questionID, currQuestion, corrAnswersTotal, renderer, stateStr) {
	currentState = stateStr;
	buttonText = state.button[currentState];
	renderer(buttonText, label, currentState, container, questionID, currQuestion, corrAnswersTotal);
}

function handleInitialState(state, container, label) {
	var currentState = state.currentState; //index
	var buttonText = state.button[currentState]; //value at index is 'Start Game!'
	var questionID = 0;
	var currQuestion = state.currQuestion;

	renderState(buttonText, label, currentState, container, questionID, currQuestion);
}

function handleUserChoice(currQuestion, container) {
	container.on('click', "input[name='answer']", function() {
		var userChoice = $('input[name="answer"]:radio:checked').attr('id');

		return userChoice;
	});
}

function handleSubmit(submitButton, currQuestion, state, label, container) { //currQuestion = 0

	container.on('click', submitButton, function(e) {
		e.preventDefault();

		var currentState = state.currentState;
		var questionID = state.questions[currQuestion].questionID;
		var buttonText = state.button[currentState];
		var corrAnswersTotal = state.corrAnswersTotal;

		currQuestion;

		if ((currentState === "index") || (currentState === "result" && currQuestion < 5)) {
			handler(currentState, buttonText, label, container, questionID, currQuestion, corrAnswersTotal, renderState, 'questions');
			currQuestion += 1;
		} else if (currentState === "questions") {
			var userChoice = handleUserChoice(currQuestion, container);
			console.log(userChoice);
			processResult(userChoice, currQuestion, state, corrAnswersTotal);
			handler(currentState, buttonText, label, container, questionID, currQuestion, corrAnswersTotal, renderState, 'result');
		} else {
			handler(currentState, buttonText, label, container, questionID, currQuestion, corrAnswersTotal, renderState, 'final');
		}
			
	});
}

function handleActions() {
	var label = '#label';
	var container = $('.js-main-container');
	var submitButton = '.js-submit-btn';
	var currQuestion = state.currQuestion;

	handleInitialState(state, container, label);
	handleSubmit(submitButton, currQuestion, state, label, container);

}



$(document).ready(handleActions);