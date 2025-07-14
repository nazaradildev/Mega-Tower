
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
  Quote,
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
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
  { src: "/mega tower1.png", alt: "Building Exterior", hint: "dubai cityscape" },
  { src: "/swim1.jpg", alt: "Infinity Pool", hint: "luxury infinity pool" },
  { src: "/gym1.jpg", alt: "Gym", hint: "modern gym interior" },
  { src: "/sauna1.jpg", alt: "Sauna", hint: "luxury spa sauna" },
  { src: "/garden1.jpg", alt: "Garden", hint: "modern building garden" },
  { src: "/swim2.jpg", alt: "Apartment View", hint: "city view apartment" },
  { src: "/gym2.jpg", alt: "Play Area", hint: "kids play area" },
  { src: "/garden2.jpg", alt: "Lush Gardens", hint: "lush gardens" },
];

const facilities = [
    { icon: ParkingCircle, text: 'Dedicated Parking Space' },
    { icon: Wind, text: 'Central Air Conditioning' },
    { icon: ShieldCheck, text: 'CCTV & 24-Hour Security' },
    { icon: User, text: '24-Hour Concierge & Valet' },
];

const pointsOfInterest = [
    {
        category: 'Fine Dining',
        icon: Utensils,
        items: [
            { name: 'The Azure Table', distance: '60 m' },
            { name: 'Terra Bistro', distance: '75 m' },
            { name: 'Orchid Fusion', distance: '90 m' },
            { name: 'Celeste Cafe & Lounge', distance: '280 m' },
            { name: 'Le Jardin Secret', distance: '400 m' },
        ],
    },
    {
        category: 'Gourmet Groceries',
        icon: ShoppingCart,
        items: [
            { name: 'The Urban Pantry', distance: '110 m' },
            { name: 'Al Fresco Market', distance: '450 m' },
            { name: 'The Daily Harvest', distance: '510 m' },
            { name: 'Eataly Express', distance: '580 m' },
            { name: 'Artisan Corner', distance: '720 m' },
        ],
    },
    {
        category: 'Elite Schools',
        icon: School,
        items: [
            { name: 'Global Horizons International School', distance: '1.1 km' },
            { name: 'GEMS Legacy School', distance: '1.3 km' },
            { name: 'Dubai International Academy', distance: '1.5 km' },
            { name: 'Lycée Français Jean Mermoz', distance: '1.6 km' },
            { name: 'Kings\' School Dubai', distance: '2.0 km' },
        ],
    },
    {
        category: 'Wellness & Clinics',
        icon: Stethoscope,
        items: [
            { name: 'The Wellness Sanctuary Spa', distance: '400 m' },
            { name: 'Elysian Clinic by Dr. Rashed', distance: '550 m' },
            { name: 'The Valens Clinic', distance: '750 m' },
            { name: 'Perfect Smile Dental Studio', distance: '830 m' },
            { name: 'Pro Derma Aesthetics', distance: '900 m' },
        ],
    },
    {
        category: 'Cultural & Religious',
        icon: Landmark,
        items: [
            { name: 'Al-Noor Mosque', distance: '1.4 km' },
            { name: 'Masjid Al Ghafoor', distance: '1.7 km' },
            { name: 'The Grand Mosque', distance: '2.1 km' },
            { name: 'St. Mary\'s Catholic Church', distance: '8.5 km' },
            { name: 'Shiva Temple', distance: '9.0 km' },
        ],
    },
];

