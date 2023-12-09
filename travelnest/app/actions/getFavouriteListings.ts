import prisma from "@/app/libs/prismadb";
import { getSession } from "./getCurrentUser";
import getCurrentUser from "./getCurrentUser";

export default async function getFavouriteListings() {
  try {
    const currentUser = await getCurrentUser();
    // const session=await getSession();
    if (!currentUser) {
      return [];
    }
    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])],
        },
      },
    });

    const safeFavourites = favourites.map((favourite) => ({
      ...favourite,
      createdAt: favourite.createdAt.toISOString(),
    }));
    return safeFavourites;
  } catch (error: any) {
    throw new Error(error);
  }
}
