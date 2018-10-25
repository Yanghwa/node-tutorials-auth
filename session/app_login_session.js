const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser({extended: false}));
app.use(session({
    secret: 'sessionKeyForDemo',
    resave: false,
    saveUninitialized: true
}));

app.post('/auth/login', (req, res) => {
    //get from db but this case for test
    const usr = {
        username: 'testing',
        password: '12'
    }
    const uname = req.body.username;
    const pwd = req.body.password;
    uname === usr.username && pwd === usr.password ? res.redirect('/welcome') : res.send('Not Correct! <a href="/auth/login">Login</a>');
});

app.get('/auth/login', (req, res) => {
    const output = `
        <h1>Login</h1>
        <form action="/auth/login" method="post">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="password" name="password" placeholder="password">
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `;
    res.send(output);
});

app.listen(3000, () =>{
    console.log("Connected to 3000 port!");
});