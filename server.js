/* Created by RasmusChristiansen on 10/03/2017.*/
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');

const db = configureMongoose();
const app = configureExpress();

app.listen(3000);
module.exports = app;


console.log('Server running at http://localhost:3000/');