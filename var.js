
let empQ = [{
    type: "input",
    message: "First Name:",
    name: "first_name"
}, {
    type: "input",
    message: "Last Name:",
    name: "last_name"
}, {
    type: "input",
    message: "Role ID:",
    name: "role_id"
}, {
    type: "input",
    message: "Manager ID:",
    name: "manager_id"
}]

let deptQ = [{
    type: "list",
    message: "Select a Department:",
    choices: ["Sales", "Customer Service", "Research & Development", "Legal", "Human & Animal Resources", "Security", "Maintenance"],
    name: "dept"
}]

let roleQ = [{
    type: "list",
    choices: [1,2,3,4,5],
    message: "Enter Role ID",
    name: "role_id"
},
{
    type: "list",
    choices: ["Employee", "Supervisor", "Manager", "Vice President", "Chief Executive Officer"],
    message: "Choose a Title",
    name: "title"
},
{
    type: "input",
    message: "Salary?",
    name: "salary"
}]

module.exports = { empQ, deptQ, roleQ }