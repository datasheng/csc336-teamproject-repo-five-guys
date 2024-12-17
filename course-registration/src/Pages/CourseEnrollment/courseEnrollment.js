import React, { useState, useEffect } from "react";

const CourseEnroller = () => {
  const [sections, setSections] = useState([]); // All course sections
  const [error, setError] = useState("");

  // Fetch course sections from the backend
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/course/sections", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch sections.");

        const data = await response.json();
        setSections(data.courseSections); // Assuming the backend sends "courseSections"
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchSections();
  }, []);

  // Enroll in a section
  const handleEnroll = (section_id) => {
    fetch("http://localhost:5000/api/course/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: 1, // Replace with logged-in user's ID dynamically
        section_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert("Enrolled successfully!");
        } else {
          alert("Enrollment failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error during enrollment:", error);
        alert("Enrollment failed. Please try again.");
      });
  };

  // Unenroll from a section
  const handleUnenroll = (section_id) => {
    fetch("http://localhost:5000/api/course/enrollments", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: 1, // Replace with logged-in user's ID dynamically
        section_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert("Unenrolled successfully!");
        } else {
          alert("Unenrollment failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error during unenrollment:", error);
        alert("Unenrollment failed. Please try again.");
      });
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Course Enroller</h1>

      {/* Display Course Sections */}
      <h2>Available Sections</h2>
      {sections.length === 0 ? (
        <p>No sections available at this time.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {sections.map((section) => (
            <li
              key={section.section_id}
              style={{ marginBottom: "10px", border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}
            >
              <h3>{section.course_name}</h3>
              <p><strong>Semester:</strong> {section.semester}</p>
              <p><strong>Weekday:</strong> {section.weekday}</p>
              <p><strong>Time:</strong> {section.start_time} - {section.end_time}</p>
              <p><strong>Seats Available:</strong> {section.max_seats - section.current_seats}</p>
              <button
                onClick={() => handleEnroll(section.section_id)}
                style={{
                  marginRight: "10px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Enroll
              </button>
              <button
                onClick={() => handleUnenroll(section.section_id)}
                style={{
                  backgroundColor: "#FF6347",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Unenroll
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseEnroller;
