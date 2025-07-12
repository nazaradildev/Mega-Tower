
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

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


export function ResidentialInsightCard() {
    return (
        <InsightCard
            link="/building/mega-residency-tower"
            imageSrc="/mega tower1.png"
            imageAlt="MEGA Residency Tower"
            imageHint="dubai cityscape"
            title="Residential Insights"
            subtitle="MEGA Residency Tower"
        >
            <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-500">
                    <Star fill="currentColor" className="h-5 w-5" />
                    <Star fill="currentColor" className="h-5 w-5" />
                    <Star fill="currentColor" className="h-5 w-5" />
                    <Star fill="currentColor" className="h-5 w-5" />
                    <Star fill="currentColor" className="h-5 w-5 opacity-50" />
                </div>
                <span className="font-semibold">5.0/5</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">163 Reviews</p>
            <div className="mt-auto">
                <p className="text-sm text-muted-foreground">Price Range:</p>
                <p className="font-semibold">80K - 220K AED</p>
            </div>
        </InsightCard>
    );
}

export function CommunityInsightCard() {
    return (
        <InsightCard
            link="/community/business-bay"
            imageSrc="https://lh3.googleusercontent.com/gps-cs-s/AC9h4noldjGXcXOg-uoslPy8Hjgq3WR9Y6IAIyKKM0JT0ydIvjOE0m9hQwHxdynDt9ndQ6pAnvTPPMJ5Y6UUDl23eU1FvAYjzhitCRy05lGw_uEvOLQU6_J9Rppag6swelRcuMPQk02q=s0"
            imageAlt="Business Bay Community"
            imageHint="dubai architecture"
            title="Community Insights"
            subtitle="Business Bay"
        >
            <div className="flex-grow space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Mostly apartments</Badge>
                    <Badge variant="secondary">Luxury</Badge>
                    <Badge variant="secondary">Well connected</Badge>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm text-muted-foreground">Price Range:</p>
                <p className="font-semibold">370K - 750M AED</p>
            </div>
        </InsightCard>
    );
}
