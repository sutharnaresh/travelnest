'use client';

import useFavourite from "../hooks/useFavorite";
import { SafeUser } from "@/app/types";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// Interface for the props that the LikeButton component accepts
interface LikeButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

// LikeButton component
const HeartButton: React.FC<LikeButtonProps> = ({
  listingId,
  currentUser,
}) => {
  // Custom hook for handling favorite functionality
  const { hasFavourited, toggleFavourite } = useFavourite({
    listingId,
    currentUser,
  });

  // The heart button component with two states: outlined and filled
  return (
    <div
      onClick={toggleFavourite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      {/* Outline heart icon */}
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      {/* Filled heart icon, with dynamic color based on whether it's favorited */}
      <AiFillHeart
        size={24}
        className={hasFavourited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
