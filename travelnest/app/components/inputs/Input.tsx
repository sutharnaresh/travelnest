'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiRupee } from 'react-icons/bi';

interface InputPropsInt {
  id: string; // Unique identifier for the input field
  label: string; // Label for the input field
  type?: string; // Type of the input field (default is "text")
  disabled?: boolean; // Indicates if the input field is disabled
  formatPrice?: boolean; // Indicates if the input should include a currency icon
  required?: boolean; // Indicates if the input is required
  register: UseFormRegister<FieldValues>; // react-hook-form register function
  errors: FieldErrors; // Error messages from react-hook-form
}

// Input component as a functional component
export const Input: React.FC<InputPropsInt> = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {/* Currency icon for price inputs */}
      {formatPrice && (
        <BiRupee
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      {/* Input field */}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
        peer
        w-full
        p-4
        pt-6 
        font-light 
        bg-white 
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${formatPrice ? 'pl-9' : 'pl-4'}
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
      `}
      />
      {/* Label for the input field */}
      <label
        className={`
       absolute 
       text-md
       duration-150 
       transform 
       -translate-y-3 
       top-5 
       z-10 
       origin-[0] 
       ${formatPrice ? 'left-9' : 'left-4'}
       peer-placeholder-shown:scale-100 
       peer-placeholder-shown:translate-y-0 
       peer-focus:scale-75
       peer-focus:-translate-y-4
       ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
     `}>
        {label}
      </label>
    </div>
  );
};
