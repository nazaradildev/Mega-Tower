

"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Ruler, ChevronDown, Search, BedDouble, Wallet, SlidersHorizontal, Building2, X, Check, KeyRound, Home, ChevronRight, MapPin, Eye, LayoutDashboard, Armchair, View, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';
import { units } from '@/data/units';
import { UnitCard } from './unit-card';
import { Breadcrumb } from './breadcrumb';
import nlp from 'compromise';
import { useToast } from "@/hooks/use-toast";

const allAmenities = ['Maids Room', 'Balcony', 'Shared Pool', 'Shared Spa', 'Shared Gym', 'Central A/C', 'Concierge Service', 'Covered Parking', 'View of Water', 'View of Landmark', 'Pets Allowed', 'Children\'s Play Area', 'Children\'s Pool', 'Barbecue Area', 'Built in Wardrobes', 'Study', 'Walk-in Closet', 'Private Jacuzzi'];

type FilterKey = 'Rent' | 'Apartment' | 'Beds & Baths' | 'Price' | 'More Filters' | 'Sort';
type FilterValues = {
    [key: string]: any;
};

type FilterButtonProps = React.ComponentProps<typeof Button> & {
  filterKey: FilterKey;
  filters: FilterValues;
  sortOption?: string;
};

function FilterButton({ filterKey, filters, sortOption, ...props }: FilterButtonProps) {
    
    const getButtonText = () => {
        if (filterKey === 'Sort') return `Sort by: ${sortOption}`;
        
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
                if (!data.type || data.type === 'Any') return 'Property Type';
                return data.type;
            case 'Rent':
                 if (!data.type || data.type === 'Any') return 'Rent';
                return data.type;
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

    const isActive = (filterKey !== 'Sort' && filters[filterKey] && Object.values(filters[filterKey]).some(v => v && (Array.isArray(v) ? v.length > 0 : true))) || (filterKey === 'Sort' && sortOption !== 'Newest');
    
    const iconMap: Record<FilterKey, React.ElementType> = {
      'Rent': KeyRound,
      'Apartment': Building2,
      'Beds & Baths': BedDouble,
      'Price': Wallet,
      'More Filters': SlidersHorizontal,
      'Sort': ChevronDown
    }
    const Icon = iconMap[filterKey];

    return (
        <Button
            variant="outline"
            className={cn(
                "h-12 px-3 md:px-4 text-sm font-medium flex items-center gap-2 transition-colors w-full justify-between",
                isActive ? "border-primary bg-primary/10 text-primary" : "text-foreground/70 border-border",
                "hover:bg-accent hover:text-accent-foreground rounded-lg"
            )}
            {...props}
        >
            <span className="truncate">{getButtonText()}</span>
            {Icon && <Icon className={cn("h-5 w-5", filterKey !== 'Sort' && "hidden sm:inline")} />}
        </Button>
    );
};

type FilterPopoverProps = {
    onValueChange: (value: any) => void;
    values: any;
    onApply: () => void;
    onClear: () => void;
    isMobile: boolean;
    title: string;
};

type ControlButtonProps = React.ComponentProps<typeof Button> & {
    value: string;
    selectedValue: string;
    onSelect: (value: string) => void;
};

function ControlButton({ value, selectedValue, onSelect, children, className }: ControlButtonProps) {
    return (
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
}

function RentFilterPopover({ onValueChange, values, onApply, isMobile, title }: FilterPopoverProps) {
    const types = ['Any', 'Rent', 'Buy'];
    const buttonContent = (type: string) => {
        const isSelected = type === 'Any' ? !values.type : values.type === type;
        const button = (
            <button
              onClick={() => { 
                  onValueChange({ type: type === 'Any' ? undefined : type }); 
                  onApply(); 
              }} 
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
        {isMobile && (
            <DialogHeader className="p-4 border-b text-center relative">
                <DialogTitle className="text-xl font-headline">{title}</DialogTitle>
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 text-primary hover:text-primary hover:bg-primary/10">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogClose>
            </DialogHeader>
        )}
        <div className="p-2 w-64">
             <ul className="max-h-60 overflow-y-auto">
                {types.map(buttonContent)}
            </ul>
        </div>
      </>
    )
};

function UnitTypeFilterPopover({ onValueChange, values, onApply, isMobile, title }: FilterPopoverProps) {
    const types = ['Any', 'Apartment', 'Penthouse', 'Villa', 'Townhouse'];
    const buttonContent = (type: string) => {
        const isSelected = type === 'Any' ? !values.type : values.type === type;
        const button = (
            <button
              onClick={() => { 
                  onValueChange({ type: type === 'Any' ? undefined : type });
                  onApply();
              }} 
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
        {isMobile && (
            <DialogHeader className="p-4 border-b text-center relative">
                <DialogTitle className="text-xl font-headline">{title}</DialogTitle>
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 text-primary hover:text-primary hover:bg-primary/10">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogClose>
            </DialogHeader>
        )}
        <div className="p-2 w-64">
             <ul className="max-h-60 overflow-y-auto">
                {types.map(buttonContent)}
            </ul>
        </div>
      </>
    )
};

function PriceFilterPopover({ onValueChange, values, onApply, onClear, isMobile, title }: FilterPopoverProps) {
    const footer = (
         <div className="px-4 py-3 bg-secondary/50 border-t flex justify-end gap-2">
            <Button variant="ghost" onClick={onClear} className="rounded-lg">Clear</Button>
            <Button className="bg-primary-gradient text-primary-foreground rounded-lg" onClick={onApply}>Apply</Button>
        </div>
    );
    return (
      <>
        {isMobile && (
            <DialogHeader className="p-4 border-b text-center relative">
                <DialogTitle className="text-xl font-headline">{title}</DialogTitle>
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 text-primary hover:text-primary hover:bg-primary/10">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogClose>
            </DialogHeader>
        )}
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
            {isMobile ? (
                 <div className="px-4 py-3 bg-secondary/50 border-t flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="ghost" onClick={onClear} className="rounded-lg">Clear</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="bg-primary-gradient text-primary-foreground rounded-lg" onClick={onApply}>Apply</Button>
                    </DialogClose>
                </div>
            ) : footer}
        </div>
      </>
    )
}

function BedBathFilterPopover({ onValueChange, values, onApply, onClear, isMobile, title }: FilterPopoverProps) {
    const bedOptions = ['1', '2', '3', '4+'];
    const bathOptions = ['1', '2', '3', '4', '5+'];

     const footer = (
         <div className="px-4 py-3 bg-secondary/50 border-t flex justify-end gap-2">
            <Button variant="ghost" onClick={onClear} className="rounded-lg">Clear</Button>
            <Button className="bg-primary-gradient text-primary-foreground rounded-lg" onClick={onApply}>Apply</Button>
        </div>
    );
    return (
        <>
            {isMobile && (
                <DialogHeader className="p-4 border-b text-center relative">
                    <DialogTitle className="text-xl font-headline">{title}</DialogTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 text-primary hover:text-primary hover:bg-primary/10">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </DialogClose>
                </DialogHeader>
            )}
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
                {isMobile ? (
                     <div className="px-4 py-3 bg-secondary/50 border-t flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="ghost" onClick={onClear} className="rounded-lg">Clear</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className="bg-primary-gradient text-primary-foreground rounded-lg" onClick={onApply}>Apply</Button>
                        </DialogClose>
                    </div>
                ) : footer}
            </div>
        </>
    )
}


type MoreFiltersModalProps = {
    onApply: (values: any) => void;
    onClear: () => void;
    initialValues?: any;
    isExpanded: boolean;
    setIsExpanded: (isExpanded: boolean) => void;
};

function MoreFiltersModal({ onApply, onClear, initialValues, isExpanded, setIsExpanded }: MoreFiltersModalProps) {
    const [localFilters, setLocalFilters] = useState(initialValues || {});

    const handleValueChange = (key: string, value: any) => {
        setLocalFilters((prev: any) => ({...prev, [key]: value}));
    }
    
    const handleAmenityChange = (amenity: string, checked: boolean) => {
        const currentAmenities = localFilters.amenities || [];
        const newAmenities = checked
            ? [...currentAmenities, amenity]
            : currentAmenities.filter((a: string) => a !== amenity);
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
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 text-primary hover:text-primary hover:bg-primary/10">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
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

const arabicRegex = /[\u0600-\u06FF]/;

export function Residences() {
    const [filters, setFilters] = useState<FilterValues>({});
    const [sortOption, setSortOption] = useState('Newest');
    const [isAmenitiesExpanded, setIsAmenitiesExpanded] = useState(false);
    const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});
    const isMobile = useIsMobile();
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();

    const parseSearchQueryWithNLP = (query: string): FilterValues => {
        const doc = nlp(query.toLowerCase());
        const newFilters: FilterValues = {};

        if (doc.has('rent')) newFilters['Rent'] = { type: 'Rent' };
        if (doc.has('buy')) newFilters['Rent'] = { type: 'Buy' };

        const propertyTypes = ['apartment', 'penthouse', 'villa', 'townhouse'];
        const foundType = propertyTypes.find(type => doc.has(type));
        if (foundType) {
            newFilters['Apartment'] = { type: foundType.charAt(0).toUpperCase() + foundType.slice(1) };
        }

        const bedsMatch = doc.match('(#Value) (bed|beds|bedroom|bedrooms)').values(0);
        const bedsText = bedsMatch.text();
        if (bedsText) {
            const bedsVal = bedsText === 'studio' ? 'Studio' : nlp(bedsText).values().toNumber().out();
            if (bedsVal) newFilters['Beds & Baths'] = { ...newFilters['Beds & Baths'], beds: String(bedsVal) };
        }
        if (doc.has('studio')) {
            newFilters['Beds & Baths'] = { ...newFilters['Beds & Baths'], beds: 'Studio' };
        }

        const bathsMatch = doc.match('(#Value) (bath|baths|bathroom|bathrooms)').values(0);
        const bathsText = bathsMatch.text();
        if (bathsText) {
            const bathsVal = nlp(bathsText).values().toNumber().out();
            if(bathsVal) newFilters['Beds & Baths'] = { ...newFilters['Beds & Baths'], baths: String(bathsVal) };
        }

        const money = doc.money().get(0);
        if (money) {
            const amount = money.amount;
            if (doc.match(`(under|less|below) ${money.text}`).found) {
                newFilters['Price'] = { ...newFilters['Price'], max_price: amount };
            } else if (doc.match(`(over|more|above) ${money.text}`).found) {
                newFilters['Price'] = { ...newFilters['Price'], min_price: amount };
            } else {
                 newFilters['Price'] = { ...newFilters['Price'], max_price: amount };
            }
        }
        if (doc.has('yearly')) newFilters['Price'] = { ...newFilters['Price'], period: 'Yearly' };
        if (doc.has('monthly')) newFilters['Price'] = { ...newFilters['Price'], period: 'Monthly' };

        const furnishing = doc.match('(furnished|unfurnished)').text();
        if (furnishing) {
            newFilters['More Filters'] = { ...newFilters['More Filters'], furnishing: furnishing.charAt(0).toUpperCase() + furnishing.slice(1) };
        }
        
        const areaMatch = doc.match('(#Value) (sqft|sqm|square_feet|square_meters)').values(0);
        if (areaMatch.found) {
            const area = nlp(areaMatch.text()).values().toNumber().out();
            if(area) {
                if (doc.has('(over|more|above)')) {
                    newFilters['More Filters'] = { ...newFilters['More Filters'], min_area: area };
                } else if (doc.has('(under|less|below)')) {
                    newFilters['More Filters'] = { ...newFilters['More Filters'], max_area: area };
                }
            }
        }

        const foundAmenities = allAmenities.filter(amenity => doc.has(amenity.toLowerCase().replace(/s$/, '')));
        if (foundAmenities.length > 0) {
            newFilters['More Filters'] = { ...newFilters['More Filters'], amenities: foundAmenities };
        }
        
        return newFilters;
    }

    const parseArabicSearchQuery = (query: string): FilterValues => {
        const newFilters: FilterValues = {};
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('إيجار') || lowerQuery.includes('للإيجار')) newFilters['Rent'] = { type: 'Rent' };
        if (lowerQuery.includes('شراء') || lowerQuery.includes('للبيع')) newFilters['Rent'] = { type: 'Buy' };
        
        if (lowerQuery.includes('شقة')) newFilters['Apartment'] = { type: 'Apartment' };
        if (lowerQuery.includes('بنتهاوس')) newFilters['Apartment'] = { type: 'Penthouse' };
        if (lowerQuery.includes('فيلا')) newFilters['Apartment'] = { type: 'Villa' };
        if (lowerQuery.includes('تاون هاوس')) newFilters['Apartment'] = { type: 'Townhouse' };

        if (lowerQuery.includes('استوديو')) {
            newFilters['Beds & Baths'] = { ...newFilters['Beds & Baths'], beds: 'Studio' };
        } else {
            const bedsMatch = lowerQuery.match(/(\d+)\s*(غرفة|غرف|غرفة نوم|غرف نوم)/);
            if (bedsMatch && bedsMatch[1]) {
                newFilters['Beds & Baths'] = { ...newFilters['Beds & Baths'], beds: bedsMatch[1] };
            }
        }

        const bathsMatch = lowerQuery.match(/(\d+)\s*(حمام|حمامات)/);
        if (bathsMatch && bathsMatch[1]) {
            newFilters['Beds & Baths'] = { ...newFilters['Beds & Baths'], baths: bathsMatch[1] };
        }

        const priceMatch = lowerQuery.match(/(\d{3,})/g);
        if (priceMatch) {
            const amount = parseInt(priceMatch[0].replace(/,/g, ''), 10);
            if (lowerQuery.includes('تحت') || lowerQuery.includes('أقل من')) {
                newFilters['Price'] = { ...newFilters['Price'], max_price: amount };
            } else if (lowerQuery.includes('فوق') || lowerQuery.includes('أكثر من')) {
                newFilters['Price'] = { ...newFilters['Price'], min_price: amount };
            } else {
                newFilters['Price'] = { ...newFilters['Price'], max_price: amount };
            }
        }
        if (lowerQuery.includes('سنوي')) newFilters['Price'] = { ...newFilters['Price'], period: 'Yearly' };
        if (lowerQuery.includes('شهري')) newFilters['Price'] = { ...newFilters['Price'], period: 'Monthly' };
        
        if (lowerQuery.includes('مفروشة')) {
            newFilters['More Filters'] = { ...newFilters['More Filters'], furnishing: 'Furnished' };
        } else if (lowerQuery.includes('غير مفروشة')) {
            newFilters['More Filters'] = { ...newFilters['More Filters'], furnishing: 'Unfurnished' };
        }

        const areaMatch = lowerQuery.match(/(\d+)\s*(متر|قدم)/);
        if (areaMatch && areaMatch[1]) {
            const area = parseInt(areaMatch[1], 10);
            if (lowerQuery.includes('فوق') || lowerQuery.includes('أكثر من')) {
                newFilters['More Filters'] = { ...newFilters['More Filters'], min_area: area };
            } else if (lowerQuery.includes('تحت') || lowerQuery.includes('أقل من')) {
                newFilters['More Filters'] = { ...newFilters['More Filters'], max_area: area };
            }
        }

        const arabicAmenities: { [key: string]: string } = {
            'غرفة خادمة': 'Maids Room', 'بلكونة': 'Balcony', 'شرفة': 'Balcony', 'مسبح مشترك': 'Shared Pool',
            'سبا مشترك': 'Shared Spa', 'جيم مشترك': 'Shared Gym', 'تكييف مركزي': 'Central A/C',
            'خدمة كونسيرج': 'Concierge Service', 'موقف سيارات مغطى': 'Covered Parking', 'اطلالة على الماء': 'View of Water',
            'اطلالة على معلم': 'View of Landmark', 'مسموح بالحيوانات الاليفة': 'Pets Allowed', 'منطقة لعب أطفال': "Children's Play Area",
            'مسبح أطفال': "Children's Pool", 'منطقة للشواء': 'Barbecue Area', 'خزائن مدمجة': 'Built in Wardrobes',
            'غرفة دراسة': 'Study', 'خزانة ملابس': 'Walk-in Closet', 'جاكوزي خاص': 'Private Jacuzzi'
        };
        const foundAmenities = Object.keys(arabicAmenities).filter(key => lowerQuery.includes(key)).map(key => arabicAmenities[key]);
        if(foundAmenities.length > 0) {
            const uniqueAmenities = [...new Set(foundAmenities)];
            newFilters['More Filters'] = { ...newFilters['More Filters'], amenities: uniqueAmenities };
        }

        return newFilters;
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setFilters({});
            return;
        }
        const isArabic = arabicRegex.test(searchQuery);
        const result = isArabic ? parseArabicSearchQuery(searchQuery) : parseSearchQueryWithNLP(searchQuery);
        setFilters(result);
        toast({
            title: isArabic ? "اكتمل البحث" : "Search Complete",
            description: isArabic ? "تم تحديث الفلاتر بناءً على بحثك." : "Filters have been updated based on your search.",
        });
    };

    const handlePopoverOpenChange = (filterKey: FilterKey, isOpen: boolean) => {
        setOpenPopovers(prev => ({ ...prev, [filterKey]: isOpen }));
    };

    const handleFilterChange = (filterKey: FilterKey, newValues: any) => {
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
    
    const handleSingleValueChange = (filterKey: FilterKey, value: any) => {
        setFilters((prev: FilterValues) => ({ ...prev, [filterKey]: { ...prev[filterKey], ...value } }));
    };

    const clearFilter = (filterKey: FilterKey) => {
        setFilters(prev => {
            const updated = { ...prev };
            delete updated[filterKey];
            return updated;
        });
    };
    
    const filteredUnits = useMemo(() => units.filter(unit => {
        const { 'Rent': rentFilter, 'Apartment': apartmentFilter, 'Price': priceFilter, 'Beds & Baths': bedBathFilter, 'More Filters': moreFilters }: FilterValues = filters;

        if (rentFilter?.type && rentFilter.type !== 'Rent') return false;
        
        if (apartmentFilter?.type && unit.propertyType !== apartmentFilter.type) return false;

        if (priceFilter) {
            if (priceFilter.min_price && unit.rent < parseInt(priceFilter.min_price, 10)) return false;
            if (priceFilter.max_price && unit.rent > parseInt(priceFilter.max_price, 10)) return false;
        }

        if (bedBathFilter) {
            if (bedBathFilter.beds && bedBathFilter.beds !== 'Any') {
                if (bedBathFilter.beds === 'Studio') {
                    if (unit.type !== 'Studio') return false;
                } else if (String(bedBathFilter.beds).endsWith('+')) {
                    const minBeds = parseInt(bedBathFilter.beds, 10);
                    if (unit.beds < minBeds) return false;
                } else if (unit.beds !== parseInt(bedBathFilter.beds, 10)) {
                    return false;
                }
            }
            if (bedBathFilter.baths && bedBathFilter.baths !== 'Any') {
                if (String(bedBathFilter.baths).endsWith('+')) {
                    const minBaths = parseInt(bedBathFilter.baths, 10);
                    if (unit.baths < minBaths) return false;
                } else if (unit.baths !== parseInt(bedBathFilter.baths, 10)) {
                    return false;
                }
            }
        }
        
        if (moreFilters) {
            if (moreFilters.furnishing && moreFilters.furnishing !== 'Any' && (moreFilters.furnishing === 'Furnished' ? !unit.furnished : unit.furnished)) return false;
            if (moreFilters.min_area && unit.area < parseInt(moreFilters.min_area, 10)) return false;
            if (moreFilters.max_area && unit.area > parseInt(moreFilters.max_area, 10)) return false;
            if (moreFilters.amenities && moreFilters.amenities.length > 0) {
                if (!moreFilters.amenities.every((amenity: string) => unit.amenities.includes(amenity))) return false;
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
    
    const renderFilterPopoverContent = (filterKey: FilterKey) => {
        const closePopover = () => handlePopoverOpenChange(filterKey, false);
        const currentValues = filters[filterKey] || {};

        const contentProps = {
            onValueChange: (value: any) => handleSingleValueChange(filterKey, value),
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

    const filterButtons: FilterKey[] = ['Rent', 'Apartment', 'Beds & Baths', 'Price'];
    
    return (
    <section id="residences" className="w-full py-16 md:py-24 bg-transparent">
      <div className="space-y-8">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Find Your Perfect Home</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto lg:mx-0">
            Explore our collection of meticulously designed apartments, each offering a unique blend of luxury and comfort.
          </p>
        </div>

        <div className="bg-background rounded-lg shadow-sm p-3 border space-y-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="e.g., furnished 2 bed apartment"
                        className="h-12 pl-11 w-full rounded-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button type="submit" className="h-12 w-full sm:w-auto px-6 rounded-lg bg-primary-gradient text-primary-foreground font-semibold" disabled={!searchQuery.trim()}>
                    {'Search'}
                </Button>
            </form>
            <div className="flex flex-wrap gap-2">
                {filterButtons.map(key => {
                    const trigger = (
                        <FilterButton filterKey={key} filters={filters} />
                    );
                    const content = renderFilterPopoverContent(key);
                    
                    const buttonWrapperClass = "basis-[calc(50%-4px)] md:basis-[calc(33.33%-5.33px)] lg:flex-1";

                    if (isMobile) {
                        return (
                            <div key={key} className={buttonWrapperClass}>
                                <Dialog open={openPopovers[key] || false} onOpenChange={(isOpen) => handlePopoverOpenChange(key, isOpen)}>
                                    <DialogTrigger asChild>{trigger}</DialogTrigger>
                                    <DialogContent className="p-0 max-w-md w-[90%] flex flex-col">
                                        {content}
                                    </DialogContent>
                                </Dialog>
                            </div>
                        );
                    }

                    return (
                        <div key={key} className={buttonWrapperClass}>
                            <Popover open={openPopovers[key] || false} onOpenChange={(isOpen) => handlePopoverOpenChange(key, isOpen)}>
                                <PopoverTrigger asChild>{trigger}</PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    {content}
                                </PopoverContent>
                            </Popover>
                        </div>
                    );
                })}
                <div className="basis-[calc(50%-4px)] md:basis-[calc(33.33%-5.33px)] lg:flex-1">
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
                 <div className="basis-[calc(50%-4px)] md:basis-[calc(33.33%-5.33px)] lg:flex-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <FilterButton filterKey="Sort" filters={filters} sortOption={sortOption} />
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

        {/* --- Results Header --- */}
        <div>
          <Breadcrumb items={[]} className="mb-4" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-headline text-foreground leading-tight">Apartments for rent in MEGA Residency Tower</h1>
              <p className="mt-1 text-muted-foreground">{filteredUnits.length} properties</p>
            </div>
          </div>
        </div>


        {/* --- Unit Listings --- */}
        <div className="grid grid-cols-1 gap-6">
          {sortedUnits.length > 0 ? (
            sortedUnits.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
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



