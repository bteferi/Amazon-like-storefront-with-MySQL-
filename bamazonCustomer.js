var inquirer = require("inquirer")
var mysql = require("mysql")
  require("dotenv").config();


//
// console.log(process.env.DB_HOST);
//
// console.log(process.env.DB_PORT)
//
// console.log(process.env.DB_USER);
//
// console.log(process.env.DB_PASSW)


var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,

  // Your username
  user: process.env.DB_USER,

  // Your password
  password: process.env.DB_PASSW,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // SAVE THE RESPONCE AS A VAR
    console.log(res[0]);
    console.log(res[0].price); // how to parse it 
    connection.end();
  });
}
