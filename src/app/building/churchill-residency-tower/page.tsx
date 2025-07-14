
'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import {
  Star,
  Building,
  CalendarDays,
  Layers,
  Percent,
  RefreshCcw,
  CheckCircle,
  ParkingCircle,
  Wind,
  ShieldCheck,
  User,
  Utensils,
  ShoppingCart,
  School,
  Stethoscope,
  Landmark,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/breadcrumb';
import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('@/components/interactive-map').then(mod => mod.InteractiveMap), {
    ssr: false,
    loading: () => (
        <div className="h-[500px] w-full bg-muted rounded-lg flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
});

const galleryImages = [
  { src: "https://placehold.co/800x600.png", alt: "Building Exterior", hint: "building exterior" },
  { src: "https://placehold.co/800x600.png", alt: "Lobby", hint: "luxury lobby" },
  { src: "https://placehold.co/800x600.png", alt: "Swimming Pool", hint: "rooftop pool" },
  { src: "https://placehold.co/800x600.png", alt: "Gym", hint: "modern gym" },
  { src: "https://placehold.co/800x600.png", alt: "Apartment View", hint: "city view apartment" },
  { src: "https://placehold.co/800x600.png", alt: "Play Area", hint: "kids play area" },
  { src: "https://placehold.co/800x600.png", alt: "Tennis Court", hint: "tennis court" },
];

const facilities = [
    { icon: ParkingCircle, text: 'Dedicated parking space' },
    { icon: Wind, text: 'Central air conditioning' },
    { icon: ShieldCheck, text: 'CCTV & 24-hour security' },
    { icon: User, text: '24-hour concierge' },
];

const pointsOfInterest = [
    {
        category: 'Restaurants',
        icon: Utensils,
        items: [
            { name: 'Bait Maryam Levant Kitchen', distance: '57 m' },
            { name: 'Cali Poke Restaurant', distance: '68 m' },
            { name: 'Rebel Food', distance: '85 m' },
            { name: 'Nurai Restaurant and Cafe', distance: '273 m' },
            { name: 'Mamaesh', distance: '381 m' },
        ],
    },
    {
        category: 'Groceries',
        icon: ShoppingCart,
        items: [
            { name: 'Malco Trading (MEGA Mart)', distance: '101 m' },
            { name: 'allday Market - Manara Tower', distance: '446 m' },
            { name: 'New F Mart Supermarket', distance: '503 m' },
            { name: 'Zoom', distance: '577 m' },
            { name: 'Phantasy Supermarket', distance: '717 m' },
        ],
    },
    {
        category: 'Schools',
        icon: School,
        items: [
            { name: 'Global Indian International School L.L.C', distance: '974 m' },
            { name: 'GEMS Our Own Indian School', distance: '1.2 km' },
            { name: 'Iranian Towheed Boys School', distance: '1.2 km' },
            { name: 'Dubai International private School - BR', distance: '1.4 km' },
            { name: 'Lycée Français Jean Mermoz', distance: '1.5 km' },
        ],
    },
    {
        category: 'Hospitals',
        icon: Stethoscope,
        items: [
            { name: 'Pro derma Line Medical Spa', distance: '395 m' },
            { name: 'Clinique by Dr Ehab Rashed', distance: '536 m' },
            { name: 'Fitterfly', distance: '703 m' },
            { name: 'The Valens Clinic', distance: '766 m' },
            { name: 'Perfect Smile Orthodontic And Cosmetic Dental Center', distance: '828 m' },
        ],
    },
    {
        category: 'Religious',
        icon: Landmark,
        items: [
            { name: 'Almuhtadi Masjid', distance: '1.3 km' },
            { name: 'Masjid Fathima Al Zarooni', distance: '1.6 km' },
            { name: 'Prayer Room 3rd Floor Mall Of Emirates', distance: '1.8 km' },
            { name: 'Dubai Mall Mosque', distance: '2 km' },
            { name: 'Ali Bin Abi Talib Mosque', distance: '2.2 km' },
        ],
    },
];

