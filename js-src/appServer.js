
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

// mysql conection
var mysql = require('mysql');
console.log('Connecting to MySQL...');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'app')));
});
app.configure('development', function(){
  app.use(express.errorHandler());
});

function connectionServer(){
  var client = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'ppm',
  });
  client.connect();
  return client;
}

// create
app.post('/product.json', function(req, res){
  var data ={};
  data.name = 'hello';
  data.publishAt = new Date();
  data.price = '111';
  return res.send(data);
});

// read
app.get('/product.json', function(req, res){
  var client = connectionServer();
  client.query('SELECT * from product', function selectCb(err, rows, fields){
    if (err) throw err;
    res.send(JSON.stringify(rows));
  });
  client.end();
});

app.get('/product.json/:id', function(req, res){
  var id = req.params.id;
  var client = connectionServer();
  client.query('SELECT * from product where id='+id, function selectCb(err, rows, fields){
    if (err) throw err;
    res.send(JSON.stringify(rows[0]));
  });
});

// update
app.put('/product.json/:id', function(req, res){
  console.log('update');
  var data ={};
  data.name = 'hello';
  data.publishAt = new Date();
  data.price = '111';
  return res.send(data);
});

// delete
app.delete('/product.json/:id', function(req, res){
  console.log('delete');
  return res.send('delete');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
