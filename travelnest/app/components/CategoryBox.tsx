"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

// Define the props interface for the 'CategoryBox' component
interface CategoryBoxProps {
  icon: IconType;  // Icon component from 'react-icons'
  label: string;  // Category label
  selected?: boolean;  // Optional flag indicating if the category is selected
  description: string;  // Description of the category (not used in the component)
}

// Define the 'CategoryBox' functional component
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  // Alias for 'icon' prop
  // Access the 'useRouter' and 'useSearchParams' hooks from Next.js
  const router = useRouter();
  const params = useSearchParams();

  // Define a click handler using 'useCallback' to avoid unnecessary re-renders
  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // Create an updated query with the selected category
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    // Navigate to the updated URL
    router.push(url);
  }, [params, label, router]);

  // Render the category box with appropriate styles and attributes
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? "border-b-neutral-800" : "border-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"} `}
    >
      <Icon size={26} /> {/* Render the category icon */}
      <div className="font-medium text-sm">{label}</div> {/* Render the category label */}
    </div>
  );
};

export default CategoryBox;
