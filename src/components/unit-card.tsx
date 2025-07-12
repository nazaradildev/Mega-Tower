
'use client';

import {
  Bath,
  Bed,
  Bookmark,
  Calendar,
  Camera,
  Heart,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  Ruler,
  Share2,
  Armchair,
  View,
  X,
} from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { Unit } from '@/data/units';

function Icon360(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.2-8.7" />
      <path d="M17.4 8.6l-3.2 2.3 2.3 3.3" />
      <path d="m21.5 10.5-2-2.5-3 1.5" />
    </svg>
  );
}

type UnitCardProps = {
  unit: Unit;
};

export function UnitCard({ unit }: UnitCardProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [planView, setPlanView] = useState('2D');
  const autoplay = React.useRef(
    Autoplay(
      { delay: 4000, stopOnInteraction: true, playOnInit: false },
      (emblaRoot) => emblaRoot.parentElement
    )
  );

  useEffect(() => {
    if (!api) {
      return;
    }
    
    const startAutoplayTimeout = setTimeout(() => {
      autoplay.current.play();
    }, 3000);

    setCurrentImageIndex(api.selectedScrollSnap());
    const onSelect = () => {
      setCurrentImageIndex(api.selectedScrollSnap());
    };
    api.on('select', onSelect);

    return () => {
      clearTimeout(startAutoplayTimeout);
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <Card className="w-full mx-auto overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-background flex flex-col md:flex-row">
      {/* Image Part */}
      <div className="w-full md:w-1/2 relative group/image aspect-[4/3] flex-shrink-0">
        <Carousel
          setApi={setApi}
          className="w-full h-full"
          plugins={[autoplay.current]}
          opts={{ loop: true }}
        >
          <CarouselContent className="m-0 h-full">
            {unit.images.map((imgSrc, index) => (
              <CarouselItem key={index} className="p-0">
                <img
                  src={imgSrc}
                  alt={`${unit.title} - Image ${index + 1}`}
                  data-ai-hint={unit.aiHint}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-3 h-8 w-8 bg-white/80 hover:bg-white text-gray-800 opacity-0 group-hover/image:opacity-100 transition-opacity z-10" />
          <CarouselNext className="absolute right-3 h-8 w-8 bg-white/80 hover:bg-white text-gray-800 opacity-0 group-hover/image:opacity-100 transition-opacity z-10" />

          <div className="absolute inset-x-0 bottom-4 flex justify-center items-center gap-2 z-10">
            {unit.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  api?.scrollTo(index);
                }}
                className="p-1"
                aria-label={`Go to image ${index + 1}`}
              >
                <div
                  className={cn(
                    'w-2 h-2 rounded-full border-2 transition-all',
                    currentImageIndex === index
                      ? 'bg-primary border-primary'
                      : 'border-white/80 bg-black/30'
                  )}
                ></div>
              </button>
            ))}
          </div>

          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-semibold py-1 px-2 rounded-md flex items-center gap-1.5 z-10">
            <Camera className="w-4 h-4" />
            <span>{unit.images.length}</span>
          </div>
        </Carousel>
      </div>

      {/* Content Part */}
      <div className="w-full md:w-1/2 flex flex-col relative">
        <Link
          href={`/property/${unit.id}`}
          className="absolute inset-0 z-0"
          aria-label={`View details for ${unit.title}`}
        />
        {/* Main Content */}
        <div className="p-4 flex flex-col flex-grow">
          <span className="text-sm text-muted-foreground">
            {unit.propertyType}
          </span>
          <p className="text-2xl font-bold text-foreground my-1">
            AED {unit.rent.toLocaleString()}{' '}
            <span className="text-base font-normal text-muted-foreground">
              / year
            </span>
          </p>
          <span className="text-lg font-semibold text-foreground block truncate">
            {unit.title}
          </span>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
            <Calendar className="h-4 w-4" />
            <span>{unit.status}</span>
          </div>

          <div className="space-y-3 text-sm mt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>
                MEGA Residency Tower, Business Bay
              </span>
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

          <div className="relative z-10 mt-auto pt-4 flex items-center flex-wrap justify-start gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-md flex-1 sm:flex-none"
                  disabled={!unit.virtualTourUrl}
                >
                  <Icon360 className="mr-1.5 h-4 w-4" />{' '}
                  <span>Virtual Tour</span>
                </Button>
              </DialogTrigger>
              {unit.virtualTourUrl && (
                <DialogContent className="p-0 w-[95vw] h-[90vh] max-w-7xl border-0">
                  <DialogHeader className="absolute top-2 right-2 z-10 p-0 m-0">
                    <DialogClose asChild>
                      <Button
                        variant="default"
                        size="icon"
                        className="bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
                      >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </DialogClose>
                  </DialogHeader>
                  <iframe
                    src={unit.virtualTourUrl}
                    width="100%"
                    height="100%"
                    allow="fullscreen"
                    className="rounded-lg"
                  />
                </DialogContent>
              )}
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-md flex-1 sm:flex-none"
                  disabled={!unit.floorPlanImage}
                >
                  <LayoutDashboard className="mr-1.5 h-3.5 w-3.5" />{' '}
                  <span>Floor Plan</span>
                </Button>
              </DialogTrigger>
              {unit.floorPlanImage && (
                <DialogContent className="p-0 max-w-4xl w-[95vw] md:w-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <DialogTitle className="text-lg font-semibold truncate pr-4">
                      Floor Plan: {unit.title}
                    </DialogTitle>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="p-1 bg-muted rounded-lg flex gap-1">
                        <Button
                          size="sm"
                          variant={planView === '2D' ? 'default' : 'ghost'}
                          onClick={() => setPlanView('2D')}
                          className="h-8 rounded-md"
                        >
                          2D
                        </Button>
                        <Button
                          size="sm"
                          variant={planView === '3D' ? 'default' : 'ghost'}
                          onClick={() => setPlanView('3D')}
                          className="h-8 rounded-md"
                          disabled={!unit.floorPlanImage3d}
                        >
                          3D
                        </Button>
                      </div>
                      <DialogClose asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close</span>
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                  <div className="bg-muted/50 max-h-[80vh] overflow-auto">
                    <div className="flex justify-center items-center p-4">
                      <Image
                        src={
                          planView === '2D'
                            ? unit.floorPlanImage
                            : unit.floorPlanImage3d || ''
                        }
                        alt={`Floor plan for ${unit.title} (${planView})`}
                        data-ai-hint="apartment floor plan"
                        width={1000}
                        height={1400}
                        className="w-auto h-auto max-w-none"
                      />
                    </div>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 p-4 border-t bg-gray-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://placehold.co/40x40.png"
                data-ai-hint="agent portrait"
                alt="Agent"
              />
              <AvatarFallback>AE</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Marketing by</p>
              <p className="font-semibold text-foreground text-sm">
                Apex Estates
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto justify-end gap-2">
            <div className="w-full sm:w-auto grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-md justify-center"
              >
                <Phone className="mr-1.5 h-3.5 w-3.5" />
                <span className="hidden sm:inline">Call</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-md justify-center"
              >
                <Mail className="mr-1.5 h-3.5 w-3.5" />
                <span className="hidden sm:inline">Email</span>
              </Button>
              <Button
                size="sm"
                className="bg-[#25D366] text-white hover:bg-[#1EBE56] border-[#25D366] rounded-md justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="mr-1.5 h-4 w-4"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.1-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-1.001.164-.521.164-.97.114-1.07l-.26-.065z" />
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-0">
              <Separator
                orientation="vertical"
                className="h-6 mx-1 bg-border hidden sm:block"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <Share2 className="w-5 h-5 text-muted-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <Bookmark className="w-5 h-5 text-muted-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <Heart className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
