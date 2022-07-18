# Tax Calculator App

## In 'Home view'
App calculates net prices of products based on country VAT value. 
List of items can be added with gross prices. 
Calculated net prices depend on which country is chosen.   

Initially there are three countries

Estonia (ISO EE, VAT 20%)
Latvia (ISO LV, VAT 21%)
Canada (ISO CA, VAT 13%)

## In 'Countries view'

There is a table of countries with their data.
Country's data can be edited. 
Countries can be deleted from the table.
New countries can be added to the table. 

All the actions in 'Countries view' demand JWT to be sent with the request. 
JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SneQiuAGUW9aTpxlNNbMkEoYNj7v4-Sw_5jl13-hosk 
This JWT must be added to browser Local Storage.  
Key: 'Authorization'
Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SneQiuAGUW9aTpxlNNbMkEoYNj7v4-Sw_5jl13-hosk

## Setup 

Make sure you have Docker on your machine. 
Clone this repository to a folder. 
Run command 'docker-compose up' from working directory which is where docker-compose.yml file is located. 

Application should then be accessable from 'localhost:8080'.
