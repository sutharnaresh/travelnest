import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IntUseFavourite {
  listingId: string;
  currentUser?: SafeUser | null;
}

// Custom hook for managing favorite status and actions
const useFavourite = ({ listingId, currentUser }: IntUseFavourite) => {
  const router = useRouter();
  // const mem=useMemo();
  const loginModal = useLoginModal();

  const hasFavourited = useMemo(() => {
    // Extracting the list of favorite IDs from the current user or default to an empty array
    const list = currentUser?.favouriteIds || [];
    // Checking if the listing ID is included in the list of favorite IDs
    return list.includes(listingId);
  }, [currentUser, listingId]);

  // Callback function to toggle the favorite status of a listing
  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      // If no current user, open the login modal
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        // Determine the type of request based on the current favorite status
        if (hasFavourited) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }

        await request();

        // Refresh the page after the favorite status is updated
        router.refresh();
        toast.success("Success!");
      } catch (error) {
        toast.error("Something went wrong :(");
        console.log(error);
      }
    },
    [currentUser, hasFavourited, listingId, loginModal, router]
  );

  return {
    hasFavourited,
    toggleFavourite,
  };
};

export default useFavourite;
