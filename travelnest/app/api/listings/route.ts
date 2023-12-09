import prisma from "@/app/libs/prismadb";
import { getSession } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    // const session=await getSession();
    if (!currentUser) return NextResponse.error();
  
    const body = await request.json();
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body;
  
    // validate each field
  
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });
  
    return NextResponse.json(listing);
  }