import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import SearchInput from './SearchInput';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { useJsonPlaceholderPosts, useJsonPlaceholderUsers } from '../hooks/useApi';

/**
 * PostCard Component - Display individual post
 */
const PostCard = ({ post }) => (
  <Card hover={true} className="h-full">
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {post.body}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Post #{post.id}</span>
          <span>User {post.userId}</span>
        </div>
      </div>
    </div>
  </Card>
);

/**
 * UserCard Component - Display individual user
 */
const UserCard = ({ user }) => (
  <Card hover={true} className="h-full">
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {user.name}
        </h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            {user.email}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {user.phone}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {user.company.name}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {user.address.city}
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          ID: {user.id}
        </div>
      </div>
    </div>
  </Card>
);

/**
 * ApiDataDisplay Component - Main component for API data integration
 * @returns {JSX.Element} - ApiDataDisplay component
 */
const ApiDataDisplay = () => {
  const [activeTab, setActiveTab] = useState('posts');
  
  // Use different hooks based on active tab
  const postsApi = useJsonPlaceholderPosts();
  const usersApi = useJsonPlaceholderUsers();
  
  const currentApi = activeTab === 'posts' ? postsApi : usersApi;
  
  const {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    canGoPrevious,
    canGoNext,
    searchTerm,
    goToPage,
    goToFirst,
    goToLast,
    handleSearch,
    clearSearch,
    retry,
  } = currentApi;

  const tabs = [
    { id: 'posts', label: 'Posts', count: postsApi.totalItems },
    { id: 'users', label: 'Users', count: usersApi.totalItems },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          API Data Integration
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Fetching data from JSONPlaceholder API with pagination and search
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2"
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab.id
                  ? 'bg-white bg-opacity-20'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}>
                {tab.count}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          onClear={clearSearch}
          placeholder={`Search ${activeTab}...`}
          className="w-full sm:w-96"
        />
        
        {!loading && !error && data.length > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Showing {data.length} of {totalItems} {activeTab}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <LoadingSpinner 
          size="lg" 
          message={`Loading ${activeTab}...`} 
        />
      )}

      {/* Error State */}
      {error && !loading && (
        <ErrorMessage 
          message={error}
          onRetry={retry}
          title="Failed to load data"
        />
      )}

      {/* Data Grid */}
      {!loading && !error && (
        <>
          {data.length === 0 ? (
            <Card className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400">
                {searchTerm ? (
                  <div>
                    <p className="text-lg mb-2">🔍 No results found</p>
                    <p>No {activeTab} match your search "{searchTerm}"</p>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={clearSearch}
                      className="mt-4"
                    >
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg mb-2">📭 No {activeTab} available</p>
                    <p>There are no {activeTab} to display at the moment.</p>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item) => (
                activeTab === 'posts' ? (
                  <PostCard key={item.id} post={item} />
                ) : (
                  <UserCard key={item.id} user={item} />
                )
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
              onFirst={goToFirst}
              onLast={goToLast}
              className="mt-8"
            />
          )}
        </>
      )}

      {/* API Info */}
      {!loading && !error && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <h4 className="font-semibold mb-2">🌐 API Integration Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Real-time data fetching from JSONPlaceholder API</li>
              <li>Responsive grid layout with hover effects</li>
              <li>Loading and error states with retry functionality</li>
              <li>Pagination for large datasets</li>
              <li>Search filtering across multiple fields</li>
              <li>Tab navigation between different data types</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ApiDataDisplay;
