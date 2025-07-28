
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, TowerControl, Train, Plane, MapPin, Loader2 } from 'lucide-react';
import { ScrollAnimation } from "./scroll-animation";
import dynamic from 'next/dynamic';
import { useLanguage } from "@/context/language-context";

const InteractiveMap = dynamic(() => import('./interactive-map').then(mod => mod.InteractiveMap), {
    ssr: false,
    loading: () => (
        <div className="h-[500px] md:h-[600px] w-full bg-muted rounded-xl flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
});

const content = {
  en: {
    sectionTitle: "The Epicenter of Dubai",
    mapTitle: "Perfectly Positioned in Business Bay",
    mapDescription: "MEGA Towers places you at the heart of Dubai's most dynamic district. Enjoy unparalleled access to world-class shopping, dining, and entertainment, with major highways and transport links connecting you to the rest of the city and beyond.",
    destinations: [
      { icon: ShoppingCart, name: "Dubai Mall", time: "5 mins" },
      { icon: TowerControl, name: "Burj Khalifa", time: "5 mins" },
      { icon: Train, name: "Business Bay Metro", time: "7 mins" },
      { icon: Plane, name: "DXB Airport", time: "15 mins" },
    ]
  },
  ar: {
    sectionTitle: "مركز دبي",
    mapTitle: "موقع مثالي في الخليج التجاري",
    mapDescription: "تضعك أبراج ميغا في قلب أكثر مناطق دبي حيوية. استمتع بوصول لا مثيل له إلى التسوق والطعام والترفيه على مستوى عالمي، مع وجود طرق سريعة وخطوط مواصلات رئيسية تربطك ببقية المدينة وما بعدها.",
    destinations: [
      { icon: ShoppingCart, name: "دبي مول", time: "5 دقائق" },
      { icon: TowerControl, name: "برج خليفة", time: "5 دقائق" },
      { icon: Train, name: "مترو الخليج التجاري", time: "7 دقائق" },
      { icon: Plane, name: "مطار دبي الدولي", time: "15 دقيقة" },
    ]
  }
};


export function Location() {
    const { language, direction } = useLanguage();
    const t = content[language];
    return (
        <section id="location" className="w-full py-16 md:py-24 bg-background overflow-hidden" dir={direction}>
            <div className="container mx-auto px-4 md:px-6">
                <ScrollAnimation>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">{t.sectionTitle}</h2>
                    </div>
                </ScrollAnimation>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <ScrollAnimation>
                            <h3 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2"><MapPin className="text-primary h-7 w-7" /> {t.mapTitle}</h3>
                            <p className="text-muted-foreground mb-8">
                                {t.mapDescription}
                            </p>
                        </ScrollAnimation>
                        <div className="grid grid-cols-2 gap-6">
                           {t.destinations.map((dest, index) => (
                               <ScrollAnimation key={index} delay={index * 150}>
                                   <Card className="bg-secondary/50 border-0">
                                       <CardContent className="p-4 flex items-center gap-4">
                                           <div className="bg-primary-gradient text-primary-foreground rounded-md p-2">
                                               <dest.icon className="w-6 h-6" />
                                           </div>
                                           <div>
                                               <h4 className="font-semibold">{dest.name}</h4>
                                               <p className="text-sm text-muted-foreground">{dest.time}</p>
                                           </div>
                                       </CardContent>
                                   </Card>
                               </ScrollAnimation>
                           ))}
                        </div>
                    </div>
                    <ScrollAnimation delay={200}>
                         <div className="h-[500px] md:h-[600px] w-full rounded-lg shadow-lg">
                            <InteractiveMap mapStyle="satellite" showExpandButton={true} />
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        </section>
    );
}
