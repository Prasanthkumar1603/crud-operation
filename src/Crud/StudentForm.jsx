import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Student.css';

const StudentForm = ({ getStudents, selectedStudent, clearSelection, setMessage }) => {
  const [student, setStudent] = useState({
    name: '',
    rollNo: '',
    age: '',
    phoneNumber: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (selectedStudent) {
      setStudent({
        name: selectedStudent.name,
        rollNo: selectedStudent.rollNo,
        age: selectedStudent.age,
        phoneNumber: selectedStudent.phoneNumber,
        image: selectedStudent.image || null,
      });

      if (selectedStudent.image) {
        setImagePreview(`http://localhost:5000/${selectedStudent.image}`);
      } else {
        setImagePreview(null);
      }
    } else {
      setStudent({
        name: '',
        rollNo: '',
        age: '',
        phoneNumber: '',
        image: null,
      });
      setImagePreview(null);
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setStudent({
      ...student,
      image: file,
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', student.name);
    formData.append('rollNo', student.rollNo);
    formData.append('age', student.age);
    formData.append('phoneNumber', student.phoneNumber);
    formData.append('image', student.image);

    try {
      if (selectedStudent) {
        await axios.put(`http://localhost:5000/api/students/${selectedStudent._id}`, formData);
        setMessage('Student updated successfully!'); // Set success message
        clearSelection();
      } else {
        await axios.post('http://localhost:5000/api/students', formData);
        setMessage('Student created successfully!'); // Set success message
      }

      getStudents(); // Fetch the updated student list
      setStudent({ name: '', rollNo: '', age: '', phoneNumber: '', image: null });
      setImagePreview(null); // Clear image preview after submission
    } catch (error) {
      console.error('Error submitting student:', error);
    }
  };
  return (
    <div className="form-container">
      <h2>{selectedStudent ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Name" required />
        </div>
        <div className="form-group">
          <label>Roll No</label>
          <input type="text" name="rollNo" value={student.rollNo} onChange={handleChange} placeholder="Roll No" required />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" name="age" value={student.age} onChange={handleChange} placeholder="Age" required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={student.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}
        <button type="submit" className="submit-button">{selectedStudent ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default StudentForm;
