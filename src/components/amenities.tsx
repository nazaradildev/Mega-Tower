import { Card, CardContent } from "@/components/ui/card";
import {
  Waves,
  Dumbbell,
  Cloudy,
  ToyBrick,
  Trophy,
  Basketball,
  Golf,
  ShieldCheck,
  Trees,
  BellRing
} from "lucide-react";

const amenitiesList = [
  { icon: Waves, name: "Infinity Pool" },
  { icon: Dumbbell, name: "Fully Equipped Gymnasium" },
  { icon: Cloudy, name: "Sauna & Steam Rooms" },
  { icon: ToyBrick, name: "Children's Play Area" },
  { icon: Trophy, name: "Tennis Court" },
  { icon: Basketball, name: "Basketball Court" },
  { icon: Golf, name: "Mini Golf Course" },
  { icon: BellRing, name: "24/7 Concierge" },
  { icon: ShieldCheck, name: "24/7 Security" },
  { icon: Trees, name: "Landscaped Gardens" },
];

export function Amenities() {
  return (
    <section id="amenities" className="w-full py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">A Lifestyle Beyond Compare</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Experience a curated selection of world-class amenities designed for your comfort and leisure.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 text-center">
          {amenitiesList.map((amenity, index) => (
            <Card key={index} className="flex flex-col items-center justify-center p-6 shadow-md hover:shadow-xl transition-shadow duration-300 bg-background rounded-lg">
              <CardContent className="p-0 flex flex-col items-center justify-center">
                <div className="bg-primary-gradient text-primary-foreground rounded-full p-4 mb-4">
                  <amenity.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-base">{amenity.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
