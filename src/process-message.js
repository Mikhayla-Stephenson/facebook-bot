const fetch = require('node-fetch');
const API_AI_TOKEN = '692c976530a9470db9bda570f142f520';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const request = require('request');

const FACEBOOK_ACCESS_TOKEN =
	'EAAL09gwyIQkBAJeNyJNoOFGsERA7jvWrZAJHZAsZAZBF2LVL5ZB9ldu9Y2zaTNUl7iP3HLrXx339lA4NQDyhaQDRPsNO10uJllsYTFZBQqsucIupiCv71ZBiSQXQsrj08tlcagOuxxVKaZAba32ZBhecxtaF6y6UlsOQEV81cjmt4jcn951muZC5cb';

const sendTextMessage = (senderId, text) => {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: FACEBOOK_ACCESS_TOKEN },
		method: 'POST',
		json: {
			recipient: { id: senderId },
			message: { text }
		}
	});
};

module.exports = (event) => {
	const senderId = event.sender.id;
	const message = event.message.text;
	const apiaiSession = apiAiClient.textRequest(message, { sessionId: 'crowdbotics_bot' });
	apiaiSession.on('response', (response) => {
		const result = response.result.fulfillment.speech;
		sendTextMessage(senderId, result);
	});
	apiaiSession.on('error', (error) => console.log(error));
	apiaiSession.end();
};
