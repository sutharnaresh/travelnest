"use client";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { differenceInDays } from "date-fns";
import useCountries from "@/app/hooks/useCountries";
import { useSearchParams } from "next/navigation";

type Props = {};

const Search = (props: Props) => {
  // Retrieve search parameters from the URL
  const params = useSearchParams();
  const guestCount = params?.get("guestCount");
  const endDate = params?.get("endDate");
  const searcModal = useSearchModal();
  const { getByValue } = useCountries();
  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");

  // Get the location label based on the selected location value
  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return "Search for your stay";
  }, [getByValue, locationValue]);

  // Calculate and get the duration label based on selected start and end dates
  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);
      if (diff === 0) diff = 1;

      return `${diff} Days`;
    }
    // If no dates selected
    return " ";
  }, [startDate, endDate]);

  // Get the guest label based on the selected guest count
  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return " ";
  }, [guestCount]);

  // Render the search component
  return (
    <div
      onClick={searcModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transtion cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-pink-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
