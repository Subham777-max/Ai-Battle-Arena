import React, { useState } from 'react';
import AppRoutes from './App.routes';
import Sidebar from '../features/Theme/Sidebar';
import { cn } from '../utils/cn';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/30 overflow-hidden">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <main className={cn(
        "flex-1 h-screen overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out pb-32",
        "relative",
        "md:pl-60" // Always pad the width of the sidebar on desktop
      )}>
        <AppRoutes onMenuClick={() => setIsMobileMenuOpen(true)} />
      </main>
    </div>
  );
}

export default App;
