var http = require('http');
var url = require('url');

var server = new http.Server(function (req, res) {
    console.log(req.method, req.url);
    var urlParsed = url.parse(req.url, true);
    console.log(urlParsed);
    console.log(req.headers); //
    
    if (req.method == 'POST' && urlParsed.pathname == '/transaction' && urlParsed.query.account && urlParsed.query.descr && urlParsed.query.currency && urlParsed.query.amount) {
        var mongojs = require('mongojs');
        var db = mongojs('localhost/transactions');
        var transactionsCollection = db.collection('transactions');
        transactionsCollection.insert({account: urlParsed.query.account, description: urlParsed.query.descr, currency: urlParsed.query.currency, amount:urlParsed.query.amount});
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        console.log("Recorded to db transaction: account : " + urlParsed.query.account + ", description: " + urlParsed.query.descr + ",currency: " + urlParsed.query.currency + ", amount: "+urlParsed.query.amount);
        res.end('Data accepted');
    }if (req.method == 'GET' && urlParsed.pathname == '/transactions') {
        var mongojs = require('mongojs');
        var db = mongojs('localhost/transactions');
        var transactionsCollection = db.collection('transactions');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        transactionsCollection.find(function (err, transactions) {
            // docs is an array of all the documents in collection
            if(err){
                throw err;                
            }            
                console.log(transactions);
                var response = JSON.stringify(transactions);
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
                console.log(response);
                res.end(resHtml);        
        }); 
    }
    });
server.listen(64530,"localhost");