const { connectToDatabase } = require('./connection'); // import database connection function

// retrieve all departments from the database
const getDepartments = async () => {
  try {
    const connection = await connectToDatabase(); // establish database connection
    const [rows] = await connection.query('SELECT * FROM department'); // execute query to get departments
    return rows; // return retrieved departments
  } catch (err) {
    console.error('error retrieving departments:', err); // handle error retrieving departments
    throw err; // throw error for higher level handling
  }
};

// retrieve all roles with department names from the database
const getRoles = async () => {
  try {
    const connection = await connectToDatabase(); // establish database connection
    const [rows] = await connection.query(
      `SELECT role.id, role.title, role.salary, department.name AS department 
       FROM role 
       LEFT JOIN department ON role.department_id = department.id`
    ); // execute query to get roles with department information
    return rows; // return retrieved roles
  } catch (err) {
    console.error('error retrieving roles:', err); // handle error retrieving roles
    throw err; // throw error for higher level handling
  }
};

// retrieve all employees with their roles, departments, and managers from the database
const getEmployees = async () => {
  try {
    const connection = await connectToDatabase(); // establish database connection
    const [rows] = await connection.query(
      `SELECT employee.id, employee.first_name, employee.last_name, 
              role.title AS role, department.name AS department, role.salary, 
              CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
       FROM employee 
       LEFT JOIN role ON employee.role_id = role.id 
       LEFT JOIN department ON role.department_id = department.id 
       LEFT JOIN employee manager ON manager.id = employee.manager_id`
    ); // execute query to get employees with role, department, and manager information
    return rows; // return retrieved employees
  } catch (err) {
    console.error('error retrieving employees:', err); // handle error retrieving employees
    throw err; // throw error for higher level handling
  }
};

// add a new department to the database
const addDepartment = async (name) => {
  try {
    const connection = await connectToDatabase(); // establish database connection
    await connection.query('INSERT INTO department (name) VALUES (?)', [name]); // execute query to add department
    console.log(`added department ${name}`); // log successful department addition
  } catch (err) {
    console.error('error adding department:', err); // handle error adding department
    throw err; // throw error for higher level handling
  }
};

// add a new role to the database
const addRole = async (title, salary, department_id) => {
  try {
    const connection = await connectToDatabase(); // establish database connection
    await connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]); // execute query to add role
    console.log(`added role ${title}`); // log successful role addition
  } catch (err) {
    console.error('error adding role:', err); // handle error adding role
    throw err; // throw error for higher level handling
  }
};

// add a new employee to the database
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  try {
    const connection = await connectToDatabase(); // establish database connection
    await connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]); // execute query to add employee
    console.log(`added employee ${first_name} ${last_name}`); // log successful employee addition
  } catch (err) {
    console.error('error adding employee:', err); // handle error adding employee
    throw err; // throw error for higher level handling
  }
};

// update an employee's role in the database
const updateEmployeeRole = async (employee_id, role_id) => {
  try {
    const connection = await connectToDatabase(); // establish database connection
    await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id]); // execute query to update employee role
    console.log(`updated employee's role`); // log successful employee role update
  } catch (err) {
    console.error('error updating employee role:', err); // handle error updating employee role
    throw err; // throw error for higher level handling
  }
};

module.exports = {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
