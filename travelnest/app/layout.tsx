import { Navbar } from './components/navbar/Navbar'
import { Nunito } from 'next/font/google'
import { RegisterModal } from './components/modals/RegisterModal'
import getCurrentUser from './actions/getCurrentUser'
import { LoginModal } from './components/modals/LoginModal'
import { ClientOnly } from './components/ClientOnly'
import ToasterProvider from './components/providers/toasterProvider'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'
import './globals.css'

const font = Nunito({ subsets: ['latin'] });

// Metadata object containing information about the website
export const metadata = {
  title: 'TravelNest', 
  description: '', 
}

// RootLayout component for the overall structure of the website
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode; // Children components to be rendered
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      {/* Body of the HTML document with the specified font */}
      <body className={font.className}>
        {/* ClientOnly wrapper for components that should only run on the client side */}
        <ClientOnly>
          {/* Components for modals and navigation */}
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>

        {/* Main content area with top and bottom padding */}
        <div className='pb-20 pt-28'>
          {children} {/* Render children components */}
        </div>
      </body>
    </html>
  );
}

