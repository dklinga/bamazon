DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE auctions(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price INT,
  stock_quantity INT,
  PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone x", "electronics", "500", "32");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LED TV", "electronics", "600", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Legos", "toys", "11", "50");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("water ballons", "toys", "3", "100");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Big trouble in little china", "DVD", "20", "8");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Star Wars", "DVD", "25.00", "25");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "outdoors", "120", "16");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kite", "outdoors", "30", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog", "pets", "300", "3");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog food", "pets", "45", "50");

