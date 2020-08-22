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
                    return updateACME();
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
        choices: ["EMPLOYEES", "DEPARTMENTS", "ROLES"],
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
            //can't this switchboard get shortened too?
            switch (response.toAdd) {
                case "New Employee":
                    return addACME("employees", empQ);
                case "New Department":
                    return addACME("departments", deptQ);
                case "New Role":
                    return addACME("roles", roleQ);
                default:
                    connection.end();
            }

        });
}
// Create a new ACME department, employee or role
const addACME = (string, choice) => {
    return inquirer.prompt(choice)
        .then(response => {
            addToDB(string, response);
        });
}
//add the employee, department or role to the database
const addToDB = (tableName, acmeRecord) => {
    connection.query(`INSERT INTO ${tableName} SET ?`, acmeRecord, (err, results) => {
        if (err) throw err;
        mainMenu();
    })
}

// Update employee information
const updateACME = () => {
    //selects the employees and prints to console as a list of choices in an Inquirer checkbox   
    connection.query("SELECT * FROM employees", (err, results) => {
        if (err) throw err;
        let choices = results.map(row => {
            return {
                name: `EMPLOYEE ID: ${row.empID} | ${row.first_name} | ${row.last_name} | ROLE ID: ${row.role_id} | MANAGER ID: ${row.manager_id}`,
                value: row
            };
        });
        //Get the employee name to promote or demote
        return inquirer.prompt([
            {
                type: "list",
                message: "Select Employee to Promote/Demote:",
                choices,
                name: "target",
            },
            {
                type: "list",
                message: "Enter New Role ID:",
                choices: [1, 2, 3, 4, 5],
                name: "newRole"
            }
        ]).then(response => {
          //dynamic query updates that employee's ID           
            connection.query("UPDATE employees SET role_id = ? WHERE empID = ?", [response.newRole, response.target.empID],
                (err, results) => {
                    if (err) throw err;
                });
            mainMenu();
        });
    })
};