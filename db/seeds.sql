INSERT INTO department (dept_name) VALUES ('Back of House'), ('Front of House'), ('Management');
INSERT INTO company_role (title, salary, dept_id) VALUES
('President', 80000.00, 3), 
('Vice President', 60000.00, 1),
('Dog Walker', 30000.00, 1),
('Maid', 30000.00, 1 ),
('Butler', 20000.00, 1),                
('Driver', 40000.00, 2),
('Valet', 30000.00, 2),
('Server', 20000.00, 1);

INSERT INTO employees (first_name, last_name, emp_role_id, manager_id) VALUES
('Jake', 'Long', 1, null),
('Dalton', 'Rothrock', 6, 1),
('Brad', 'Pitt', 2, null);