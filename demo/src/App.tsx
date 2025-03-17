import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PdfViewer from "./pages/pdfviewer/PdfViewPage";
import Time from "./pages/SWR-Time/timezone";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-[350px] h-full bg-gray-100 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Navigation</h2>
          <div className="space-y-4">
            <Link to="/pdf" className="block">
              <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                PDF Viewer
              </button>
            </Link>
            <Link to="/ViewTime" className="block">
              <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                View Time
              </button>
            </Link>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-white">
          <Routes>
            {/* Default Route (Home Page) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/pdf" element={<PdfViewer />} />
            <Route path="/ViewTime" element={<Time />} />
            {/* Fallback for Unmatched Routes */}
            <Route path="*" element={<FirstPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// HomePage Component
const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Welcome to Our Application!
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        This is the home page where you can start exploring our features.
      </p>
      <p className="text-gray-700 mb-8">
        Use the navigation buttons on the left to access different sections.
      </p>
      <p className="text-sm text-gray-500">
        Note: This page serves as a guide to help you get started.
      </p>
    </div>
  );
};

// FirstPage Component (Fallback for Unmatched Routes)
const FirstPage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-700 mb-4">
        The page you are looking for does not exist.
      </p>
      <p className="text-gray-700 mb-8">
        Please use the navigation buttons on the left to explore available
        pages.
      </p>
      <p className="text-sm text-gray-500">
        If you believe this is an error, please contact support.
      </p>
    </div>
  );
};

export default App;
