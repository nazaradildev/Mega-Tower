
"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Ruler, ChevronDown, Search, BedDouble, Wallet, SlidersHorizontal, Building2, X, Check, Landmark, KeyRound, Home, ChevronRight, MapPin, Video, Camera, Bed, Bath, Heart, Phone, Mail, ChevronLeft, LayoutDashboard, Armchair, View, Share2, Bookmark, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';


const units = [
  {
    type: '2 Bedroom',
    propertyType: 'Apartment',
    beds: 2,
    baths: 3,
    title: 'Two-Bedroom Apartment - Type C',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'luxury living room',
    area: 1450,
    view: 'Burj Khalifa View',
    status: 'Available Now',
    rent: 220000,
    furnished: true,
    exclusive: true,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Landmark']
  },
  {
    type: '1 Bedroom',
    propertyType: 'Apartment',
    beds: 1,
    baths: 2,
    title: 'One-Bedroom Apartment - Type A',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'modern apartment interior',
    area: 950,
    view: 'Canal View',
    status: 'Available Now',
    rent: 150000,
    furnished: false,
    exclusive: false,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Water']
  },
  {
    type: '3 Bedroom',
    propertyType: 'Apartment',
    beds: 3,
    baths: 4,
    title: 'Three-Bedroom Sky Villa',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'spacious apartment kitchen',
    area: 2200,
    view: 'Full Canal View',
    status: 'Available Now',
    rent: 350000,
    furnished: true,
    exclusive: true,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Water', 'View of Landmark', 'Walk-in Closet']
  },
  {
    type: '4 Bedroom',
    propertyType: 'Penthouse',
    beds: 4,
    baths: 5,
    title: 'Four-Bedroom Penthouse',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'penthouse apartment view',
    area: 3800,
    view: '360° Panoramic View',
    status: 'Limited Availability',
    rent: 550000,
    furnished: true,
    exclusive: true,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Water', 'View of Landmark', 'Private Jacuzzi', 'Study']
  },
  {
    type: '1 Bedroom',
    propertyType: 'Apartment',
    beds: 1,
    baths: 1,
    title: 'One-Bedroom Apartment - Type B',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'cozy bedroom apartment',
    area: 1050,
    view: 'Business Bay View',
    status: 'Available Now',
    rent: 165000,
    furnished: true,
    exclusive: false,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking']
  },
  {
    type: '2 Bedroom',
    propertyType: 'Apartment',
    beds: 2,
    baths: 2,
    title: 'Two-Bedroom Apartment - Type D',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'minimalist apartment design',
    area: 1600,
    view: 'Downtown View',
    status: 'Available Now',
    rent: 245000,
    furnished: false,
    exclusive: false,
    verified: true,
    amenities: ['Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Landmark']
  },
];


const allAmenities = ['Maids Room', 'Balcony', 'Shared Pool', 'Shared Spa', 'Shared Gym', 'Central A/C', 'Concierge Service', 'Covered Parking', 'View of Water', 'View of Landmark', 'Pets Allowed', 'Children\'s Play Area', 'Children\'s Pool', 'Barbecue Area', 'Built in Wardrobes', 'Study', 'Walk-in Closet', 'Private Jacuzzi'];

