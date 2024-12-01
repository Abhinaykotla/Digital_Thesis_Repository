import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import SearchFilters from './SearchFilters';
import SearchResults from './SearchResults';
import Pagination from './Pagination';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ topic: '', author: '', year: '', keywords: '' });
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const fetchTheses = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...(searchTerm && { searchTerm }),
        ...(filters.topic && { topic: filters.topic }),
        ...(filters.author && { author: filters.author }),
        ...(filters.year && { year: filters.year }),
        ...(filters.keywords && { keywords: filters.keywords }),
      });

      const response = await fetch(`http://localhost:3000/api/theses?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        const filteredResults = data.theses.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

        setResults(filteredResults);
        setTotalPages(Math.ceil(data.theses.length / itemsPerPage));
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Failed to fetch theses:', error);
    }
  };

  useEffect(() => {
    fetchTheses();
  }, [searchTerm, filters, currentPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); 
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="search-page">
      <SearchInput onSearch={handleSearch} />
      <SearchFilters onFilter={handleFilter} />
      <SearchResults results={results} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchPage;
