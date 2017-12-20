const functions = require('firebase-functions');


function slowen() {
	return new Promise(resolve => setTimeout(resolve, 1000));
}

exports.slowifyApp = functions.https.onRequest((req, res) => {
	// determine if we're doing nothing, a delay, or an error
	const which = req.query.which;

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
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
