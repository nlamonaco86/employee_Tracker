// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Nicky0416!",
    database: "cmsdb"
});

//launch main menu on startup
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    mainMenu();
});

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
                    return viewACME();
                case "UPDATE":
                    return console.log("update menu");
                default:
                    connection.end();
            }
        });
}

// VIEW employees, departments or roles
// clean this up later by giving values? or changing table names
const viewACME = () => {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to view?",
        choices: ["employee", "department", "emprole"],
        name: "toView"
    }]).then(response => {
        //parametized table name shortens menu length AND overall code length
        connection.query("SELECT * FROM ??", [response.toView], (err, results) => {
            if (err) throw error;
            results.forEach(row => {
                //log each role in a table to view
                console.table(row);
            });
            mainMenu();
        })
    })
}

