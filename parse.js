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
        output += ' - Convert to CSV :  <button onclick="saveSheet()">Save</button><br/> \n';
    // read the file contents
    printTable(file);

    // post the results
    $('#list').append(output);
  }
    var transactions;
    var data;
    
function setValue(row,column){
        var getId = row.toString()+column.toString();
        var changedField = document.getElementById(getId);
        var value = changedField.value;
        data[row][column] = value;
        console.log('changed value with id: '+getId+' to:',value);
        var checked = false;
        if ((column === 0 || column === 1)&&(value !== '')){
            checked = true;
        }
        if (column === 2){
            checked = currencyCheck(value);
        }
        if (column === 3){
            checked = isNumeric(value);
        }
        if(checked){
            changedField.setAttribute('style','color:blue');
        } else {
            changedField.setAttribute('style','color:red');
        }
        checkValues();
    }
  
function checkValues(){
     var isCorrect = true;
     var formatError = '';
     for(var row in data) {
         var currentRow = parseInt(row)+parseInt(1);
         currencyField = document.getElementById(row.toString()+2);
         amountField = document.getElementById(row.toString()+3);
         if(currencyCheck(data[row][2])){
                currencyField.setAttribute('style','color:black');
             }else{
                    currencyField.setAttribute('style','color:red');
                    isCorrect = false;            
                    formatError += '</p>Currency data in row '+currentRow+' is incorrect;\n</p>';            
         }
         if(isNumeric(data[row][3])){
                amountField.setAttribute('style','color:black');
            }   else{
                amountField.setAttribute('style','color:red');
                isCorrect = false;
                formatError += '<p>Amount data in row '+ currentRow +' is incorrect;</p>\n';            
         }
         if(data[row][4]){
                isCorrect = false;
                formatError += 'Too many columns in file (>4)\n';
         }
     }
     var out = '';
     if(isCorrect){
            transactions = data;
            out+='<button onclick=sendTransactions(transactions)>Send</button> \n';
            //console.log(isCorrect);
        }else{
            out+='<p>Data in file is not correct. Please edit highlighted items and try again<p>\n';
            out+='<button onclick="checkValues()">re-check</button><br/>';
            out+='<i>Errors: '+formatError+'</i>\n';
            //console.log(formatError);
        }
     $('#control').html(out);
 }
    
  function printTable(file) {
    var reader = new FileReader();
    reader.readAsText(file);
    
    reader.onload = function(event){
      var csv = event.target.result;
      data = $.csv.toArrays(csv);
      var html = '';
      for(var row in data) {
        var currentRow = parseInt(row)+parseInt(1);
        html += '<tr>\r\n';
        html += '<td>'+currentRow+'</td><td><input type=text id="'+ row + 0 +'" onchange="setValue('+ row +','+ 0 +')" value='+data[row][0]+'></td>\r\n';
        html += '<td><input type=text id="'+ row + 1 +'" onchange="setValue('+ row +','+ 1 +')" value='+data[row][1]+'></td>\r\n';               
        html += '<td><input type=text id="'+row+2+'" onchange="setValue('+ row +','+ 2 +')" value='+data[row][2]+'></td>\r\n';//currency
        //console.log(data[row][2],currencyIndex);        
        html += '<td><input type=text id="'+ row + 3 +'" onchange="setValue('+ row +','+ 3 +')" value='+data[row][3]+'></td>\r\n';//amount
        html += '</tr>\r\n';       
      }    
        //console.log(html);
      $('#contents').html(html);
      checkValues();      
    };
    reader.onerror = function(){ alert('Unable to read ' + file.fileName); };   
    
  }

function sendTransactions(transactions){
    alert("sending transactions");
    var jsonData = new Array();
    function transaction(account, description, currency, amount, time){
        this.account = account;
        this.description = description;
        this.currency = currency;
        this.amount = amount;
        this.time = time;
    }
    for (var row in transactions){
        var currentTime = new Date();
        transactions[row][4] = currentTime.getDate()+'.'+parseInt(currentTime.getMonth()+1)+'.'+currentTime.getFullYear()+'-'
            +currentTime.getHours()+':'+currentTime.getMinutes()+':'+currentTime.getSeconds()+'.'+currentTime.getMilliseconds();
        jsonData[row] = new transaction(transactions[row][0],transactions[row][1],transactions[row][2],
                                        transactions[row][3],transactions[row][4]);
    /*
    $.post('http://127.0.0.1:64530/transaction?account='+transactions[row][0]+'&descr='+transactions[row][1]+'&currency='+transactions[row][2]+'&amount='+transactions[row][3])
    $.post('http://192.168.0.100:64530/transaction?account='+
            transactions[row][0]+'&descr='+transactions[row][1]
            +'&currency='+transactions[row][2]
            +'&amount='+transactions[row][3]
            +'&time='+currentTime.getDate()+'.'+parseInt(currentTime.getMonth()+1)+'.'+currentTime.getFullYear()+'-'
            +currentTime.getHours()+':'+currentTime.getMinutes()+':'+currentTime.getSeconds()+'.'+currentTime.getMilliseconds())    
    .done(function() {
        alert( "Data uploaded");
     
    });  */       
        
    }
    $.post('http://192.168.0.100:64503/send',{data: jsonData}, function(data){
        alert(data);
    });
}

function currencyCheck(charCode){
    if ((charCode.valueOf().length == 3)&&(CurrencyCodes.indexOf(charCode) >= 0)){
            return true;
    }
    return false;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function saveSheet(){
    //document.write(data.join(', '));
    document.write($.csv.fromArrays(data));
}