import { EmptyState } from "@/app/components/EmptyState";
import { ClientOnly } from "@/app/components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import FavouritesClient from "./FavouritesClient";

// Asynchronous function component to fetch and display favorite listings
const ListingPage = async () => {
  // Fetching favorite listings and current user asynchronously
  const listings = await getFavouriteListings();
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    // Displaying EmptyState when there are no favorite listings
    return (
      <ClientOnly>
        <EmptyState
          title="No Favourites"
          subtitle="You have no favorites yet."
        />
      </ClientOnly>
    );
  }

  // Displaying FavouritesClient when there are favorite listings
  return (
    <ClientOnly>
      <FavouritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
