"use client";

import { IconType } from "react-icons";

// properties for the ListingCategory component
interface ListingsCategoryAttr {
  icon: IconType; // Icon component for the category
  label: string; // Label for the category
  description: string; // Description for the category
}

// ListingCategory component as a functional component
const ListingCategory: React.FC<ListingsCategoryAttr> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    // Container for the listing category
    <div className="flex flex-col gap-6">
      {/* Content of the listing category */}
      <div className="flex flex-row items-center gap-4">
        {/* Category icon */}
        <Icon size={40} className="text-neutral-600" />
        {/* Category details */}
        <div className="flex flex-col">
          {/* Category label */}
          <div className="text-lg font-semibold">{label}</div>
          {/* Category description */}
          <div className="text-neutral-500 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;

