import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://placehold.co/1920x1080.png"
              alt="Luxury apartment building in Dubai with a clear blue sky"
              data-ai-hint="luxury apartment building"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="font-headline font-bold text-4xl md:text-6xl lg:text-7xl !leading-tight">
              Live Exceptionally. <br /> Rent at Churchill Towers.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
              Luxury 1, 2, 3, and 4 Bedroom Apartments in the Heart of Business Bay.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
                <a href="#residences">Explore Residences</a>
              </Button>
            </div>
          </div>
        </section>

        <div id="residences" className="h-screen bg-background p-8"><h2 className="text-3xl font-bold font-headline">Available Residences (Coming Soon)</h2></div>
        <div id="amenities" className="h-screen bg-secondary p-8"><h2 className="text-3xl font-bold font-headline">World-Class Amenities (Coming Soon)</h2></div>
        <div id="location" className="h-screen bg-background p-8"><h2 className="text-3xl font-bold font-headline">Location Advantage (Coming Soon)</h2></div>
        <div id="contact" className="h-screen bg-secondary p-8"><h2 className="text-3xl font-bold font-headline">Contact & Booking (Coming Soon)</h2></div>
      </main>
    </div>
  );
}
