"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { units, type Unit } from '@/data/units';

const galleryImages = [
    { category: 'Interiors', src: 'https://placehold.co/600x400.png', alt: 'Modern living room', aiHint: 'modern living room' },
    { category: 'Exteriors', src: 'https://placehold.co/600x400.png', alt: 'Building exterior at dusk', aiHint: 'modern building dusk' },
    { category: 'Amenities', src: 'https://placehold.co/600x400.png', alt: 'Rooftop swimming pool', aiHint: 'rooftop pool' },
    { category: 'Views', src: 'https://placehold.co/600x400.png', alt: 'View from a balcony', aiHint: 'cityscape balcony' },
    { category: 'Interiors', src: 'https://placehold.co/600x400.png', alt: 'Luxury kitchen', aiHint: 'luxury kitchen' },
    { category: 'Exteriors', src: 'https://placehold.co/600x400.png', alt: 'Building entrance', aiHint: 'modern building entrance' },
    { category: 'Amenities', src: 'https://placehold.co/600x400.png', alt: 'State-of-the-art gym', aiHint: 'modern gym' },
    { category: 'Views', src: 'https://placehold.co/600x400.png', alt: 'Night view of the city', aiHint: 'city night' },
];

const galleryFilters = ['All', 'Interiors', 'Exteriors', 'Amenities', 'Views'];

// Get unique floor plans from units data
const floorPlans = units
  .filter(unit => unit.floorPlanImage)
  .reduce((acc, current) => {
    // Add unit only if a plan for that bed count doesn't exist yet
    if (!acc.some(item => item.beds === current.beds)) {
      acc.push(current);
    }
    return acc;
  }, [] as Unit[])
  .sort((a,b) => a.beds - b.beds);


export function ImmersiveExperience() {
  const [galleryFilter, setGalleryFilter] = useState('All');

  const filteredImages = galleryImages.filter(
    (image) => galleryFilter === 'All' || image.category === galleryFilter
  );

  return (
    <section id="virtual-tours" className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Step Inside, Virtually</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Get a true feel for your future home with our immersive tours, detailed floor plans, and stunning photo gallery.
          </p>
        </div>

        <Tabs defaultValue="tours" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-lg">
            <TabsTrigger value="tours" className="rounded-md">3D Virtual Tours</TabsTrigger>
            <TabsTrigger value="plans" className="rounded-md">Floor Plans</TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-md">Photo Gallery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tours" className="mt-8">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">High-quality Matterport virtual tour will be embedded here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="plans" className="mt-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {floorPlans.map((plan, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg mb-4 text-center">{plan.title}</h3>
                            <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                                {plan.floorPlanImage && (
                                    <Image
                                        src={plan.floorPlanImage}
                                        alt={`Floor plan for ${plan.title}`}
                                        data-ai-hint="apartment floor plan"
                                        width={800}
                                        height={600}
                                        className="w-auto h-full object-contain"
                                    />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
             </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-8">
            <div className="flex justify-center flex-wrap gap-2 mb-8">
              {galleryFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={galleryFilter === filter ? 'default' : 'outline'}
                  className={`rounded-lg ${galleryFilter === filter ? 'bg-primary-gradient text-primary-foreground' : ''}`}
                  onClick={() => setGalleryFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg aspect-square">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    data-ai-hint={image.aiHint}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
