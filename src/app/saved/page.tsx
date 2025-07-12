
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { UnitCard } from '@/components/unit-card';
import { units } from '@/data/units';
import { Heart } from 'lucide-react';

export default function SavedPage() {
  // For demonstration, we'll show a subset of units as "saved"
  const savedUnits = units.slice(0, 2); 

  return (
    <div className="bg-background">
      <Header />
      <main className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold font-headline">Saved Properties</h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Your favorite properties, all in one place.
              </p>
            </div>

            {savedUnits.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                    {savedUnits.map(unit => (
                        <UnitCard key={unit.id} unit={unit} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No Saved Properties</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        You haven’t saved any properties yet. Start searching to find your perfect home.
                    </p>
                </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
