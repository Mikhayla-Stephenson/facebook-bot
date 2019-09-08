const fetch = require('node-fetch');

const { FACEBOOK_ACCESS_TOKEN } = process.env;

const sendTextMessage = (userId, text) => {
	return fetch(
		`https://graph.facebook.com/v2.6/me/messages?access_token=EAAL09gwyIQkBAJeNyJNoOFGsERA7jvWrZAJHZAsZAZBF2LVL5ZB9ldu9Y2zaTNUl7iP3HLrXx339lA4NQDyhaQDRPsNO10uJllsYTFZBQqsucIupiCv71ZBiSQXQsrj08tlcagOuxxVKaZAba32ZBhecxtaF6y6UlsOQEV81cjmt4jcn951muZC5cb`,
		{
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				messaging_type: 'RESPONSE',
				recipient: {
					id: userId
				},
				message: {
					text
				}
			})
		}
	);
};

module.exports = (event) => {
	let time = event.timestamp;
	var date = new Date(time);
	var hour = date.getHours();
	console.log(hour);
	const userId = event.sender.id;
	let mess = 'Keep Working Helen';
	if (hour < 7 || hour > 19) {
		mess = 'Go Home Helen';
	}
	return sendTextMessage(userId, mess);
};
