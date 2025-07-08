
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, View, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: View,
    title: "3D Virtual Tours",
    description: "Walk through our apartments from the comfort of your home. Explore every room and detail with our high-fidelity virtual tours.",
    link: "#residences",
    linkText: "Start Touring",
  },
  {
    icon: ImageIcon,
    title: "Photo Gallery",
    description: "Browse a curated collection of high-resolution images showcasing the stunning interiors, exteriors, and amenities of Churchill Towers.",
    link: "#amenities",
    linkText: "View Gallery",
  },
];

export function ImmersiveExperience() {
  return (
    <section id="experience" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Step Inside, Virtually</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-lg">
            Get a true feel for your future home with our immersive tours and stunning photo gallery.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col text-center items-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-gradient text-primary-foreground rounded-full p-4 mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-headline mb-3">{feature.title}</h3>
              <p className="text-muted-foreground flex-grow mb-6">{feature.description}</p>
              <Button asChild variant="outline" className="mt-auto rounded-lg">
                <Link href={feature.link}>
                  {feature.linkText} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
