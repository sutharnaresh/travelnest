'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterPropInt {
  title: string; // Title for the counter
  subtitle: string; // Subtitle for the counter
  value: number; // Current value of the counter
  onChange: (value: number) => void; // Callback function for value changes
}

// Counter component as a functional component
export const Counter: React.FC<CounterPropInt> = ({ title, subtitle, value, onChange }) => {
  // Callback function for incrementing the counter value
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  // Callback function for decrementing the counter value
  const onReduce = useCallback(() => {
    // Ensure the value doesn't go below 1
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-row items-center justify-between">
      {/* Counter information */}
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      
      {/* Counter controls */}
      <div className="flex flex-row items-center gap-4">
        {/* Button to reduce counter value */}
        <div
          onClick={onReduce}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </div>

        {/* Display the current value of the counter */}
        <div className="font-light text-xl text-neutral-600">{value}</div>

        {/* Button to increment counter value */}
        <div
          onClick={onAdd}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};
