const inquirer = require('inquirer'); // import inquirer for cli prompts
const { connectToDatabase, endDatabaseConnection } = require('./models/connection'); // import database connection functions
const {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
} = require('./models/queries'); // import database query functions

const mainMenu = async () => {
  try {
    await connectToDatabase(); // connect to the database

    // prompt user for action selection using inquirer
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'what would you like to do?',
        choices: [
          'view all departments',
          'view all roles',
          'view all employees',
          'add a department',
          'add a role',
          'add an employee',
          'update an employee role',
          'exit'
        ]
      }
    ]);

    switch (action) {
      case 'view all departments':
        const departments = await getDepartments(); // retrieve departments from the database
        console.table(departments); // display departments in a formatted table
        break;
      case 'view all roles':
        const roles = await getRoles(); // retrieve roles from the database
        console.table(roles); // display roles in a formatted table
        break;
      case 'view all employees':
        const employees = await getEmployees(); // retrieve employees from the database
        console.table(employees); // display employees in a formatted table
        break;
      case 'add a department':
        const { name } = await inquirer.prompt([ // prompt for department name
          {
            type: 'input',
            name: 'name',
            message: 'enter the department name:'
          }
        ]);
        await addDepartment(name); // add a new department to the database
        break;
      case 'add a role':
        const departmentsForRole = await getDepartments(); // retrieve departments for role assignment
        const departmentChoices = departmentsForRole.map(({ id, name }) => ({ // map department choices for user selection
          name: name,
          value: id
        }));
        const { title, salary, department_id } = await inquirer.prompt([ // prompt for role details
          {
            type: 'input',
            name: 'title',
            message: 'enter the role title:'
          },
          {
            type: 'input',
            name: 'salary',
            message: 'enter the role salary:'
          },
          {
            type: 'list',
            name: 'department_id',
            message: 'select the department:',
            choices: departmentChoices
          }
        ]);
        await addRole(title, salary, department_id); // add a new role to the database
        break;
      case 'add an employee':
        const rolesForEmployee = await getRoles(); // retrieve roles for employee assignment
        const roleChoices = rolesForEmployee.map(({ id, title }) => ({ // map role choices for user selection
          name: title,
          value: id
        }));
        const employeesForManager = await getEmployees(); // retrieve employees for manager assignment
        const managerChoices = employeesForManager.map(({ id, first_name, last_name }) => ({ // map manager choices for user selection
          name: `${first_name} ${last_name}`,
          value: id
        }));
        managerChoices.unshift({ name: 'none', value: null }); // add 'none' option for manager selection
        const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([ // prompt for employee details
          {
            type: 'input',
            name: 'first_name',
            message: 'enter the employee first name:'
          },
          {
            type: 'input',
            name: 'last_name',
            message: 'enter the employee last name:'
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'select the role:',
            choices: roleChoices
          },
          {
            type: 'list',
            name: 'manager_id',
            message: 'select the manager:',
            choices: managerChoices
          }
        ]);
        await addEmployee(first_name, last_name, role_id, manager_id); // add a new employee to the database
        break;
      case 'update an employee role':
        const employeesForUpdate = await getEmployees(); // retrieve employees for role update
        const employeeChoices = employeesForUpdate.map(({ id, first_name, last_name }) => ({ // map employee choices for user selection
          name: `${first_name} ${last_name}`,
          value: id
        }));
        const rolesForUpdate = await getRoles(); // retrieve roles for new role assignment
        const roleUpdateChoices = rolesForUpdate.map(({ id, title }) => ({ // map role choices for user selection
          name: title,
          value: id
        }));
        const { employee_id, new_role_id } = await inquirer.prompt([ // prompt for employee and new role details
          {
            type: 'list',
            name: 'employee_id',
            message: 'select the employee:',
            choices: employeeChoices
          },
          {
            type: 'list',
            name: 'new_role_id',
            message: 'select the new role:',
            choices: roleUpdateChoices
          }
        ]);
        await updateEmployeeRole(employee_id, new_role_id); // update an employee's role in the database
        break;
      case 'exit':
        await endDatabaseConnection(); // close database connection
        process.exit(0); // exit the application
        break;
    }

    mainMenu(); // restart the main menu loop
  } catch (error) {
    console.error('error in main menu:', error); // handle errors in the main menu
    mainMenu(); // restart the main menu loop on error
  }
};

mainMenu(); // start the main  function
