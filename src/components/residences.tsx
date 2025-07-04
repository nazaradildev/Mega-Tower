"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Ruler, Eye, CheckCircle, Armchair, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';

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

const unitTypes = ['All', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom'];
const furnishedStatusOptions = ['Any', 'Furnished', 'Unfurnished'];

const SearchBar = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [unitType, setUnitType] = useState('All');
  const [priceRange, setPriceRange] = useState([100000, 600000]);
  const [furnishedStatus, setFurnishedStatus] = useState('Any');

  const handleFilterChange = (newFilters: any) => {
    onFilterChange({
      type: unitType,
      priceRange: priceRange,
      furnished: furnishedStatus,
      ...newFilters,
    });
  };

  const handleUnitTypeChange = (type: string) => {
    setUnitType(type);
    handleFilterChange({ type });
  };

  const handlePriceChange = (newRange: number[]) => {
    setPriceRange(newRange);
    handleFilterChange({ priceRange: newRange });
  };

  const handleFurnishedChange = (status: string) => {
    setFurnishedStatus(status);
    handleFilterChange({ furnished: status });
  };

  const formatCurrency = (value: number) => `AED ${new Intl.NumberFormat().format(value)}`;

  return (
    <div className="bg-background rounded-lg shadow-md p-4 mb-12 border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Unit Type</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between text-base">
                <span>{unitType}</span> <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              {unitTypes.map(type => (
                <div key={type} onClick={() => handleUnitTypeChange(type)} className={`p-2 text-sm rounded-md cursor-pointer hover:bg-accent ${unitType === type ? 'bg-accent font-semibold text-primary' : ''}`}>
                  {type}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Price (per year)</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between text-base">
                <span>{formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}</span> <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-4">
              <Slider
                value={priceRange}
                min={100000}
                max={600000}
                step={10000}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{formatCurrency(priceRange[0])}</span>
                <span>{formatCurrency(priceRange[1])}</span>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Furnishing</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between text-base">
                <span>{furnishedStatus}</span> <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              {furnishedStatusOptions.map(status => (
                <div key={status} onClick={() => handleFurnishedChange(status)} className={`p-2 text-sm rounded-md cursor-pointer hover:bg-accent ${furnishedStatus === status ? 'bg-accent font-semibold text-primary' : ''}`}>
                  {status}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};


export function Residences() {
  const [filters, setFilters] = useState({
    type: 'All',
    priceRange: [100000, 600000],
    furnished: 'Any',
  });

  const filteredUnits = units.filter(unit => {
    const typeMatch = filters.type === 'All' || unit.type === filters.type;
    const priceMatch = unit.rent >= filters.priceRange[0] && unit.rent <= filters.priceRange[1];
    const furnishedMatch = filters.furnished === 'Any' || (filters.furnished === 'Furnished' && unit.furnished) || (filters.furnished === 'Unfurnished' && !unit.furnished);

    return typeMatch && priceMatch && furnishedMatch;
  });

  return (
    <section id="residences" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Find Your Perfect Home</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Explore our collection of meticulously designed apartments, each offering a unique blend of luxury and comfort.
          </p>
        </div>

        <SearchBar onFilterChange={setFilters} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUnits.length > 0 ? (
            filteredUnits.map((unit, index) => (
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
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">No units found matching your criteria.</p>
              <p className="text-sm text-muted-foreground mt-1">Please try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
