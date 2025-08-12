import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b bg-white dark:bg-gray-900 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">FeedbackAnalyzer</h1>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
        <Link to="/analyze" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Analyze</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;


