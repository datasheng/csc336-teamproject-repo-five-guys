-- STORED PROCEDURE #1
-- Procedure to drop all rows in section matching a semester
DELIMITER //

CREATE PROCEDURE DropSectionBySemester(IN input_semester VARCHAR(20))
BEGIN
    DELETE FROM section
    WHERE semester = input_semester;
END //

DELIMITER ;

-- Dummy data
INSERT INTO section 
(course_id, instructor_id, semester, weekday, start_time, end_time, location, max_seats, current_seats)
VALUES
(1, 2, '2024 Fall', 'Mon', '09:00:00', '10:30:00', 'Room 101', 30, 25),
(2, 3, '2024 Fall', 'Wed', '11:00:00', '12:30:00', 'Room 102', 40, 35);

-- Execute the stored procedure, need to disable safe updates first
SET SQL_SAFE_UPDATES = 0;
CALL DropSectionBySemester('2024 Fall');
SET SQL_SAFE_UPDATES = 1;


-- STORED PROCEDURE #2
-- Procedure to change course_id for a section

DELIMITER //

CREATE PROCEDURE UpdateCourseID(IN old_course_id INT, IN new_course_id INT)
BEGIN
    UPDATE section
    SET course_id = new_course_id
    WHERE course_id = old_course_id;
END //

DELIMITER ;

-- Execute the stored procedure, need to disable safe updates first
SET SQL_SAFE_UPDATES = 0;
CALL UpdateCourseID(3, 2);
SET SQL_SAFE_UPDATES = 1;