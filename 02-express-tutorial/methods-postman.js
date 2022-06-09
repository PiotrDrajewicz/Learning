const express = require('express');
const app = express();
let { people } = require('./data');

//making assets static (with built in middleware)
app.use(express.static('./methods-public'));
//parse form data
app.use(express.urlencoded({ extended: false }));
//parse json
app.use(express.json());

//post method - form example
//with 'post' method we are sending body of req (in app.get there was no body)
//we can access the value of the form, thanks to middleware express.urlencoded
//'action' in form in html - we are sending input there ('/login' path is on our server and we are sending there provided input)
//'name' in input in html - key of the provided value 
app.post('/login', (req, res) => {
    // const {name} = req.body;
    const name = req.body.name;
    if (name) {
        return res.status(200).send(`hello ${name}`);
    }

    res.status(401).send('please enter name');
})

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people });
})

// post method - js example
app.post('/api/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'please provide name value' });
    }
    res.status(201).json({ success: true, person: name });
})

app.post('/api/people/postman', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'please provide name value' });
    }
    res.status(201).json({ success: true, data: [...people, name] });
})

app.put('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find(person => person.id === Number(id));

    if (!person) {
        return res.status(404).json({ success: false, msg: `no person with id ${id}` });
    }
    //both arrays - people and newPeople are changed
    const newPeople = people.map(person => {
        if (person.id === Number(id)) {
            person.name = name;
        }
        return person;
    })
    res.status(200).json({ success: true, data: newPeople });
})

app.delete('/api/people/:id', (req, res) => {
    const person = people.find(person => person.id === Number(req.params.id));

    if (!person) {
        return res.status(404).json({ success: false, msg: `no person with id ${req.params.id}` });
    }
    const newPeople = people.filter((person) => person.id !== Number(req.params.id));

    return res.status(200).json({ success: true, data: newPeople });
})

app.listen(5000, () => {
    console.log('server is listening on 5000');
})