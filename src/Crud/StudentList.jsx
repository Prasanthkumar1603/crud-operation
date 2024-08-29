import React from 'react';
import axios from 'axios';
import './Student.css';

const StudentList = ({ students, selectStudent, getStudents, setMessage }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setMessage('Student deleted successfully!'); // Set success message
      getStudents(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="student-list">
      {students.length === 0 ? (
        <p>No students available</p>
      ) : (
        students.map(student => (
          <div key={student._id} className="student-card">
            <div className="student-card-content">
              {student.image && (
                <img
                  src={`http://localhost:5000/${student.image}`}
                  alt={student.name}
                  className="student-image"
                />
              )}
              <div className="student-details">
                <h3>{student.name}</h3>
                <p>Roll No: {student.rollNo}</p>
                <p>Age: {student.age}</p>
                <p>Phone: {student.phoneNumber}</p>
              </div>
            </div>
            <div className="student-card-actions">
              <button onClick={() => selectStudent(student)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(student._id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentList;
