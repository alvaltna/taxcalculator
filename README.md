# Tax Calculator App

## In 'Home view'
App calculates net prices of products based on country VAT value.<br />
List of items can be added with gross prices.<br />
Calculated net prices depend on which country is chosen.<br />
<br />
Initially there are three countries<br />
<br />
Estonia (ISO EE, VAT 20%) <br />
Latvia (ISO LV, VAT 21%) <br />
Canada (ISO CA, VAT 13%) <br />
<br />
## In 'Countries view'<br />
<br />
There is a table of countries with their data.<br />
Country's data can be edited. <br />
Countries can be deleted from the table.<br />
New countries can be added to the table. <br />
<br />
All the actions in 'Countries view' demand JWT to be sent with the request. <br />
JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SneQiuAGUW9aTpxlNNbMkEoYNj7v4-Sw_5jl13-hosk <br />
This JWT must be added to browser Local Storage. <br /> 
Key: 'Authorization' <br />
Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SneQiuAGUW9aTpxlNNbMkEoYNj7v4-Sw_5jl13-hosk<br />
<br />
## Setup <br /> 
<br />
Make sure you have Docker on your machine. <br />
Clone this repository to a folder. <br />
Run command 'docker-compose up' from working directory which is where docker-compose.yml file is located.<br /> 
<br />
Application should then be accessable from 'localhost:8080'.<br />
