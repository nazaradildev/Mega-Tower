
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
import { StickyNav } from '@/components/sticky-nav';
import React from 'react';
import { cn } from '@/lib/utils';

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
    insightsTitle: 'Deeper Insights',
    insightsSubtitle: 'Explore detailed information about the property and the surrounding community.',
  },
  ar: {
    title: (
      <>
        عش استثنائيًا.
        <br />
        ارتقِ بأسلوب حياتك في أبراج ميغا.
      </>
    ),
    subtitle: 'اكتشف شققًا فاخرة حيث تجتمع الأناقة والراحة في قلب الخليج التجاري.',
    button: 'اكتشف الوحدات السكنية',
    insightsTitle: 'رؤى أعمق',
    insightsSubtitle: 'استكشف معلومات مفصلة عن العقار والمجتمع المحيط به.',
  },
};

export default function Home() {
  const { language, direction } = useLanguage();
  const t = content[language];
  const [isHeroVisible, setIsHeroVisible] = React.useState(false);
  const heroRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentHeroRef = heroRef.current;
    if (currentHeroRef) {
      observer.observe(currentHeroRef);
    }

    return () => {
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef);
      }
    };
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <StickyNav />
      
      <section ref={heroRef} id="hero" className="relative h-screen w-full flex flex-col items-center justify-center -mt-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
               <Image
                  src="/mega tower1.png"
                  alt="Hero image of MEGA Towers in Business Bay, Dubai for mobile"
                  data-ai-hint="dubai cityscape"
                  fill
                  sizes="100vw"
                  className={cn(
                    "object-cover md:hidden transition-transform duration-[20s] ease-linear",
                    isHeroVisible ? 'animate-ken-burns' : ''
                  )}
                  priority
              />
              <Image
                  src="/mega tower2.png"
                  alt="Hero image of MEGA Towers in Business Bay, Dubai for desktop"
                  data-ai-hint="dubai cityscape night"
                  fill
                  sizes="100vw"
                  className={cn(
                    "object-cover hidden md:block transition-transform duration-[20s] ease-linear",
                    isHeroVisible ? 'animate-ken-burns' : ''
                  )}
                  priority
              />
              <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-center text-white p-4" dir={direction}>
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
      </section>

      <main className="relative z-20 flex-1 bg-background" dir={direction}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
                <Residences />
            </div>
            <aside className="lg:col-span-4 lg:sticky lg:top-32 self-start hidden lg:block">
              <div className="space-y-6">
                  <div className="text-left">
                    <h2 className="text-2xl font-bold font-headline">{t.insightsTitle}</h2>
                    <p className="text-muted-foreground mt-1">
                      {t.insightsSubtitle}
                    </p>
                  </div>
                  <ResidentialInsightCard />
                  <CommunityInsightCard />
              </div>
            </aside>
          </div>
        </div>

        <Amenities />
        <ImmersiveExperience />
        <Location />

        <div className="lg:hidden">
            <section id="insights" className="w-full py-16 md:py-24 bg-background">
              <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">{t.insightsTitle}</h2>
                  <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-lg">
                    {t.insightsSubtitle}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <ResidentialInsightCard />
                  <CommunityInsightCard />
                </div>
              </div>
            </section>
        </div>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
