const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = require('./logger');
const authorize = require('./authorize');

// req => middleware => res
//middleware - function where we can do something with our data before sending final res (in the end we must pass it to another middleware with next or pass our res)

//adds logger middleware to every route (it must be invoked before app.get - everything in express goes in order)
// app.use(logger);

//if we provide path, logger will be added to all routes below /api
// app.use('/api', logger);

//provide multiple middleware functions (they are executed in order)
// app.use([logger, authorize]);

app.use(morgan('tiny'));

//we are passing middleware function between path and callback (express automatically passes arguments into it)
app.get('/', (req, res) => {
    res.send('homee');
})

app.get('/about', (req, res) => {
    res.send('about');
})

app.listen(5000, () => {
    console.log('server is listening on 5000');
})