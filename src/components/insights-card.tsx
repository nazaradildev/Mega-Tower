
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

type InsightCardProps = {
  link: string;
  imageSrc: string;
  imageAlt: string;
  imageHint: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function InsightCard({ link, imageSrc, imageAlt, imageHint, title, subtitle, children }: InsightCardProps) {
  return (
    <Link href={link} className="block">
      <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden">
        <div className="relative w-full aspect-video">
          <Image
            src={imageSrc}
            alt={imageAlt}
            data-ai-hint={imageHint}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          {children}
        </CardContent>
      </Card>
    </Link>
  )
}

const content = {
  en: {
    residentialTitle: "Residential Insights",
    residentialSubtitle: "MEGA Residency Tower",
    reviews: "Reviews",
    priceRange: "Price Range:",
    communityTitle: "Community Insights",
    communitySubtitle: "Business Bay",
    apartmentsBadge: "Mostly apartments",
    luxuryBadge: "Luxury",
    connectedBadge: "Well connected",
  },
  ar: {
    residentialTitle: "رؤى سكنية",
    residentialSubtitle: "برج ميغا السكني",
    reviews: "تقييمات",
    priceRange: "نطاق السعر:",
    communityTitle: "رؤى المجتمع",
    communitySubtitle: "الخليج التجاري",
    apartmentsBadge: "شقق في الغالب",
    luxuryBadge: "فاخر",
    connectedBadge: "متصل جيدًا",
  }
};


export function ResidentialInsightCard() {
    const { language } = useLanguage();
    const t = content[language];
    return (
        <InsightCard
            link="/building/mega-residency-tower"
            imageSrc="/mega tower1.png"
            imageAlt="MEGA Residency Tower"
            imageHint="dubai cityscape"
            title={t.residentialTitle}
            subtitle={t.residentialSubtitle}
        >
            <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-500">
                    <Star fill="currentColor" className="h-5 w-5" />
                    <Star fill="currentColor" className="h-5 w-5" />
                    <Star fill="currentColor" className="h-5 w-5" />
                    <Star fill="currentColor" className="h-5 w-5" />
                    <Star fill="currentColor" className="h-5 w-5" />
                </div>
                <span className="font-semibold">5.0/5</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">163 {t.reviews}</p>
            <div className="mt-auto">
                <p className="text-sm text-muted-foreground">{t.priceRange}</p>
                <p className="font-semibold">80K - 220K AED</p>
            </div>
        </InsightCard>
    );
}

export function CommunityInsightCard() {
    const { language } = useLanguage();
    const t = content[language];

    return (
        <InsightCard
            link="/community/business-bay"
            imageSrc="https://lh3.googleusercontent.com/gps-cs-s/AC9h4noldjGXcXOg-uoslPy8Hjgq3WR9Y6IAIyKKM0JT0ydIvjOE0m9hQwHxdynDt9ndQ6pAnvTPPMJ5Y6UUDl23eU1FvAYjzhitCRy05lGw_uEvOLQU6_J9Rppag6swelRcuMPQk02q=s0"
            imageAlt="Business Bay Community"
            imageHint="dubai architecture"
            title={t.communityTitle}
            subtitle={t.communitySubtitle}
        >
            <div className="flex-grow space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{t.apartmentsBadge}</Badge>
                    <Badge variant="secondary">{t.luxuryBadge}</Badge>
                    <Badge variant="secondary">{t.connectedBadge}</Badge>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm text-muted-foreground">{t.priceRange}</p>
                <p className="font-semibold">70K - 300K AED</p>
            </div>
        </InsightCard>
    );
}