const testimonials = [
    {
        name: "Aisha Al-Futtaim",
        role: "Resident, 3 Years",
        avatar: "https://placehold.co/100x100.png",
        hint: "woman portrait",
        text: "Living at MEGA Residency is an unparalleled experience. The views are breathtaking, the amenities are world-class, and the service is impeccable. It’s more than a home; it’s a lifestyle."
    },
    {
        name: "David Chen",
        role: "Penthouse Owner",
        avatar: "https://placehold.co/100x100.png",
        hint: "man portrait",
        text: "As an international professional, convenience and luxury are paramount. MEGA Residency Tower delivers on both fronts. Its strategic location and premium facilities make it the perfect base in Dubai."
    },
    {
        name: "The Khan Family",
        role: "Residents, 5 Years",
        avatar: "https://placehold.co/100x100.png",
        hint: "family portrait",
        text: "We’ve raised our children here, and it’s been a dream. The secure environment, dedicated play areas, and sense of community are things we cherish. We couldn’t imagine living anywhere else."
    }
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
    const [fullscreenImageIndex, setFullscreenImageIndex] = React.useState<number | null>(null);

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
    
    const openFullscreen = (index: number) => {
      setFullscreenImageIndex(index);
    };

    const closeFullscreen = () => {
      setFullscreenImageIndex(null);
    };

    const nextImage = () => {
      if (fullscreenImageIndex !== null) {
        setFullscreenImageIndex((prev) => (prev! + 1) % galleryImages.length);
      }
    };

    const prevImage = () => {
      if (fullscreenImageIndex !== null) {
        setFullscreenImageIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
      }
    };


    const aboutText = "Discover a new standard of elevated living at MEGA Residency Tower, an architectural masterpiece nestled in the vibrant heart of Business Bay. Soaring 42 stories high, this iconic residence offers an exclusive collection of 1, 2, 3, and 4-bedroom apartments and penthouses, each meticulously crafted to perfection. Wake up to breathtaking, panoramic views of the Dubai Canal and the majestic Burj Khalifa. Every residence is a sanctuary of style, featuring high-end finishes, expansive living spaces, and floor-to-ceiling windows that bathe your home in natural light. Here, luxury is not just an option—it's the standard.";

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
                                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="h-5 w-5" />)}
                                </div>
                                <span className="font-semibold">5.0/5</span>
                                <span>(Based on 163 Reviews)</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 mb-8">
                        <Carousel setApi={setApi} className="w-full mx-auto max-w-7xl" opts={{ loop: true }}>
                            <CarouselContent className="m-0">
                                {galleryImages.map((image, index) => (
                                    <CarouselItem key={index} className="p-0">
                                        <div className="aspect-[16/9] relative rounded-lg overflow-hidden w-full mx-auto max-h-[80vh]">
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                data-ai-hint={image.hint}
                                                fill
                                                className="object-cover"
                                                priority={index === 0}
                                            />
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="absolute top-4 right-4 z-10 md:hidden bg-black/50 hover:bg-black/70 text-white rounded-full"
                                              aria-label="View fullscreen"
                                              onClick={() => openFullscreen(index)}
                                            >
                                              <Expand className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
                        </Carousel>

                        <Carousel setApi={setThumbApi} opts={{ containScroll: 'keepSnaps', dragFree: true }} className="w-full mx-auto max-w-7xl">
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
                                <h2 className="text-2xl font-bold font-headline mb-4">An Address of Distinction</h2>
                                <div className={cn("space-y-4 text-muted-foreground prose prose-lg max-w-none", !isExpanded && "max-h-48 overflow-hidden relative")}>
                                    <p>{aboutText}</p>
                                    {!isExpanded && <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent" />}
                                </div>
                                 <Button variant="link" onClick={() => setIsExpanded(!isExpanded)} className="text-primary px-0 mt-2">
                                    {isExpanded ? 'Show Less' : 'Show More'}
                                 </Button>
                            </section>

                             <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">World-Class Facilities</h2>
                                <Card>
                                  <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h3 className="font-semibold mb-3">Lifestyle Amenities</h3>
                                      <ul className="space-y-2 text-muted-foreground">
                                        {['Infinity Pool', 'State-of-the-Art Fitness Center', 'Luxury Spa, Sauna & Jacuzzi', 'Championship Tennis & Basketball Courts', 'Landscaped Gardens & BBQ Area', 'Secure Children’s Playground', 'Exclusive Residents Lounge'].map(item => (
                                          <li key={item} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                     <div>
                                      <h3 className="font-semibold mb-3">Convenience & Security</h3>
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
                                <h2 className="text-2xl font-bold font-headline mb-4">Exquisite Residences</h2>
                                <div className="space-y-4 text-muted-foreground prose prose-lg max-w-none">
                                    <p>MEGA Residency Tower presents a curated collection of residences, from elegant one-bedroom apartments to magnificent four-bedroom penthouses. Each home is a masterpiece of design, boasting en-suite bathrooms for every bedroom, bespoke built-in wardrobes, and private balconies to soak in the stunning cityscapes. Select larger apartments and all penthouses feature additional luxuries such as a dedicated maid's room, a stylish powder room, and a separate laundry space, ensuring a life of ultimate comfort and convenience.</p>
                                </div>
                            </section>
                            
                             <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">Seamless Connectivity</h2>
                                <div className="space-y-4 text-muted-foreground prose prose-lg max-w-none">
                                    <p>Your gateway to the city, MEGA Residency Tower offers effortless travel throughout Dubai. With immediate access to major arteries like Sheikh Zayed Road and Al Khail Road, you are always just moments away from your destination. The Business Bay Metro Station and an extensive network of bus routes are within a short stroll, providing sophisticated and convenient transport options.</p>
                                </div>
                            </section>

                             <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">What Our Residents Say</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {testimonials.map((testimonial, index) => (
                                        <Card key={index} className="bg-secondary/50 border-0">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <Quote className="h-8 w-8 text-primary/50 flex-shrink-0 transform -scale-x-100" />
                                                    <div className="flex-1">
                                                        <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar>
                                                                <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.hint} />
                                                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="font-semibold text-foreground">{testimonial.name}</p>
                                                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                            
                            <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">At Your Doorstep</h2>
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
                                        <div className="font-semibold">10 Years</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground"><Layers className="h-4 w-4"/> Floors</div>
                                        <div className="font-semibold">42</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground"><Percent className="h-4 w-4"/> Occupancy Rate</div>
                                        <div className="font-semibold">97.5%</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground"><RefreshCcw className="h-4 w-4"/> Resident Retention</div>
                                        <div className="font-semibold">Avg. 86%</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </aside>
                    </div>
                </div>
            </main>
            
            <Dialog open={fullscreenImageIndex !== null} onOpenChange={(open) => !open && closeFullscreen()}>
              <DialogContent className="p-0 w-screen h-screen max-w-none bg-black/80 border-0 flex items-center justify-center outline-none ring-0">
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-50 text-white hover:text-white bg-black/50 hover:bg-black/70 rounded-full h-10 w-10">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogClose>
                
                <Button variant="ghost" size="icon" onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-white bg-black/50 hover:bg-black/70 rounded-full h-10 w-10">
                    <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button variant="ghost" size="icon" onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-white bg-black/50 hover:bg-black/70 rounded-full h-10 w-10">
                    <ChevronRight className="h-6 w-6" />
                </Button>

                {fullscreenImageIndex !== null && (
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <Image
                      src={galleryImages[fullscreenImageIndex].src}
                      alt={galleryImages[fullscreenImageIndex].alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
}
