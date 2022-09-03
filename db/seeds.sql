INSERT INTO department (dept_name)
VALUES ("Merchandising"),
       ("Sales"),
       ("Sourcing");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 45000, 1),
       ("Partner Manager", 75000, 2),
       ("Sourcing Agent", 65000, 3);
       
       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Melissa", "McFarlane", 1, null),
       ("Becky", "Morrison", 2, 1), 
       ("Grace", "Seal", 3, 1);
       