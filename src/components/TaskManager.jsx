import React, { useState, useEffect } from 'react';
import Button from './Button';
import Card from './Card';
import { useTasks } from '../hooks/useTasks';

/**
 * TaskManager Component - Complete task management system
 * @returns {JSX.Element} - TaskManager component
 */
const TaskManager = () => {
  const [newTaskText, setNewTaskText] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  const {
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    getFilteredTasks,
    getTaskCounts,
  } = useTasks();

  // Get filtered tasks and counts
  const filteredTasks = getFilteredTasks();
  const { total, active, completed } = getTaskCounts();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      setIsAddingTask(true);
      addTask(newTaskText);
      setNewTaskText('');
      // Small delay for UX feedback
      setTimeout(() => setIsAddingTask(false), 300);
    }
  };

  // Handle Enter key in textarea
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Load saved tasks on component mount
  useEffect(() => {
    console.log('TaskManager mounted - tasks loaded from localStorage');
  }, []);

  const filterButtons = [
    { key: 'all', label: 'All', count: total },
    { key: 'active', label: 'Active', count: active },
    { key: 'completed', label: 'Completed', count: completed },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Task Manager
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {total === 0 ? 'No tasks yet' : `${total} total, ${active} active, ${completed} completed`}
        </p>
      </div>

      {/* Add Task Form */}
      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="new-task" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Add a new task
            </label>
            <textarea
              id="new-task"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
              rows="2"
              disabled={isAddingTask}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              variant="primary"
              disabled={!newTaskText.trim() || isAddingTask}
              className="flex-1"
            >
              {isAddingTask ? 'Adding...' : 'Add Task'}
            </Button>
            {newTaskText && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setNewTaskText('')}
                disabled={isAddingTask}
              >
                Clear
              </Button>
            )}
          </div>
        </form>
      </Card>

      {/* Filter Buttons */}
      {total > 0 && (
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((filterBtn) => (
            <Button
              key={filterBtn.key}
              variant={filter === filterBtn.key ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter(filterBtn.key)}
              className="flex items-center gap-2"
            >
              {filterBtn.label}
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                filter === filterBtn.key
                  ? 'bg-white bg-opacity-20'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}>
                {filterBtn.count}
              </span>
            </Button>
          ))}
          {completed > 0 && (
            <Button
              variant="danger"
              size="sm"
              onClick={clearCompleted}
              className="ml-auto"
            >
              Clear Completed ({completed})
            </Button>
          )}
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="text-center py-8">
            <div className="text-gray-500 dark:text-gray-400">
              {total === 0 ? (
                <div>
                  <p className="text-lg mb-2">📝 No tasks yet!</p>
                  <p>Add your first task above to get started.</p>
                </div>
              ) : filter === 'active' ? (
                <div>
                  <p className="text-lg mb-2">🎉 All tasks completed!</p>
                  <p>Great job! You can add more tasks or view completed ones.</p>
                </div>
              ) : filter === 'completed' ? (
                <div>
                  <p className="text-lg mb-2">📋 No completed tasks</p>
                  <p>Complete some tasks to see them here.</p>
                </div>
              ) : (
                <p>No tasks match the current filter.</p>
              )}
            </div>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>

      {/* Task Statistics */}
      {total > 0 && (
        <Card className="bg-gray-50 dark:bg-gray-800">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{active}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completed}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

/**
 * TaskItem Component - Individual task item
 * @param {Object} props - Component props
 * @param {Object} props.task - Task object
 * @param {Function} props.onToggle - Function to toggle task completion
 * @param {Function} props.onDelete - Function to delete task
 * @returns {JSX.Element} - TaskItem component
 */
const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <Card className={`transition-all duration-200 ${
      task.completed 
        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
        : 'hover:shadow-md'
    }`}>
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
          }`}
        >
          {task.completed && (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Task Text */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm break-words ${
            task.completed
              ? 'line-through text-gray-500 dark:text-gray-400'
              : 'text-gray-900 dark:text-white'
          }`}>
            {task.text}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Delete Button */}
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Button>
      </div>
    </Card>
  );
};

export default TaskManager; 