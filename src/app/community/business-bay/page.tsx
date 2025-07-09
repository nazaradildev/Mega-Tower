
'use client';

import React from 'react';
import Image from 'next/image';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/breadcrumb';

const galleryImages = [
  { src: "https://placehold.co/800x600.png", alt: "Business Bay Overview", hint: "dubai business bay" },
  { src: "https://placehold.co/800x600.png", alt: "Dubai Canal", hint: "dubai canal" },
  { src: "https://placehold.co/800x600.png", alt: "Business Bay Skyline", hint: "dubai skyline" },
  { src: "https://placehold.co/800x600.png", alt: "Modern Architecture", hint: "dubai architecture" },
  { src: "https://placehold.co/800x600.png", alt: "Cityscape at Night", hint: "cityscape night" },
  { src: "https://placehold.co/800x600.png", alt: "Waterfront Promenade", hint: "waterfront promenade" },
  { src: "https://placehold.co/800x600.png", alt: "Bay Square", hint: "bay square" },
  { src: "https://placehold.co/800x600.png", alt: "JW Marriott Marquis", hint: "luxury hotel" },
];

const rentData = [
  { type: 'Studio', price: '79,000' },
  { type: '1 Bedroom', price: '109,000' },
  { type: '2 Bedrooms', price: '150,000' },
  { type: '3 Bedrooms', price: '216,000' },
  { type: '4 Bedrooms', price: '360,000' },
];

const trendData = [
  { name: 'Jul 24', value: 75000 },
  { name: 'Sep 24', value: 76000 },
  { name: 'Nov 24', value: 78000 },
  { name: 'Jan 25', value: 79000 },
  { name: 'Mar 25', value: 81000 },
  { name: 'May 25', value: 82000 },
];

const faqItems = [
    { q: "Where is Business Bay located?", a: "Business Bay is located south of Downtown Dubai and is bordered by Sheikh Zayed Road and Al Khail Road, making it one of the most well-connected areas in the city." },
    { q: "How far is Business Bay to the most popular attractions?", a: "Business Bay is extremely close to major attractions. It's about a 5-minute drive to The Dubai Mall and Burj Khalifa, and a 15-minute drive to Dubai International Airport (DXB)." },
    { q: "What are the transportation options in Business Bay?", a: "The area is well-serviced by public transport, including the Business Bay Metro Station on the Red Line, numerous bus routes, and readily available taxis. The Dubai Canal also offers water taxi services." },
    { q: "What are the community facilities in Business Bay?", a: "Business Bay offers a wide range of facilities including supermarkets, gyms, swimming pools, parks, children's play areas, and waterfront promenades along the Dubai Canal." },
    { q: "What are the best hotels within Business Bay?", a: "Business Bay is home to many luxury hotels, including the JW Marriott Marquis Hotel (one of the tallest hotels in the world), The St. Regis Downtown Dubai, and the V Hotel Dubai." },
    { q: "What are the best schools and nurseries in Business Bay?", a: "While there are many options in nearby areas, some notable nurseries within Business Bay include Hummingbird Nursery and Jumeirah International Nursery. For schools, residents often choose from top-rated institutions in nearby Jumeirah or Nad Al Sheba." },
    { q: "What are the best supermarkets and grocery stores in Business Bay?", a: "There are several supermarkets available, including Spinneys and Carrefour Market in Bay Avenue, as well as various smaller grocery stores throughout the community." },
    { q: "What are the best health clinics and hospitals in Business Bay?", a: "Residents have access to several clinics within Business Bay, such as Emirates Hospital Clinic and Aster Clinic. The nearest major hospitals are in Downtown Dubai and Oud Metha." },
    { q: "What are the most popular restaurants in Business Bay?", a: "The area is a foodie destination with countless options, from fine dining at hotels like the JW Marriott Marquis to casual eateries in Bay Square and along the canal." },
    { q: "What are things to do in Business Bay?", a: "Activities include watching the spectacular La Perle by Dragone show, strolling or cycling along the Dubai Canal, dining at world-class restaurants, and enjoying the vibrant nightlife." },
    { q: "What are the best shopping destinations in Business Bay?", a: "Bay Avenue Mall is the primary shopping center within the community. For a world-class shopping experience, The Dubai Mall is just a 5-minute drive away." },
    { q: "What property types are available in Business Bay?", a: "Business Bay primarily consists of apartments, ranging from studios to spacious 4-bedroom units and luxurious penthouses. There are also a few podium villas available in some towers." },
    { q: "What are the best towers and communities in Business Bay?", a: "Some of the most sought-after residential towers include Executive Towers, Peninsula, DAMAC Towers by Paramount, and Aykon City." },
    { q: "What are the events in Business Bay?", a: "Business Bay hosts various events throughout the year, especially around the Dubai Canal and Bay Square, including food festivals, pop-up markets, and celebrations for national holidays." },
];

