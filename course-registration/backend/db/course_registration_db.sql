CREATE DATABASE IF NOT EXISTS course_registration_db;
USE course_registration_db;

-- Table: course
CREATE TABLE course (
    c_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(30) NOT NULL,
    course_code VARCHAR(10) NOT NULL UNIQUE,
    credits INT NOT NULL,
    department VARCHAR(20),
    description VARCHAR(100)
);

INSERT INTO course (course_name, course_code, credits, department, description) VALUES 
('Introduction to Programming', 'CS101', 3, 'Computer Science', 'Basic programming concepts and practices.'),
('Data Structures', 'CS201', 4, 'Computer Science', 'Advanced data structures and algorithms.'),
('Database Systems', 'CS301', 3, 'Computer Science', 'Design and implementation of database systems.');

-- Table: user (includes students and instructors)
CREATE TABLE user (
    u_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    major VARCHAR(20),
    type ENUM('student', 'instructor') DEFAULT 'student'
);

INSERT INTO user (first_name, last_name, email, password, type) VALUES
('John', 'Smith', 'john.smith@email.com', 'password123', 'student'),
('Emily', 'Johnson', 'emily.j@email.com', 'securepass456',  'student'),
('Prof', 'Doe', 'prof@email.com', 'password', 'instructor');

-- Table: section (links courses and instructors)
CREATE TABLE section (
    s_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    instructor_id INT NOT NULL,
    semester VARCHAR(20),
    weekday VARCHAR(10),
    start_time TIME,
    end_time TIME,
    location VARCHAR(30),
    max_seats INT,
    current_seats INT DEFAULT 0,
    FOREIGN KEY (course_id) REFERENCES course(c_id) ON DELETE CASCADE,
    FOREIGN KEY (instructor_id) REFERENCES user(u_id) ON DELETE CASCADE
);

-- Sample section added
INSERT INTO section (course_id, instructor_id, semester, weekday, start_time, end_time, location, max_seats) VALUES
(1, 3, 'Fall 2024', 'Monday', '09:00:00', '10:30:00', 'Room 101', 30);

-- Table: enrollment (students enrolling in sections)
CREATE TABLE enrollment (
    e_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    section_id INT NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES user(u_id) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES section(s_id) ON DELETE CASCADE,
    UNIQUE (student_id, section_id) -- Prevent duplicate enrollments
);

-- Sample enrollment
INSERT INTO enrollment (student_id, section_id) VALUES
(1, 1),
(2, 1);

-- Table: prerequisite (course prerequisites)
CREATE TABLE prerequisite (
    r_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    prereq_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(c_id) ON DELETE CASCADE,
    FOREIGN KEY (prereq_id) REFERENCES course(c_id) ON DELETE CASCADE
);

INSERT INTO prerequisite (course_id, prereq_id) VALUES 
(2, 1), -- Data Structures requires Intro to Programming
(3, 2); -- Database Systems requires Data Structures
