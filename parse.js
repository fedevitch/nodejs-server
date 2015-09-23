$(document).ready(function() {
    if(isAPIAvailable()) {
      $('#files').bind('change', handleFileSelect);
    }
  });

  function isAPIAvailable() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
      return true;
    } else {
      // source: File API availability - http://caniuse.com/#feat=fileapi
      // source: <output> availability - http://html5doctor.com/the-output-element/
      document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
      // 6.0 File API & 13.0 <output>
      document.writeln(' - Google Chrome: 13.0 or later<br />');
      // 3.6 File API & 6.0 <output>
      document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
      // 10.0 File API & 10.0 <output>
      document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
      // ? File API & 5.1 <output>
      document.writeln(' - Safari: Not supported<br />');
      // ? File API & 9.2 <output>
      document.writeln(' - Opera: Not supported');
      return false;
    }
  }

  function handleFileSelect(evt) {
    $('#list').empty();
    var files = evt.target.files; // FileList object
    var file = files[0];

    // read the file metadata
    var output = '';
        output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
        //output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
        output += ' - Size: ' + file.size + ' bytes<br />\n';
        output += ' - Last modified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';

    // read the file contents
    printTable(file);

    // post the results
    $('#list').append(output);
  }
var transactions;

  function printTable(file) {
    var reader = new FileReader();
    reader.readAsText(file);
    
    reader.onload = function(event){
      var csv = event.target.result;
      var data = $.csv.toArrays(csv);
      var html = '';
      var isCorrect = true;
      var formatError = '';
      for(var row in data) {
        html += '<tr>\r\n';
        html += '<td>'+data[row][0]+'</td>\r\n';
        html += '<td>'+data[row][1]+'</td>\r\n';
        
        var currency = data[row][2];
        currencyIndex = indexof(currency);
        if(currencyIndex >= 0){
            html += '<td>'+data[row][2]+'</td>\r\n';//currency
            //console.log(currency,currencyIndex,CurrencyInfo[currencyIndex]);
        }else{            
            isCorrect = false;
            formatError += 'Currency data in row: '+row+' is incorrect;\n';
            html += '<td><font color="red">'+data[row][2]+'</font></td>\r\n';
            //console.log(currency,currencyIndex);
            
        }
        if(isNumeric(data[row][3])){
            html += '<td>'+data[row][3]+'</td>\r\n';//amount
        }   else{
            isCorrect = false;
            formatError += 'Amount data in row: '+row+' is incorrect;\n';
            html += '<td><font color="red">'+data[row][3]+'</font></td>\r\n';
        }
        if(data[row][4]){
            isCorrect = false;
            formatError += 'Too many columns in file (>4)\n';
        }
//        for(var item in data[row]) {
//          html += '<td>' + data[row][item] + '</td>\r\n';
//        }
        html += '</tr>\r\n';       
      }
      var out = '';
      if(isCorrect){
            transactions = data;
            out+='<button onclick=sendTransactions(transactions)>Send</button> \n';
            //console.log(isCorrect);
        }else{
            out+='<p>Data in file is not correct. Please edit highlighted items and try again<p>\n';
            out+='<i>Errors: '+formatError+'</i>\n';
            //console.log(formatError);
        }
      $('#contents').html(html);
      $('#control').html(out);
    };
    reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
  }

function sendTransactions(transactions){
    alert("sending transaction");
    for (var row in transactions){
    $.post('http://127.0.0.1:64530/transaction?account='+transactions[row][0]+'&descr='+transactions[row][1]+'&currency='+transactions[row][2]+'&amount='+transactions[row][3])
    .done(function() {
        alert( "Data uploaded");
  });
    }
}

function indexof(element){
    var index = 0;
    for (var currency in CurrencyInfo){
        //console.log(CurrencyInfo[currency].toString());
        //(typeof(CurrencyInfo[currency]) === typeof(element))&&
        if (element.toString() === CurrencyInfo[currency].toString()){
            index = currency;
        }
    }
    return index;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}