const breadcrumbItems = [
    { label: 'Apartments for rent in Dubai', href: '/#residences' },
    { label: 'Business Bay' },
];

export default function BusinessBayPage() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  
  React.useEffect(() => {
      if (!api || !thumbApi) {
          return;
      }

      const onSelect = () => {
          setSelectedIndex(api.selectedScrollSnap());
          thumbApi?.scrollTo(api.selectedScrollSnap());
      };

      api.on('select', onSelect);
      onSelect();

      return () => {
          api.off('select', onSelect);
      };
  }, [api, thumbApi]);

  const onThumbClick = (index: number) => {
      api?.scrollTo(index);
  };

  return (
    <div className="bg-background">
      <Header />
      <main className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="mb-4" />
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline mb-2">
              Business Bay
            </h1>
          </div>

          <div className="space-y-2 mb-8">
              <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
                  <CarouselContent className="m-0">
                      {galleryImages.map((image, index) => (
                          <CarouselItem key={index} className="p-0">
                              <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                                  <Image
                                      src={image.src}
                                      data-ai-hint={image.hint}
                                      alt={image.alt}
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

              <Carousel
                  setApi={setThumbApi}
                  opts={{
                      containScroll: 'keepSnaps',
                      dragFree: true,
                  }}
                  className="w-full"
              >
                  <CarouselContent className="m-0">
                      {galleryImages.map((image, index) => (
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
                                      <Image
                                          src={image.src}
                                          alt={`Thumbnail ${image.alt}`}
                                          fill
                                          className="object-cover"
                                          loading="lazy"
                                      />
                                  </div>
                              </div>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
              </Carousel>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3 space-y-12">
              <section id="about">
                <h2 className="text-2xl font-bold font-headline mb-4">
                  About Business Bay
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Luxurious</Badge>
                  <Badge variant="secondary">
                    Residential & Commercial Skyscrapers
                  </Badge>
                  <Badge variant="secondary">Ideal for Working Professionals</Badge>
                  <Badge variant="secondary">Centrally Located</Badge>
                  <Badge variant="secondary">Metro Station</Badge>
                </div>
                <div className="space-y-4 text-muted-foreground prose prose-lg max-w-none">
                    <p>One of Dubai’s most iconic neighbourhoods, Business Bay is where work and play cross paths. It’s a commercial, residential, and business community consisting mainly of skyscrapers.</p>
                    <p>Located next to Downtown Dubai, Sheikh Zayed Road, and DIFC, It’s a stone’s throw away from the city’s most happening areas.</p>
                    <p>Business Bay is home to jaw-dropping architecture, the stunning Dubai Canal, and endless entertainment and nightlife options like rooftop restaurants, lounges, and upscale hotels. It also houses plenty of businesses and commercial buildings, hence its name.</p>
                    <p>The area boasts over 240 buildings and is one of the most popular communities in Dubai. It covers 46,900,000 sq. ft. with 18.5% of the area dedicated to commercial developments, 59.4% to mixed-use developments, and 22.1% to residential developments.</p>
                    <p>If you want to live close to Downtown Dubai at a more manageable housing price, Business Bay is a great option. This glitzy community is a key part of Dubai’s skyline and is one of the best places for renting and buying luxury apartments in Dubai.</p>
                </div>
              </section>

              <section id="highlights">
                <h2 className="text-2xl font-bold font-headline mb-4">
                  Highlights of Business Bay, Dubai
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  {[
                    'Central Business Hub in Dubai',
                    'Close to Downtown Dubai, Burj Khalifa, and Dubai Mall',
                    'Luxurious home with Dubai Canal views',
                    'Location of La Perle by Dragone',
                    'Home to JW Marriott Marquis Hotel',
                    'Very popular because of its many amenities, dining and leisure facilities',
                    'Apartments, offices and business centers available',
                    'Access to transportation including Business Bay Metro station',
                    'Near key highways like Sheikh Zayed Road and Al Khail Road',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="lifestyle">
                <h2 className="text-2xl font-bold font-headline mb-4">Lifestyle & Things to Do in Business Bay</h2>
                <div className="space-y-4 text-muted-foreground prose prose-lg max-w-none">
                    <p>The lifestyle in Business Bay is vibrant and buzzing with activities. From entertainment and waterfront strolls to restaurants and hotels, there’s always something to do here.</p>
                    <h3 className="text-xl font-bold font-headline !text-foreground !mt-6 !mb-2">Iconic Attractions</h3>
                    <p>One of the most popular attractions in Business Bay is La Perle by Dragone, Dubai’s permanent show. The mastermind behind it was Franco Dragone, the theatre director who worked with Cirque du Soleil. La Perle is located in V Hotel at Al Habtoor City. It’s inspired by Dubai’s pearl-diving history and displays impressive acrobatics, stunts, and choreography with a cast of 65 performers.</p>
                    <p>Another iconic attraction in Business Bay is the Dubai Canal. This man-made project features a 3.2 km promenade that overlooks Dubai’s stunning skyscrapers and has restaurants, hotels, luxury homes, and walking and cycling paths.</p>
                    <h3 className="text-xl font-bold font-headline !text-foreground !mt-6 !mb-2">Dining & Nightlife</h3>
                    <p>For more leisure options, visitors and residents can head to Bay Square. It is a mixed-use complex with waterfront promenades, shops, and restaurants where residents and visitors can shop, dine, and stroll to their heart’s contentment.</p>
                    <p>On top of that, Business Bay boasts a vibrant nightlife, with a large variety of clubs, lounges and pubs, such as BLU Dubai and 1OAK, while JW Marriott Marquis Hotel includes a variety of nightlife options.</p>
                </div>
              </section>

              <section id="price-insights">
                <h2 className="text-2xl font-bold font-headline mb-4">
                  Price Insights
                </h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Rent</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Average prices for apartments.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">
                            Avg. Price (AED/year)
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rentData.map((item) => (
                          <TableRow key={item.type}>
                            <TableCell className="font-medium">
                              {item.type}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.price}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <p className="text-xs text-muted-foreground mt-2">
                      The data displayed is based on Property Finder’s last 12
                      months listing data.
                    </p>
                  </CardContent>
                </Card>
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Price Trends for Studio Apartments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis
                            tickFormatter={(value) => `${value / 1000}k`}
                          />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="p-2 bg-background border rounded-lg shadow-sm">
                                    <p className="font-bold">{label}</p>
                                    <p className="text-primary">
                                      {`AED ${payload[0].value?.toLocaleString()}/year`}
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id="faq">
                <h2 className="text-2xl font-bold font-headline mb-4">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                      <AccordionItem value={`item-${index+1}`} key={index}>
                          <AccordionTrigger>{index+1}. {item.q}</AccordionTrigger>
                          <AccordionContent>
                              {item.a}
                          </AccordionContent>
                      </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    