
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Residences } from '@/components/residences';
import { Amenities } from '@/components/amenities';
import { Location } from '@/components/location';
import { Contact } from '@/components/contact';
import { ImmersiveExperience } from '@/components/immersive-experience';
import { ResidentialInsightCard, CommunityInsightCard } from '@/components/insights-card';
import { Footer } from '@/components/footer';
import { useLanguage } from '@/context/language-context';

const content = {
  en: {
    title: (
      <>
        Live Exceptionally.
        <br />
        Elevate your living at MEGA Towers.
      </>
    ),
    subtitle: 'Discover luxury apartments where elegance meets comfort in the heart of Business Bay.',
    button: 'Explore Residences',
  },
  ar: {
    title: (
      <>
        عيش استثنائي.
        <br />
        ارتقِ بأسلوب حياتك في أبراج ميغا.
      </>
    ),
    subtitle: 'اكتشف شققاً فاخرة حيث تجتمع الأناقة والراحة في قلب الخليج التجاري.',
    button: 'اكتشف الوحدات السكنية',
  },
};

export default function Home() {
  const { language, direction } = useLanguage();
  const t = content[language];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative w-full">
          <div className="container mx-auto px-4 md:px-6 py-10">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <div className="absolute inset-0 z-0">
                 <Image
                  src="/mega tower1.png"
                  alt="Hero image of MEGA Towers in Business Bay, Dubai"
                  data-ai-hint="dubai cityscape"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-4">
                <div className="text-center text-white" dir={direction}>
                  <h1 className="font-headline font-bold text-4xl md:text-6xl lg:text-7xl !leading-tight">
                    {t.title}
                  </h1>
                  <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
                    {t.subtitle}
                  </p>
                  <div className="mt-8">
                    <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
                      <a href="#residences">{t.button}</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Residences />
        <Amenities />
        <ImmersiveExperience />
        <Location />

        <section id="insights" className="w-full py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Deeper Insights</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-lg">
                Explore detailed information about the property and the surrounding community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <ResidentialInsightCard />
              <CommunityInsightCard />
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
