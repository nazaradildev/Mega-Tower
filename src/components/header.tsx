
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Settings, Heart, User, Search, LogIn } from 'lucide-react';
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

const navLinks = [
  { href: '/', label: 'Search', icon: Search },
  { href: '/saved', label: 'Saved', icon: Heart },
  { href: '/account', label: 'Account', icon: User },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/MEGA.png" alt="MEGA Logo" width={90} height={30} priority />
        </Link>
        
        <div className="flex items-center">
          <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-6">
             <div className="hidden md:flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="rounded-lg h-9 text-foreground/70 hover:text-foreground/90">
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
                <Button variant="ghost" size="icon" className="rounded-lg ml-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0 flex flex-col">
                  <div className="p-6 border-b">
                      <Link href="/" onClick={() => setIsOpen(false)}>
                          <Image src="/MEGA.png" alt="MEGA Logo" width={90} height={30} priority />
                      </Link>
                  </div>
                  <nav className="flex-1 flex flex-col gap-4 p-6">
                      {navLinks.map((link) => (
                      <Link
                          key={link.label}
                          href={link.href}
                          className="text-xl font-medium flex items-center gap-3"
                          onClick={() => setIsOpen(false)}
                      >
                          <link.icon className="h-5 w-5" />
                          {link.label}
                      </Link>
                      ))}
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
