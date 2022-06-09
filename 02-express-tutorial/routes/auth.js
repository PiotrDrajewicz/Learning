const express = require('express');
const router = express.Router();

//post method - form example
//with 'post' method we are sending body of req (in app.get there was no body)
//we can access the value of the form, thanks to middleware express.urlencoded
//'action' in form in html - we are sending input there ('/login' path is on our server and we are sending there provided input)
//'name' in input in html - key of the provided value
//we changed '/login/ into '/' due to router
router.post('/', (req, res) => {
    // const {name} = req.body;
    const name = req.body.name;
    if (name) {
        return res.status(200).send(`hello ${name}`);
    }

    res.status(401).send('please enter name');
})

module.exports = router;