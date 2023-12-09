"use client";

import useCountries from "@/app/hooks/useCountries";
import { Avatar } from "@/app/components/Avatar";
import { SafeUser } from "@/app/types";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";

// Dynamic import for the Map component (with no server-side rendering)
const Map = dynamic(() => import("../Map"), {
  ssr: false
});

// Define the properties for the ListingInfo component
interface ListingInfoProps {
  user: SafeUser; // Information about the host user
  description: string; // Description of the listing
  guestCount: number; // Number of guests allowed
  roomCount: number; // Number of rooms in the listing
  bathroomCount: number; // Number of bathrooms in the listing
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined; // Category information for the listing
  locationValue: string; // Location value of the listing
}

// ListingInfo component as a functional component
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    // Container for the listing information
    <div className="col-span-4 flex flex-col gap-8">
      {/* Host information */}
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          {/* Display host name and avatar */}
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        {/* Display guest count, room count, and bathroom count */}
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} Guests</div>
          <div>{roomCount} Rooms</div>
          <div>{bathroomCount} Bathrooms</div>
        </div>
      </div>
      {/* Horizontal line separator */}
      <hr />
      {/* Display listing category information */}
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      {/* Horizontal line separator */}
      <hr />
      {/* Display listing description */}
      <div className="text-lg font-light text-neutral-500">{description}</div>
      {/* Horizontal line separator */}
      <hr />
      {/* Display the Map component with the specified coordinates */}
      <Map center={coordinates} />
    </div>
  );
};

// Export the ListingInfo component
export default ListingInfo;
