# nodejs-server
simple scripts for nodejs server
server.js - script for server. Requests:
	- /transaction (method POST) : record to database transaction. Parameters:
		account = string value;
		decr = string value;
		currency = currency code value (USD, UAH, JPY for example);
		amount = number value;
	- /transactions (method GET) : return table with all transactions in database
parse.js - script for client. Check if valid user transaction data.
currency.js - list of currency codes.
send.html - interface for send data.
transactions.html - interface for display transactions.
index.html - main page.
