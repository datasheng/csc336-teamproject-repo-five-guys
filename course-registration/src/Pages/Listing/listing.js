import React, { useEffect, useState } from "react";
import "./listing.css";

const Listing = () => {
    const [courseSections, setCourseSections] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourseSections = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/course/sections", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch course sections.");
                }

                const data = await response.json();
                setCourseSections(data.courseSections);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCourseSections();
    }, []);

    if (error) {
        return <div className="listing-page">Error: {error}</div>;
    }

    if (!courseSections.length) {
        return <div className="listing-page">Loading...</div>;
    }

    return (
        <div className="listing-page">
            <div className="wrapper">
                <h1>Course Sections</h1>
                <div className="sections-container">
                    {courseSections.map((section, index) => (
                        <div key={index} className="section-box">
                            <h3>{section.course_name}</h3>
                            <p><strong>Section ID:</strong> {section.section_id}</p>
                            <p><strong>Semester:</strong> {section.semester}</p>
                            <p><strong>Weekday:</strong> {section.weekday}</p>
                            <p>
                                <strong>Time:</strong> {section.start_time} - {section.end_time}
                            </p>
                            <p><strong>Full:</strong> {section.full ? "Yes" : "No"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Listing;