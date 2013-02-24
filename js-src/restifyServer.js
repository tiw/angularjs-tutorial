var express;
express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var product = require(__dirname + '/mocks-data/product.js');

// test data base dir
// var testDir = __dirname + '/mocks-data';
var app = express();
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'app')));

app.get('/products', product.findAll);
app.get('/products/:id', product.findById);
app.post('/products', product.addProduct);
app.put('/products/:id', product.updateProduct);
app.delete('/products/:id', product.deleteProduct);

app.listen(3030);
