"use client";

import { Button } from "@/app/components/Button";
import { Calender } from "../inputs/Calender";
import { Range } from "react-date-range";

// Properties for the ListingReservation component
interface ListingReservationProps {
  price: number; // Price per night for the listing
  dateRange: Range; // Selected date range for the reservation
  totalPrice: number; // Total price for the reservation
  onChangeDate: (value: Range) => void; // Callback function for changing dates
  onSubmit: () => void; // Callback function for submitting the reservation
  disabled?: boolean; // Flag to disable the reservation button
  disabledDates: Date[]; // Dates that are disabled for selection
}

// ListingReservation component as a functional component
const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    // Container for the reservation section
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      {/* Display price per night */}
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">₹ {price}</div>
        <div className="font-light text-neutral-600">/night</div>
      </div>
      {/* Horizontal line separator */}
      <hr />
      {/* Calender component for selecting dates */}
      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      {/* Horizontal line separator */}
      <hr />
      {/* Button for submitting the reservation */}
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      {/* Display total price for the reservation */}
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>₹ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
