import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./createCourseSection.css";

const CreateCourseSection = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        course_id: "",
        semester: "",
        weekday: "",
        start_time: "",
        end_time: "",
        location: "",
        max_seats: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // Fetch available courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/user/dashboard/create", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch courses.");
                }

                const data = await response.json();

                // Validate backend response structure
                if (data && data.courses) {
                    setCourses(data.courses);
                } else {
                    throw new Error("Invalid response from server.");
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCourses();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.max_seats <= 0) {
            setError("Max seats must be a positive number.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/user/dashboard/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create section.");
            }

            setSuccess("Section created successfully!");
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="create-section-page">
            <div className="wrapper">
                <h1>Create a New Course Section</h1>

                {error && <p className="error-message">Error: {error}</p>}
                {success && <p className="success-message">{success}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Course Selection */}
                    <div className="form-group">
                        <label htmlFor="course_id">Course</label>
                        <select
                            id="course_id"
                            name="course_id"
                            value={formData.course_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a course</option>
                            {courses.map((course) => (
                                <option key={course.c_id} value={course.c_id}>
                                    {course.course_code} - {course.course_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Semester Selection */}
                    <div className="form-group">
                        <label htmlFor="semester">Semester</label>
                        <select
                            id="semester"
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a semester</option>
                            <option value="2025 Spring">2025 Spring</option>
                            <option value="2025 Summer">2025 Summer</option>
                            <option value="2025 Fall">2025 Fall</option>
                            <option value="2025 Winter">2025 Winter</option>
                        </select>
                    </div>

                    {/* Other Form Fields */}
                    <div className="form-group">
                        <label htmlFor="weekday">Weekday</label>
                        <input
                            type="text"
                            id="weekday"
                            name="weekday"
                            placeholder="e.g., Monday"
                            value={formData.weekday}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="start_time">Start Time</label>
                        <input
                            type="time"
                            id="start_time"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="end_time">End Time</label>
                        <input
                            type="time"
                            id="end_time"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="e.g., Room 101"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="max_seats">Max Seats</label>
                        <input
                            type="number"
                            id="max_seats"
                            name="max_seats"
                            value={formData.max_seats}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit">Create Section</button>
                </form>
            </div>
        </div>
    );
};

export default CreateCourseSection;
