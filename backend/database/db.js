const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.DB_CONNECTION);

		console.log(`MongoDB Connected: ${connection.connection.host}`.cyan.underline);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = { connectDB };
