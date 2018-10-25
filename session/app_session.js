const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'sessionKeyForDemo',
    resave: false,
    saveUninitialized: true
}));

app.get('/count', (req, res) => {
    req.session.count ? req.session.count++ : req.session.count = 1;
    res.send(`Count: ${req.session.count}`);
});

app.listen(3000, () =>{
    console.log("Connected to 3000 port!");
});