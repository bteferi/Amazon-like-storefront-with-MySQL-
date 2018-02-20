DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(

  item_id INT NOT NULL AUTO_INCREMENT,
  product_name  VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price   INT(100) NOT NULL,
  stock_quantity INT(100) NOT NULL,
  PRIMARY KEY (item_id)

);



INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Iphone X", "electronics", "200", "12");

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("PlayStation", "electronics", "100", "5");


INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Lipitor", "pharmaceutical", "50", "10");


INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Drone", "electronics", "300", "8");

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("star Wars", "movies", "15", "50");


INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Harry Potter", "book", "25", "25");


INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("iPad", "tablet", "75", "10");


INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("iPhone", "smartphone", "320", "7");


INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Coconut oil", "cosmetics", "25", "75");


INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Green Tea", "health", "10", "75");

