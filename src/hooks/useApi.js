import { useState, useEffect } from 'react';

/**
 * Custom hook for API data fetching with pagination and search
 * @param {string} baseUrl - Base API URL
 * @param {Object} options - Configuration options
 * @returns {Object} - API state and methods
 */
export const useApi = (baseUrl, options = {}) => {
  const {
    initialPage = 1,
    itemsPerPage = 10,
    searchFields = [],
    enablePagination = true,
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalItems, setTotalItems] = useState(0);

  // Fetch data from API
  const fetchData = async (url) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Handle both array responses and paginated responses
      if (Array.isArray(result)) {
        setData(result);
        setTotalItems(result.length);
      } else if (result.data && Array.isArray(result.data)) {
        setData(result.data);
        setTotalItems(result.total || result.data.length);
      } else {
        setData([result]);
        setTotalItems(1);
      }
    } catch (err) {
      setError(err.message);
      setData([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  // Build URL with pagination parameters
  const buildUrl = () => {
    if (!enablePagination) {
      return baseUrl;
    }
    
    const url = new URL(baseUrl);
    url.searchParams.set('_page', currentPage);
    url.searchParams.set('_limit', itemsPerPage);
    
    return url.toString();
  };

  // Filter data based on search term
  const getFilteredData = () => {
    if (!searchTerm || searchFields.length === 0) {
      return data;
    }
    
    return data.filter(item =>
      searchFields.some(field => {
        const fieldValue = field.split('.').reduce((obj, key) => obj?.[key], item);
        return fieldValue?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  };

  // Pagination helpers
  const totalPages = enablePagination 
    ? Math.ceil(totalItems / itemsPerPage)
    : 1;
  
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // Navigation methods
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPrevious = () => goToPage(currentPage - 1);
  const goToNext = () => goToPage(currentPage + 1);
  const goToFirst = () => goToPage(1);
  const goToLast = () => goToPage(totalPages);

  // Search methods
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (enablePagination) {
      setCurrentPage(1); // Reset to first page when searching
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (enablePagination) {
      setCurrentPage(1);
    }
  };

  // Retry method
  const retry = () => {
    const url = buildUrl();
    fetchData(url);
  };

  // Effect to fetch data when page changes
  useEffect(() => {
    const url = buildUrl();
    fetchData(url);
  }, [currentPage, baseUrl]);

  return {
    // Data
    data: getFilteredData(),
    allData: data,
    loading,
    error,
    
    // Pagination
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    canGoPrevious,
    canGoNext,
    
    // Search
    searchTerm,
    
    // Methods
    goToPage,
    goToPrevious,
    goToNext,
    goToFirst,
    goToLast,
    handleSearch,
    clearSearch,
    retry,
    refetch: retry,
  };
};

/**
 * Hook specifically for JSONPlaceholder posts
 */
export const useJsonPlaceholderPosts = () => {
  return useApi('https://jsonplaceholder.typicode.com/posts', {
    itemsPerPage: 12,
    searchFields: ['title', 'body'],
    enablePagination: true,
  });
};

/**
 * Hook specifically for JSONPlaceholder users
 */
export const useJsonPlaceholderUsers = () => {
  return useApi('https://jsonplaceholder.typicode.com/users', {
    itemsPerPage: 10,
    searchFields: ['name', 'email', 'company.name', 'address.city'],
    enablePagination: false, // Users API doesn't support pagination
  });
};
