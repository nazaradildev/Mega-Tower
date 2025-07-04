
"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { Ruler, Eye, CheckCircle, Armchair, ChevronDown, Search, BedDouble, Bath, Wallet, SlidersHorizontal, Building2, X, Check, Landmark, CalendarDays, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';

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
            return filterKey;
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
                return bedParts.join(', ') || filterKey;
            default:
                if (data && Object.values(data).flat().length > 0) return `More Filters (${Object.values(data).flat().length})`
                return filterKey;
        }
    };

    const isActive = filters[filterKey] && Object.keys(filters[filterKey]).length > 0;
    
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
                "h-12 px-3 md:px-4 text-sm font-medium flex items-center gap-2 transition-colors w-full justify-center",
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
    }
    
    const removeSearchTag = (tagToRemove) => {
        setSearchTags(prev => prev.filter(tag => tag !== tagToRemove));
    }
    
    const addSearchTag = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setSearchTags(prev => [...prev, inputValue.trim()]);
            setInputValue('');
            e.preventDefault();
        }
    }

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

        <div className="bg-white rounded-lg shadow-sm p-3 border mb-12">
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
                    <div className="grid w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:flex gap-2">
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
                                 <FilterButton filterKey="More Filters" filters={filters} className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-auto"/>
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


        {/* --- Unit Listings --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUnits.length > 0 ? (
            filteredUnits.map((unit, index) => (
              <Card key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-background">
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
                        <span>{unit.area.toLocaleString()} sq. ft.</span>
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

// --- Filter Popover Components ---

const FilterHeader = ({ title }) => (
  <DialogHeader className="p-4 border-b">
    <DialogTitle className="text-xl text-center font-headline">{title}</DialogTitle>
  </DialogHeader>
);

const FilterPopoverFooter = ({ onApply, onClear, isMobile }) => {
    const clearButton = <Button variant="ghost" onClick={onClear} className="rounded-lg">Clear</Button>;
    const applyButton = <Button className="bg-primary-gradient text-primary-foreground rounded-lg" onClick={onApply}>Apply</Button>;

    if (isMobile) {
        return (
             <div className="px-4 py-3 bg-secondary/50 border-t flex justify-end gap-2">
                <DialogClose asChild>
                    <Button variant="ghost" onClick={onClear} className="rounded-lg">Clear</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button className="bg-primary-gradient text-primary-foreground rounded-lg" onClick={onApply}>Apply</Button>
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
        {isMobile && <FilterHeader title={title} />}
        <div className="p-2 w-64">
             <ul className="max-h-60 overflow-y-auto">
                {types.map(buttonContent)}
            </ul>
        </div>
        {!isMobile && <FilterPopoverFooter onApply={onApply} onClear={onClear} isMobile={isMobile} />}
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
        {isMobile && <FilterHeader title={title} />}
        <div className="p-2 w-64">
             <ul className="max-h-60 overflow-y-auto">
                {types.map(buttonContent)}
            </ul>
        </div>
        {!isMobile && <FilterPopoverFooter onApply={onApply} onClear={onClear} isMobile={isMobile} />}
      </>
    )
};

const PriceFilterPopover = ({ onValueChange, values, onApply, onClear, isMobile, title }) => {
    return (
      <>
        {isMobile && <FilterHeader title={title} />}
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
            {isMobile && <FilterHeader title={title} />}
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
    
    return (
         <>
            <DialogHeader className="p-6 border-b">
              <DialogTitle className="text-2xl font-headline text-center">More Filters</DialogTitle>
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
                 <Button variant="ghost" onClick={() => { setLocalFilters({}); onClear(); }}>Clear All</Button>
                 <DialogClose asChild>
                    <Button size="lg" className="bg-primary-gradient text-primary-foreground rounded-lg" onClick={() => onApply(localFilters)}>Show Results</Button>
                 </DialogClose>
            </div>
        </>
    )
}

    

    

