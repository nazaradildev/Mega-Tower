"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, TowerControl, Train, Plane, MapPin } from 'lucide-react';

const destinations = [
    { icon: ShoppingCart, name: "Dubai Mall", time: "5 mins" },
    { icon: TowerControl, name: "Burj Khalifa", time: "5 mins" },
    { icon: Train, name: "Business Bay Metro", time: "7 mins" },
    { icon: Plane, name: "DXB Airport", time: "15 mins" },
]

export function Location() {
    return (
        <section id="location" className="w-full py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">The Epicenter of Dubai</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2"><MapPin className="text-primary h-7 w-7" /> Perfectly Positioned in Business Bay</h3>
                        <p className="text-muted-foreground mb-8">
                            Churchill Towers places you at the heart of Dubai's most dynamic district. Enjoy unparalleled access to world-class shopping, dining, and entertainment, with major highways and transport links connecting you to the rest of the city and beyond.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                           {destinations.map((dest, index) => (
                               <Card key={index} className="bg-secondary/50 border-0">
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
                           ))}
                        </div>
                    </div>
                    <div className="h-96 lg:h-[500px] w-full bg-muted rounded-lg flex items-center justify-center">
                       <p className="text-muted-foreground">Map feature is temporarily disabled.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
