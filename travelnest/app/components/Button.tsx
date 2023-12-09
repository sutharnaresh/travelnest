'use client'
import { IconType } from "react-icons";
// ButtonProps interface to describe the props for the 'Button' component
interface ButtonProps {
  label: string;  // Text label for the button
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;  // Click event handler
  disabled?: boolean;  // Optional flag to disable the button
  outline?: boolean;  // Optional flag for outline style
  small?: boolean;  // Optional flag for small size
  icon?: IconType;  // Optional icon component from 'react-icons'
}
export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,  // Destructure 'icon' prop and rename it to 'Icon'
}) => {
  // Render a button with specified attributes and styles
  return (
      <button
          disabled={disabled}
          onClick={onClick}
          className={`
              relative
              hover:opacity-80
              disabled:opacity-70
              transition
              rounded-lg
              disabled:cursor-not-allowed
              w-full
              ${outline ? 'bg-white' : 'bg-rose-500'}
              ${outline ? 'border-black' : 'border-rose-500'}
              ${outline ? 'text-black' : 'text-white'}
              ${small ? 'text-sm' : 'text-md'}
              ${small ? 'py-1' : 'py-3'}
              ${small ? 'font-light' : 'font-semibold'}
              ${small ? 'border-[1px]' : 'border-2'}
          `}
      >
          {Icon && (
              // Render the optional icon if provided
              <Icon
                  size={24}  // Size of the icon
                  className="
                      absolute
                      left-4
                      top-3
                  "
              />
          )}
          {label}  // Render the button label
      </button>
  );
};
