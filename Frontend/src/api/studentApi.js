export const getStudents = async (search = '', offset, totalItemsPerPage) => {
    try {
        const response = await fetch(`http://localhost:5000/student?search=${search}&offset${offset}&totalItemsPerPage=${totalItemsPerPage}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch students. Status: ${response.status}`);
        }

        const studentData = await response.json();
        return studentData;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

export const addStudent = async (newStudent) => {
    try {
        const response = await fetch(`http://localhost:5000/student/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            })

        if (!response.ok) {
            throw new Error(`Failed to add student. Status: ${response.status}`);
        }

        const addedStudent = await response.json();
        return addedStudent;

    } catch (error) {
        console.error('Error adding student:', error);
        throw error;
    }
}

export const getStudentById = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/student/${id}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch students. Status: ${response.status}`);
        }

        const studentData = await response.json();
        return studentData;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

export const updateStudent = async (studentId, student) => {

    try {
        const response = await fetch(`http://localhost:5000/student/${studentId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            })
        if (!response.ok) {
            throw new Error(`Failed to update student. Status: ${response.status}`);
        }

        const updatedStudentData = await response.json();
        return updatedStudentData;

    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
}

export const deleteStudent = async (studentId) => {
    try {
        const response = await fetch(`http://localhost:5000/student/${studentId}`, {
            method: 'DELETE',
        });
        return response
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
};
