var restify = require('restify');

function respond(req, res, next) {
    res.send('hello' + req.params.name);
}

function saveProduct(req, res, next) {
    var id = 3;
    //req.on('data', function(chunk) {
        //console.log('receive some data');
    //});
    //req.on('end', function() {
    console.log([req.body, req.params]);
        res.header('Location', '/product/' + id);
        res.send(201);
    //});
}
var server = restify.createServer();
server.use(restify.bodyParser());
server.get('/hello/:name', respond);
server.head('/head/:name', respond);
server.post('/product', saveProduct);

server.listen(8088, function() {
    console.log('%s listtening at %s', server.name, server.url);
});
