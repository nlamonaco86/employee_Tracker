// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
//object deconstruction
const { empQ, deptQ, roleQ } = require("./var")

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
                    return addACMEQ();
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
        connection.query("SELECT * FROM ??", response.toView, (err, results) => {
            if (err) throw error;
            results.forEach(row => {
                //log each role in a table to view
                console.table(row);
            });
            mainMenu();
        })
    })
}
// Ask if they are adding a new ACME employee, department or role
const addACMEQ = () => {
    return inquirer.prompt({
        type: "list",
        message: "What would you like to add?",
        choices: ["New Employee", "New Department", "New Role"],
        name: "toAdd"
    })
        .then(response => {
            //switch case triggers 3 different functions, depending on what they asked
            //since they're so similar, combine them afterwards
            //can't this switchboard get shortened too?
            switch (response.toAdd) {
                case "New Employee":
                    return addACMEe(empQ);
                case "New Department":
                    return console.log("new dept");
                case "New Role":
                    return console.log("new role");
                default:
                    connection.end();
            }

        });
}
// Create a new ACME department, employee or role
//parametize for dept and role next
const addACMEe = () => {
    return inquirer.prompt(empQ)
        .then(response => {
            addToDB(response);
        });
}
//add the employee, department role to the database
//parametize for dept and role next
const addToDB = acmeRecord => {
    connection.query("INSERT INTO employee SET ?", acmeRecord, (err, results) => {
        if (err) throw err;
        mainMenu();
    })
}