"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const featuredAmenities = [
  {
    name: "Breathtaking Infinity Pool",
    description: "Immerse yourself in luxury with our stunning infinity pool, offering panoramic views of the Dubai skyline. The perfect escape from the city bustle.",
    image: "https://placehold.co/600x450.png",
    aiHint: "luxury infinity pool",
  },
  {
    name: "State-of-the-Art Gymnasium",
    description: "Achieve your fitness goals in our fully equipped, modern gymnasium. Featuring the latest Technogym equipment for a comprehensive workout experience.",
    image: "https://placehold.co/600x450.png",
    aiHint: "modern gym interior",
  },
  {
    name: "Serene Sauna & Steam Rooms",
    description: "Rejuvenate your body and mind in our exclusive sauna and steam rooms. A sanctuary of tranquility designed for ultimate relaxation.",
    image: "https://placehold.co/600x450.png",
    aiHint: "luxury spa sauna",
  },
  {
    name: "Lush Landscaped Gardens",
    description: "Find your peaceful oasis within the city in our beautifully landscaped gardens. An ideal space for a quiet stroll or peaceful contemplation.",
    image: "https://placehold.co/600x450.png",
    aiHint: "modern building garden",
  },
];


export function Amenities() {
  return (
    <section id="amenities" className="w-full py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">A Lifestyle Beyond Compare</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-lg">
            Experience a curated selection of world-class amenities designed for your comfort, leisure, and well-being.
          </p>
        </div>
        
        <div className="space-y-16 md:space-y-24">
          {featuredAmenities.map((amenity, index) => (
            <div key={amenity.name} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className={cn("aspect-[4/3] overflow-hidden rounded-lg shadow-xl", index % 2 === 0 ? 'md:order-last' : '')}>
                <Image
                  src={amenity.image}
                  alt={amenity.name}
                  data-ai-hint={amenity.aiHint}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold font-headline text-primary">{amenity.name}</h3>
                <p className="text-muted-foreground md:text-lg leading-relaxed">{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
