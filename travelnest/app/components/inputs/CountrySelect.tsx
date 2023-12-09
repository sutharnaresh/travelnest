"use client";

import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string; //country flag
  label: string;
  latlng: number[]; //latitude and longitude of the location
  region: string;
  value: string;
};

interface SelectCountryProps {
  value?: CountrySelectValue; // Current selected value (optional)
  onChange: (value: CountrySelectValue) => void; // Callback function for value changes
}

// CountrySelect component as a functional component
const CountrySelect: React.FC<SelectCountryProps> = ({ value, onChange }) => {
  // Custom hook to get country data
  const { getAll } = useCountries();

  return (
    <div>
      {/* React-Select component for the country selection */}
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()} // Get all country options
        value={value} // Current selected value
        onChange={(value) => onChange(value as CountrySelectValue)} // Callback for value changes
        formatOptionLabel={(option: any) => (
          // Custom formatting for each option label
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},{" "}
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          // Custom styling for different components of the Select
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          // Custom styling for the overall theme
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
