import { useState } from "react";

const CourseEnroller = () => {
  // Sample data for courses
  const courses = [
    {
      id: 1,
      name: "Introduction to Computer Science",
      major: "Computer Science",
      prerequisites: [],
    },
    {
      id: 2,
      name: "Data Structures",
      major: "Computer Science",
      prerequisites: ["Introduction to Computer Science"],
    },
    {
      id: 3,
      name: "Organic Chemistry",
      major: "Chemistry",
      prerequisites: [],
    },
    {
      id: 4,
      name: "Analytical Chemistry",
      major: "Chemistry",
      prerequisites: ["Organic Chemistry"],
    },
  ];

  const [selectedMajor, setSelectedMajor] = useState("Computer Science");
  const [completedCourses, setCompletedCourses] = useState(["Introduction to Computer Science"]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Handle major change
  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
  };

  // Filter courses based on major and prerequisites
  const filterCourses = () => {
    const availableCourses = courses.filter((course) => {
      return (
        course.major === selectedMajor &&
        course.prerequisites.every((prereq) => completedCourses.includes(prereq))
      );
    });
    setFilteredCourses(availableCourses);
  };

  // Enroll in a course
  const handleEnroll = (course) => {
    alert(`You have enrolled in ${course.name}!`);
    setCompletedCourses([...completedCourses, course.name]);
    filterCourses(); // Refresh the available courses after enrollment
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Course Enroller</h1>

      {/* Major Filter */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="major" style={{ marginRight: "10px" }}>Select Your Major:</label>
        <select id="major" value={selectedMajor} onChange={handleMajorChange}>
          <option value="Computer Science">Computer Science</option>
          <option value="Chemistry">Chemistry</option>
        </select>
        <button
          onClick={filterCourses}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Apply Filters
        </button>
      </div>

      {/* Display Available Courses */}
      <h2>Available Courses</h2>
      {filteredCourses.length === 0 ? (
        <p>No courses available based on your major and prerequisites.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {filteredCourses.map((course) => (
            <li
              key={course.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{course.name}</h3>
              <p>
                <strong>Major:</strong> {course.major}
              </p>
              {course.prerequisites.length > 0 && (
                <p>
                  <strong>Prerequisites:</strong> {course.prerequisites.join(", ")}
                </p>
              )}
              <button
                onClick={() => handleEnroll(course)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Enroll
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseEnroller;