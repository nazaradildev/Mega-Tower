
'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/scroll-animation';
import { cn } from '@/lib/utils';
import { Play, X } from 'lucide-react';
import { Breadcrumb } from '@/components/breadcrumb';
import { useLanguage } from '@/context/language-context';

const amenitiesContent = {
  en: {
    amenities: [
      {
        name: "Breathtaking Infinity Pool",
        description: "Immerse yourself in luxury with our stunning infinity pool, offering panoramic views of the Dubai skyline. The perfect escape from the city bustle.",
        image: "/swim1.jpg",
        aiHint: "luxury infinity pool",
        tourUrl: "https://kuula.co/share/7lnCj?fs=0&vr=0&sd=1&thumbs=0&info=0&logo=0&maps=0&chromeless=1",
      },
      {
        name: "State-of-the-Art Gymnasium",
        description: "Achieve your fitness goals in our fully equipped, modern gymnasium. Featuring the latest Technogym equipment for a comprehensive workout experience.",
        image: "/gym1.jpg",
        aiHint: "modern gym interior",
        tourUrl: "https://kuula.co/share/collection/7Yd2B?fs=0&vr=0&sd=1&thumbs=0&info=0&logo=0&maps=0&chromeless=1",
      },
      {
        name: "Serene Sauna & Steam Rooms",
        description: "Rejuvenate your body and mind in our exclusive sauna and steam rooms. A sanctuary of tranquility designed for ultimate relaxation.",
        image: "/sauna1.jpg",
        aiHint: "luxury spa sauna",
        tourUrl: "https://kuula.co/share/7HhCx?fs=0&vr=0&sd=1&thumbs=0&info=0&logo=0&maps=0&chromeless=1",
      },
      {
        name: "Lush Landscaped Gardens",
        description: "Find your peaceful oasis within the city in our beautifully landscaped gardens. An ideal space for a quiet stroll or peaceful contemplation.",
        image: "/garden1.jpg",
        aiHint: "modern building garden",
        tourUrl: "https://kuula.co/share/7PcHw?fs=0&vr=0&sd=1&thumbs=0&info=0&logo=0&maps=0&chromeless=1",
      },
    ],
    pageTitle: "Amenities Virtual Tours",
    pageDescription: "Step inside our world-class amenities. Explore each space in stunning 3D detail.",
    startTour: "Start Tour",
    closeTour: "Close virtual tour",
    breadcrumb: [{ label: 'Amenities Virtual Tours' }]
  },
  ar: {
    amenities: [
      {
        name: "مسبح إنفينيتي يخطف الأنفاس",
        description: "اغمر نفسك في الفخامة مع مسبحنا اللامتناهي المذهل، الذي يوفر إطلالات بانورامية على أفق دبي. المهرب المثالي من صخب المدينة.",
        image: "/swim1.jpg",
        aiHint: "luxury infinity pool",
        tourUrl: "https://kuula.co/share/7lnCj?fs=0&vr=0&sd=1&thumbs=0&info=0&logo=0&maps=0&chromeless=1",
      },
      {
        name: "صالة رياضية حديثة",
        description: "حقق أهدافك الرياضية في صالة الألعاب الرياضية الحديثة والمجهزة بالكامل. تتميز بأحدث معدات تكنوجيم لتجربة تمرين شاملة.",
        image: "/gym1.jpg",
        aiHint: "modern gym interior",
        tourUrl: "https://kuula.co/share/collection/7Yd2B?fs=0&vr=0&sd=1&thumbs=0&info=0&logo=0&maps=0&chromeless=1",
      },
      {
        name: "غرف الساونا والبخار الهادئة",
        description: "جدد شباب جسمك وعقلك في غرف الساونا والبخار الحصرية لدينا. ملاذ من الهدوء مصمم للاسترخاء المطلق.",
        image: "/sauna1.jpg",
        aiHint: "luxury spa sauna",
        tourUrl: "https://kuula.co/share/7HhCx?fs=0&vr=0&sd=1&thumbs=0&info=0&logo=0&maps=0&chromeless=1",
      },
      {
        name: "حدائق ذات مناظر طبيعية غناء",
        description: "اعثر على واحتك الهادئة داخل المدينة في حدائقنا ذات المناظر الطبيعية الجميلة. مساحة مثالية لنزهة هادئة أو تأمل سلمي.",
        image: "/garden1.jpg",
        aiHint: "modern building garden",
        tourUrl: "https://kuula.co/share/7PcHw?fs=0&vr=0&sd=1&thumbs=0&info=0&logo=0&maps=0&chromeless=1",
      },
    ],
    pageTitle: "جولات افتراضية للمرافق",
    pageDescription: "ادخل إلى مرافقنا ذات المستوى العالمي. استكشف كل مساحة بتفاصيل ثلاثية الأبعاد مذهلة.",
    startTour: "ابدأ الجولة",
    closeTour: "إغلاق الجولة الافتراضية",
    breadcrumb: [{ label: 'جولات افتراضية للمرافق' }]
  },
};

function AmenityTourCard({ amenity, t }: { amenity: typeof amenitiesContent.en.amenities[0], t: typeof amenitiesContent.en }) {
  const [showTour, setShowTour] = React.useState(false);

  return (
    <div className="aspect-[4/3] w-full rounded-lg overflow-hidden shadow-xl relative bg-muted">
      {showTour ? (
        <>
          <iframe
            src={amenity.tourUrl}
            width="100%"
            height="100%"
            allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
            className="border-0"
          />
          <Button 
            variant="secondary" 
            size="icon"
            onClick={() => setShowTour(false)} 
            className="absolute top-0 right-0 z-10 rounded-full h-10 w-10"
            aria-label={t.closeTour}
          >
            <X className="h-5 w-5" />
          </Button>
        </>
      ) : (
        <>
          <Image
            src={amenity.image}
            alt={amenity.name}
            data-ai-hint={amenity.aiHint}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button onClick={() => setShowTour(true)} size="lg" variant="secondary" className="rounded-full">
              <Play className="mr-2 h-5 w-5" />
              {t.startTour}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AmenitiesTourPage() {
  const { language, direction } = useLanguage();
  const t = amenitiesContent[language];

  return (
    <div className="bg-background">
      <Header />
      <main className="w-full py-16 md:py-24 bg-secondary overflow-hidden" dir={direction}>
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumb items={t.breadcrumb} className="mb-8" />
          <ScrollAnimation>
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl md:text-4xl font-bold font-headline">{t.pageTitle}</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-lg">
                {t.pageDescription}
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="space-y-16 md:space-y-24">
            {t.amenities.map((amenity, index) => (
              <ScrollAnimation key={amenity.name} delay={index * 150}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center group">
                  <div className={cn(index % 2 === 0 ? 'md:order-last' : '')}>
                     <AmenityTourCard amenity={amenity} t={t} />
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary">{amenity.name}</h2>
                    <p className="text-muted-foreground md:text-lg leading-relaxed">{amenity.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
