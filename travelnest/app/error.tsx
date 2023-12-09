"use client";

import { useEffect } from "react";
import { EmptyState } from "@/app/components/EmptyState";

interface ErrorStatePropInt {
  error: Error; // Error object passed as a prop
}

// ErrorState component as a functional component
const ErrorState: React.FC<ErrorStatePropInt> = ({ error }) => {
  // useEffect hook to log the error and potentially report it to the backend
  useEffect(() => {
    console.log("Error:", error);
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

