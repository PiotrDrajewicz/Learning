const express = require('express');
const path = require('path');
const app = express();

//app.use - for setting up a middleware
//static assets - static files that server doesnt have to hange (when we create public folder or static. Its an image file, styles file. js file)

app.use(express.static('./public'));

//we also put index.html into public and we dont need this code then 
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
// })

app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>');
})

app.listen(5000, () => {
    console.log('server is listening on 5000');
})