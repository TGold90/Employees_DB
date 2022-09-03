const mysql = require("mysql2");
const inquirer = require("inquirer");
const { listen } = require("express/lib/application");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "tomtomclub13",
    database: "org_db",
  }
  // console.log(`Connected to the org_db database.`)
);
db.connect((err) => {
  if (err) {
    throw err;
  }
});

const menu = async () => {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add an Employee",
        "Add a Department",
        "Add a Role",
        "Update an Employee Role",
        "Exit",
      ],
    },
  ]);
  switch (answer.choice) {
    case "View All Employees":
      viewAllEmployees();
      break;
    case "View All Departments":
      viewAllDepartments();
      break;
    case "View All Roles":
      viewAllRoles();
      break;
    case "Add an Employee":
      addEmployee();
      break;
    case "Add a Department":
      addDepartment();
      break;
    case "Add a Role":
      addRole();
      break;
    case "Update an Employee Role":
      updateRole();
      break;
    default:
      process.exit();
  }
};

const viewAllEmployees = async () => {
  try {
    const data = await db.promise().query(`SELECT * FROM employee`);
    console.table(data[0]);
    menu();
  } catch (err) {
    console.log(err);
  }
};
const viewAllDepartments = async () => {
  try {
    const data = await db.promise().query(`SELECT * FROM department`);
    console.table(data[0]);
    menu();
  } catch (err) {
    console.log(err);
  }
};
const viewAllRoles = async () => {
  try {
    const data = await db.promise().query(`SELECT * FROM role`);
    console.table(data[0]);
    menu();
  } catch (err) {
    console.log(err);
  }
};

const addEmployee = async () => {
  try {
    //creates array with different roles listed in arr[0]
    const roles = await db
      .promise()
      .query(`SELECT title AS name, id AS value FROM role`);
    console.log(roles[0]);
    //
    const managers = await db
      .promise()
      .query(`SELECT first_name AS name, id AS value FROM employee`);
    const employeeInfo = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        choices: roles[0],
        message: "What is the employee's role?",
      },
      {
        type: "list",
        name: "manager_id",
        choices: managers[0],
        message: "Who is the employee's manager?",
      },
    ]);
    const data = await db
      .promise()
      .query("INSERT INTO employee SET ?", employeeInfo);
    console.log("Employee succesfully added!");
    viewAllEmployees();
  } catch (error) {
    console.log(error);
  }
};
//ADD DEPARTMENT FUNCTION
const addDepartment = async () => {
  try {
    const departmentInfo = await inquirer.prompt([
      {
        type: "input",
        name: "dept_name",
        message: "What is the department name?",
      },
    ]);
    const data = await db
      .promise()
      .query("INSERT INTO department SET ?", departmentInfo);
    console.log("Department succesfully added!");
    viewAllDepartments();
  } catch (error) {
    console.log(error);
  }
};

const addRole = async () => {
  try {
    const departments = await db
      .promise()
      .query(`SELECT dept_name AS name, id AS value FROM department`);
    console.log(departments[0]);
    const roleInfo = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role name?",
      },
      {
        type: "number",
        name: "salary",
        message: "What is the salary of this role?",
      },
      {
        type: "list",
        name: "department_id",
        choices: departments[0],
        message: "Which department is this role under?",
      },
    ]);
    const data = await db.promise().query("INSERT INTO role SET ?", roleInfo);
    console.log("Role succesfully added!");
    viewAllRoles();
  } catch (error) {
    console.log(error);
  }
};

menu();
