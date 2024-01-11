const db = require('../models/index');
const { Op } = require('sequelize');

const calculateAge = require('../utils')

async function createStudent(req, res) {
    try {
        const { firstName, lastName, dateOfBirth, email } = req.body;
        const newStudent = await db.Student.create({ firstName, lastName, dateOfBirth, email });
        return res.status(201).json(newStudent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error during the creation of the Student' });
    }
}


async function getAllStudents(req, res) {
    try {
        let data;
        const { search } = req.query;
        const itemsPerPage = parseInt(req.query.totalItemsPerPage) || 10;
        const offset = parseInt(req.query.offset) || 0;

        if (search) {

            data = await db.Student.findAll({
                limit: itemsPerPage,
                offset: offset,
                where: {
                    [Op.or]: [
                        { firstName: { [Op.like]: `%${search}%` } },
                        { lastName: { [Op.like]: `%${search}%` } },
                    ],
                },
            });
        } else {

            data = await db.Student.findAll(
                {
                    limit: itemsPerPage,
                    offset: offset,
                }
            );
        }

        const students = await Promise.all(
            data.map(async (student) => {
                const age = await calculateAge(student.dateOfBirth);
                const fullName = student.firstName + ' ' + student.lastName;
                return {
                    ...student.toJSON(),
                    age,
                    fullName
                };
            })
        );

        console.log(students)
        return res.status(200).json(students);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error during the retrieval of students' });
    }
}


async function getStudentById(req, res) {
    const { studentId } = req.params;
    try {
        const student = await db.Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const age = await calculateAge(student.dateOfBirth);
        return res.status(200).json({ ...student.toJSON(), age });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error during the retrieval of the student' });
    }
}


async function updateStudent(req, res) {
    const { studentId } = req.params;
    const { firstName, lastName, dateOfBirth, email } = req.body;
    try {
        const student = await db.Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        await student.update({ firstName, lastName, dateOfBirth, email });
        return res.status(200).json(student);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error during the update of the student' });
    }
}


async function deleteStudent(req, res) {
    const { studentId } = req.params;
    try {
        const student = await db.Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        await student.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur lors de la suppression du student' });
    }
}

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
};
