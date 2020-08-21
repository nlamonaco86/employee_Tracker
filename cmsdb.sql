-- BOILERPLATE
DROP DATABASE IF EXISTS cmsbd;

CREATE DATABASE IF EXISTS  cmsdb;

USE cmsdb;

-- DEPARTMENT 
CREATE TABLE department (
  deptID INT AUTO_INCREMENT,
  dept VARCHAR (30) NOT NULL,
  primary key (deptID)
)
-- ROLE
CREATE TABLE emprole (
roleID INT AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT
) 
-- EMPLOYEE
CREATE TABLE employee(
empID INT AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
primary key (empID)
)

SELECT * FROM 