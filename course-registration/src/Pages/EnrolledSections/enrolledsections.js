import React, { useEffect, useState } from "react";
 // Reuse the same styling

const EnrolledSections = () => {
    const [enrolledSections, setEnrolledSections] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEnrolledSections = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/course/enrolled-sections", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch enrolled sections.");
                }

                const data = await response.json();
                setEnrolledSections(data.enrolledSections);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchEnrolledSections();
    }, []);

    if (error) {
        return <div className="listing-page">Error: {error}</div>;
    }

    if (!enrolledSections.length) {
        return <div className="listing-page">You are not enrolled in any sections.</div>;
    }

    return (
        <div className="listing-page">
            <div className="wrapper">
                <h1>Your Enrolled Sections</h1>
                <div className="sections-container">
                    {enrolledSections.map((section, index) => (
                        <div key={index} className="section-box">
                            <h3>{section.course_name}</h3>
                            <p><strong>Section ID:</strong> {section.section_id}</p>
                            <p><strong>Semester:</strong> {section.semester}</p>
                            <p><strong>Weekday:</strong> {section.weekday}</p>
                            <p>
                                <strong>Time:</strong> {section.start_time} - {section.end_time}
                            </p>
                            <p><strong>Location:</strong> {section.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EnrolledSections;
