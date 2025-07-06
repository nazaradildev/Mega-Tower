"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#residences', label: 'Residences' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#location', label: 'Location' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="bg-foreground text-background p-1 rounded-md flex items-center justify-center">
            <Image src="/ENI.png" alt="ENI Logo" width={90} height={30} priority />
          </div>
        </Link>
        
        <div className="flex items-center">
          <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block ml-6">
            <Button asChild className="bg-primary-gradient text-primary-foreground hover:opacity-90 transition-opacity rounded-lg">
                <Link href="#contact">Book a Viewing</Link>
            </Button>
          </div>
          
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0 flex flex-col">
                  <div className="p-6 border-b">
                      <Link href="/" onClick={() => setIsOpen(false)}>
                          <div className="bg-foreground text-background p-1 rounded-md flex items-center justify-center w-fit">
                            <Image src="/ENI.png" alt="ENI Logo" width={90} height={30} priority />
                          </div>
                      </Link>
                  </div>
                  <nav className="flex-1 flex flex-col gap-4 p-6">
                      {navLinks.map((link) => (
                      <Link
                          key={link.label}
                          href={link.href}
                          className="text-xl font-medium"
                          onClick={() => setIsOpen(false)}
                      >
                          {link.label}
                      </Link>
                      ))}
                  </nav>
                  <div className="p-6 mt-auto border-t">
                      <Button asChild className="w-full bg-primary-gradient text-primary-foreground hover:opacity-90 transition-opacity rounded-lg" size="lg">
                          <Link href="#contact" onClick={() => setIsOpen(false)}>Book a Viewing</Link>
                      </Button>
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
