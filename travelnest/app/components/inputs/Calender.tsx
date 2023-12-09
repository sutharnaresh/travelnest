// Enable Prisma Client in the context of the Next.js app
'use client';

// Importing necessary styles and components for the calendar
import 'react-date-range/dist/styles.css';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/theme/default.css';

// Define the properties for the custom calendar component
interface CustomCalendarProps {
  value: Range; // Current date range value
  onChange: (value: RangeKeyDict) => void; // Callback function for date range changes
  disabledDates?: Date[]; // Array of disabled dates
}

// CustomCalendar component as a functional component
export const CustomCalendar: React.FC<CustomCalendarProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={['#262626']} // Set the color for the date range
      ranges={[value]} // Current date range
      date={new Date()} // Set the initial date
      onChange={onChange} // Callback function for date range changes
      direction="vertical" // Display the calendar in a vertical direction
      showDateDisplay={false} // Hide the date display
      minDate={new Date()} // Set the minimum selectable date
      disabledDates={disabledDates} // Array of disabled dates
    />
  );
};

