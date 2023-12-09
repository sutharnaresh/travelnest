"use client";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import React from "react";
import { Container } from "../Container";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import {
  GiBarn,
  GiBoatFishing,
  GiWindmill,
  GiForestCamp,
  GiCactus,
  GiCaveEntrance,
  GiCastle,
  GiIsland,
} from "react-icons/gi";
import CategoryBox from "../CategoryBox";
import { MdOutlineVilla } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!"
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!"
  },
  {
    label: "Coutryside",
    icon: TbMountain,
    description: "This property is i the countryside!"
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!"
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "This property has a pool!"
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!"
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!"
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is a castle!"
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activity!"
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!"
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave"
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property might have snow"
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in a desert"
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn"
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious!"
  },
];

// Categories component
const Categories = () => {
  // Access search params and selected category
  const params = useSearchParams();
  const category = params?.get("category");

  // Get pathname and check if it's the main page
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  // Hide categories on non-main pages
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((cat) => (
          // Render each category box with key, label, description, selected state, and icon
          <CategoryBox
            key={cat.label}
            label={cat.label}
            description={cat.description}
            selected={category === cat.label}
            icon={cat.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
