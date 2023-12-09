'use client';

import { IconType } from 'react-icons';

interface InputCategoryProps {
  icon: IconType; // Icon component for the category
  label: string; // Label for the category
  selected?: boolean; // Indicates if the category is selected (optional)
  onClick: (value: string) => void; // Callback function for click events
}

// CategoryInput component as a functional component
export const CategoryInput: React.FC<InputCategoryProps> = ({
  icon: Icon, // Destructure icon prop as Icon
  label, // Destructure label prop
  selected, // Destructure selected prop (optional)
  onClick, // Destructure onClick prop
}) => {
  return (
    <div
      onClick={() => onClick(label)} // Attach click event handler with the label as the parameter
      className={`rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}` // Dynamically set border color based on selected status
      }
    >
      <Icon size={38} /> {/* Render the icon with a fixed size */}
      <div className="font-semibold">
        {label} {/* Render the label with a font-semibold style */}
      </div>
    </div>
  );
};
