
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, View } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

const content = {
  en: {
    sectionTitle: "Step Inside, Virtually",
    sectionSubtitle: "Get a true feel for the lifestyle that awaits you with our immersive virtual tours.",
    features: [
      {
        icon: View,
        title: "Amenities Virtual Tours",
        description: "Step inside our world-class amenities. Explore each space in stunning 3D detail from the comfort of your home.",
        link: "/amenities-tour",
        linkText: "Explore Amenities",
      },
    ],
  },
  ar: {
    sectionTitle: "ادخل، افتراضيًا",
    sectionSubtitle: "احصل على شعور حقيقي بنمط الحياة الذي ينتظرك من خلال جولاتنا الافتراضية الغامرة.",
    features: [
      {
        icon: View,
        title: "جولات افتراضية للمرافق",
        description: "ادخل إلى مرافقنا ذات المستوى العالمي. استكشف كل مساحة بتفاصيل ثلاثية الأبعاد مذهلة من راحة منزلك.",
        link: "/amenities-tour",
        linkText: "استكشف المرافق",
      },
    ],
  }
};

export function ImmersiveExperience() {
  const { language, direction } = useLanguage();
  const t = content[language];

  return (
    <section id="experience" className="w-full py-16 md:py-24 bg-background" dir={direction}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t.sectionTitle}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-lg">
            {t.sectionSubtitle}
          </p>
        </div>
        <div className="flex justify-center">
            {t.features.map((feature) => (
                <Card key={feature.title} className="flex flex-col text-center items-center p-8 shadow-lg hover:shadow-xl transition-shadow max-w-md">
                <div className="bg-primary-gradient text-primary-foreground rounded-full p-4 mb-6">
                    <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-headline mb-3">{feature.title}</h3>
                <p className="text-muted-foreground flex-grow mb-6">{feature.description}</p>
                <Button asChild variant="outline" className="mt-auto rounded-lg">
                    <Link href={feature.link}>
                    {feature.linkText} <ArrowRight className={cn("h-4 w-4", direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2')} />
                    </Link>
                </Button>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
