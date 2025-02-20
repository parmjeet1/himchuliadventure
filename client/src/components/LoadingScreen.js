"use client";
import { FaEarthAsia } from "react-icons/fa6";

const SpinningEarthLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-50">
      <FaEarthAsia size={60} className="animate-spin text-primary mb-4" />
      <p className="text-lg text-secondary font-mono font-semibold">
        Mapping your journey...
      </p>

      <style jsx>{`
        .animate-spin {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SpinningEarthLoader;
