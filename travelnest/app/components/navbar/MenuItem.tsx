'use client';

// Interface for MenuItem props
interface MenuItemProp {
  // Function to be called on click
  onClick: () => void;
  // Label for the menu item
  label: string;
}

// MenuItem component
export const MenuItem: React.FC<MenuItemProp> = ({
  onClick,
  label,
}) => {
  // Return JSX for the menu item
  return (
    <div
      // Set onClick handler to provided function
      onClick={onClick}
      className="
       px-4
       py-3
       hover:bg-neutral-100
       transition
       font-semibold
       "
    >
      {label}
    </div>
  );
};