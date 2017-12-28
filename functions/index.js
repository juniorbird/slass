const functions = require('firebase-functions');
const config = require('./config');


const outcomes = {
	ERROR: 'error',
	SLOW: 'slow',
	NORMAL: true,
};

function slowen() {
	let howSlow = Math.floor(Math.random() * 1000 * config.annoyanceLevel);

	return new Promise(resolve => setTimeout(resolve, howSlow));
}

function determineOutcome() {
	let rando = Math.floor(Math.random() * 10);

	if (rando < config.failureLevel) return outcomes.ERROR;
	if (rando < config.annoyanceLevel) return outcomes.SLOW;
	return outcomes.NORMAL;
}

exports.slowifyApp = functions.https.onRequest((req, res) => {
	// determine if we're doing nothing, a delay, or an error
	const which = determineOutcome();

	switch (which) {
		case 'slow':
			slowen().then(slow => res.status(200).end('Success, slowly!'));
			break;
		case 'error':
			res.status(503).end('Server Unavailable');
			break;
		default:
			res.status(200).end('Success (ish)');
	}
});