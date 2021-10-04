var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");

// Creates the port for the database in mySql

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "ems_db",
});

connection.connect(async (err) => {
  if (err) throw err;
  homeScreen();
});

//  after running node index.js, this will take you to the main questions

const homeScreen = async () => {
  try {
    const questions = await inquirer.prompt([
      {
        name: "userOption",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Employees",
          "Add Employees",
          "Delete Employees",
          "View Departments",
          "Add Roles",
          "Add a Department",
          "Update Roles",
          "Nothing/Nothing More",
        ],
      },
    ]);

    pickMade(questions.userOption);
  } catch (err) {
    console.log(err);
  }
};

// This directs the user after a selection was made and takes them to the function 

const pickMade = async (selection) => {
  if (selection === "View Employees") {
    viewEmployees();
  }
  if (selection === "Add Employees") {
    addEmployees();
  }
  if (selection === "Delete Employees") {
    deleteEmployees();
  }
  if (selection === "View Departments") {
    showDepartments();
  }
  if (selection === "Add Roles") {
    addRoles();
  }

  if (selection === "Add a Department") {
    addDepartment();
  }
  if (selection === "Update Roles") {
    updateRoles();
  }

//   if the user has nothing more to do this ends the connection.

  if (selection === "Nothing/Nothing More") {
    connection.end();
  }
};

// Shows user all of the employees

const viewEmployees = () => {
  const query = `SELECT * FROM employees`;
  connection.query(query, (err, employees) => {
    if (err) throw err;
    console.table(employees);
    homeScreen();
  });
};

// Allows the user to add an employee based off their full name, their role in the company, and the manager they were assigned to 

const addEmployees = async () => {
  try {
    const { firstName, lastName, role_id, manager } = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employees first name?",
      },
      {
        name: "lastName",
        typer: "input",
        message: "What is the last name of the employee?",
      },
      {
        name: "role_id",
        type: "list",
        message: "What role will this employee be filling?",
        choices: [
          { name: "Security Manager", value: 1 },
          { name: "Assistant Manager", value: 2 },
          { name: "EMT Supervisor", value: 3 },
          { name: "EMT", value: 4 },
          { name: "Dispatch", value: 5 },
          { name: "Gatehouse", value: 6 },
        ],
      },
      {
        name: "manager",
        type: "list",
        message: "Who manages this department?",
        choices: [
          { name: "Jeff Smith", value: 1 },
          { name: "Tony Stevens", value: 2 },
          { name: "Larry Walker", value: 3 },
          { name: "Walt Weisz", value: 4 },
          { name: "Bill Wright", value: 5 },
        ],
      },
    ]);

    const query = `INSERT INTO employees (firstName, lastName, role_id, manager) VALUES(?,?,?,?)`;
    connection.query(
      query,
      [firstName, lastName, role_id, manager],
      (err, res) => {
        if (err) throw err;
        console.log(`NEW EMPLOYEE ADDED: ${firstName} ${lastName}`);
        homeScreen();
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// This function deletes a user based off of their employee ID

const deleteEmployees = async () => {
    connection.query(`SELECT employee_id FROM employees`, async (err, res) => {
  try {
    const { employee_id } = await inquirer.prompt([
      {
        name: "employee_id",
        type: "list",
        message: "What is the employees ID?",
        choices: res.map(({ employee_id }) => employee_id),
      },
     
    ]);
    

    const delQuery = `DELETE FROM employees WHERE employee_id = ?`;
    connection.query(delQuery, [parseInt(employee_id)], (err, res) => {
      if (err) throw err;
      console.log(`EMPLOYEE WITH ID OF ${employee_id} REMOVED`);
      homeScreen();
    });
  } catch (err) {
    console.log(err);
  }
 })
};

// This function shows the user all of the departments

const showDepartments = () => {
  const query = `SELECT * FROM dept`;
  connection.query(query, (err, dept) => {
    if (err) throw err;
    console.table(dept);
    homeScreen();
  });
};

// if there is a new role in the company it can be added here

const addRoles = async () => {
  try {
    const { role_id, title, salary, dept_id } = await inquirer.prompt([
      {
        name: "role_id",
        type: "list",
        message: "What role id does this position hold?",
        choices: [7, 8, 9, 10],
      },
      {
        name: "title",
        type: "input",
        message: "What is this role called?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is this employees salary?",
      },
      {
        name: "dept_id",
        type: "list",
        message: "What department's id does this role belong to?",
        choices: [1, 2, 3, 4],
      },
    ]);

    const query = `INSERT INTO company_role (role_id, title, salary, dept_id) VALUES (?,?,?,?)`;
    connection.query(query, [role_id, title, salary, dept_id], (err, dept) => {
      if (err) throw err;
      console.log(`${title} has been added to your company roles`);
      homeScreen();
    });
  } catch {
    console.log(err);
  }
};

// if enough roles get added, this allows the user to create a new department

const addDepartment = async () => {
  try {
    const newDept = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "What is the new departnments name?",
      },
    ]);
    connection.query(`INSERT INTO dept (name) VALUES (?)`, newDept.name);
    console.log(`${newDept.name} has been added`);
    homeScreen();
  } catch {
    console.log(err);
  }
};

// this can be used for promotoions or demotions. Changes the user's role.

const updateRoles = async () => {
  connection.query(`SELECT lastName FROM employees`, async (err, res) => {
    try {
      const { lastName } = await inquirer.prompt([
        {
          name: "lastName",
          type: "list",
          message: "What employee would you like to change?",
          choices: res.map(({ lastName }) => lastName),
        },
      ]);
      const { role_id } = await inquirer.prompt([
        {
          name: "role_id",
          type: "list",
          message: "What role will this employee be filling?",
          choices: [
            { name: "Security Manager", value: 1 },
            { name: "Assistant Manager", value: 2 },
            { name: "EMT Supervisor", value: 3 },
            { name: "EMT", value: 4 },
            { name: "Dispatch", value: 5 },
            { name: "Gatehouse", value: 6 },
          ],
        },
      ]);

      const query = `UPDATE employees SET role_id =? WHERE lastName =?`;
      connection.query(query, [parseInt(role_id), lastName], (err, res) => {
        if (err) throw err;
        console.log(`${lastName} is now role ID ${role_id}`);
      });
      homeScreen();
    } catch (err) {
      console.log(err);
    }
  });
};
