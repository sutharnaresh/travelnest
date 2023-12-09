'use client';
import {AiOutlineMenu} from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useState,useCallback } from 'react';
import { MenuItem } from './MenuItem';
import { Avatar } from '../Avatar';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';    
import {User} from '@prisma/client'
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';

// Interface for UserMenu props
interface UserMenuProps {
  currentUser?: SafeUser | null; // Optional currentUser prop of type SafeUser or null
}

// UserMenu component
export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  // Access router object
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((value) => !value), []);

  // Callback function for handling "Rent" button
  const onRent = useCallback(() => {
    if (!currentUser) {
      // Open login modal if not logged in
      loginModal.onOpen();
    } else {
      // Open rent modal if logged in
      rentModal.onOpen();
    }
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      {/* User menu and "Rent" button on desktop */}
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          TravelNest
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {/* User menu dropdown based on isOpen state */}
      {isOpen && (
        <div
          className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {/* Menu items conditionally rendered based on currentUser */}
            {currentUser ? (
              <>
                <MenuItem onClick={() => router.push("/trips")} label="My trips" />
                <MenuItem onClick={() => router.push("/favourites")} label="My favorites" />
                <MenuItem onClick={() => router.push("/reservations")} label="My reservations" />
                <MenuItem onClick={() => router.push("/properties")} label="My properties" />
                <MenuItem onClick={rentModal.onOpen} label="Post Property" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
