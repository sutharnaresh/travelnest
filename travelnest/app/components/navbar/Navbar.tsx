'use client'

import { UserMenu } from "./UserMenu"
import { Logo } from "./Logo"
import Search from "./Search"
import { SafeUser } from "@/app/types"
import { Container } from "../Container"
import Categories from "./Categories"

interface NavbarProps {
  // Optional currentUser property of type SafeUser or null
  currentUser?: SafeUser | null;
}

//Navbar component
export const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  // Return the JSX for the Navbar component
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1-px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      {/* Render the Categories component below the top section */}
      <Categories />
    </div>
  );
};
