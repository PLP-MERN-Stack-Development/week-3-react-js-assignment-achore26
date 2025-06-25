
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your components here
import Button from './components/Button';
import Card from './components/Card';
import Layout from './components/Layout';
import TaskManager from './components/TaskManager';
import ApiDataDisplay from './components/ApiDataDisplay';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [count, setCount] = useState(0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'API Data', href: '/tasks' },
    { name: 'About', href: '/about' },
  ];

  return (
    <ThemeProvider>
      <Router>
        <Layout 
          title="PLP Task Manager"
          navLinks={navLinks}
        >
          <Routes>
            <Route path="/" element={<HomePage count={count} setCount={setCount} />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

// Home Page Component
const HomePage = ({ count, setCount }) => {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Counter Card */}
        <Card 
          title="Interactive Counter" 
          subtitle="Test the button components"
          hover={true}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-4">
              <Button
                variant="danger"
                size="md"
                onClick={() => setCount((count) => count - 1)}
              >
                -
              </Button>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{count}</span>
              <Button
                variant="primary"
                size="md"
                onClick={() => setCount((count) => count + 1)}
              >
                +
              </Button>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCount(0)}
            >
              Reset
            </Button>
          </div>
        </Card>

        {/* Button Variants Demo */}
        <Card 
          title="Button Variants" 
          subtitle="Different button styles"
          hover={true}
        >
          <div className="space-y-3">
            <Button variant="primary" className="w-full">Primary Button</Button>
            <Button variant="secondary" className="w-full">Secondary Button</Button>
            <Button variant="danger" className="w-full">Danger Button</Button>
            <Button variant="success" className="w-full">Success Button</Button>
            <Button variant="warning" className="w-full">Warning Button</Button>
          </div>
        </Card>

        {/* Info Card */}
        <Card 
          title="Getting Started" 
          subtitle="Welcome to your React app"
          hover={true}
        >
          <div className="text-gray-600 dark:text-gray-300">
            <p className="mb-3">
              This app demonstrates the components and features for Week 3:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Button component with variants</li>
              <li>Card component for content</li>
              <li>Navbar with navigation</li>
              <li>Footer with links</li>
              <li>Layout component wrapper</li>
              <li>TaskManager with state management</li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Task Manager Section */}
      <div className="mt-8">
        <Card title="Task Manager" subtitle="Manage your tasks efficiently">
          <TaskManager />
        </Card>
      </div>
    </div>
  );
};

// Tasks Page Component
const TasksPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Card title="API Integration" subtitle="JSONPlaceholder data with search and pagination">
        <ApiDataDisplay />
      </Card>
    </div>
  );
};

// About Page Component
const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Card title="About" subtitle="Learn more about this project">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This is a React application built for PLP Academy's Week 3 assignment. 
            It demonstrates component architecture, state management, and modern React practices.
          </p>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Technologies Used:
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
            <li>React 19 with Hooks</li>
            <li>React Router for navigation</li>
            <li>Tailwind CSS for styling</li>
            <li>Vite for build tooling</li>
            <li>PropTypes for type checking</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-6">
            Features:
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
            <li>Responsive design</li>
            <li>Dark/Light theme toggle</li>
            <li>Reusable UI components</li>
            <li>Mobile-friendly navigation</li>
            <li>Modern React patterns</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default App; 
