USE Adrian_inc_db;

-- Insert departments
INSERT INTO department (name) VALUES 
('Sales'), 
('Engineering'), 
('Finance'),
('Human Resources'),
('Marketing'),
('Customer Support'),
('Game Design'),
('Quality Assurance'),
('Production');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 60000, 1),
('Sales Associate', 40000, 1),
('Sales Executive', 70000, 1),
('Software Engineer', 80000, 2),
('Senior Software Engineer', 100000, 2),
('Junior Software Engineer', 60000, 2),
('Accountant', 50000, 3),
('Senior Accountant', 70000, 3),
('Finance Manager', 90000, 3),
('HR Manager', 65000, 4),
('HR Associate', 40000, 4),
('Recruiter', 45000, 4),
('Marketing Manager', 75000, 5),
('Marketing Specialist', 50000, 5),
('Social Media Manager', 55000, 5),
('Customer Support Manager', 50000, 6),
('Customer Support Agent', 30000, 6),
('Customer Support Specialist', 35000, 6),
('Lead Game Designer', 95000, 7),
('Game Designer', 70000, 7),
('Junior Game Designer', 50000, 7),
('QA Manager', 70000, 8),
('QA Tester', 35000, 8),
('Senior QA Tester', 45000, 8),
('Production Manager', 85000, 9),
('Producer', 70000, 9),
('Assistant Producer', 50000, 9);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Alice', 'Johnson', 3, NULL),
('Carlos', 'Martínez', 4, NULL),
('Ana', 'García', 5, 4),
('Luis', 'Hernández', 6, 4),
('María', 'Rodríguez', 7, NULL),
('José', 'López', 8, 7),
('Lucía', 'Pérez', 9, 7),
('David', 'González', 10, NULL),
('Sara', 'Sánchez', 11, 10),
('Laura', 'Fernández', 12, 10),
('Daniel', 'Gómez', 13, NULL),
('Sofía', 'Díaz', 14, 13),
('Javier', 'Torres', 15, 13),
('Elena', 'Ruiz', 16, NULL),
('Pablo', 'Vázquez', 17, 16),
('Marta', 'Ramírez', 18, 16),
('Miguel', 'Morales', 19, NULL),
('Cristina', 'Ortiz', 20, 19),
('Raúl', 'Jiménez', 21, 19),
('Beatriz', 'Navarro', 22, NULL),
('Manuel', 'Romero', 23, 22),
('Isabel', 'Alonso', 24, 22),
('Andrea', 'Gil', 25, NULL),
('Fernando', 'Serrano', 26, 25),
('Patricia', 'Méndez', 27, 25);
