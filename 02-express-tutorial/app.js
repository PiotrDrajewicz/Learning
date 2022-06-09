const express = require('express');
const app = express();

const people = require('./routes/people');
const auth = require('./routes/auth');

//making assets static (with built in middleware)
app.use(express.static('./methods-public'));
//parse form data
app.use(express.urlencoded({ extended: false }));
//parse json
app.use(express.json());

//'people' applied to routes that start with '/api/people' (those routes will be in directory './routes/people')
app.use('/api/people', people);
//'auth' applied to routes that start with '/login'
app.use('/login', auth);

app.listen(5000, () => {
    console.log('server is listening on 5000');
})