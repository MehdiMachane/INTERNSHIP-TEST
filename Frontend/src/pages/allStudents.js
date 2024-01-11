import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


import List from "../components/list";
import SearchBar from "../components/searchBar";
import { getStudents, deleteStudent } from "../api/studentApi";

const AllStudent = () => {

    const [Students, setStudents] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItemsPerPage, setTotalItemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState("");

    const fetchStudents = async (search) => {
        try {
            const offset = (currentPage - 1) * totalItemsPerPage;
            const studentData = await getStudents(search, offset,
                totalItemsPerPage,);
            setStudents(studentData);
        } catch (error) {

            console.error('Error fetching students:', error);
        }
    };

    useEffect((search) => {

        fetchStudents(search);

    }, []);

    const handleEdit = (id) => {
        window.location.href = `/edit-student/${id}`;
    }

    const handleDelete = async (id) => {
        await deleteStudent(id);
        await fetchStudents()
    }

    const handleSearch = (searchTerm) => {

        fetchStudents(searchTerm);
    }

    const columns = [
        { key: "fullName", name: "Full name" },
        { key: "age", name: "Age" },
        { key: "email", name: "Email" }
    ]

    const buttons = [
        {
            key: "edit",
            action: handleEdit,
            style: "bg-blue-500 hover:bg-blue-400 ",
            label: "Edit",
        },
        {
            key: "delete",
            action: handleDelete,
            style: "bg-red-600 hover:bg-red-500 ",
            label: "Delete",
        },]

    return (

        <div>
            <div className="flex items-center justify-between mb-5">
                <div className="search-bar flex items-center">
                    <SearchBar handleSearch={handleSearch} />

                </div>

                <Link
                    to="/add-student"
                    className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-gray-700"
                >
                    + Add
                </Link>
            </div>


            <List columns={columns} data={Students} buttons={buttons} />
        </div>
    )
}

export default AllStudent;
