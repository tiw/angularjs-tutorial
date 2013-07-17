var mdb = require(__dirname + '/mdb.js');

var server = new mdb.Server('localhost', 27017, {auto_reconnect: true});
db = new mdb.Db('crm', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'crm' database");
        db.collection('products', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'products' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

var dbMapper = new mdb.DbMapper(db, 'products');
exports.findById = dbMapper.findById;
exports.findAll = dbMapper.findAll;
exports.addProduct = dbMapper.add;
exports.updateProduct = dbMapper.update;
exports.deleteProduct = dbMapper.remove;
