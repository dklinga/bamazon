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

function start() {
  //prints the items for sale and their details
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");

    console.log(' ');
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "What is the ID of the product you would like to purchase?",
        validate: function (value) {
          if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: "input",
        name: "stock_quantity",
        message: "How much would you like to purchase?",
        validate: function (value) {
          if (isNaN(value)) {
            return false;
          } else {
            return true;
          }
        }
      }
    ]).then(function (ans) {
      var idBuy = (ans.id) - 1;
      var quantityToBuy = parseInt(ans.stock_quantity);
      var total = parseFloat(((res[idBuy].price) * quantityToBuy).toFixed(2));

      //check if quantity is sufficient
      if (res[idBuy].stock_quantity >= quantityToBuy) {
        //after purchase, updates quantity in Products
        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: (res[idBuy].stock_quantity - quantityToBuy)
          },
          {
            id: ans.id
          }
        ], function (err, result) {
          if (err) throw err;
          console.log("Your total is $" + total.toFixed(2));
        });

        connection.query("SELECT * FROM department_name", function (err, deptRes) {
          if (err) throw err;
          var index;
          for (var i = 0; i < deptRes.length; i++) {
            if (deptRes[i].department_name === res[idBuy].department_name) {
              index = i;
            }
          }

          //updates totalSales in departments 
          connection.query("UPDATE products SET ? WHERE ?", [
            {
              department_name: res[idBuy].department_name
            },
          ], function (err, deptRes) {
            if (err) throw err;
          });
        });

      } else {
        console.log("Insufficient quantity!");
      }

      tryAgain();
    })
  })
}

//asks if they would like to purchase another item
function tryAgain() {
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like something else?"
  }]).then(function (ans) {
    if (ans.reply) {
      start();
    } else {
      console.log("Have a nice day!");
    }
  });
}

start();