const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { getListing } = require('../controllers/courseController');

// Fetch all courses
router.get('/', (req, res) => {
  const query = 'SELECT * FROM course';
  db.query(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Fetch all sections
router.get('/sections', getListing);

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

  if (!student_id || !section_id) {
    return res.status(400).json({ error: "Missing student_id or section_id" });
  }

  // Step 1: Check seat availability
  const checkSeatsQuery = `SELECT max_seats, current_seats FROM section WHERE s_id = ?`;
  db.query(checkSeatsQuery, [section_id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: "Section not found" });
    }

    const { max_seats, current_seats } = results[0];
    if (current_seats >= max_seats) {
      return res.status(400).json({ error: "No available seats in this section." });
    }

    // Step 2: Insert enrollment
    const enrollQuery = `INSERT INTO enrollment (student_id, section_id) VALUES (?, ?)`;
    db.query(enrollQuery, [student_id, section_id], (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to enroll student." });
      }

      // Step 3: Update current seats in the section
      const updateSeatsQuery = `UPDATE section SET current_seats = current_seats + 1 WHERE s_id = ?`;
      db.query(updateSeatsQuery, [section_id], (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to update seat count." });
        }

        // Final success response
        res.status(200).json({ message: "Enrolled successfully." });
      });
    });
  });
});


router.delete('/enrollments', (req, res) => {
  const { student_id, section_id } = req.body;

  if (!student_id || !section_id) {
    return res.status(400).json({ error: "Missing student_id or section_id" });
  }

  // Step 1: Delete the enrollment
  const deleteEnrollmentQuery = `
    DELETE FROM enrollment 
    WHERE student_id = ? AND section_id = ?;
  `;

  db.query(deleteEnrollmentQuery, [student_id, section_id], (err) => {
    if (err) {
      console.error("Error deleting enrollment:", err);
      return res.status(500).json({ error: "Failed to unenroll student." });
    }

    // Step 2: Decrement the current_seats in the section
    const updateSeatsQuery = `
      UPDATE section 
      SET current_seats = current_seats - 1 
      WHERE s_id = ? AND current_seats > 0;
    `;

    db.query(updateSeatsQuery, [section_id], (updateErr) => {
      if (updateErr) {
        console.error("Error updating seats:", updateErr);
        return res.status(500).json({ error: "Failed to update section seats." });
      }

      return res.status(200).json({ message: "Unenrolled successfully." });
    });
  });
});




module.exports = router;
