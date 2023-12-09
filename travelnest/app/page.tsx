import Image from 'next/image'
import styles from './page.module.css'
import { Container } from './components/Container'
import { ClientOnly } from './components/ClientOnly'
import ListingCard from './components/listings/ListingCard';
import { EmptyState } from './components/EmptyState';
import getCurrentUser from './actions/getCurrentUser';
import getListings, { IListingsParams } from './actions/getListings';

interface HomeProps {
  searchParams: IListingsParams; // Props include search parameters for listings
}

const Home = async ({ searchParams }: HomeProps) => {
  // Fetch listings based on provided search parameters
  const listings = await getListings(searchParams);
  
  // Fetch the current user information
  const currentUser = await getCurrentUser();

  // If there are no listings, display an empty state with an option to reset
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  // Render the Home component with the fetched listings
  return (
    <ClientOnly>
      <Container>
        {/* Grid layout for displaying listings */}
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols5 2xl:grid-cols-6 gap-8">
          {/* Map through listings and render ListingCard component for each */}
          {listings.map((listing) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}

export default Home;
