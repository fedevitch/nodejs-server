// JavaScript source code
var http = require('http');
var url = require('url');

var server = new http.Server(function (req, res) {
    console.log(req.method, req.url);
    var urlParsed = url.parse(req.url, true);
    console.log(urlParsed);
    console.log(req.headers); //maybe should write this info to db?
    
    if (req.method == 'POST' && urlParsed.pathname == '/users' && urlParsed.query.name && urlParsed.query.age && urlParsed.query.from) {
        var mongojs = require('mongojs');
        var db = mongojs('localhost/users');
        var usersCollection = db.collection('users');
        usersCollection.insert({name: urlParsed.query.name, age: urlParsed.query.age, from: urlParsed.query.from});
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end("So, your name is " + urlParsed.query.name + ", you are " + urlParsed.query.age + " years old and your homeland is " + urlParsed.query.from + ", right?");
    } if (req.method == 'GET' && urlParsed.pathname == '/users') {
        var mongojs = require('mongojs');
        var db = mongojs('localhost/users');
        var usersCollection = db.collection('users');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        usersCollection.find(function (err, users) {
            // docs is an array of all the documents in collection
            if(err){
                throw err;                
            }            
                console.log(users);
                var response = JSON.stringify(users);
                console.log(response);
                res.end(response);        
        });        
    } if (req.method == 'GET' && urlParsed.pathname == '/total') {
//        var mongojs = require('mongojs');
//        var db = mongojs('localhost/users');
//        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
//        var userCollection = db.collection('users');
        /*aggregation
            var ageOfUsers = userCollection.aggregate([
            { $group: { _id: "$name", total: {$sum: "$age"}}}
        ]);
         */    
        
        /*userCollection.command(               //mapreduce for mong console
                mapFunction = function() {          //return sum of ages grouped by name
                    emit(this.name, this.age); 

                }, 
                reduceFunction = function(keyCustId, ageValues) { 
                    var result = {count:0};
                    ageValues.forEach(function(value){
                        result.count += parseInt(value);
                    });
                    return result; 
                }, 
                userCollection.mapReduce( 
                    mapFunction, 
                    reduceFunction, 
                    { 
                        out: {inline:1} 
                    } 
           ));
           */
//        console.log("agesum: "+ageSum);        
//        res.end(JSON.stringify(ageSum));        
    } else {
        res.statusCode = 404;
        //res.end("Not found");
    }   
});

server.listen(64530, "localhost");