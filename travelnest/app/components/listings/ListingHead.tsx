'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Image from "next/image";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

// Define the properties for the ListingHead component
interface ListingHeadProps {
    title: string; // Title of the listing
    locationValue: string; // Location value of the listing
    imageSrc: string; // Source URL for the listing image
    id: string; // ID of the listing
    currentUser?: SafeUser | null; // Current user information
}

// ListingHead component as a functional component
const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    // Get the location information based on the location value
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    return (
        <>
            {/* Heading component with title and location information */}
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            {/* Image container with the listing image */}
            <div
                className="w-full h-[60vh] overflow-hidden rounded-xl relative"
            >
                <Image
                    alt="Image"
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                {/* HeartButton component for adding to favorites */}
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    );
};

export default ListingHead;
