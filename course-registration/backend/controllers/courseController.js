const db = require('../db/database');

// Fetch all course sections with course details
const getListing = (req, res) => {
    const query = `
        SELECT 
            section.s_id, 
            course.course_name, 
            section.semester, 
            section.weekday, 
            section.start_time, 
            section.end_time, 
            section.location, 
            section.max_seats, 
            section.current_seats
        FROM section
        JOIN course ON section.course_id = course.c_id
    `;

    db.query(query, (err, rows) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ message: "Server error" });
        }

        // Format the response
        const courseSections = rows.map(row => ({
            section_id: row.s_id,
            course_name: row.course_name,
            semester: row.semester,
            weekday: row.weekday,
            start_time: row.start_time,
            end_time: row.end_time,
            location: row.location,
            max_seats: row.max_seats,
            current_seats: row.current_seats,
            full: row.max_seats === row.current_seats
        }));

        res.status(200).json({ courseSections });
    });
};

// Fetch details for a specific section (includes course details and enrollment status)
const getDetail = (req, res) => {
    const { s_id } = req.params;

    if (!s_id) {
        return res.status(400).json({ message: "No section ID provided." });
    }

    const user = req.session?.user || {};
    const userId = user.userId ?? null;
    const userType = user.type ?? null;

    // Query to fetch section details with course name
    const sectionQuery = `
        SELECT 
            section.s_id, 
            course.course_name, 
            section.semester, 
            section.weekday, 
            section.start_time, 
            section.end_time, 
            section.location, 
            section.max_seats, 
            section.current_seats
        FROM section
        JOIN course ON section.course_id = course.c_id
        WHERE section.s_id = ?
    `;

    db.query(sectionQuery, [s_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Section not found" });
        }

        const section = results[0];

        // If the user is not a student, return section details
        if (userType !== 'student') {
            return res.status(200).json({
                section,
                userId,
                type: userType,
                enrollment: null
            });
        }

        // If user is a student, check enrollment status
        const enrollmentQuery = `
            SELECT status 
            FROM enrollment 
            WHERE student_id = ? AND section_id = ? 
            ORDER BY enrollment_date DESC 
            LIMIT 1
        `;

        db.query(enrollmentQuery, [userId, s_id], (enrollErr, enrollResults) => {
            if (enrollErr) {
                console.error('Enrollment query error:', enrollErr);
                return res.status(500).json({ message: "Internal server error" });
            }

            const enrollment = enrollResults.length > 0 && enrollResults[0].status === 'Enrolled';

            res.status(200).json({
                section,
                userId,
                type: userType,
                enrollment
            });
        });
    });
};

module.exports = {
    getListing,
    getDetail
};
