const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Fetch all courses
router.get('/', (req, res) => {
  const query = 'SELECT * FROM course';
  db.query(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Fetch all sections
router.get('/sections', (req, res) => {
  const query = `
    SELECT s.s_id, c.course_name, c.course_code, s.semester, s.weekday, 
           s.start_time, s.end_time, s.location, s.max_seats, s.current_seats
    FROM section AS s
    JOIN course AS c ON s.course_id = c.c_id
  `;
  db.query(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Instructor: Add a new section
router.post('/sections', (req, res) => {
  const { course_id, instructor_id, semester, weekday, start_time, end_time, location, max_seats } = req.body;

  const query = `
    INSERT INTO section (course_id, instructor_id, semester, weekday, start_time, end_time, location, max_seats, current_seats)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)
  `;
  db.query(query, [course_id, instructor_id, semester, weekday, start_time, end_time, location, max_seats], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Section added successfully' });
  });
});

// Student: Enroll in a section
router.post('/enrollments', (req, res) => {
  const { student_id, section_id } = req.body;

  // Check seat availability
  const checkSeatsQuery = `SELECT max_seats, current_seats FROM section WHERE s_id = ?`;
  db.query(checkSeatsQuery, [section_id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: "Section not found" });
    }

    const { max_seats, current_seats } = results[0];
    if (current_seats >= max_seats) {
      return res.status(400).json({ error: "No available seats in this section." });
    }

    // Insert enrollment and update seats
    const enrollQuery = `
      INSERT INTO enrollment (student_id, section_id, status) VALUES (?, ?, 'enrolled');
      UPDATE section SET current_seats = current_seats + 1 WHERE s_id = ?;
    `;
    db.query(enrollQuery, [student_id, section_id, section_id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Enrolled successfully" });
    });
  });
});

module.exports = router;
