
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Residences } from '@/components/residences';
import { Amenities } from '@/components/amenities';
import { Location } from '@/components/location';
import { Contact } from '@/components/contact';
import { ImmersiveExperience } from '@/components/immersive-experience';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative w-full">
          <div className="container mx-auto px-4 md:px-6 py-10">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <div className="absolute inset-0 z-0">
                 <Image
                  src="/mega tower1.png"
                  alt="Hero image of MEGA Towers in Business Bay, Dubai"
                  data-ai-hint="dubai cityscape"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-4">
                <div className="absolute top-8 left-1/2 -translate-x-1/2">
                  <Image
                    src="/MEGA.png"
                    alt="MEGA Logo"
                    width={120}
                    height={40}
                    priority
                  />
                </div>
                <div className="text-center text-white">
                  <h1 className="font-headline font-bold text-4xl md:text-6xl lg:text-7xl !leading-tight">
                    Live Exceptionally. <br /> Rent at MEGA Towers.
                  </h1>
                  <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
                    Luxury 1, 2, 3, and 4 Bedroom Apartments in the Heart of Business Bay.
                  </p>
                  <div className="mt-8">
                    <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
                      <a href="#residences">Explore Residences</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Residences />
        <Amenities />
        <ImmersiveExperience />
        <Location />
        <Contact />
      </main>
    </div>
  );
}
