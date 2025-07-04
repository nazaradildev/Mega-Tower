"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Ruler, Eye, CheckCircle, Armchair } from 'lucide-react';

const units = [
  {
    type: '2 Bedroom',
    title: 'Two-Bedroom Apartment - Type C',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'luxury living room',
    area: '1,450 sq. ft.',
    view: 'Burj Khalifa View',
    status: 'Available Now',
    rent: 220000,
    furnished: true,
    exclusive: true,
    verified: true,
  },
  {
    type: '1 Bedroom',
    title: 'One-Bedroom Apartment - Type A',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'modern apartment interior',
    area: '950 sq. ft.',
    view: 'Canal View',
    status: 'Available Now',
    rent: 150000,
    furnished: false,
    exclusive: false,
    verified: true,
  },
  {
    type: '3 Bedroom',
    title: 'Three-Bedroom Sky Villa',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'spacious apartment kitchen',
    area: '2,200 sq. ft.',
    view: 'Full Canal View',
    status: 'Available Now',
    rent: 350000,
    furnished: true,
    exclusive: true,
    verified: true,
  },
  {
    type: '4 Bedroom',
    title: 'Four-Bedroom Penthouse',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'penthouse apartment view',
    area: '3,800 sq. ft.',
    view: '360° Panoramic View',
    status: 'Limited Availability',
    rent: 550000,
    furnished: true,
    exclusive: true,
    verified: true,
  },
  {
    type: '1 Bedroom',
    title: 'One-Bedroom Apartment - Type B',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'cozy bedroom apartment',
    area: '1,050 sq. ft.',
    view: 'Business Bay View',
    status: 'Available Now',
    rent: 165000,
    furnished: true,
    exclusive: false,
    verified: true,
  },
  {
    type: '2 Bedroom',
    title: 'Two-Bedroom Apartment - Type D',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'minimalist apartment design',
    area: '1,600 sq. ft.',
    view: 'Downtown View',
    status: 'Available Now',
    rent: 245000,
    furnished: false,
    exclusive: false,
    verified: true,
  },
];

const filters = ['All', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom'];

export function Residences() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredUnits = units.filter(
    (unit) => activeFilter === 'All' || unit.type === activeFilter
  );

  return (
    <section id="residences" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Find Your Perfect Home</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Explore our collection of meticulously designed apartments, each offering a unique blend of luxury and comfort.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              className={`rounded-lg ${activeFilter === filter ? 'bg-primary-gradient text-primary-foreground' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUnits.map((unit, index) => (
            <Card key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={unit.image}
                    alt={unit.title}
                    data-ai-hint={unit.aiHint}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {unit.verified && (
                        <div className="flex items-center gap-1.5 bg-background/80 backdrop-blur-sm text-foreground text-xs font-bold py-1 px-2 rounded-full shadow-md">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>eni Verified</span>
                        </div>
                    )}
                    {unit.exclusive && (
                        <div className="bg-primary-gradient text-primary-foreground text-xs font-bold py-1 px-2 rounded-full shadow-md">
                            Exclusive
                        </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-headline mb-2">{unit.title}</h3>
                   <p className="text-2xl font-bold font-headline text-primary mb-4">
                      AED {unit.rent.toLocaleString()} <span className="text-base font-normal text-muted-foreground">/ year</span>
                  </p>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Ruler className="w-5 h-5 text-primary" />
                      <span>{unit.area}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-primary" />
                      <span>{unit.view}</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <Armchair className="w-5 h-5 text-primary" />
                      <span>{unit.furnished ? 'Furnished' : 'Unfurnished'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>{unit.status}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 bg-primary-gradient text-primary-foreground hover:opacity-90 transition-opacity rounded-lg">3D Virtual Tour</Button>
                    <Button variant="outline" className="flex-1 rounded-lg">View Floor Plan</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
