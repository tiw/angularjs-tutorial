var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var product = require(__dirname + '/mocks-data/product.js');

// test data base dir
var testDir = __dirname + '/mocks-data';
var app = express();
app.use(express.bodyParser());

app.get('/products', function(req, res) {
    res.status('200');
    res.setHeader('Content-Type', 'application/json');
    res.end('[{"id": 1, "name": "iphone"}]');
});

function mockHandler(fileName, accept, res) {
    var fullPath = testDir + '/' + fileName;
    var accepts = accept.split(',');
    if (accepts[0] === 'application/json') {
        fullPath = testDir + '/' + fileName + '.json';
    }
    fs.exists(fullPath, function(exists) {
        if (exists) {
            console.log('exists');
            fs.readFile(fullPath, function(err, content) {
                if (err) {
                    res.status(500);
                    res.end();
                } else {
                    console.log(content);
                    res.status(200);
                    res.end(content);
                }
            });
        } else {
            console.log([fullPath + ' donesn\'t exists', accept]);
            res.status(500);
        }
    });
}

app.get('/products/:id', function(req, res) {
    // try to find product.json.:id and return the content back.
    var acceptHeader = req.get('accept');
    var mockFile = 'product.get.' + req.params.id;
    mockHandler(mockFile, acceptHeader, res);
});

app.post('/products', product.addProduct);
//app.post('/products', function(req, res) {
    //console.log([req.body, req.params]);
//});

app.use(express.static(path.join(__dirname, 'app')));

app.listen(3030);
