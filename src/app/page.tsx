"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Residences } from '@/components/residences';
import { Amenities } from '@/components/amenities';
import { Location } from '@/components/location';
import { Contact } from '@/components/contact';

const heroImages = [
  { src: '/image1.jpg', alt: 'Hero image of Churchill Towers in Business Bay, Dubai', hint: 'dubai cityscape' },
  { src: '/image5-3-1.jpg', alt: 'Alternate hero image of Churchill Towers', hint: 'modern architecture' }
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            {heroImages.map((image, index) => (
               <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                data-ai-hint={image.hint}
                fill
                className={`object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100 animate-zoom-in-ken-burns' : 'opacity-0'
                }`}
                priority={index === 0}
              />
            ))}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-4">
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
              <Image
                src="/ENI.png"
                alt="ENI Logo"
                width={120}
                height={40}
                priority
              />
            </div>
            <div className="text-center text-white">
              <h1 className="font-headline font-bold text-4xl md:text-6xl lg:text-7xl !leading-tight">
                Live Exceptionally. <br /> Rent at Churchill Towers.
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
        </section>

        <Residences />
        <Amenities />
        <Location />
        <Contact />
      </main>
    </div>
  );
}
