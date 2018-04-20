var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});


connection.connect(function (err) {
    if (err) throw err;
    start();
});


// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "menuOptions",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.menuOptions.toUpperCase() === "View Products for Sale") {
                viewInventory();
            }
            else if (answer.menuOptions.toUpperCase() === "View Low Inventory") {
                lowInventory();
            }
            else if (answer.menuOptions.toUpperCase() === "Add to Inventory") {
                addInventory();
            }
            else if (answer.menuOptions.toUpperCase() === "Add New Product") {
                addNew();
            }
        });
}

//view inventory 
function viewInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        start();
    });
}

//view low
function lowInventory() {
    var query = connection.query(
        "SELECT * FROM products WHERE stock_quantity=?", [<=5], function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            }
        });

        //views inventory lower than 5
function viewLowInventory(){
    console.log('>>>>>>Viewing Low Inventory<<<<<<');
  
    connection.query('SELECT * FROM Products', function(err, res){
    if(err) throw err;
    console.log('----------------------------------------------------------------------------------------------------')
  
    for(var i = 0; i<res.length;i++){
      if(res[i].StockQuantity <= 5){
      console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
      console.log('--------------------------------------------------------------------------------------------------');
      }
    }
  
    start();
    });
  }

    //add inventory 
    function addInventory() {


        //add new 
        function addNew() {
            console.log("Inserting a new product...\n");
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    flavor: "Rocky Road",
                    price: 3.0,
                    quantity: 50
                },
                function (err, res) {
                    console.log(res.affectedRows + " product inserted!\n");
                    // Call updateProduct AFTER the INSERT completes
                    updateProduct();
                }
            );