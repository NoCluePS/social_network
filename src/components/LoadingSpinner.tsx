import React from "react";

const LoadingSpinner = () => (
  <div className="flex w-full justify-center">
    <div className="m-3 h-[50px] w-[50px] animate-spin rounded-full border-4 border-blue-200 border-b-slate-400" />
  </div>
);

export default LoadingSpinner;
