const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('cookieProductKey'));

const products = {
    1: { title: 'Web 1'},
    2: { title: 'Web 2'},
};

app.get('/products', (req, res) => {
    let output = '';
    for(let key in products) {
        output += `
            <li>
                <a href="/cart/${key}">${products[key].title}</a>
            </li>
        `;
    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);

});

app.get('/cart/:id', (req, res) => {
    let id = req.params.id;
    let cart;
    if(req.signedCookies.cart) {
		cart = req.signedCookies.cart;
	} else {
		cart = {};
	}
	if(!cart[id]) {
		cart[id] = 0;
	}
	cart[id] = parseInt(cart[id]) + 1;
	res.cookie('cart', cart, {signed: true});
	res.redirect('/cart');
});

app.get('/cart', (req, res)  => {
	let cart = req.signedCookies.cart;
	if(!cart) {
		res.send('!empty!');
    } else {
        let output = '';
        for(let id in cart) {
            output += `<li>${products[id].title} (${cart[id]}) </li>`;
        }
        res.send(`<h1>Cart</h1><ul>${output}</ul><a href='/products'>Products list</a>`);
    }
});

app.listen(3000, function() {
	console.log("connected to port 3000");
});