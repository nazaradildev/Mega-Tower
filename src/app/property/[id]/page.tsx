
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
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Heart,
  Home,
  Mail,
  Map,
  MapPin,
  Phone,
  Ruler,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const priceData = [
  { month: 'Jan', price: 140000 },
  { month: 'Feb', price: 142000 },
  { month: 'Mar', price: 145000 },
  { month: 'Apr', price: 143000 },
  { month: 'May', price: 146000 },
  { month: 'Jun', price: 148000 },
];

export default function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const unit = units.find((u) => u.id === parseInt(params.id));
  const [api, setApi] = React.useState<CarouselApi>();
  const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
    api?.scrollTo(index);
  };

  if (!unit) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          {/* Back Button and Breadcrumbs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <Button variant="outline" asChild className="self-start">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Results
              </Link>
            </Button>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <Home className="h-4 w-4" />
                  </a>
                </li>
                <li>
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Dubai
                  </a>
                </li>
                <li>
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Business Bay
                  </a>
                </li>
                <li>
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li className="font-medium text-foreground truncate">
                  {unit.title}
                </li>
              </ol>
            </nav>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left/Main Column */}
            <div className="col-span-1 lg:col-span-2">
              <Card className="overflow-hidden">
                <Carousel
                  setApi={setApi}
                  className="w-full"
                  opts={{ loop: true }}
                >
                  <CarouselContent className='m-0'>
                    {unit.images.map((img, index) => (
                      <CarouselItem key={index} className='p-0 aspect-video'>
                        <img
                          src={img}
                          alt={`Property image ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading={index < 2 ? 'eager' : 'lazy'}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
                </Carousel>
              </Card>

              <div className="mt-4">
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
                            index === selectedIndex
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

              {/* Details Section */}
              <Card className="mt-8">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <CardTitle className="font-headline text-3xl mb-1">
                        {unit.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>
                          Churchill Residency Tower, Churchill Towers, Business
                          Bay
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button variant="outline" size="icon">
                        <Share2 className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <BedDouble className="h-8 w-8 text-primary" />
                      <span className="font-semibold">{unit.beds} Bedroom</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Bath className="h-8 w-8 text-primary" />
                      <span className="font-semibold">{unit.baths} Baths</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Ruler className="h-8 w-8 text-primary" />
                      <span className="font-semibold">
                        {unit.area.toLocaleString()} sqft
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Building className="h-8 w-8 text-primary" />
                      <span className="font-semibold">{unit.propertyType}</span>
                    </div>
                  </div>
                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-xl font-bold font-headline mb-4">
                      Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Discover the pinnacle of urban living in this stunning{' '}
                      {unit.beds}-bedroom apartment located in the prestigious
                      Churchill Towers, Business Bay. Offering breathtaking
                      views of the {unit.view}, this residence combines luxury,
                      comfort, and convenience. The spacious layout is perfect
                      for both relaxation and entertaining, featuring high-end
                      finishes and floor-to-ceiling windows that flood the space
                      with natural light.
                    </p>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-xl font-bold font-headline mb-4">
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {unit.amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="text-muted-foreground">
                            {amenity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Insights */}
              <Card className="mt-8">
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
                        src="https://placehold.co/100x100.png"
                        data-ai-hint="agent portrait"
                        alt="Agent"
                      />
                      <AvatarFallback>EN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Prime Properties</p>
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

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Map will be here</p>
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
