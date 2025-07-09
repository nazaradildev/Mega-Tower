"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollAnimation } from "./scroll-animation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

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
    image: ["/gym2.jpg", "/gym3.jpg", "/gym4.jpg", "/gym1.jpg"],
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
    image: ["/garden2.jpg", "/garden3.jpg", "/garden4.jpg", "/garden1.jpg"],
    aiHint: "modern building garden",
  },
];

function AmenityCarousel({ images, name, aiHint }: { images: string[]; name: string; aiHint: string; }) {
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) return;

    const onSelect = (api: CarouselApi) => {
      api.slideNodes().forEach((node, index) => {
        if (api.selectedScrollSnap() === index) {
          node.classList.add('is-selected');
        } else {
          node.classList.remove('is-selected');
        }
      });
    };
    
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    onSelect(api);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="w-full h-full"
      plugins={[autoplay.current]}
      opts={{ loop: true, duration: 50 }}
    >
      <CarouselContent className="m-0 h-full grid [grid-auto-flow:row] [align-items:flex-start]">
        {images.map((img, i) => (
          <CarouselItem key={i} className={cn(
            "p-0 [grid-area:1/1/2/2] opacity-0 transition-opacity duration-1000 ease-in-out",
            '[&.is-selected]:opacity-100'
          )}>
            <Image
              src={img}
              alt={`${name} ${i + 1}`}
              data-ai-hint={aiHint}
              width={600}
              height={450}
              className="w-full h-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-3 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
      <CarouselNext className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
    </Carousel>
  );
}


export function Amenities() {
  return (
    <section id="amenities" className="w-full py-16 md:py-24 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">A Lifestyle Beyond Compare</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-lg">
              Experience a curated selection of world-class amenities designed for your comfort, leisure, and well-being.
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="space-y-16 md:space-y-24">
          {featuredAmenities.map((amenity, index) => (
            <ScrollAnimation key={amenity.name} delay={index * 150}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className={cn("aspect-[4/3] overflow-hidden rounded-lg shadow-xl relative group", index % 2 === 0 ? 'md:order-last' : '')}>
                  {Array.isArray(amenity.image) ? (
                    <AmenityCarousel images={amenity.image} name={amenity.name} aiHint={amenity.aiHint} />
                  ) : (
                    <Image
                      src={amenity.image as string}
                      alt={amenity.name}
                      data-ai-hint={amenity.aiHint}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  )}
                </div>
                <div className="space-y-4 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold font-headline text-primary">{amenity.name}</h3>
                  <p className="text-muted-foreground md:text-lg leading-relaxed">{amenity.description}</p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
