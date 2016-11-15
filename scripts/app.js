
'use strict'

var state = {
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

function getAnswers(obj) {
	return state.questions[obj.currQuestion].a;
}

function getQuestion(obj) {
	return state.questions[obj.currQuestion].q;
}

function getAnswerFeedback(obj) {
	var lng = state.answerFeedback.length;

	for(var i = 0; i < lng; i++)
	{
		if(state.answerFeedback[i]['questionID'] === state.questions[obj.currQuestion]['questionID']) {
			return state.answerFeedback[i].answer;
		}
	}
}

function getQuestionID(obj) {
	return state.questions[obj.currQuestion].questionID;
}

function getAnswerID(obj) {
	return state.questions[obj.currQuestion].answerID;
}



//DISPLAY FUNCTIONS

//Element display functions

function displayScore(element, totalVal, currVal) {
	$(element).find('.span-1').text(currVal);
	$(element).find('.span-2').text(totalVal);
	$(element).removeClass('hidden');
}

function displayButton(obj) {
	var buttonTemplate = '<button type="submit" class="submit-btn js-submit-btn">' + state.button[obj.currentState] + '</button>';
	return buttonTemplate;
}

function displayAnswers(obj) {
	var answerArr = getAnswers(obj);
	var lng = answerArr.length;
	var button = displayButton(obj);

	for (var i = 0; i < lng; i++) {
		var answer = answerArr[i];
		var answerTemplate = '<input type="radio" name="answer" id="' + (i + 1) + '" value="' + (i + 1) + '" />' + answer + '<br />';

		$('.js-question-form').find('.js-input-group').append(answerTemplate);
	}
	$('.js-question-form').find('.js-input-group').append(button);
}

function displayQuestion(question, questionTemplate, label) {
	var element = $(questionTemplate);
	element.find(label).text(question);
	return element;
}


//Template display functions


function renderFinalTemplate(obj, corrAnswersTotal) {
	var page = state.pages[obj.currentState];
	var button = displayButton(obj);

	var bye = ("<p class = 'result'>Your final score was: </p><span class='span-1'></span> out of <span class='span-2'></span>");

	$('.js-main-container').html(bye);

	displayScore($('.js-main-container'), state.questions.length, state.questions[obj.currQuestion].questionID);
	$('.js-current-ticker, .js-score').addClass('hidden');
}

function renderResultTemplate(obj, corrAnswersTotal) {
	var page = state.pages[obj.currentState];
	var button = displayButton(obj);
	var answer = getAnswerFeedback(obj);

	var result = ("<p>" + page + "</p>" + "<br />"
		+ "<p>" + answer + "</p><br />"
		+ "<p>You have <span class='span-1'></span> out of <span class='span-2'></span> questions correct."
		+ button);

	$('.js-main-container').html(result);

	displayScore($('.js-current-ticker'), state.questions.length, state.questions[obj.currQuestion].questionID);
	displayScore($('.js-main-container'), state.questions.length, corrAnswersTotal);
	$('.js-score').addClass('hidden');
}

function renderQuestionTemplate(obj, corrAnswersTotal) {
	var question = getQuestion(obj);
	var questionDisplay = displayQuestion(question, questionTemplate, '#label');

	$('.js-main-container').html(questionDisplay);

	displayAnswers(obj);
	displayScore('.js-score', corrAnswersTotal, obj.currQuestion - corrAnswersTotal);
	displayScore('.js-current-ticker', state.questions.length, state.questions[obj.currQuestion].questionID);
}

//Render view functions

function renderIndexView(obj) {
	var page = state.pages[obj.currentState];
	var button = displayButton(obj);
	var welcome = "<h1>Monty Python Quiz Game!</h1>"
	+ '<p>' + page + '</p>' + button;

	$('.js-main-container').html(welcome);
}

function renderState(obj, corrAnswersTotal) {
	if(obj.currentState === 'index') {
		renderIndexView(obj);
	} else if (obj.currentState === 'questions') {
		renderQuestionTemplate(obj, corrAnswersTotal);
		console.log("rendered question template");
	} else if (obj.currentState === 'result') {
		renderResultTemplate(obj, corrAnswersTotal); 
	} else if (obj.currentState === 'final') {
		renderFinalTemplate(obj, corrAnswersTotal);
	}
}


//LOGIC FUNCTIONS

function processResult(userAnswer, obj, corrAnswersTotal) {
	var correctAnswer = getAnswerID(obj);

	if (parseInt(userAnswer) === parseInt(correctAnswer)) {
		corrAnswersTotal +=1;
	}

	return corrAnswersTotal;
}

function checkState(obj) {

	while (obj.currQuestion < 5) {

		if (obj.currentState === "index" || obj.currentState === "result") {
			if (obj.currentState === "result") {
				obj.currQuestion += 1;
			}
			obj.currentState = "questions";
			return obj;
		} else if (obj.currentState === "questions") {
			obj.currentState = "result";
			return obj;
		}
	}

	obj.currentState = "final";

	return obj;
}


//EVENT HANDLERS


function handleButtonClick(obj) {
	var corrAnswersTotal = 0;

	$('.js-main-container').on('click', '.js-submit-btn', function(e) {
		e.preventDefault();

		var userChoice = $('.js-input-group input[name="answer"]:radio:checked').val();
		var newTotal = processResult(userChoice, obj, corrAnswersTotal);

		corrAnswersTotal = newTotal;

		var newCurrentState = checkState(obj);

		obj.currentState = newCurrentState.currentState;

		console.log("click button current state is " + obj.currentState);
		console.log("click button current question is " + obj.currQuestion);

		renderState(obj, corrAnswersTotal);
		
	});
}

function handleInitialState() { 
	var obj = { 
		currentState : 'index',
		currQuestion : 0 
	};

	renderState(obj);

	handleButtonClick(obj);
}

$(document).ready(handleInitialState);
