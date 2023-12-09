'use client'
import Image from "next/image"

// Define the 'AvatarProps' interface to describe the props for the 'Avatar' component
interface AvatarProp {
  src: string | null | undefined;
}

// Define the 'Avatar' functional component using the 'React.FC' type
export const Avatar: React.FC<AvatarProp> = ({
  src
}) => {
  // Render the 'Image' component with specified attributes
  return (
      <Image
          className="rounded-full"  // CSS class for styling
          height="30"  // Height of the image
          width="30"   // Width of the image
          alt="Avatar"  // Alternative text for accessibility
          src={src || "/images/placeholder.jpg"}  // Source of the image, with a fallback placeholder
      />
  );
};
