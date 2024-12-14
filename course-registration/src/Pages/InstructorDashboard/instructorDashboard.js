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
                <h2>Your Current Course Sections</h2>
                <div className="sections-container">
                    {sections.length > 0 ? (
                        sections.map((section, index) => (
                            <div key={index} className="section-box">
                                <h3>{section.name}</h3>
                                <p><strong>Section ID:</strong> {section.section_id}</p>
                                <p><strong>Description:</strong> {section.description}</p>
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
