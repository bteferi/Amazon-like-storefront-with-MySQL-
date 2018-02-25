var inquirer = require("inquirer")
var mysql = require("mysql")

var selectedCus_Id;
var selectedItemName;
var selectedItemQty;
var selectedItemPrice;

require("dotenv").config();

//====================================================================//

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,

  // Your username
  user: process.env.DB_USER,

  // Your password
  password: process.env.DB_PASSW,
  database: "bamazon"
});
//==========================================================================//

connection.connect(function(err) {
  if (err) throw err;

  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "confirm",
        message: "welcome to Bamazon!Would you like to shope?",
        name: "letShop",
        default:true
         //====what if customer doesnt wana shop
      },
    ]).then(function(yesIwannaShop) {
          var LetsShop = yesIwannaShop.letShop
          if(LetsShop==true){
            console.log(" *****************HERE IS EVERTHING IN STORE*******************");
            everythingInStore();
          }else{
            console.log("Please visit us on your payday")

          }
    })


  // console.log(" *****************HERE IS EVERTHING IN STORE*******************");
  // everythingInStore();
  //
});
//===========================BELOW IS WHERE i CAN ADD MY CODE TO PRING ==/

function everythingInStore() {
  connection.query('SELECT * FROM products', function(error, res) {
    if (error) throw err;
    //======================no error go to the next step ===
    // console.log(res)
    res.forEach(function(res) {
      // console.log(res);
      console.log("Item Id :" + res.item_id + " , name : " + res.product_name + " , Dept : " + res.department_name + ", Price" + res.price + "\n");
      console.log("-----------------------------------------------------------------------------------");
    });
    selectProductId();

  });
}

//================== question for customers ==//

// selectProductId();
function selectProductId() {

  // console.log("yello")
  inquirer.prompt([

    {
      type: "input",
      message: "Please enter the Product ID for the Item you would like to purchase?",
      name: "PickProductID",

    },
  ]).then(function(inquirerResponse) {

    connection.query('SELECT * FROM products WHERE ?', {
      item_id: inquirerResponse.PickProductID
    }, function(error, selectedItem) {
      if (error) throw error;
      selectedCus_Id = inquirerResponse.PickProductID;

      for (var i = 0; i < selectedItem.length; i++) {
        selectedItemName = selectedItem[i].product_name
        selectedItemQty = parseInt(selectedItem[i].stock_quantity);
        selectedItemPrice = parseInt(selectedItem[i].price);
        selectedItemID = selectedItem[i].item_id;

        console.log("You have selected" + "  Item ID  : " + selectedItemID)
        console.log("Product name   :" + selectedItemName)
        // console.log(selectedItemQty)
        console.log("Product Price   :$" + selectedItemPrice)
        // grabbing users input and displaying the specific details of product
      }

      inquirer.prompt([{
        type: "input",
        message: " The store currently has " + selectedItemQty + " of " + selectedItemName + " how many would you like to purchase ?",
        name: "readytoBuy"
      }]).then(function(pickQtytoPurchase) {

        connection.query('UPDATE products SET ? WHERE ?', [{
              stock_quantity: pickQtytoPurchase.readytoBuy
            },
            {
              item_id: inquirerResponse.PickProductID
            }
          ],
          function(error, myd) {
            if (error) throw error;
            var selectedCus_amount = pickQtytoPurchase.readytoBuy;

            console.log(" you have selected to purchase :  " + selectedCus_amount + "   amount of this item")

            if (selectedCus_amount > selectedItemQty) {
              console.log("SOLD OUT FOR THAT Amount ")
            } else {
              for (var i = 0; i < selectedCus_amount.length; i++) {
                selectedItemQty -= selectedCus_amount

                // console.log(" after purchase this is left in the DB :  " + selectedItemQty)
                var totalPrice = selectedCus_amount * selectedItemPrice;


                console.log(" here is your total fee at this moment :   $" + totalPrice)

              }
            }





          })


      })

    })

  })


}





// might need to mute this part
// inquirer
//   .prompt([
//     // Here we create a basic text prompt.
//     {
//       type: "confirm",
//       message: "welcome to Bamazon! go shopping?",
//       name: "confirm",
//       default:true
//        //====what if customer doesnt wana shop
//     },
//     // if user hits Y then continue to show what is in store
//     {
//       type: "list",
//       message: "Below is what is currently available in store. Please select the product you would like to purchase at this moment",
//       choices: ["Iphone X", "PlayStation", "Lipitor", "Drone","Star Wars","Harry Potter","iPad","Coconut oil","Green Tea"],
//       name: "banazonProducts"
//       // save the item the user picks in a var so we can show it in the below code
//     },
//     // Here products being purchased - quantity of products.
//     // later on the promise stage convert this inpur to parsInt as "inpur" has a string value
//     {
//       type: "input",
//       message: "How many of this product would you like to purchase?", // add a var for this - ones the user pick from the above list save it to a variable then disolay it here
//       name: "productQuantity"
//       // save this quantity to a var and it must be in parsInt
//       // we have this much ..how many would u like to buy?
//       // save the inital value of this product and somwhat show it here
//     },
//     {
//       type: "confirm",
//       message: "You are purchasing this much product for this much money :",
//       name: "confirmPurchase",
//       default: true
//       // again we need that var user above to say u r buying this much please confitm
//       // purchasing this much (product name) for this ( cost amount)
//     },
//     // Here we give the user a list to choose from.
//     {
//       type: "confirm",
//       message: "Thank you for shopping at Bamazone would u like to do another purchase?:",
//       name: "confirm",
//       default: true
//       // ?  bc I would guess were here to purchase just one Item
//         // if user hits yes restart the game ..if user says no - end game
//     },
//
//   ]).then(function(inquirerResponse) {
//         // here goes all my response ???
//           if (inquirerResponse.confirm) {
//           // console.log("\nWelcome " + inquirerResponse.banazonProducts)
//         }
//   });
