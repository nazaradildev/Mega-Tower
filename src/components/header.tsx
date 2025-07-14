
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Settings, Heart, User, Search, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from "next-themes";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuPortal, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuSeparator, 
  DropdownMenuSub, 
  DropdownMenuSubContent, 
  DropdownMenuSubTrigger, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/#residences', label: 'Search', icon: Search, matchPath: '/' },
  { href: '/saved', label: 'Saved', icon: Heart },
  { href: '/account', label: 'Account', icon: User },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-zinc-900/80">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="bg-white px-3 py-1.5 flex items-center justify-center">
             <span className="font-headline text-2xl font-bold text-primary">MEGA</span>
          </div>
        </Link>
        
        <div className="flex items-center">
          <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = link.matchPath ? pathname === link.matchPath : pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-primary flex items-center gap-2",
                    isActive ? 'text-primary' : 'text-foreground/60'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 ml-6">
             <div className="hidden md:flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="rounded-lg h-9 text-foreground/70 hover:text-primary">
                            <Settings className="h-5 w-5 mr-2" />
                            Settings
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <div className="flex items-center justify-between w-full">
                                <span>Dark Mode</span>
                                <Switch
                                    checked={theme === 'dark'}
                                    onCheckedChange={(checked) => {
                                        setTheme(checked ? 'dark' : 'light');
                                    }}
                                    aria-label="Toggle dark mode"
                                />
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                         <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                               <span>Language</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'en' | 'ar')}>
                                        <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="ar">العربية</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuContent>
                </DropdownMenu>
                 <Button asChild variant="outline" className="rounded-lg">
                    <Link href="#">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                    </Link>
                </Button>
                <Button asChild className="bg-primary-gradient text-primary-foreground hover:opacity-90 transition-opacity rounded-lg">
                    <Link href="#contact">Book a Viewing</Link>
                </Button>
            </div>
          </div>
          
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="rounded-lg ml-2 p-0 h-auto w-auto">
                   <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0 flex flex-col">
                  <div className="p-6 border-b">
                      <Link href="/" onClick={() => setIsOpen(false)}>
                          <div className="bg-white p-2 flex items-center justify-center w-fit">
                             <span className="font-headline text-2xl font-bold text-primary">MEGA</span>
                          </div>
                      </Link>
                  </div>
                  <nav className="flex-1 flex flex-col gap-4 p-6">
                      {navLinks.map((link) => {
                        const isActive = link.matchPath ? pathname === link.matchPath : pathname === link.href;
                        return (
                          <Link
                              key={link.label}
                              href={link.href}
                              className={cn(
                                "text-xl font-medium flex items-center gap-3",
                                isActive ? 'text-primary' : ''
                              )}
                              onClick={() => setIsOpen(false)}
                          >
                              <link.icon className="h-5 w-5" />
                              {link.label}
                          </Link>
                        )
                      })}
                      <Link
                          href="#"
                          className="text-xl font-medium flex items-center gap-3"
                          onClick={() => setIsOpen(false)}
                      >
                          <LogIn className="h-5 w-5" />
                          Login
                      </Link>
                  </nav>
                  <div className="p-6 mt-auto border-t space-y-4">
                      <div className="flex items-center justify-between">
                          <Label htmlFor="dark-mode-switch-mobile" className="text-lg font-medium">Dark Mode</Label>
                          <Switch
                              id="dark-mode-switch-mobile"
                              checked={theme === 'dark'}
                              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                          />
                      </div>
                       <div className="flex items-center justify-between">
                          <Label className="text-lg font-medium">Language</Label>
                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className="rounded-lg">
                                      {language === 'en' ? 'English' : 'العربية'}
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                  <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'en' | 'ar')}>
                                      <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                                      <DropdownMenuRadioItem value="ar">العربية</DropdownMenuRadioItem>
                                  </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                          </DropdownMenu>
                      </div>
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
