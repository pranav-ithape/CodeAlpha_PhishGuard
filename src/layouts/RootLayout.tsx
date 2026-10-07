import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const RootLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans flex">
      {/* Left Sidebar (Desktop column / Mobile drawer) */}
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        onCloseMobile={() => setMobileMenuOpen(false)} 
      />

      {/* Main Area: occupies remaining width */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar: sits at the top of MainArea in natural flow */}
        <Navbar 
          onOpenMobile={() => setMobileMenuOpen(true)} 
        />

        {/* Page Content: flows naturally directly below Navbar */}
        <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};
