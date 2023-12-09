import getReservations from "../actions/getReservations";
import { ClientOnly } from "../components/ClientOnly";
import { getSession } from "../actions/getCurrentUser";
import getCurrentUser from "../actions/getCurrentUser";
import TripsClient from "./TripsClient";
import getListings from "../actions/getListings";
import { EmptyState } from "../components/EmptyState";
const TripsPage = async () => {
    const currentUser = await getCurrentUser();
 // If no user is present, display an empty state indicating an unauthorized user
 if (!currentUser) {
  return (
    <ClientOnly>
      <EmptyState title="Unauthorized user" subtitle="Please login first" />
    </ClientOnly>
  );
}

// Fetch reservations for the current user
const reservations = await getReservations({ userId: currentUser.id });

// If the user has no reservations, display an empty state indicating no trips
if (reservations.length === 0) {
  return (
    <ClientOnly>
      <EmptyState
        title="No trips"
      />
    </ClientOnly>
  );
}

// Render the TripsClient component with reservations and current user
return (
  <ClientOnly>
    <TripsClient reservations={reservations} currentUser={currentUser} />
  </ClientOnly>
);
  };
  
  export default TripsPage;