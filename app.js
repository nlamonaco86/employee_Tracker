// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "Nicky0416!",
//     database: "cmsdb"
// });

// //launch main menu on startup
// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     mainMenu();
// });

// main menu function
const mainMenu = () => {
    return inquirer.prompt([
        {
            name: "menuOpt",
            type: "list",
            message: "Welcome to ACME Content Management System!",
            choices: ["ADD", "VIEW", "UPDATE", "EXIT"]
        }
    ])
        .then(response => {
            //switch case, because smoother than if/else
            switch (response.menuOpt) {
                case "ADD":
                    return console.log("add menu");
                case "VIEW":
                    return console.log("view menu");
                case "UPDATE":
                    return console.log("update menu");
                default:
                    connection.end();
            }
        });
}


mainMenu();