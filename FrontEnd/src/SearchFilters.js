import React, { useState } from 'react';

const SearchFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    topic: '',
    author: '',
    year: '',
    keywords: ''
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  return (
    <div className="search-filters">
      <input
        type="text"
        name="topic"
        placeholder="Topic"
        value={filters.topic}
        onChange={handleFilterChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={filters.author}
        onChange={handleFilterChange}
      />
      <input
        type="text"
        name="year"
        placeholder="Year"
        value={filters.year}
        onChange={handleFilterChange}
      />
      <input
        type="text"
        name="keywords"
        placeholder="Keywords"
        value={filters.keywords}
        onChange={handleFilterChange}
      />
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default SearchFilters;
