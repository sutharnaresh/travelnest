"use client";

import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import HeartButton from "../HeartButton";
import { format } from "date-fns";
import { Button } from "../Button";

interface ListCardProps {
  data: SafeListing; // Data for the listing
  reservation?: SafeReservation; // Reservation information for the listing
  onAction?: (id: string) => void; // Callback function for listing actions
  disabled?: boolean; // Indicates if the card is disabled
  actionLabel?: string; // Label for the listing action button
  actionId?: string; // ID for the listing action
  currentUser?: SafeUser | null; // Current user information
}

// ListingCard component as a functional component
const ListingCard: React.FC<ListCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  // Get the location information for the listing
  const location = getByValue(data.locationValue);

  // Callback function for handling the listing action
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  // Calculate the price based on reservation or listing data
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data]);

  // Format the reservation date range
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    // Listing card container
    <div
      onClick={() => router.push(`/listings/${data.id}`)} // Navigate to the listing details page on click
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        {/* Image container */}
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          {/* Listing image */}
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          {/* Heart button for adding to favorites */}
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        {/* Location information */}
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        {/* Category or reservation date */}
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        {/* Price information */}
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">₹ {price}</div>
          {!reservation && <div className="font-light">/night</div>}
        </div>
        {/* Listing action button */}
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
