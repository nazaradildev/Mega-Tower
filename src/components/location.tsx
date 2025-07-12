
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, TowerControl, Train, Plane, MapPin, Expand } from 'lucide-react';
import { ScrollAnimation } from "./scroll-animation";
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";


const destinations = [
    { icon: ShoppingCart, name: "Dubai Mall", time: "5 mins" },
    { icon: TowerControl, name: "Burj Khalifa", time: "5 mins" },
    { icon: Train, name: "Business Bay Metro", time: "7 mins" },
    { icon: Plane, name: "DXB Airport", time: "15 mins" },
]

export function Location() {
    const Map = useMemo(() => dynamic(() => import('@/components/map').then(mod => mod.Map), {
        loading: () => <div className="h-full w-full bg-muted flex items-center justify-center"><p className="text-center p-4">Loading map...</p></div>,
        ssr: false
    }), []);

    return (
        <section id="location" className="w-full py-16 md:py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <ScrollAnimation>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">The Epicenter of Dubai</h2>
                    </div>
                </ScrollAnimation>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <ScrollAnimation>
                            <h3 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2"><MapPin className="text-primary h-7 w-7" /> Perfectly Positioned in Business Bay</h3>
                            <p className="text-muted-foreground mb-8">
                                Churchill Towers places you at the heart of Dubai's most dynamic district. Enjoy unparalleled access to world-class shopping, dining, and entertainment, with major highways and transport links connecting you to the rest of the city and beyond.
                            </p>
                        </ScrollAnimation>
                        <div className="grid grid-cols-2 gap-6">
                           {destinations.map((dest, index) => (
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
                         <Dialog>
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-96 lg:h-[500px] w-full bg-muted rounded-lg shadow-lg overflow-hidden">
                                    <Map />
                                </div>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="rounded-full">
                                        <Expand className="mr-2 h-4 w-4" />
                                        Full Screen
                                    </Button>
                                </DialogTrigger>
                            </div>
                            <DialogContent className="p-0 w-screen h-screen max-w-none bg-background border-0 flex items-center justify-center outline-none ring-0">
                                <DialogClose asChild>
                                    <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-50 text-foreground bg-background/50 hover:bg-background/70 rounded-full h-10 w-10">
                                        <X className="h-6 w-6" />
                                    </Button>
                                </DialogClose>
                                <div className="h-full w-full">
                                    <Map isInDialog={true} />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </ScrollAnimation>
                </div>
            </div>
        </section>
    );
}
