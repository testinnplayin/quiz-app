
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

function getAnswers(currQuestion) {
	return state.questions[currQuestion].a;
}

function getQuestion(currQuestion) {
	return state.questions[currQuestion].q;
}

function getAnswerFeedback(currQuestion) {
	var lng = state.answerFeedback.length;

	for(var i = 0; i < lng; i++)
	{
		if(state.answerFeedback[i]['questionID'] === state.questions[currQuestion]['questionID']) {
			return state.answerFeedback[i].answer;
		}
	}
}

function getQuestionID(currQuestion) {
	return state.questions[currQuestion].questionID;
}

function getAnswerID(currQuestion) {
	console.log('getanswerID ' + state.questions[currQuestion].answerID);
	return state.questions[currQuestion].answerID;
}



//DISPLAY FUNCTIONS

//Element display functions

function displayScore(element, totalVal, currVal) {
	$(element).find('.span-1').text(currVal);
	$(element).find('.span-2').text(totalVal);
	$(element).removeClass('hidden');
}

function displayButton(currentState) {
	var buttonTemplate = '<button type="submit" class="submit-btn js-submit-btn">' + state.button[currentState] + '</button>';
	return buttonTemplate;
}

function displayAnswers(currentState, currQuestion) {
	var answerArr = getAnswers(currQuestion);
	var lng = answerArr.length;
	var button = displayButton(currentState);

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


function renderFinalTemplate(currentState) {
	var page = state.pages[currentState];
	var button = displayButton(currentState);

	var bye = ("<p>Your final score was: </p><span class='span-1'></span> out of <span class='span-2'></span>");

	$('.js-main-container').html(bye);

	displayScore($('.js-main-container'), state.questions.length, state.questions[currQuestion].questionID);
	$('.js-current-ticker, .js-score').addClass('hidden');
}

function renderResultTemplate(currentState, currQuestion, corrAnswersTotal) {
	var page = state.pages[currentState];
	var button = displayButton(currentState);
	var answer = getAnswerFeedback(currQuestion);

	var result = ("<p>" + page + "</p>" + "<br />"
		+ "<p>" + answer + "</p><br />"
		+ "<p>You have <span class='span-1'></span> out of <span class='span-2'></span> questions correct."
		+ button);

	$('.js-main-container').html(result);

	displayScore($('.js-current-ticker'), state.questions.length, state.questions[currQuestion].questionID);
	displayScore($('.js-score'), corrAnswersTotal, currQuestion - corrAnswersTotal);
}

function renderQuestionTemplate(currentState, currQuestion, corrAnswersTotal) {
	var question = getQuestion(currQuestion);
	console.log("Got question! " + currQuestion);
	var questionDisplay = displayQuestion(question, questionTemplate, '#label');

	$('.js-main-container').html(questionDisplay);

	displayAnswers(currentState, currQuestion);
	displayScore('.js-score', corrAnswersTotal, currQuestion - corrAnswersTotal);
	displayScore('.js-current-ticker', state.questions.length, state.questions[currQuestion].questionID);
}

//Render view functions

function renderIndexView(currentState) {
	var page = state.pages[currentState];
	var button = displayButton(currentState);
	var welcome = "<h1>Monty Python Quiz Game!</h1>"
	+ '<p>' + page + '</p>' + button;

	$('.js-main-container').html(welcome);
}

function renderState(currentState, currQuestion, corrAnswersTotal) {
	if(currentState === 'index') {
		renderIndexView(currentState);
	} else if (currentState === 'questions') {
		renderQuestionTemplate(currentState, currQuestion, corrAnswersTotal);
	} else if (currentState === 'result') {
		currQuestion += 1;
		renderResultTemplate(currentState, currQuestion, corrAnswersTotal); 
	} else if (currentState === 'final') {
		renderFinalTemplate(container, currentState);
	}
}


//LOGIC FUNCTIONS

function processResult(userAnswer, currQuestion, corrAnswersTotal) {
	var correctAnswer = getAnswerID(currQuestion);

	if (parseInt(userAnswer) === parseInt(correctAnswer)) {
		corrAnswersTotal +=1;
	}

	return corrAnswersTotal;
}

function checkState(currentState, currQuestion) {

	while (currQuestion < 5) {

		if (currentState === "index") {
			currentState = "questions";
			handleButtonClick(currentState, currQuestion);
			return currentState;
		} else if (currentState === "questions") {
			currentState = "result";
			handleButtonClick(currentState, currQuestion);
			return currentState;
		} else if (currentState === "result") {
			currentState = "question";
			currQuestion += 1;
			return currentState;
		}

	}

	currentState = "final";
	handleButtonClick(currentState, currQuestion);

	return currentState;
}


//EVENT HANDLERS


function handleButtonClick(currentState, currQuestion) {
	var corrAnswersTotal = 0;

	$('.js-main-container').on('click', '.js-submit-btn', function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		var userChoice = $('.js-input-group input[name="answer"]:radio:checked').val();
		var newTotal = processResult(userChoice, currQuestion, corrAnswersTotal);
		console.log("User choice " + userChoice);
		console.log('newTotal: ' + newTotal);
		corrAnswersTotal = newTotal;

		var newCurrentState = checkState(currentState, currQuestion);

		currentState = newCurrentState;
		console.log("click button current state is " + currentState);
		console.log("click button current question is " + currQuestion);

		renderState(currentState, currQuestion, corrAnswersTotal);
		
	});
}

function handleInitialState() { //state.currentState = index, state.currQuestion = 0
	var currentState = 'index',
		currQuestion = 0;
	
	console.log("initial state is " + currentState);
	console.log("initial question is " + currQuestion);

	renderState(currentState, currQuestion);

	handleButtonClick(currentState, currQuestion);
}

$(document).ready(handleInitialState);
