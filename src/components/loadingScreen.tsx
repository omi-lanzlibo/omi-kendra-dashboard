// components/LoadingScreen.tsx

import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white opacity-80 z-50">
      <div className="flex flex-col items-center">
        <div className="spinner-border animate-spin border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
