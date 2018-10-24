const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('cookiekeys'));

app.get('/count', (req, res) => {
    let count;
	req.signedCookies.count ? count = parseInt(req.signedCookies.count) : count = 0
	count = count + 1
	res.cookie('count', count, {signed: true});
	res.send('Count: ' + count);
});

app.listen(3000, function() {
	console.log("connected to port 3000");
});