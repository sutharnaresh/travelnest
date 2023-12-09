import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getSession } from "@/app/actions/getCurrentUser";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IntParams {
  listingId?: string;
}

// API route for adding a listing to favorites
export async function POST(request: Request, { params }: { params: IntParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  // Validate the listingId parameter
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // Update the user's favoriteIds by adding the listingId
  let favouriteIds = [...(currentUser.favouriteIds || []), listingId];
  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(updatedUser);
}


export async function DELETE(
  request: Request,
  { params }: { params: IntParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  // Validate the listingId parameter
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // Update the user's favoriteIds by removing the listingId
  let favouriteIds = (currentUser.favouriteIds || []).filter((id) => id !== listingId);
  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(updatedUser);
}
