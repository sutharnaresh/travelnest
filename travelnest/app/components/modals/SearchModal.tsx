"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import dynamic from "next/dynamic";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useMemo, useState } from "react";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import { Calender } from "../inputs/Calender";
import Heading from "../Heading";
import {Counter} from "../inputs/Counter";


type Props = {};

// Enum for different steps in the search modal
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = (props: Props) => {
  // Access router and search params
  const router = useRouter();
  const params = useSearchParams();

  // Manage modal state
  const searchModal = useSearchModal();

  // State variables for location, step, guest/room/bathroom count, and date range
  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // On back button click, go back one step
  const onBack = () => {
    setStep((value) => value - 1);
  };

  // On next button click, go to next step
  const onNext = () => {
    setStep((value) => value + 1);
  };

  // Dynamically import Map component based on location
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  // Submit function handles different actions based on step
  const onSubmit = () => {
    if (step !== STEPS.INFO) {
      return onNext(); // If not on info step, go to next step
    }
    let currentQuery = {}; // Initialize empty query object
    if (params) {
      // Get current query params
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = { // Create updated query object
      ...currentQuery, // Include existing query params
      locationValue: location?.value, // Add selected location value
      guestCount, // Add guest count
      roomCount, // Add room count
      bathroomCount, // Add bathroom count
    };
    if (dateRange.startDate) { // Add formatted start date if available
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) { // Add formatted end date if available
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl( // Generate URL with updated query string
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true } // Skip null values in query
    );
    setStep(STEPS.LOCATION); // Reset step to location
    searchModal.onClose(); // Close modal
    router.push(url); // Push URL to update browser history
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search"; // Show "Search" when on info step
    }
    return "Next"; // Show "Next" for other steps
  }, [step]);

  // Secondary action label based on current step
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined; // Hide back button on location step
    }
    return "Back"; // Show "Back" for other steps
  }, [step]);

  // Set modal body content based on current step
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?" // Heading title for date selection
          subtitle="Make sure everyone is free!" // Subtitle for date selection
        />
        <Calender // Calendar component for selecting date range
          value={dateRange} // Current date range
          onChange={(value) => setDateRange(value.selection)} // Handler for date range change
        />
      </div>
    );
  }
  
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading // Heading for additional information
          title="More information"
          subtitle="Find your perfect place!"
        />
        <Counter // Counter component for guest count
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)} // Handler for guest count update
        />
        <Counter // Counter component for room count
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)} // Handler for room count update
        />
        <Counter // Counter component for bathroom count
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)} // Handler for bathroom count update
        />
      </div>
    );
  }
  
  return (
    <Modal 
      isOpen={searchModal.isOpen} // Check if modal is open
      onClose={searchModal.onClose} // Function to close modal
      onSubmit={onSubmit} // Handle submit action
      title="Filters" // Modal title
      actionLabel={actionLabel} // Primary action button label
      secondaryActionLabel={secondaryActionLabel} // Secondary action button label (optional)
      // Disable back action on the LOCATION step
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack} // Conditional rendering of back button
      body={bodyContent} // Set modal body content
    />
  );
};

export default SearchModal;
