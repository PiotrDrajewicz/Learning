const authorize = (req, res, next) => {
    //we are setting query string
    const { user } = req.query;

    if (user === 'john') {
        //adding user property to req - we are attaching this user to that req
        req.user = { name: 'john', id: 3 };
        next();
    } else {
        res.status(401).send('unauthorized');
    }
}

module.exports = authorize;