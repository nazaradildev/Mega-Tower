
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, TowerControl, Train, Plane, MapPin, Expand, Loader2 } from 'lucide-react';
import { ScrollAnimation } from "./scroll-animation";
import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const InteractiveMap = dynamic(() => import('./interactive-map').then(mod => mod.InteractiveMap), {
    ssr: false,
    loading: () => (
        <div className="h-[500px] md:h-[600px] w-full bg-muted rounded-xl flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
});


const destinations = [
    { icon: ShoppingCart, name: "Dubai Mall", time: "5 mins" },
    { icon: TowerControl, name: "Burj Khalifa", time: "5 mins" },
    { icon: Train, name: "Business Bay Metro", time: "7 mins" },
    { icon: Plane, name: "DXB Airport", time: "15 mins" },
]

export function Location() {
    const [isMapOpen, setIsMapOpen] = useState(false);


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
                                MEGA Towers places you at the heart of Dubai's most dynamic district. Enjoy unparalleled access to world-class shopping, dining, and entertainment, with major highways and transport links connecting you to the rest of the city and beyond.
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
                         <div className="h-[500px] md:h-[600px] w-full rounded-lg shadow-lg">
                            <div className="relative w-full h-full overflow-hidden rounded-lg">
                                <InteractiveMap mapStyle="satellite" />
                                <div className="absolute bottom-6 right-6 z-10">
                                    <Button variant="secondary" size="icon" className="rounded-full h-10 w-10" onClick={() => setIsMapOpen(true)}>
                                        <Expand className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
                 <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
                    <DialogContent className="p-0 w-screen h-screen max-w-none bg-background border-0 flex flex-col outline-none ring-0">
                        <div className="absolute bottom-4 right-4 z-[1001]">
                            <Button variant="secondary" size="icon" className="rounded-full h-10 w-10" onClick={() => setIsMapOpen(false)}>
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>
                        <div className="flex-grow">
                             <InteractiveMap initialView={{ lat: 25.2048, lng: 55.2708, zoom: 11 }} mapStyle="satellite" />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
}
