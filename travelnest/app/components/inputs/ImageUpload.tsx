'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

// Declare a global variable for Cloudinary
declare global {
  var cloudinary: any;
}

// Define the properties for the ImageUpload component
interface ImageUploadProps {
  onChange: (value: string) => void; // Callback function for image changes
  value: string; // Current image value
}

// ImageUpload component as a functional component
export const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  // Callback function for handling image uploads
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    // Next.js Cloudinary upload widget for handling image uploads
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="tigx0tlp" // Cloudinary upload preset
      options={{
        maxFiles: 1, // Maximum number of files allowed to be uploaded
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()} // Open the upload widget on click
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            {/* Icon for adding a photo */}
            <TbPhotoPlus size={50} />

            {/* Text indicating to click for upload */}
            <div className="font-semibold text-lg">
              Click to upload
            </div>

            {/* Display the uploaded image if available */}
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={value}
                  alt="upload"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
