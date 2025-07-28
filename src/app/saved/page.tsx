
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { UnitCard } from '@/components/unit-card';
import { units } from '@/data/units';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

const content = {
  en: {
    title: 'Saved Properties',
    description: 'Your favorite properties, all in one place.',
    noSaved: 'No Saved Properties',
    noSavedDesc: 'You haven’t saved any properties yet. Start searching to find your perfect home.',
  },
  ar: {
    title: 'العقارات المحفوظة',
    description: 'عقاراتك المفضلة، كلها في مكان واحد.',
    noSaved: 'لا توجد عقارات محفوظة',
    noSavedDesc: 'لم تقم بحفظ أي عقارات بعد. ابدأ البحث للعثور على منزلك المثالي.',
  },
};

export default function SavedPage() {
  const { language, direction } = useLanguage();
  const t = content[language];
  // For demonstration, we'll show a subset of units as "saved"
  const savedUnits = units.slice(0, 2); 

  return (
    <div className="bg-background">
      <Header />
      <main className="w-full py-16 md:py-24 bg-secondary/50" dir={direction}>
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold font-headline">{t.title}</h1>
              <p className="text-muted-foreground mt-2 text-lg">
                {t.description}
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
                    <h3 className="mt-4 text-lg font-medium">{t.noSaved}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {t.noSavedDesc}
                    </p>
                </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
