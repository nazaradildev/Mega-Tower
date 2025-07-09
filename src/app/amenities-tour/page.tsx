
'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/scroll-animation';
import { cn } from '@/lib/utils';
import { Play, X } from 'lucide-react';
import { Breadcrumb } from '@/components/breadcrumb';

const amenitiesWithTours = [
  {
    name: "Breathtaking Infinity Pool",
    description: "Immerse yourself in luxury with our stunning infinity pool, offering panoramic views of the Dubai skyline. The perfect escape from the city bustle.",
    image: "https://placehold.co/600x450.png",
    aiHint: "luxury infinity pool",
    tourUrl: "https://kuula.co/share/7lnCj?fs=0&vr=0&sd=1&thumbs=0&info=0&logo=0&maps=0&chromeless=1",
  },
  {
    name: "State-of-the-Art Gymnasium",
    description: "Achieve your fitness goals in our fully equipped, modern gymnasium. Featuring the latest Technogym equipment for a comprehensive workout experience.",
    image: "https://placehold.co/600x450.png",
    aiHint: "modern gym interior",
    tourUrl: "https://my.matterport.com/show/?m=69UUKm16w39", // Placeholder
  },
  {
    name: "Serene Sauna & Steam Rooms",
    description: "Rejuvenate your body and mind in our exclusive sauna and steam rooms. A sanctuary of tranquility designed for ultimate relaxation.",
    image: "https://placehold.co/600x450.png",
    aiHint: "luxury spa sauna",
    tourUrl: "https://my.matterport.com/show/?m=69UUKm16w39", // Placeholder
  },
  {
    name: "Lush Landscaped Gardens",
    description: "Find your peaceful oasis within the city in our beautifully landscaped gardens. An ideal space for a quiet stroll or peaceful contemplation.",
    image: "https://placehold.co/600x450.png",
    aiHint: "modern building garden",
    tourUrl: "https://my.matterport.com/show/?m=69UUKm16w39", // Placeholder
  },
];

const breadcrumbItems = [
    { label: 'Amenities Virtual Tours' }
];

function AmenityTourCard({ amenity }: { amenity: typeof amenitiesWithTours[0] }) {
  const [showTour, setShowTour] = React.useState(false);

  return (
    <div className="aspect-[4/3] w-full rounded-lg overflow-hidden shadow-xl relative bg-muted">
      {showTour ? (
        <>
          <iframe
            src={amenity.tourUrl}
            width="100%"
            height="100%"
            allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
            className="border-0"
          />
          <Button 
            variant="secondary" 
            size="icon"
            onClick={() => setShowTour(false)} 
            className="absolute top-4 right-4 z-10 rounded-full h-10 w-10"
            aria-label="Close virtual tour"
          >
            <X className="h-5 w-5" />
          </Button>
        </>
      ) : (
        <>
          <Image
            src={amenity.image}
            alt={amenity.name}
            data-ai-hint={amenity.aiHint}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button onClick={() => setShowTour(true)} size="lg" variant="secondary" className="rounded-full">
              <Play className="mr-2 h-5 w-5" />
              Start Tour
            </Button>
          </div>
        </>
      )}
    </div>
  );
}


export default function AmenitiesTourPage() {
  return (
    <div className="bg-background">
      <Header />
      <main className="w-full py-16 md:py-24 bg-secondary overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          <ScrollAnimation>
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl md:text-4xl font-bold font-headline">Amenities Virtual Tours</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-lg">
                Step inside our world-class amenities. Explore each space in stunning 3D detail.
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="space-y-16 md:space-y-24">
            {amenitiesWithTours.map((amenity, index) => (
              <ScrollAnimation key={amenity.name} delay={index * 150}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center group">
                  <div className={cn(index % 2 === 0 ? 'md:order-last' : '')}>
                     <AmenityTourCard amenity={amenity} />
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary">{amenity.name}</h2>
                    <p className="text-muted-foreground md:text-lg leading-relaxed">{amenity.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