const FilterButton = ({ filterKey, filters, ...props }) => {
    
    const getButtonText = () => {
        const data = filters[filterKey];
        if (!data || Object.keys(data).length === 0) {
            if (filterKey === 'Apartment') return 'Property Type';
            if (filterKey === 'Rent') return 'Rent';
            if (filterKey === 'Beds & Baths') return 'Beds & Baths';
            if (filterKey === 'Price') return 'Price';
            return 'More Filters';
        }

        switch (filterKey) {
            case 'Apartment':
                return data.type || 'Property Type';
            case 'Rent':
                return data.type || filterKey;
            case 'Price':
                const parts = [];
                if (data.min_price || data.max_price) parts.push(`AED ${data.min_price || 'Any'} - ${data.max_price || 'Any'}`);
                if (data.period) parts.push(data.period);
                return parts.join(' ') || filterKey;
            case 'Beds & Baths':
                const bedParts = [];
                if (data.beds) bedParts.push(`${data.beds} ${data.beds === 'Studio' ? '' : 'Bed'}`);
                if (data.baths) bedParts.push(`${data.baths} Bath`);
                return bedParts.join(', ') || 'Beds & Baths';
            default:
                if (data && Object.values(data).flat().length > 0) return `More Filters (${Object.values(data).flat().length})`
                return 'More Filters';
        }
    };

    const isActive = filters[filterKey] && Object.values(filters[filterKey]).some(v => v && (Array.isArray(v) ? v.length > 0 : true));
    
    const iconMap = {
      'Rent': KeyRound,
      'Apartment': Building2,
      'Beds & Baths': BedDouble,
      'Price': Wallet,
      'More Filters': SlidersHorizontal
    }
    const Icon = iconMap[filterKey];

    return (
        <Button
            variant="outline"
            className={cn(
                "h-12 px-3 md:px-4 text-sm font-medium flex items-center gap-2 transition-colors w-full justify-start",
                isActive ? "border-primary bg-primary/10 text-primary" : "text-foreground/70 border-border",
                "hover:bg-accent hover:text-accent-foreground rounded-lg"
            )}
            {...props}
        >
            {Icon && <Icon className="h-5 w-5" />}
            <span className="truncate">{getButtonText()}</span>
        </Button>
    );
};

