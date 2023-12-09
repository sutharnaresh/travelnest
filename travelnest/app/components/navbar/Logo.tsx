'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

// Logo component
export const Logo = () => {
  const router = useRouter(); // Access router object

  return (
    <Image
      // Click handler to navigate to the root path
      onClick={() => router.push("/")}
      alt="Logo"
      className="hidden md:block cursor-pointer" // Hide on mobile, display on larger screens, and enable hover effect
      height="200"
      width="200"
      src="/images/img.png"
    />
  );
};
