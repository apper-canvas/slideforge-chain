import { Link } from "react-router-dom";
import ApperIcon from "../components/ApperIcon";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="FileX" size={48} className="text-surface-400" />
        </div>
        
        <h1 className="text-6xl font-bold text-surface-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors"
        >
          <ApperIcon name="ArrowLeft" size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;