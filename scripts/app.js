
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



//DISPLAY FUNCTIONS

//Element display functions

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


function renderFinalTemplate(buttonText, state, container, corrAnswersTotal, currentState, quesNum) {
	var page = state.pages[currentState];
	var button = displayButton(buttonText);
	var questionTicker = $('.js-current-ticker');

	var bye = ("<p>Your final score was: </p><span class='span-1'></span> out of <span class='span-2'></span>");

	container.html(bye);

	displayScore(questionTicker, quesNum, corrAnswersTotal);
	$('.js-current-ticker, .js-score').addClass('hidden');
}

function renderResultTemplate(buttonText, state, container, questionID, currentState, corrAnswersTotal, quesNum, currQuestion) {
	var page = state.pages[currentState];
	var button = displayButton(buttonText);
	var answer = getAnswerFeedback(state, questionID);
	var questionTicker = $('.js-current-ticker');

	var result = ("<p>" + page + "</p>" + "<br />" 
		+ "<p>" + answer + "</p><br />"
		+ "<p>You have <span class='span-1'></span> out of <span class='span-2'></span> questions correct."
		+ button);

	container.html(result);

	displayScore(questionTicker, quesNum, questionID);
	displayScore($('.js-score'), corrAnswersTotal, currQuestion - corrAnswersTotal);
}

function renderQuestionTemplate(questionID, label, container, buttonText, currentState, currQuestion, state, corrAnswers, quesNum) {
	var question = getQuestion(state, currQuestion);//(state, 0)
	var questionDisplay = displayQuestion(question, questionTemplate, label);
	var score = $('.js-score');
	var questionTicker = $('.js-current-ticker');

	container.html(questionDisplay);

	displayAnswers(state, currQuestion, buttonText);
	displayScore(score, corrAnswers, currQuestion - corrAnswers);
	displayScore(questionTicker, quesNum, questionID);
}

//Render view functions

function renderIndexView(buttonText, state, container, currentState) {
	var page = state.pages[currentState];
	var button = displayButton(buttonText);
	var welcome = "<h1>Monty Python Quiz Game!</h1>"
	+ '<p>' + page + '</p>' + button;

	container.html(welcome);
}

function renderState(buttonText, label, currentState, container, questionID, currQuestion, corrAnswersTotal, quesNum) {
	if(currentState === 'index') {
		renderIndexView(buttonText, state, container, currentState);
	} else if (currentState === 'questions') {
		renderQuestionTemplate(questionID, label, container, buttonText, currentState, currQuestion, state, corrAnswersTotal, quesNum);//(1, label, container, 'Submit!', 'questions', 0, state, 0)
	} else if (currentState === 'result') {
		renderResultTemplate(buttonText, state, container, questionID, currentState, corrAnswersTotal, quesNum, currQuestion); //('Next', state, container, 1, 'result', 0)
	} else if (currentState === 'final' && currQuestion === 5) {
		renderFinalTemplate(buttonText, state, container, corrAnswersTotal, currentState, quesNum);
	}
}


//LOGIC FUNCTIONS

function processResult(userAnswer, currQuestion, state, corrAnswersTotal) {
	var correctAnswer = getAnswerID(state, currQuestion);

	if (userAnswer === correctAnswer) {
		corrAnswersTotal +=1;
	}

	return corrAnswersTotal;
	
}

function checkState(submitButton, currQuestion, state, label, container, currentState, corrAnswersTotal, questionID, buttonText, quesNum) {
	if ((currentState === "index") || (currentState === "result" && currQuestion < 5)) {
		currentState = "questions";
		console.log(currentState);
		currQuestion += 1;
		console.log(currQuestion);
		handleSubmit(submitButton, currQuestion, state, label, container, currentState, corrAnswersTotal, questionID, buttonText, quesNum);
	} else if (currentState === "questions") {
		currentState = "result";
		console.log(currentState);
		currQuestion += 1;
		handleButtonClick(submitButton, currQuestion, state, label, container, currentState, corrAnswersTotal, questionID, quesNum);
	} else if (currentState === "result" && currQuestion === 5) {
		currentState = "final";
		console.log(currentState);
		handleButtonClick(submitButton, currQuestion, state, label, container, currentState, corrAnswersTotal, questionID, quesNum);
	}

	return currentState;
}


//EVENT HANDLERS

function handler(currentState, buttonText, label, container, questionID, currQuestion, corrAnswersTotal, renderer, quesNum) {
	buttonText = state.button[currentState];
	renderer(buttonText, label, currentState, container, questionID, currQuestion, corrAnswersTotal, quesNum);
}

function handleInitialState(state, container, label, submitButton, currQuestion, currentState, corrAnswersTotal, quesNum) { //currentState = index
	var buttonText = state.button[currentState]; //value at index is 'Start Game!'
	var questionID = 0;

	renderState(buttonText, label, currentState, container, questionID, currQuestion, quesNum);

	handleButtonClick(submitButton, currQuestion, state, label, container, currentState, corrAnswersTotal, questionID, buttonText, quesNum);
}

function handleSubmit(submitButton, currQuestion, state, label, container, currentState, corrAnswersTotal, questionID, buttonText, quesNum) {
	$('.js-question-form').on('submit', submitButton, function(e) {
		e.preventDefault();
		e.stopPropagation();

		var userChoice = $('.js-input-group input[name="answer"]:radio:checked').val();
		var newTotal = processResult(userChoice, currQuestion, state, corrAnswersTotal);

		console.log(userChoice);
		console.log(newTotal);

		var newCurrentState = checkState(submitButton, currQuestion, state, label, container, currentState, corrAnswersTotal, questionID, buttonText, quesNum);
		currentState = newCurrentState;

		handler(currentState, buttonText, label, container, questionID, currQuestion, newTotal, renderState, quesNum);

		return false;

	});
}

function handleButtonClick(submitButton, currQuestion, state, label, container, currentState, corrAnswersTotal, questionID, buttonText, quesNum) { //currQuestion = 0

	container.on('click', submitButton, function(e) {
		e.preventDefault();

		var newCurrentState = checkState(submitButton, currQuestion, state, label, container, currentState, corrAnswersTotal, questionID, buttonText);
		currentState = newCurrentState;

		handler(currentState, buttonText, label, container, questionID, currQuestion, corrAnswersTotal, renderState, quesNum);
	});
}

function handleActions() {
	var label = '#label';
	var container = $('.js-main-container');
	var submitButton = '.js-submit-btn';

	var currQuestion = state.currQuestion;
	var questionID = state.questions[currQuestion].questionID;
	var currentState = state.currentState;
	var corrAnswersTotal = state.corrAnswersTotal;
	var buttonText = state.button[currentState];
	var quesNum = state.questions.length;

	console.log(currentState);
	console.log(currQuestion);

	handleInitialState(state, container, label, submitButton, currQuestion, currentState, corrAnswersTotal, quesNum);	
}

$(document).ready(handleActions);