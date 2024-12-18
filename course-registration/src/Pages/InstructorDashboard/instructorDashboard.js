import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./instructorDashboard.css";

const InstructorDashboard = () => {
    const [instructorData, setInstructorData] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInstructorData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/user/instructor", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch instructor data.");
                }

                const data = await response.json();
                setInstructorData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchInstructorData();
    }, []);

    const handleNavigateToDetails = (sectionId) => {
        navigate(`/course/${sectionId}`);
    };

    const handleCreateSection = () => {
        navigate("/dashboard/create");
    };

    if (error) {
        return <div className="dashboard-page">Error: {error}</div>;
    }

    if (!instructorData) {
        return <div className="dashboard-page">Loading...</div>;
    }

    const { first_name, last_name, sections } = instructorData;

    return (
        <div className="dashboard-page">
            <div className="wrapper">
                <h1>Welcome {first_name} {last_name}!</h1>
                <h2>Your Current Course Sections:</h2>
                <button className="create-section-button" onClick={handleCreateSection}>
                    Create New Course Section
                </button>

                <div className="sections-container">
                    {sections.length > 0 ? (
                        sections.map((section, index) => (
                            <div
                                key={index}
                                className="section-box"
                                onClick={() => handleNavigateToDetails(section.section_id)}
                                style={{ cursor: "pointer" }}
                            >
                                <h3>{section.course_name}</h3>
                                <p><strong>Section ID:</strong> {section.section_id}</p>
                                <p><strong>Semester:</strong> {section.semester}</p>
                                <p><strong>Weekday:</strong> {section.weekday}</p>
                                <p>
                                    <strong>Time:</strong> {section.start_time} - {section.end_time}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No sections found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;
