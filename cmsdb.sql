BOILERPLATE
DROP DATABASE IF EXISTS cmsdb;

CREATE DATABASE cmsdb;

USE cmsdb;

DEPARTMENT 
CREATE TABLE departments (
  deptID INT,
  dept VARCHAR (30) NOT NULL,
  primary key (deptID)
)

ROLE
CREATE TABLE roles (
roleID INT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
primary key (roleID)
)

EMPLOYEE
CREATE TABLE employees (
empID INT AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT DEFAULT NULL,
manager_id INT DEFAULT NULL,
primary key (empID)
)

SELECT * FROM emprole;