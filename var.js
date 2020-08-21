
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

let deptQ = [{}]
let roleQ = [{}]

module.exports = { empQ, deptQ, roleQ }