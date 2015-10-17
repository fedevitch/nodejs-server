var express = require('express');
//var hbs = require('express-hbs');
var app = express();
var url = require('url');
var mongojs = require('mongojs');
var db = mongojs('localhost/transactions');
var transactionsCollection = db.collection('transactions');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.post('/transaction', function(req, res) {//deprecated
    var receivedData = req.var;
   var urlParsed = url.parse(req.url, true);
   if(urlParsed.query.account && urlParsed.query.descr && urlParsed.query.currency && urlParsed.query.amount && urlParsed.query.time){	
        transactionsCollection.insert({account: urlParsed.query.account, description: urlParsed.query.descr, currency: urlParsed.query.currency, amount:urlParsed.query.amount, dateTime:urlParsed.query.time});
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        console.log("Recorded to db transaction: account : " + urlParsed.query.account + ", description: " + urlParsed.query.descr + ",currency: " + urlParsed.query.currency + ", amount: "+urlParsed.query.amount + ", time: "+urlParsed.query.time);
        res.end('Data accepted');  
  }
});

app.post('/send', function(req, res) {    
    console.log(req.body);	
    transactionsCollection.insert(req.body.data);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.write(req.body.length+" transactions recorded to db succesfully");
    console.log(req.body.data.length+" transactions recorded to db succesfully");
    res.end('Data accepted');
});

app.get('/transactions', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    console.log('Request list from: '+req.headers.host);
    transactionsCollection.find(function (err, transactions) {
        // docs is an array of all the documents in collection
        if(err){
            throw err;                
        }        
        var resHtml = '';
        //resHtml += '<a href="index.html" name="back">Back</a>';
        resHtml += '<table id="contents" style="width:100%; height:400px;" border>';
        resHtml += '<tr>\r\n';
        resHtml +='<td>#</td>\r\n<td>account</td>\r\n<td>description</td>\r\n<td>currency</td>\r\n<td>amount</td></tr>';
        for (var row in transactions){
            resHtml += '<tr>\r\n';                    
            for(var item in transactions[row]) {
                //console.log('output [ '+row+' : '+item+' ]: '+transactions[row][item]);
				if (item === '_id'){
                    resHtml += '<td>' + parseInt(parseInt(row)+parseInt(1)) + '</td>\r\n';
                    continue;
                }else{
                    resHtml += '<td>' + transactions[row][item] + '</td>\r\n';
                }
				
            }
            resHtml += '</tr>\r\n';

        }
        resHtml += '</table>';        
        res.end(resHtml);
    })
});

var server = app.listen(64503, function () {
    console.log('server started');
});
