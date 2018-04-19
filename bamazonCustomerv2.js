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


  connection.connect(function(err) {
    if (err) throw err;
    queryItems();
  });


  //List query
  function queryItems() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
     // console.log(res);
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
    });
  }

  // function which prompts the user for what action they should take
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the id if the item you want to buy?"
      },
      {
        name: "stockQuantity",
        type: "input",
        message: "What many units would you like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])



    //test
    function queryItems() {
      // query the database for all items being auctioned
      connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
          .prompt([
            {
              name: "id",
              type: "rawlist",
              choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].id);
                }
                return choiceArray;
              },
              message: "What is the id if the item you want to buy?"
            },
            {
              name: "StockQuantity",
              type: "input",
              message: "How many units would you like to buy?"
            }
          ])
          .then(function(answer) {
            // get the information of the chosen item
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
              if (results[i].item_name === answer.choice) {
                chosenItem = results[i];
              }
            }
    
            // determine if bid was high enough
            if (chosenItem.stock_quantity < parseInt(answer.bid)) {
              // bid was high enough, so update db, let the user know, and start over
              connection.query(
                "UPDATE auctions SET ? WHERE ?",
                [
                  {
                    highest_bid: answer.bid
                  },
                  {
                    id: chosenItem.id
                  }
                ],
                function(error) {
                  if (error) throw err;
                  console.log("Bid placed successfully!");
                  start();
                }
              );
            }
            else {
              // bid wasn't high enough, so apologize and start over
              console.log("Your bid was too low. Try again...");
              start();
            }
          });
      });
    }

    