export function Residences() {
    const [filters, setFilters] = useState({});
    const [sortOption, setSortOption] = useState('Newest');
    const [isAmenitiesExpanded, setIsAmenitiesExpanded] = useState(false);
    const [openPopovers, setOpenPopovers] = useState({});
    const isMobile = useIsMobile();
    const [searchTags, setSearchTags] = useState(['Churchill Towers', 'Business Bay']);
    const [inputValue, setInputValue] = useState('');

    const handlePopoverOpenChange = (filterKey, isOpen) => {
        setOpenPopovers(prev => ({ ...prev, [filterKey]: isOpen }));
    };

    const handleFilterChange = (filterKey, newValues) => {
        setFilters(prev => {
            const updated = { ...prev };
            if (newValues && Object.keys(newValues).length > 0) {
                updated[filterKey] = { ...(updated[filterKey] || {}), ...newValues };
            } else {
                delete updated[filterKey];
            }
            return updated;
        });
    };
    
    const handleSingleValueChange = (filterKey, value) => {
        setFilters(prev => ({ ...prev, [filterKey]: { ...prev[filterKey], ...value } }));
    };

    const clearFilter = (filterKey) => {
        setFilters(prev => {
            const updated = { ...prev };
            delete updated[filterKey];
            return updated;
        });
    };
    
    const removeSearchTag = (tagToRemove) => {
        setSearchTags(prev => prev.filter(tag => tag !== tagToRemove));
    };
    
    const addSearchTag = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setSearchTags(prev => [...prev, inputValue.trim()]);
            setInputValue('');
            e.preventDefault();
        }
    };

    const filteredUnits = useMemo(() => units.filter(unit => {
        const { 'Rent': rentFilter, 'Apartment': apartmentFilter, 'Price': priceFilter, 'Beds & Baths': bedBathFilter, 'More Filters': moreFilters } = filters;

        if (rentFilter?.type && rentFilter.type !== 'Rent') return false;
        
        if (apartmentFilter?.type && unit.propertyType !== apartmentFilter.type) return false;

        if (priceFilter) {
            if (priceFilter.min_price && unit.rent < parseInt(priceFilter.min_price, 10)) return false;
            if (priceFilter.max_price && unit.rent > parseInt(priceFilter.max_price, 10)) return false;
        }

        if (bedBathFilter) {
            if (bedBathFilter.beds && bedBathFilter.beds !== 'Any') {
                 if (bedBathFilter.beds === 'Studio' && unit.type !== 'Studio') return false;
                 if (bedBathFilter.beds !== 'Studio' && !isNaN(parseInt(bedBathFilter.beds, 10)) && unit.beds < parseInt(bedBathFilter.beds, 10)) return false;
            }
            if (bedBathFilter.baths && bedBathFilter.baths !== 'Any' && !isNaN(parseInt(bedBathFilter.baths, 10)) && unit.baths < parseInt(bedBathFilter.baths, 10)) return false;
        }
        
        if (moreFilters) {
            if (moreFilters.furnishing && moreFilters.furnishing !== 'Any' && (moreFilters.furnishing === 'Furnished' ? !unit.furnished : unit.furnished)) return false;
            if (moreFilters.min_area && unit.area < parseInt(moreFilters.min_area, 10)) return false;
            if (moreFilters.max_area && unit.area > parseInt(moreFilters.max_area, 10)) return false;
            if (moreFilters.amenities && moreFilters.amenities.length > 0) {
                if (!moreFilters.amenities.every(amenity => unit.amenities.includes(amenity))) return false;
            }
        }
        
        return true;
    }), [filters]);

    const sortedUnits = useMemo(() => {
        const unitsToSort = [...filteredUnits];
        switch (sortOption) {
            case 'Price (low to high)':
                unitsToSort.sort((a, b) => a.rent - b.rent);
                break;
            case 'Price (high to low)':
                unitsToSort.sort((a, b) => b.rent - a.rent);
                break;
            case 'Beds (most to least)':
                unitsToSort.sort((a, b) => b.beds - a.beds);
                break;
            case 'Beds (least to most)':
                unitsToSort.sort((a, b) => a.beds - b.beds);
                break;
            case 'Newest':
            default:
                // The original order is assumed to be 'Newest'.
                break;
        }
        return unitsToSort;
    }, [filteredUnits, sortOption]);
    
    const renderFilterPopoverContent = (filterKey) => {
        const closePopover = () => handlePopoverOpenChange(filterKey, false);
        const currentValues = filters[filterKey] || {};

        const contentProps = {
            onValueChange: (value) => handleSingleValueChange(filterKey, value),
            onApply: closePopover,
            onClear: () => {
                clearFilter(filterKey);
                closePopover();
            },
            values: currentValues,
            isMobile: isMobile,
            title: filterKey
        };

        switch (filterKey) {
            case 'Rent':
                return <RentFilterPopover {...contentProps} />;
            case 'Apartment':
                return <UnitTypeFilterPopover {...contentProps} />;
            case 'Price':
                return <PriceFilterPopover {...contentProps} />;
            case 'Beds & Baths':
                return <BedBathFilterPopover {...contentProps} />;
            default:
                return null;
        }
    };

    const filterButtons = ['Rent', 'Apartment', 'Beds & Baths', 'Price'];
    
    return (
    <section id="residences" className="w-full py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Find Your Perfect Home</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Explore our collection of meticulously designed apartments, each offering a unique blend of luxury and comfort.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 border mb-8">
            <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="relative flex-grow w-full flex items-center gap-2 p-1 pl-3 rounded-lg bg-gray-50 border border-gray-200 h-12">
                    <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex items-center gap-1.5 flex-nowrap overflow-x-auto no-scrollbar">
                        {searchTags.map(tag => (
                            <div key={tag} className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-md px-2 py-0.5 text-sm font-medium shrink-0">
                                <span>{tag}</span>
                                <button onClick={() => removeSearchTag(tag)}>
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            placeholder={searchTags.length === 0 ? "Search by City, Community, or Building" : ""}
                            className="bg-transparent focus:ring-0 border-0 p-0 h-10 flex-grow w-32 outline-none text-sm"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={addSearchTag}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="grid w-full grid-cols-2 md:grid-cols-none md:flex gap-2">
                      {filterButtons.map(key => {
                          const trigger = (
                              <FilterButton filterKey={key} filters={filters} />
                          );
                          const content = renderFilterPopoverContent(key);

                          if (isMobile) {
                              return (
                                  <Dialog key={key} open={openPopovers[key] || false} onOpenChange={(isOpen) => handlePopoverOpenChange(key, isOpen)}>
                                      <DialogTrigger asChild>{trigger}</DialogTrigger>
                                      <DialogContent className="p-0 max-w-md w-[90%] flex flex-col">
                                          {content}
                                      </DialogContent>
                                  </Dialog>
                              );
                          }

                          return (
                              <Popover key={key} open={openPopovers[key] || false} onOpenChange={(isOpen) => handlePopoverOpenChange(key, isOpen)}>
                                  <PopoverTrigger asChild>{trigger}</PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                      {content}
                                  </PopoverContent>
                              </Popover>
                          );
                      })}
                      <Dialog>
                            <DialogTrigger asChild>
                                 <FilterButton filterKey="More Filters" filters={filters}/>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl p-0 flex flex-col">
                                <MoreFiltersModal
                                    onApply={(values) => {
                                      handleFilterChange('More Filters', values);
                                    }}
                                    onClear={() => clearFilter('More Filters')}
                                    initialValues={filters['More Filters']}
                                    isExpanded={isAmenitiesExpanded}
                                    setIsExpanded={setIsAmenitiesExpanded}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>

        {/* --- Results Header --- */}
        <div className="mb-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
              <li>
                <a href="#" className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Home className="h-4 w-4" />
                </a>
              </li>
              <li><ChevronRight className="h-4 w-4" /></li>
              <li><a href="#" className="hover:text-primary transition-colors">Apartments for rent in Dubai</a></li>
              <li><ChevronRight className="h-4 w-4" /></li>
              <li><a href="#" className="hover:text-primary transition-colors">Business Bay</a></li>
              <li><ChevronRight className="h-4 w-4" /></li>
              <li><a href="#" className="hover:text-primary transition-colors">Churchill Towers</a></li>
              <li><ChevronRight className="h-4 w-4" /></li>
              <li className="font-medium text-foreground truncate">Apartments for rent in Churchill Residency Tower, Churchill Towers</li>
            </ol>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-headline text-foreground leading-tight">Apartments for rent in Churchill Residency Tower, Churchill Towers</h1>
              <p className="mt-1 text-muted-foreground">{filteredUnits.length} properties</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="outline" className="rounded-lg w-full sm:w-auto justify-center">
                <MapPin className="mr-2 h-4 w-4" />
                Map view
              </Button>
              <Button variant="outline" className="rounded-lg w-full sm:w-auto justify-center">
                <Eye className="mr-2 h-4 w-4" />
                Insights
              </Button>
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-lg w-full sm:w-auto justify-center data-[state=open]:bg-accent">
                        Sort by: {sortOption}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setSortOption('Newest')}>Newest</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setSortOption('Price (low to high)')}>Price (low to high)</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setSortOption('Price (high to low)')}>Price (high to low)</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setSortOption('Beds (most to least)')}>Beds (most to least)</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setSortOption('Beds (least to most)')}>Beds (least to most)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>


        {/* --- Unit Listings --- */}
        <div className="grid grid-cols-1 gap-6 px-2 sm:px-0">
          {sortedUnits.length > 0 ? (
            sortedUnits.map((unit, index) => (
              <UnitCard key={index} unit={unit} />
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

const UnitCard = ({ unit }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // Mocking extra images for the carousel
    const images = [
        unit.image,
        'https://placehold.co/600x400.png',
        'https://placehold.co/600x400.png',
        'https://placehold.co/600x400.png'
    ];

    const nextImage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    }
    
    return (
        <Card className="w-full overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-background flex flex-col">
            <div className="flex flex-col md:flex-row">
                {/* Left side: Image */}
                 <div className="relative w-full md:w-1/2 lg:w-5/12 flex-shrink-0 group/image">
                    <Image
                        key={currentImageIndex} 
                        src={images[currentImageIndex]}
                        alt={`${unit.title} - Image ${currentImageIndex + 1}`}
                        data-ai-hint={unit.aiHint}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover aspect-[4/3]"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                    
                    <Button onClick={prevImage} size="icon" variant="secondary" className="absolute top-1/2 -translate-y-1/2 left-3 rounded-full h-8 w-8 bg-white/80 hover:bg-white text-gray-800 opacity-0 group-hover/image:opacity-100 transition-opacity">
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button onClick={nextImage} size="icon" variant="secondary" className="absolute top-1/2 -translate-y-1/2 right-3 rounded-full h-8 w-8 bg-white/80 hover:bg-white text-gray-800 opacity-0 group-hover/image:opacity-100 transition-opacity">
                        <ChevronRight className="w-5 h-5" />
                    </Button>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
                        {images.map((_, index) => (
                            <button key={index} onClick={() => goToImage(index)} className="p-1" aria-label={`Go to image ${index + 1}`}>
                                <div className={cn("w-2.5 h-2.5 rounded-full border-2 bg-transparent transition-all", 
                                    currentImageIndex === index ? 'bg-primary border-primary' : 'border-white/80 bg-black/30'
                                )}></div>
                            </button>
                        ))}
                    </div>

                    <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-semibold py-1 px-2 rounded-md flex items-center gap-1.5">
                        <Camera className="w-4 h-4" />
                        <span>{images.length}</span>
                    </div>
                </div>

                {/* Right side: Details */}
                <div className="flex-1 flex flex-col p-4">
                    <div className="flex justify-between items-start">
                        <span className="text-sm text-muted-foreground">{unit.propertyType}</span>
                        <Image src="https://placehold.co/100x40.png" alt="Agency Logo" data-ai-hint="real estate logo" width={70} height={28} className="mt-1"/>
                    </div>

                    <p className="text-2xl font-bold text-foreground my-1">
                        AED {unit.rent.toLocaleString()} <span className="text-base font-normal text-muted-foreground">/ year</span>
                    </p>
                    
                    <a href="#" className="text-lg font-semibold text-foreground hover:text-primary transition-colors cursor-pointer block truncate">{unit.title}</a>
                    
                    <p className="text-sm text-muted-foreground my-2">{unit.status}</p>

                    <div className="my-4 border-b border-border -mx-4"></div>

                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span>Churchill Residency Tower, Churchill Towers, Business Bay</span>
                        </div>
                         <div className="flex items-center gap-x-4 gap-y-1 flex-wrap text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Bed className="w-4 h-4" />
                                <span>{unit.beds} Beds</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Bath className="w-4 h-4" />
                                <span>{unit.baths} Baths</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Ruler className="w-4 h-4" />
                                <span>{unit.area.toLocaleString()} sqft</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4 gap-y-1 flex-wrap text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Armchair className="w-4 h-4" />
                                <span>{unit.furnished ? 'Furnished' : 'Unfurnished'}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <View className="w-4 h-4" />
                                <span>{unit.view}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50/50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="agent portrait" alt="Agent" />
                            <AvatarFallback>EN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-xs text-muted-foreground">Marketing by</p>
                            <p className="font-semibold text-foreground text-sm">eni Real Estate</p>
                        </div>
                    </div>
                    <div className="flex items-center flex-wrap justify-start gap-2">
                        <Button variant="outline" size="sm" className="rounded-md"> <Phone className="mr-1.5 h-3.5 w-3.5" /> <span>Call</span> </Button>
                        <Button variant="outline" size="sm" className="rounded-md"> <Mail className="mr-1.5 h-3.5 w-3.5" /> <span>Email</span> </Button>
                        <Button size="sm" className="bg-[#25D366] text-white hover:bg-[#1EBE56] border-[#25D366] rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-1.5 h-4 w-4">
                              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.1-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-1.001.164-.521.164-.97.114-1.07l-.26-.065z"/>
                            </svg>
                            <span>WhatsApp</span>
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-md"> <Video className="mr-1.5 h-3.5 w-3.5" /> <span>Virtual Tour</span> </Button>
                        <Button variant="outline" size="sm" className="rounded-md"> <LayoutDashboard className="mr-1.5 h-3.5 w-3.5" /> <span>Floor Plan</span> </Button>
                        <Separator orientation="vertical" className="h-6 mx-1 bg-border hidden lg:block" />
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full"> <Share2 className="w-5 h-5 text-muted-foreground" /> </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full"> <Bookmark className="w-5 h-5 text-muted-foreground" /> </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full"> <Heart className="w-5 h-5 text-muted-foreground" /> </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};


// --- Filter Popover Components ---

const FilterHeader = ({ title, onClear }) => (
    <DialogHeader className="p-4 border-b text-left relative flex-row justify-between items-center">
        <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </DialogClose>
        <DialogTitle className="text-xl font-headline text-center flex-grow">{title}</DialogTitle>
        <Button variant="link" onClick={onClear} className="text-primary p-0 h-auto">Clear</Button>
    </DialogHeader>
);

const FilterPopoverFooter = ({ onApply, onClear, isMobile }) => {
    const clearButton = <Button variant="ghost" onClick={onClear} className="rounded-lg">Clear</Button>;
    const applyButton = <Button className="bg-primary-gradient text-primary-foreground rounded-lg" onClick={onApply}>Apply</Button>;

    if (isMobile) {
        return (
             <div className="px-4 py-3 bg-secondary/50 border-t flex justify-end gap-2">
                <DialogClose asChild>
                    {clearButton}
                </DialogClose>
                <DialogClose asChild>
                    {applyButton}
                </DialogClose>
            </div>
        )
    }

    return (
        <div className="px-4 py-3 bg-secondary/50 border-t flex justify-end gap-2">
            {clearButton}
            {applyButton}
        </div>
    );
};


const ControlButton = ({ value, selectedValue, onSelect, children, className }) => (
    <Button
        variant="outline"
        className={cn(
          "h-10 transition-colors duration-200 ease-in-out border-border", 
          selectedValue === value && "bg-primary-gradient border-transparent text-primary-foreground shadow-sm",
          className
        )}
        onClick={() => onSelect(value)}
    >
        {children || value}
    </Button>
);

const RentFilterPopover = ({ onValueChange, values, onApply, onClear, isMobile, title }) => {
    const types = ['Rent', 'Buy'];
    const buttonContent = (type) => {
        const isSelected = values.type === type;
        const button = (
            <button
              onClick={() => { onValueChange({ type }); onApply(); }} 
              className={cn('flex justify-between items-center p-2 text-sm rounded-md w-full text-left', isSelected ? 'font-semibold text-primary' : 'hover:bg-accent' )}>
              <span>{type}</span> 
              {isSelected && <Check className="h-4 w-4" />}
            </button>
        );
        if (isMobile) {
            return <li key={type}><DialogClose asChild>{button}</DialogClose></li>
        }
        return <li key={type}>{button}</li>;
    }
    return (
        <>
        {isMobile && <FilterHeader title={title} onClear={onClear}/>}
        <div className="p-2 w-64">
             <ul className="max-h-60 overflow-y-auto">
                {types.map(buttonContent)}
            </ul>
        </div>
      </>
    )
};

const UnitTypeFilterPopover = ({ onValueChange, values, onApply, onClear, isMobile, title }) => {
    const types = ['Apartment', 'Penthouse', 'Villa', 'Townhouse'];
    const buttonContent = (type) => {
        const isSelected = values.type === type;
        const button = (
            <button
              onClick={() => { onValueChange({ type }); onApply(); }} 
              className={cn('flex justify-between items-center p-2 text-sm rounded-md w-full text-left', isSelected ? 'font-semibold text-primary' : 'hover:bg-accent' )}>
              <span>{type}</span> 
              {isSelected && <Check className="h-4 w-4" />}
            </button>
        );
         if (isMobile) {
            return <li key={type}><DialogClose asChild>{button}</DialogClose></li>
        }
        return <li key={type}>{button}</li>;
    };
    return (
        <>
        {isMobile && <FilterHeader title={title} onClear={onClear} />}
        <div className="p-2 w-64">
             <ul className="max-h-60 overflow-y-auto">
                {types.map(buttonContent)}
            </ul>
        </div>
      </>
    )
};

const PriceFilterPopover = ({ onValueChange, values, onApply, onClear, isMobile, title }) => {
    return (
      <>
        {isMobile && <FilterHeader title={title} onClear={onClear} />}
        <div className="w-full sm:w-96">
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <Input type="number" name="min_price" placeholder="Min. Price (AED)" value={values.min_price || ''} onChange={(e) => onValueChange({ min_price: e.target.value })} className="rounded-lg h-12"/>
                     <Input type="number" name="max_price" placeholder="Max. Price (AED)" value={values.max_price || ''} onChange={(e) => onValueChange({ max_price: e.target.value })} className="rounded-lg h-12"/>
                </div>
                 <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 block">Rental Period</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Yearly', 'Monthly'].map(period => (
                            <ControlButton key={period} value={period} selectedValue={values.period} onSelect={(val) => onValueChange({ period: val })} className="rounded-lg flex-1">{period}</ControlButton>
                        ))}
                    </div>
                 </div>
            </div>
            <FilterPopoverFooter onApply={onApply} onClear={onClear} isMobile={isMobile} />
        </div>
      </>
    )
}

const BedBathFilterPopover = ({ onValueChange, values, onApply, onClear, isMobile, title }) => {
    const bedOptions = ['1', '2', '3', '4+'];
    const bathOptions = ['1', '2', '3', '4', '5+'];
    return (
        <>
            {isMobile && <FilterHeader title={title} onClear={onClear} />}
            <div className="w-full sm:w-80">
                <div className="p-4 space-y-4">
                     <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 block">Bedrooms</h4>
                        <div className="space-y-2">
                            <ControlButton value={'Studio'} selectedValue={values.beds} onSelect={(val) => onValueChange({ beds: val })} className="w-full rounded-lg">Studio</ControlButton>
                            <div className="flex flex-wrap gap-2">
                                {bedOptions.map(o => <ControlButton key={o} value={o} selectedValue={values.beds} onSelect={(val) => onValueChange({ beds: val })} className="w-12 h-12 rounded-lg">{o}</ControlButton>)}
                            </div>
                        </div>
                     </div>
                     <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 block">Bathrooms</h4>
                        <div className="flex flex-wrap gap-2">
                            {bathOptions.map(o => <ControlButton key={o} value={o} selectedValue={values.baths} onSelect={(val) => onValueChange({ baths: val })} className="w-12 h-12 rounded-lg">{o}</ControlButton>)}
                        </div>
                     </div>
                </div>
                <FilterPopoverFooter onApply={onApply} onClear={onClear} isMobile={isMobile} />
            </div>
        </>
    )
}


const MoreFiltersModal = ({ onApply, onClear, initialValues, isExpanded, setIsExpanded }) => {
    const [localFilters, setLocalFilters] = useState(initialValues || {});

    const handleValueChange = (key, value) => {
        setLocalFilters(prev => ({...prev, [key]: value}));
    }
    
    const handleAmenityChange = (amenity, checked) => {
        const currentAmenities = localFilters.amenities || [];
        const newAmenities = checked
            ? [...currentAmenities, amenity]
            : currentAmenities.filter(a => a !== amenity);
        handleValueChange('amenities', newAmenities);
    }
    
    const amenitiesToShow = isExpanded ? allAmenities : allAmenities.slice(0, 9);
    
    const clearAndClose = () => {
      setLocalFilters({});
      onClear();
    }

    return (
         <>
            <DialogHeader className="p-6 border-b text-center relative">
              <DialogTitle className="text-2xl font-headline">More Filters</DialogTitle>
                <DialogClose className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogHeader>

            <div className="p-6 space-y-8 overflow-y-auto max-h-[60vh]">
                 <div>
                    <h4 className="font-semibold text-foreground mb-3">Furnishing</h4>
                    <div className="flex flex-wrap gap-2">
                         {['Any', 'Furnished', 'Unfurnished'].map(o => <ControlButton key={o} value={o} selectedValue={localFilters.furnishing || 'Any'} onSelect={(val) => handleValueChange('furnishing', val)} className="rounded-full px-4">{o}</ControlButton>)}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-foreground mb-3">Property Size (sq. ft.)</h4>
                    <div className="grid grid-cols-2 gap-4">
                       <Input type="number" name="min_area" placeholder="Min. Area" value={localFilters.min_area || ''} onChange={e => handleValueChange('min_area', e.target.value)} className="rounded-lg h-12"/>
                       <Input type="number" name="max_area" placeholder="Max. Area" value={localFilters.max_area || ''} onChange={e => handleValueChange('max_area', e.target.value)} className="rounded-lg h-12"/>
                    </div>
                </div>
                
                <div>
                    <h4 className="font-semibold text-foreground mb-3">Amenities</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                         {amenitiesToShow.map(o => (
                             <label key={o} className="flex items-center gap-3 p-1 rounded-md hover:bg-accent cursor-pointer">
                                 <Checkbox 
                                     id={`amenity-${o}`}
                                     checked={localFilters.amenities?.includes(o) || false}
                                     onCheckedChange={(checked) => handleAmenityChange(o, !!checked)}
                                 />
                                 <span className="text-sm">{o}</span>
                             </label>
                         ))}
                    </div>
                    {allAmenities.length > 9 && (
                        <Button variant="link" className="text-primary p-0 h-auto mt-4" onClick={() => setIsExpanded(!isExpanded)}>
                            {isExpanded ? 'Show less' : 'Show more'}
                        </Button>
                    )}
                </div>
            </div>
            
            <div className="p-4 bg-secondary/50 border-t flex justify-between items-center">
                 <Button variant="ghost" onClick={clearAndClose}>Clear All</Button>
                 <DialogClose asChild>
                    <Button size="lg" className="bg-primary-gradient text-primary-foreground rounded-lg" onClick={() => onApply(localFilters)}>Show Results</Button>
                 </DialogClose>
            </div>
        </>
    )
}

    

    
