const express = require('express');
const app = express();
const { products } = require('./data');

//.json - converts js objects into json string using json.stringify()
//:productID (in js) - route parameter - placeholder in which user is providing data, string that is sitting in request (in property 'params')
//query?search=a&limit=2 (in url) - query string - user provides those parameters and we can access them and e.g. search with them 

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

//query string
app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query;
    let sortedProducts = [...products];

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if (sortedProducts.length < 1) {
        // res.status(200).send('no products matched your search');
        //we must put return here because we can send only one res in req (after the 'return' the reading is being stopped)
        return res.status(200).json({ seccess: true, data: [] });
    }
    //its good practice to put 'return' here aswell (but not necesarry because its the last line in that block)
    res.status(200).json(sortedProducts);
})

app.listen(5000, () => {
    console.log('server is listening on 5000');
})