const breadcrumbItems = [
    { label: 'Apartments for rent in Dubai', href: '/#residences' },
    { label: 'Business Bay', href: '/community/business-bay' },
    { label: 'MEGA Residency Tower' },
];

export default function BuildingDetailsPage() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [isExpanded, setIsExpanded] = React.useState(false);

    React.useEffect(() => {
        if (!api || !thumbApi) return;
        const onSelect = () => {
            setSelectedIndex(api.selectedScrollSnap());
            thumbApi?.scrollTo(api.selectedScrollSnap());
        };
        api.on('select', onSelect);
        onSelect();
        return () => api.off('select', onSelect);
    }, [api, thumbApi]);

    const onThumbClick = (index: number) => {
        api?.scrollTo(index);
    };

    const aboutText = "MEGA Towers is a twin-tower complex located in Business Bay, Dubai. It was developed by Emirates National Investment in 2010 and consists of one residential tower called MEGA Residency and another commercial tower called MEGA Executive Tower. MEGA Residency has 57 levels and stands at 245 m (804 ft) high. It offers luxurious 1, 2, 3, and 4-bedroom apartments for sale and rent. These high-rise apartments overlook the Dubai Canal and Burj Khalifa and are serviced with a plethora of lifestyle amenities that echo Dubai’s luxurious lifestyle. Meanwhile, MEGA Executive Tower has 42 levels and is 172 m (564 ft) high. It’s a recognizable landmark in Business Bay as it’s home to various companies. It offers various offices for rent in Business Bay, as well as ones for sale. The towers boast an enviable location close to Burj Khalifa and Dubai Mall, while lying the vibrant community of Business Bay.";
    const fullAboutText = aboutText;

    return (
        <div className="bg-background">
            <Header />
            <main className="py-8 sm:py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumb items={breadcrumbItems} className="mb-4" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold font-headline mb-1">MEGA Residency Tower</h1>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="flex text-yellow-500">
                                    {[...Array(4)].map((_, i) => <Star key={i} fill="currentColor" className="h-5 w-5" />)}
                                    <Star fill="currentColor" className="h-5 w-5 opacity-50" />
                                </div>
                                <span className="font-semibold">4.5/5</span>
                                <span>(163 Reviews)</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 mb-8">
                        <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
                            <CarouselContent className="m-0">
                                {galleryImages.map((image, index) => (
                                    <CarouselItem key={index} className="p-0">
                                        <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                data-ai-hint={image.hint}
                                                fill
                                                className="object-cover"
                                                priority={index === 0}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
                        </Carousel>

                        <Carousel setApi={setThumbApi} opts={{ containScroll: 'keepSnaps', dragFree: true }} className="w-full">
                            <CarouselContent className="m-0">
                                {galleryImages.map((image, index) => (
                                    <CarouselItem key={index} onClick={() => onThumbClick(index)} className="pl-2 basis-1/4 md:basis-1/6 cursor-pointer">
                                        <div className={cn('aspect-video p-1 rounded-md', index === selectedIndex ? 'bg-primary' : 'bg-transparent')}>
                                            <div className="relative h-full w-full overflow-hidden rounded-md">
                                                <Image src={image.src} alt={`Thumbnail ${image.alt}`} fill className="object-cover" loading="lazy" />
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">About MEGA Residency Tower</h2>
                                <div className={cn("space-y-4 text-muted-foreground prose prose-lg max-w-none", !isExpanded && "max-h-48 overflow-hidden relative")}>
                                    <p>{aboutText}</p>
                                    {!isExpanded && <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent" />}
                                </div>
                                 <Button variant="link" onClick={() => setIsExpanded(!isExpanded)} className="text-primary px-0 mt-2">
                                    {isExpanded ? 'Show Less' : 'Show More'}
                                </Button>
                            </section>

                             <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">Facilities</h2>
                                <Card>
                                  <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h3 className="font-semibold mb-3">Lifestyle Amenities</h3>
                                      <ul className="space-y-2 text-muted-foreground">
                                        {['Swimming pool', 'Gym', 'Sauna & Jacuzzi', 'Mini golf course', 'Tennis & basketball courts', 'Children’s playground', 'Pet-friendly'].map(item => (
                                          <li key={item} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                     <div>
                                      <h3 className="font-semibold mb-3">Other Facilities</h3>
                                      <ul className="space-y-2 text-muted-foreground">
                                        {facilities.map(item => (
                                          <li key={item.text} className="flex items-start gap-3">
                                            <item.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span>{item.text}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </CardContent>
                                </Card>
                            </section>

                             <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">Types of Apartments</h2>
                                <div className="space-y-4 text-muted-foreground prose prose-lg max-w-none">
                                    <p>MEGA Residency Tower has 250 1-bedroom apartments, 208 2-bedroom apartments, 12 3-bedroom apartments, and a few 4-bedroom apartments and penthouses. The apartments here are available for rent and sale, and the apartments for sale in MEGA Residency are freehold.</p>
                                    <p>Apartments in MEGA Residency have en-suite bathrooms, built-in wardrobes, and balconies. Some 2 and 3-bedroom apartments have a maid’s room, and the 3-bedroom apartments have a powder room and dedicated laundry space.</p>
                                </div>
                            </section>
                            
                             <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">Transportation</h2>
                                <div className="space-y-4 text-muted-foreground prose prose-lg max-w-none">
                                    <p>Transportation from MEGA Towers in Business Bay is very convenient thanks to their proximity to main roads like Sheikh Zayed Road and Al Khail Road. Moreover, they’re a few minutes away from the Business Bay Metro Station, and various bus stops are located nearby.</p>
                                    <h3 className="font-semibold !mt-6 !mb-2">Metro Stations:</h3>
                                    <p>The Business Bay metro station is about 5 minutes away by car.</p>
                                    <h3 className="font-semibold !mt-6 !mb-2">Bus stations:</h3>
                                    <p>There are numerous bus stations near MEGA Towers such as XL Tower 1 and 2, U BORA Tower, Lillian Tower 1 and 2.</p>
                                </div>
                            </section>
                            
                            <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">Nearest Points of Interest</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {pointsOfInterest.map(category => (
                                      <Card key={category.category} className="h-full">
                                          <CardHeader className="flex flex-row items-center gap-3">
                                              <category.icon className="h-6 w-6 text-primary" />
                                              <CardTitle className="text-xl">{category.category}</CardTitle>
                                          </CardHeader>
                                          <CardContent>
                                              <ul className="space-y-2">
                                                  {category.items.map(item => (
                                                      <li key={item.name} className="flex justify-between items-baseline text-sm">
                                                          <span className="text-muted-foreground">{item.name}</span>
                                                          <span className="font-medium text-foreground">{item.distance}</span>
                                                      </li>
                                                  ))}
                                              </ul>
                                          </CardContent>
                                      </Card>
                                  ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">Location</h2>
                                <Card>
                                    <CardContent className="h-[500px] w-full p-0">
                                        <InteractiveMap showExpandButton={true} />
                                    </CardContent>
                                </Card>
                            </section>

                        </div>

                        <aside className="lg:col-span-1 lg:sticky lg:top-24 self-start space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl">Key Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground"><CalendarDays className="h-4 w-4"/> Building Age</div>
                                        <div className="font-semibold">16 Years</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground"><Layers className="h-4 w-4"/> Floors</div>
                                        <div className="font-semibold">57</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground"><Percent className="h-4 w-4"/> Length of Stay</div>
                                        <div className="font-semibold">Long Term: 99.31%</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground"><RefreshCcw className="h-4 w-4"/> Renewal Rate</div>
                                        <div className="font-semibold">Avg. 52.16%</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

    
