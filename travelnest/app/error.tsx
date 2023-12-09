"use client";

import { useEffect } from "react";
import { EmptyState } from "@/app/components/EmptyState";

// Define the properties for the ErrorState component
interface ErrorStateProps {
  error: Error; // Error object passed as a prop
}

// ErrorState component as a functional component
const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  // useEffect hook to log the error and potentially report it to the backend
  useEffect(() => {
    console.log("Error:", error);
    // todo: report to backend (commented out for future implementation)
  }, [error]);

  // Render the EmptyState component with a specific title and subtitle
  return (
    <EmptyState
      title="Oh.."
      subtitle="Apologies.Something went wrong.Try again."
    />
  );
};

export default ErrorState;

