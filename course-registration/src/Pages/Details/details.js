import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.css";

const Details = () => {
    const { id } = useParams(); // Get the section ID from the URL
    const [section, setSection] = useState(null); // For section data
    const [error, setError] = useState(""); // For error handling
    const [loading, setLoading] = useState(true); // For loading state

    useEffect(() => {
        const fetchSectionDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/course/sections/detail/${id}`, {
                    method: "GET",
                    credentials: "include", // Ensure session cookies are included
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setSection(data.section); // Set section details
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSectionDetails();
    }, [id]);

    if (loading) {
        return <div className="details-page">Loading...</div>;
    }

    if (error) {
        return <div className="details-page">Error: {error}</div>;
    }

    if (!section) {
        return <div className="details-page">Section not found or unavailable.</div>;
    }

    return (
        <div className="details-page">
            <div className="wrapper">
                <h1>Section Details</h1>
                <div className="section-info">
                    <h2>{section.course_name}</h2>
                    <p><strong>Section ID:</strong> {section.s_id}</p>
                    <p><strong>Semester:</strong> {section.semester}</p>
                    <p><strong>Weekday:</strong> {section.weekday}</p>
                    <p>
                        <strong>Time:</strong> {section.start_time} - {section.end_time}
                    </p>
                    <p><strong>Location:</strong> {section.location}</p>
                    <p><strong>Max Seats:</strong> {section.max_seats}</p>
                    <p><strong>Available Seats:</strong> {section.max_seats - section.current_seats}</p>
                </div>
                {section.enrollment !== undefined && (
                    <div className="enrollment-info">
                        <h2>Enrollment Status</h2>
                        <p>
                            {section.enrollment
                                ? "You are enrolled in this section."
                                : "You are not enrolled in this section."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Details;
