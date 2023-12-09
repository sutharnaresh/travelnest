import {ClientOnly} from "@/app/components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import {EmptyState} from "@/app/components/EmptyState";
import getFavouriteListings from "../actions/getFavouriteListings";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  // Fetch the current user
  const currentUser = await getCurrentUser();

  // If no current user, display an unauthorized state
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  // Fetch listings for the current user
  const listings = await getListings({ userId: currentUser.id });

  // If no listings found, display a state indicating no properties
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  // Render the PropertiesClient component with listings and the current user
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};


export default PropertiesPage;
