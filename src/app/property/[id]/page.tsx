
'use client';

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import { units } from '@/data/units';
import { notFound, useParams } from 'next/navigation';
import {
  AirVent,
  Bath,
  BedDouble,
  BellRing,
  BookOpen,
  Building,
  CheckCircle,
  Cloudy,
  Dog,
  DoorOpen,
  Dumbbell,
  Flame,
  GalleryVerticalEnd,
  Heart,
  Landmark,
  LayoutDashboard,
  Loader2,
  Mail,
  MapPin,
  ParkingSquare,
  Phone,
  RefreshCw,
  Ruler,
  Share2,
  Shirt,
  ToyBrick,
  Users,
  Video,
  View,
  Wallet,
  Waves,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/breadcrumb';
import Image from 'next/image';
import { ResidentialInsightCard, CommunityInsightCard } from '@/components/insights-card';
import dynamic from 'next/dynamic';
import { useToast } from "@/hooks/use-toast";

const InteractiveMap = dynamic(() => import('@/components/interactive-map').then(mod => mod.InteractiveMap), {
    ssr: false,
    loading: () => (
        <div className="h-[500px] w-full bg-muted rounded-lg flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
});


const priceData = [
  { month: 'Jan', price: 140000 },
  { month: 'Feb', price: 142000 },
  { month: 'Mar', price: 145000 },
  { month: 'Apr', price: 143000 },
  { month: 'May', price: 146000 },
  { month: 'Jun', price: 148000 },
];

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const unit = units.find((u) => u.id === parseInt(id, 10));

  const [api, setApi] = React.useState<CarouselApi>();
  const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [viewMode, setViewMode] = React.useState<'gallery' | 'video' | 'virtualTour' | 'floorPlan'>('gallery');
  const { toast } = useToast();

  const amenityIcons: Record<string, React.ElementType> = {
    Balcony: GalleryVerticalEnd,
    'Shared Pool': Waves,
    'Shared Gym': Dumbbell,
    'Covered Parking': ParkingSquare,
    'View of Landmark': Landmark,
    'View of Water': Waves,
    'Walk-in Closet': DoorOpen,
    'Private Jacuzzi': Bath,
    Study: BookOpen,
    'Maids Room': Users,
    'Pets Allowed': Dog,
    "Children's Play Area": ToyBrick,
    "Children's Pool": Waves,
    'Barbecue Area': Flame,
    'Built in Wardrobes': Shirt,
    'Central A/C': AirVent,
    'Concierge Service': BellRing,
    'Shared Spa': Cloudy,
    Security: Users,
  };

  const handleShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `Check out this amazing property: ${unit?.title} - ${window.location.href}`
    )}`;
    window.open(whatsappUrl, '_blank');
  };


  React.useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
      thumbApi?.scrollTo(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect(); // Set initial state

    return () => {
      api.off('select', onSelect);
    };
  }, [api, thumbApi]);

  const onThumbClick = (index: number) => {
    setViewMode('gallery');
    api?.scrollTo(index);
  };
  
  if (!unit) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Apartments for rent in Dubai', href: '/#residences' },
    { label: 'Business Bay', href: '/community/business-bay' },
    { label: 'MEGA Residency Tower', href: '/building/mega-residency-tower' },
    { label: unit.title }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left/Main Column */}
            <div className="col-span-1 lg:col-span-2 space-y-8">
              <Card className="overflow-hidden bg-transparent border-0 shadow-none">
                <CardHeader className="px-0">
                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div>
                        <CardTitle className="font-headline text-3xl mb-1">
                          {unit.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>
                            MEGA Residency Tower, Business
                            Bay
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button variant="outline" size="icon" onClick={handleShare}>
                          <Share2 className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Heart className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    {viewMode === 'gallery' && (
                      <Carousel setApi={setApi} className="w-full h-full" opts={{ loop: true }}>
                        <CarouselContent className="m-0 h-full">
                          {unit.images.map((img, index) => (
                            <CarouselItem
                              key={index}
                              className="p-0"
                            >
                              <img
                                src={img}
                                alt={`Property image ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
                      </Carousel>
                    )}
                    {viewMode === 'virtualTour' && (
                      unit.virtualTourUrl ? (
                      <iframe
                          src={unit.virtualTourUrl}
                          width="100%"
                          height="100%"
                          allow="fullscreen"
                          className="border-0 w-full h-full rounded-lg"
                      />
                      ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
                          <p className="text-muted-foreground">Virtual tour not available.</p>
                      </div>
                      )
                    )}
                    {viewMode === 'floorPlan' && (
                        unit.floorPlanImage ? (
                        <div 
                          className="w-full h-full bg-muted flex items-center justify-center p-4 rounded-lg"
                        >
                            <img
                            src={unit.floorPlanImage}
                            alt={`Floor plan for ${unit.title}`}
                            className="w-auto h-full object-contain max-w-full max-h-full rounded-lg"
                            />
                        </div>
                        ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
                            <p className="text-muted-foreground">Floor plan not available.</p>
                        </div>
                        )
                    )}
                    {viewMode === 'video' && (
                      <div className="aspect-w-16 aspect-h-9 w-full h-full rounded-lg overflow-hidden bg-black">
                        <video
                            controls
                            className="w-full h-full object-contain rounded-lg"
                            preload="metadata"
                            playsInline
                            autoPlay
                        >
                            <source src="https://res.cloudinary.com/ddndtrwfn/video/upload/v1752414458/appartment1_mic7bl.mp4" type="video/mp4" />
                            <p>Sorry, your browser doesn't support embedded videos.</p>
                        </video>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Button
                  variant={viewMode === 'video' ? 'default' : 'outline'}
                  onClick={() => setViewMode('video')}
                  className="rounded-lg"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Video
                </Button>
                <Button
                  variant={viewMode === 'virtualTour' ? 'default' : 'outline'}
                  onClick={() => setViewMode('virtualTour')}
                  disabled={!unit.virtualTourUrl}
                  className="rounded-lg"
                >
                  <View className="mr-2 h-4 w-4" />
                  Virtual Tour
                </Button>
                <Button
                  variant={viewMode === 'floorPlan' ? 'default' : 'outline'}
                  onClick={() => setViewMode('floorPlan')}
                  disabled={!unit.floorPlanImage}
                  className="rounded-lg"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Floor Plan
                </Button>
              </div>

              <div>
                <Carousel
                  setApi={setThumbApi}
                  opts={{
                    containScroll: 'keepSnaps',
                    dragFree: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="m-0">
                    {unit.images.map((img, index) => (
                      <CarouselItem
                        key={index}
                        onClick={() => onThumbClick(index)}
                        className="pl-2 basis-1/4 md:basis-1/6 cursor-pointer"
                      >
                        <div
                          className={cn(
                            'aspect-video p-1 rounded-md',
                            index === selectedIndex && viewMode === 'gallery'
                              ? 'bg-primary'
                              : 'bg-transparent'
                          )}
                        >
                          <div className="relative h-full w-full overflow-hidden rounded-md">
                            <img
                              src={img}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground leading-relaxed space-y-4 prose prose-neutral dark:prose-invert max-w-none">
                      <p>
                        Discover the pinnacle of urban living in this stunning{' '}
                        {unit.beds}-bedroom apartment located in the prestigious
                        MEGA Residency Tower, Business Bay. Offering breathtaking
                        views of the {unit.view}, this residence combines
                        luxury, comfort, and convenience. The spacious layout
                        is perfect for both relaxation and entertaining,
                        featuring high-end finishes and floor-to-ceiling
                        windows that flood the space with natural light.
                      </p>
                       <h4>Interior Excellence</h4>
                        <p>
                          Step into a world of refined elegance. The expansive living and dining area, approximately 45 sqm, is adorned with premium Italian marble flooring that extends to a private balcony. The open-plan kitchen is a chef's dream, equipped with state-of-the-art integrated appliances from leading European brands, sleek custom cabinetry, and durable quartz countertops.
                        </p>
                        <h4>Comfort and Privacy</h4>
                        <p>
                          Each of the {unit.beds} bedrooms serves as a private sanctuary. The master suite ({unit.beds > 1 ? 'approx. 25 sqm' : 'approx. 20 sqm'}) features a generous walk-in closet and a spa-like en-suite bathroom with a rainfall shower and a separate soaking tub. All bathrooms are finished with designer fixtures and floor-to-ceiling porcelain tiles. Smart home technology allows for effortless control of lighting, climate, and security.
                        </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                     <div className="flex items-start gap-3">
                        <Building className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-muted-foreground">Property Type</p>
                            <p className="font-semibold">{unit.propertyType}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Ruler className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-muted-foreground">Property Size</p>
                            <p className="font-semibold">{unit.area.toLocaleString()} sqft / {Math.round(unit.area * 0.092903)} sqm</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <BedDouble className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-muted-foreground">Bedrooms</p>
                            <p className="font-semibold">{unit.beds}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Bath className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-muted-foreground">Bathrooms</p>
                            <p className="font-semibold">{unit.baths}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Wallet className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-muted-foreground">Service Charges</p>
                            <p className="font-semibold">{unit.serviceCharges} AED per sqft</p>
                        </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                      {unit.amenities.slice(0,8).map((amenity) => {
                        const Icon = amenityIcons[amenity] || CheckCircle;
                        return (
                          <div
                            key={amenity}
                            className="flex items-center gap-2"
                          >
                            <Icon className="h-5 w-5 text-primary" />
                            <span className="text-muted-foreground">
                              {amenity}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                     <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="outline">See all amenities ({unit.amenities.length})</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                           <DialogHeader>
                              <DialogTitle className="font-headline text-2xl">All Amenities</DialogTitle>
                           </DialogHeader>
                           <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                              {unit.amenities.map((amenity) => {
                                const Icon = amenityIcons[amenity] || CheckCircle;
                                return (
                                  <div key={amenity} className="flex items-center gap-3">
                                      <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                                      <span className="text-muted-foreground">{amenity}</span>
                                  </div>
                                );
                              })}
                           </div>
                           <DialogClose asChild>
                              <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full">
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Close</span>
                              </Button>
                            </DialogClose>
                        </DialogContent>
                      </Dialog>
                </CardContent>
              </Card>
              
               <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[500px] w-full p-0">
                  <InteractiveMap showExpandButton={true} />
                </CardContent>
              </Card>
              
              <div>
                <h2 className="text-2xl font-bold font-headline mb-4">Insights</h2>
                <div className="grid md:grid-cols-2 gap-6">
                   <ResidentialInsightCard />
                   <CommunityInsightCard />
                </div>
              </div>


              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    Price Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={priceData}>
                        <defs>
                          <linearGradient
                            id="colorPrice"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis
                          tickFormatter={(value) => `AED ${value / 1000}k`}
                        />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="p-2 bg-background border rounded-lg shadow-sm">
                                  <p className="font-bold">{label}</p>
                                  <p className="text-primary">
                                    {`Price: AED ${payload[0].value?.toLocaleString()}`}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="hsl(var(--primary))"
                          fill="url(#colorPrice)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right/Sidebar Column */}
            <div className="col-span-1 lg:sticky lg:top-24 self-start">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-muted-foreground">Rent starting from</p>
                    <p className="text-4xl font-bold text-primary my-2">
                      AED {unit.rent.toLocaleString()}
                      <span className="text-xl font-normal text-muted-foreground">
                        /year
                      </span>
                    </p>
                    {unit.verified && (
                       <Badge variant="outline" className="border-green-600 bg-green-50 text-green-700">
                        <CheckCircle className="mr-1.5 h-4 w-4 text-green-600" />
                        Verified Listing
                      </Badge>
                    )}
                  </div>
                  <Separator className="my-6" />
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                       <AvatarImage
                        src="/apex.png"
                        alt="APEX Logo"
                      />
                      <AvatarFallback>AE</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">APEX</p>
                      <p className="text-sm text-muted-foreground">
                        Marketing by
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-[#25D366] text-white hover:bg-[#1EBE56]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="mr-2"
                      >
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.1-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-1.001.164-.521.164-.97.114-1.07l-.26-.065z" />
                      </svg>
                      WhatsApp
                    </Button>
                    <Button size="lg" className="w-full" variant="outline">
                      <Mail className="mr-2 h-5 w-5" />
                      Email
                    </Button>
                    <Button size="lg" className="w-full" variant="outline">
                      <Phone className="mr-2 h-5 w-5" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
