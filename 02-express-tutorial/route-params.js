const express = require('express');
const app = express();
const { products } = require('./data');

//.json - converts js objects into json string using json.stringify()
//:productID - route parameter - placeholder in which user is providing data, string that is sitting in request (in property 'params')

app.get('/', (req, res) => {
    res.send('<h1>Home page</h1><a href="/api/products">products</a>')
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image };
    })
    res.json(newProducts);
})

app.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params;
    const singleProduct = products.find((product) => product.id === Number(productID));
    if (!singleProduct) {
        return res.status(404).send('Product doesnt exist');
    }
    return res.json(singleProduct);
})

app.listen(5000, () => {
    console.log('server is listening on 5000');
})