import { Container } from "@/app/components/Container";
import { SafeListing, SafeUser } from "../types";
import ListingCard from "@/app/components/listings/ListingCard";
import Heading from "@/app/components/Heading";

interface FavouritesProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null; 
}

// FavouritesClient component displaying a list of favourite listings
const FavouritesClient: React.FC<FavouritesProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favourites" subtitle="List of places you have favourited" />
      {/* Grid layout displaying ListingCard components */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {/* Mapping through listings and rendering ListingCard for each */}
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id} // Unique key for each listing
            data={listing} // Listing data passed as prop
          />
        ))}
      </div>
    </Container>
  );
};

export default FavouritesClient;
