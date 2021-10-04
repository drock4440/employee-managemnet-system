DROP DATABASE IF EXISTS ems_db;
CREATE DATABASE ems_db;
USE ems_db;

CREATE TABLE dept(
    dept_id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (dept_id)
);

CREATE TABLE company_role(
    role_id INT AUTO_INCREMENT, 
    title VARCHAR(100) NOT NULL,
    salary DECIMAL (10,2),
    dept_id INT NOT NULL,
    PRIMARY KEY (role_id),
    FOREIGN KEY (dept_id) REFERENCES dept(dept_id)

);

CREATE TABLE employees(
    employee_id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    role_id INT NOT NULL,
    manager INT,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id) REFERENCES company_role(role_id),
    FOREIGN KEY (manager) REFERENCES employees(employee_id)
    
);

INSERT INTO dept (name) VALUES
('Management'),
('Medical Care'),
('Dispatch'),
('Gate');

INSERT INTO company_role (title, salary, dept_id) VALUES 
('Security Manager', 100000, 1),
('Assistant Manager', 85000, 1),
('EMT Supervisor', 51000, 2),
('EMT', 35000, 2),
('Dispatch', 25000, 3),
('Gatehouse', 25800, 4);

INSERT INTO employees (firstName, lastName, employee_id, role_id, manager) VALUES
('Jeff', 'Smith', 1, 1, null),
('Tony', 'Stevens', 2, 2, 1),
('Larry', 'Walker', 3, 3, 1),
('Walt', 'Weisz', 4, 3, 2),
('Bill', 'Wright', 5, 4, 4),
('Terry', 'Torrance', 6, 4, 3),
('Sully', 'Sullivan', 7, 4, 4),
('John', 'Michaels', 8, 5, 2),
('Barrack', 'Obama', 9, 6, 1);


