import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import { ClientOnly } from "@/app/components/ClientOnly";
import FavouritesClient from "@/app/favourites/FavouritesClient";
import HeartButton from "@/app/components/HeartButton";
import { EmptyState } from "@/app/components/EmptyState";
import { ListingClient } from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import getFavouriteListings from "@/app/actions/getFavouriteListings";
interface IntParams{
    listingId?:string;
}

const ListingPage = async({params}:{params:IntParams}) => {
    const listing=await getListingById(params);
    // const fav=await getFavouriteListings()
    const reservations=await getReservations(params);
    const currentUser=await getCurrentUser();

    if(!listing){
        return(
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
    return (
     <ClientOnly>
      <ListingClient
       listing={listing}
       reservations={reservations}
       currentUser={currentUser}
      />
     </ClientOnly>
  )
}

export default ListingPage;