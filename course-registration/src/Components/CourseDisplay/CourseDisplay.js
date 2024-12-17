import React, { useEffect, useState } from 'react';
import './CourseDisplay.css'; 

const CourseDisplay = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/courses') // API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setCourses(data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    return (
        <div className='course-display'>
            <h1>Courses</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.c_id}>
                            <td>{course.c_id}</td>
                            <td>{course.course_name}</td>
                            <td>{course.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseDisplay;
