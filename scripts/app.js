var state = {
	index: 'start page',
	questions: [
		{
			q : "What word used in a <i>Monty Python</i> sketch came to be used very frequently in internet jargon?",
			a : ["troll", "newb", "spam", "flamewars"],
			questionID: 1
		},
		{
			q: "Which <i>Monty Python</i> movie featured the song <i>Always Look on the Bright Side of Life</i>?",
			a: ["<i>Monty Python's Life of Brian</i>", "<i>Monty Python and the Holy Grail</i>", "<i>Monty Python's The Meaning of Life</i>", "None, it was in their TV series"],
			questionID: 2
		},
		{
			q: "Which 'Python' went on to produce several history series for television?",
			a: ["Eric Idle", "John Cleese", "Terry Gillian", "Terry Jones"],
			questionID: 3
		},
		{
			q: "What year was <i>Monty Python's Flying Circus</i> first shown on television in the United Kingdom?",
			a: ["1975", "1969", "1980", "2001"],
			questionID: 4
		},
		{
			q: "What other British comedy series did Python John Cleese star in?",
			a: ["<i>Absolutely Fabulous</i>", "<i>The New Statesman</i>", "<i>Fawlty Towers</i>", "<i>Little Britain</i>"],
			questionID: 5
		}
	],
	result: 'result for single question',
	final: 'final score'
};


function handleSubmit(form) {
	form.submit(function(e) {
		e.preventDefault();
		e.stopPropagation();


	});
}

function handleActions() {
	var form = $('.question-form');

	handleSubmit(form);
}

$(document).ready(handleActions);