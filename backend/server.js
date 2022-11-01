const express = require('express');
require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');
const morgan = require('morgan');

//all configuretion are store in .env file
require('dotenv').config();

const app = express();

//==== Middleware ====
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// request logger
app.use(morgan('tiny'));
//overwrite express defult error handler
app.use(errorHandler);
app.use(cors());

//==== DB ====
const connectDB = require('./database/db');
connectDB();

//==== ROUTES ====
//Import Routes
const usersRoute = require('./routes/users');
const tournamentRoute = require('./routes/tournament');
const classRoute = require('./routes/class');
const safesRoute = require('./routes/safes');
const adminRoute = require('./routes/admin');

app.use('/users', usersRoute);
app.use('/tournament', tournamentRoute);
app.use('/class', classRoute);
app.use('/safes', safesRoute);
app.use('/admin', adminRoute);

//defult route
app.get('/', (req, res) => {
	res.status(200).send('There is nothing in here.');
});

PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server runs on http://localhost:${PORT}`);

	// Developer Notes
	// Upload safe just erases old one, make sure can't upload if tournamnet started
	console.log('Check Debug(server.js: line 63)'.rainbow);
});
