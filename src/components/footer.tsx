"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';

export function Footer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <footer className="bg-secondary/30 border-t cursor-pointer" title="About this site">
          <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start">
                <Link href="/" className="inline-block mb-4">
                  <div className="bg-foreground text-background p-2 rounded-md flex items-center justify-center">
                    <Image src="/MEGA.png" alt="MEGA Logo" width={100} height={34} />
                  </div>
                </Link>
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} MEGA Living. <br /> All rights reserved.
                </p>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <h4 className="font-semibold mb-3">Legal</h4>
                <div className="flex flex-col space-y-2 text-sm">
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-primary transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-primary transition-colors">
                        Terms of Service
                    </Link>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                 <h4 className="font-semibold mb-3">Follow Us</h4>
                 <div className="flex items-center space-x-4">
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
                    </Link>
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                    </Link>
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                    </Link>
                </div>
              </div>
            </div>
             <div className="flex items-center justify-center gap-2 mt-8 text-xs text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Click for important information about this website.</span>
            </div>
          </div>
        </footer>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-center">Demonstration Website</DialogTitle>
        </DialogHeader>
        <div className="text-center text-muted-foreground space-y-4 py-4">
          <p>
            Please note that this is a fictional website created for marketing and demonstration purposes only.
          </p>
          <p>
            All properties, prices, names, and other data presented on this site are not real and should not be considered as actual offers or information.
          </p>
          <p>
            Thank you for your understanding.
          </p>
        </div>
        <DialogClose asChild>
            <Button className="w-full mt-4 rounded-lg">Acknowledge</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
