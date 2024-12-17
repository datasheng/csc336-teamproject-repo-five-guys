CREATE DATABASE IF NOT EXISTS course_registration_db;
USE course_registration_db;

CREATE TABLE course (
    c_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(30) NOT NULL,
    course_code VARCHAR(10) NOT NULL,
    credits INT NOT NULL,
    department VARCHAR(20),
    description VARCHAR(100)
);

INSERT INTO course (course_name, course_code, credits, department, description) VALUES 
('Introduction to Programming', 'CS101', 3, 'Computer Science', 'Basic programming concepts and practices.'),
('Data Structures', 'CS201', 4, 'Computer Science', 'Advanced data structures and algorithms.'),
('Database Systems', 'CS301', 3, 'Computer Science', 'Design and implementation of database systems.'),
('Computer Networks', 'CS401', 3, 'Computer Science', 'Fundamentals of computer networking.'),
('Artifical Intelligence', 'CS501', 4, 'Computer Science', 'Introduction to AI concepts and applications.'),
('General Biology', 'BIO101', 3, 'Biology', 'Introduction to biological concepts.'),
('Cell Biology', 'BIO201', 4, 'Biology', 'Study of cell structure and function.'),
('Genetics', 'BIO301', 3, 'Biology', 'Principles of heredity and genetic variation.'),
('Ecology', 'BIO401', 3, 'Biology', 'Interactions between organisms and their environment.'),
('Molecular Biology', 'BIO501', 4, 'Biology', 'Advanced study of molecular processes in living organisms.');

CREATE TABLE prerequisite (
    r_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    prereq_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(c_id) ON DELETE CASCADE,
    FOREIGN KEY (prereq_id) REFERENCES course(c_id) ON DELETE CASCADE
);

INSERT INTO prerequisite (course_id, prereq_id) VALUES 
(2, 1),
(3, 2),
(4, 2),
(5, 2),
(7, 6),
(8, 7),
(9, 6),
(10, 7);

CREATE TABLE user (
    u_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    birthdate DATE,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    major VARCHAR(20),
    is_subscribed BOOLEAN DEFAULT FALSE,
    type VARCHAR(20) DEFAULT 'student'
);

INSERT INTO user (first_name, last_name, birthdate, email, password, major, is_subscribed, type) VALUES
('John', 'Smith', '1999-05-15', 'john.smith@email.com', 'password123', 'Computer Science', FALSE, 'student'),
('Emily', 'Johnson', '2000-11-22', 'emily.j@email.com', 'securepass456', 'Biology', FALSE, 'student'),
('Michael', 'Brown', '1998-08-03', 'mbrown@email.com', 'brownie789', 'Psychology', FALSE, 'student'),
('Sarah', 'Davis', '2001-02-28', 'sarahd@email.com', 'davispass321', 'Engineering', FALSE, 'student'),
('firstprof', 'lastprof', '2024-12-04', 'prof@email.com', 'password', NULL , FALSE, 'instructor');

CREATE TABLE section (
    s_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    instructor_id INT,
    semester VARCHAR(20),
    weekday VARCHAR(10),
    start_time TIME,
    end_time TIME,
    location VARCHAR(10),
    max_seats INT,
    current_seats INT,
    FOREIGN KEY (course_id) REFERENCES course(c_id),
    FOREIGN KEY (instructor_id) REFERENCES user(u_id)
);

INSERT INTO section (course_id, instructor_id, semester, weekday, start_time, end_time, location, max_seats, current_seats) VALUES 
(1, 5, 'Fall 2024', 'Monday', '09:00:00', '10:30:00', 'Room 101', 30, 25);

CREATE TABLE enrollment (
    e_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    section_id INT NOT NULL,
    status VARCHAR(10) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES user(u_id) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES section(s_id)
);

INSERT INTO enrollment (student_id, section_id, status) VALUES 
(1, 1, 'Enrolled'),
(2, 1, 'Enrolled'),
(3, 1, 'Enrolled'),
(4, 1, 'Enrolled'),
(2, 1, 'Dropped');

CREATE TABLE sub_plan (
    plan_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description VARCHAR(100)
);

INSERT INTO sub_plan (name, duration, price, description) VALUES 
('Basic Plan', 12, 99.99, 'A basic subscription plan for 12 months.');

CREATE TABLE sub_transaction (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_type ENUM('new', 'renewal', 'cancellation') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(u_id),
    FOREIGN KEY (plan_id) REFERENCES sub_plan(plan_id)
);

INSERT INTO sub_transaction (user_id, plan_id, amount, transaction_type) VALUES 
(1, 1, 99.99, 'new'),
(2, 1, 99.99, 'renewal'),
(3, 1, 99.99, 'cancellation');

CREATE TABLE user_sub (
    us_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status ENUM('active', 'expired', 'canceled') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(u_id),
    FOREIGN KEY (plan_id) REFERENCES sub_plan(plan_id)
);

INSERT INTO user_sub (user_id, plan_id, start_time, end_time, status) VALUES 
(1, 1, '2024-01-01 00:00:00', '2025-01-01 00:00:00', 'active'),
(2, 1, '2024-02-15 00:00:00', '2025-02-15 00:00:00', 'expired'),
(3, 1, '2024-03-10 00:00:00', '2025-03-10 00:00:00', 'canceled');
