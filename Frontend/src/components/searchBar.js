import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const SearchTerm = e.target.value;
        setSearchTerm(SearchTerm);
        handleSearch(SearchTerm);
    };

    return (
        <div className="search-bar flex items-center">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border p-2 rounded-md mr-2 focus:outline-none w-50"
            />
        </div>
    );
};

export default SearchBar;