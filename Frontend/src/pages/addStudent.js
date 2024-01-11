import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { addStudent, getStudentById, updateStudent } from '../api/studentApi';

const AddStudent = () => {

    const { id: studentId } = useParams();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: ''
    });

    useEffect(() => {
        if (studentId) {
            const fetchStudent = async () => {
                try {
                    const student = await getStudentById(studentId);
                    setFormData(student);
                } catch (error) {
                    console.error('Error fetching student:', error);
                }
            };

            fetchStudent();
        }
    }, [studentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = studentId ? await updateStudent(studentId, formData) : await addStudent(formData);
            window.location.href = `/`;
            console.log('Student saved successfully:', result);
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
            <div className='mb-5 text-center'>
                <h2 className='text-2xl font-medium text-gray-600'>{studentId ? "Edit student" : "Create student"}</h2>
            </div>
            <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                    Fisrt name:
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                    last name:
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-600">
                    Date of birth:
                </label>
                <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                />

            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email :
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    {studentId ? 'Update' : 'Submit'}
                </button>
            </div>
        </form>
    );
};

export default AddStudent;
