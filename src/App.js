import React, { useState } from 'react';
import axios from 'axios';
import StudentForm from './Crud/StudentForm';
import StudentList from './Crud/StudentList';

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState(''); // Add a state variable for success messages

  const getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data); // Update the student list
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const clearSelection = () => {
    setSelectedStudent(null);
  };

  const clearMessage = () => {
    setMessage('');
  };

  return (
    <div>
      {message && (
        <div className="success-message">
          {message}
          <button onClick={clearMessage}>X</button> {/* Add a button to dismiss the message */}
        </div>
      )}
      <StudentForm
        getStudents={getStudents}
        selectedStudent={selectedStudent}
        clearSelection={clearSelection}
        setMessage={setMessage} // Pass the setMessage function to StudentForm
      />
      <StudentList
        students={students}
        selectStudent={setSelectedStudent}
        getStudents={getStudents}
        setMessage={setMessage} // Pass the setMessage function to StudentList
      />
    </div>
  );
}

export default App;
