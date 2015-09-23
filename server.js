var express = require('express');
var hbs = require('express-hbs');
var app = express();
var url = require('url');

app.post('/transaction', function(req, res) {
  var urlParsed = url.parse(req.url, true);
  if(urlParsed.query.account && urlParsed.query.descr && urlParsed.query.currency && urlParsed.query.amount){
	var mongojs = require('mongojs');
        var db = mongojs('localhost/transactions');
        var transactionsCollection = db.collection('transactions');
        transactionsCollection.insert({account: urlParsed.query.account, description: urlParsed.query.descr, currency: urlParsed.query.currency, amount:urlParsed.query.amount});
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        console.log("Recorded to db transaction: account : " + urlParsed.query.account + ", description: " + urlParsed.query.descr + ",currency: " + urlParsed.query.currency + ", amount: "+urlParsed.query.amount);
        res.end('Data accepted');  
  }
});

app.get('/transactions', function(req, res) {
    var urlParsed = url.parse(req.url, true);
    var mongojs = require('mongojs');
    var db = mongojs('localhost/transactions');
    var transactionsCollection = db.collection('transactions');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    transactionsCollection.find(function (err, transactions) {
        // docs is an array of all the documents in collection
        if(err){
            throw err;                
        }        
        var resHtml = '';
        //resHtml += '<a href="index.html" name="back">Back</a>';
        resHtml += '<table id="contents" style="width:100%; height:400px;" border>';
        resHtml += '<tr>\r\n';
        resHtml +='<td>id</td>\r\n<td>account</td>\r\n<td>description</td>\r\n<td>currency</td>\r\n<td>amount</td></tr>';
        for (var row in transactions){
            resHtml += '<tr>\r\n';                    
            for(var item in transactions[row]) {
              resHtml += '<td>' + transactions[row][item] + '</td>\r\n';
            }
            resHtml += '</tr>\r\n';

        }
        resHtml += '</table>';        
        res.end(resHtml);
    })
});

var server = app.listen(64530, function () {
    console.log('server started');
});