//wrap async and then we don't have to use try catch
const aysncHanler = require('express-async-handler');

const welcome = aysncHanler(async (req, res) => {
	res.status(200).json('You are the mighty one!');
});

module.exports = { welcome };
