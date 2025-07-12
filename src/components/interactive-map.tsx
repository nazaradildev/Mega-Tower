
'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import {
  Landmark,
  Utensils,
  HeartPulse,
  School,
  Building2,
  TreePine,
  Coffee,
  ShoppingCart,
  Dumbbell,
  FerrisWheel
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import * as ReactDOM from 'react-dom/client';

const homeCoords = { lat: 25.18117216279701, lng: 55.2751394965599 };

const pois = {
    supermarket: [
        { lat: 25.1883, lng: 55.2688, name: "Spinneys Bay Avenue" },
        { lat: 25.1835, lng: 55.2580, name: "Choithrams" },
        { lat: 25.1910, lng: 55.2621, name: "W Mart Supermarket" }
    ],
    gym: [
        { lat: 25.1875, lng: 55.2543, name: "Warehouse Gym" },
        { lat: 25.1892, lng: 55.2691, name: "UFC Gym Business Bay" },
        { lat: 25.1798, lng: 55.2599, name: "F45 Training" }
    ],
    school: [
        { lat: 25.1664, lng: 55.2501, name: "JSS Private School" },
        { lat: 25.2111, lng: 55.2789, name: "GEMS Jumeirah Primary School" },
    ],
    restaurant: [
        { lat: 25.1845, lng: 55.2632, name: "Tong Thai" },
        { lat: 25.1811, lng: 55.2575, name: "The Maine Land Brasserie" },
        { lat: 25.1899, lng: 55.2701, name: "Mama'esh" }
    ],
    cafe: [
        { lat: 25.1888, lng: 55.2680, name: "Starbucks Bay Avenue" },
        { lat: 25.1820, lng: 55.2590, name: "The Kana Cafe" },
        { lat: 25.1865, lng: 55.2655, name: "Espresso Lab" }
    ],
    shop: [
        { lat: 25.1885, lng: 55.2686, name: "Bay Avenue Mall" },
        { lat: 25.1955, lng: 55.2742, name: "Dubai Mall (nearby)" },
    ],
    park: [
        { lat: 25.1878, lng: 55.2677, name: "Bay Avenue Park" },
        { lat: 25.1972, lng: 55.2598, name: "Safa Park (nearby)" },
    ],
    attraction: [
        { lat: 25.1860, lng: 55.2620, name: "Dubai Water Canal Walk" },
        { lat: 25.1972, lng: 55.2744, name: "Burj Khalifa (nearby)" },
    ],
    hospital: [
        { lat: 25.1805, lng: 55.2550, name: "Aster Clinic, Business Bay" },
        { lat: 25.1940, lng: 55.2510, name: "Medcare Hospital Al Safa" },
    ],
    landmark: [
        { lat: 25.2532, lng: 55.3657, name: "مطار دبي الدولي (DXB)" },
        { lat: 25.1972, lng: 55.2744, name: "برج خليفة" },
        { lat: 25.1983, lng: 55.2795, name: "دبي مول" },
        { lat: 25.1412, lng: 55.1852, name: "برج العرب" },
        { lat: 25.1200, lng: 55.1494, name: "نخلة جميرا" },
        { lat: 25.0783, lng: 55.1378, name: "مرسى دبي" },
        { lat: 25.2191, lng: 55.2811, name: "متحف المستقبل" },
        { lat: 25.2359, lng: 55.3009, name: "برواز دبي" },
        { lat: 25.0798, lng: 55.1245, name: "عين دبي" }
    ],
    worship: [
        { lat: 25.1895, lng: 55.2755, name: "مسجد الغفور" },
        { lat: 25.1765, lng: 55.2593, name: "مسجد الشيخ زايد بن منصور آل نهيان" },
    ]
};

const categoriesData = {
  ar: [
    { id: 'landmark', name: 'معالم بارزة', Icon: Landmark },
    { id: 'worship', name: 'دور عبادة', Icon: Building2 },
    { id: 'supermarket', name: 'سوبر ماركت', Icon: ShoppingCart },
    { id: 'gym', name: 'صالات رياضية', Icon: Dumbbell },
    { id: 'school', name: 'مدارس/جامعات', Icon: School },
    { id: 'restaurant', name: 'مطاعم', Icon: Utensils },
    { id: 'cafe', name: 'مقاهي', Icon: Coffee },
    { id: 'park', name: 'حدائق', Icon: TreePine },
    { id: 'attraction', name: 'مناطق جذب', Icon: FerrisWheel },
    { id: 'hospital', name: 'مستشفيات', Icon: HeartPulse },
  ],
  en: [
    { id: 'landmark', name: 'Landmarks', Icon: Landmark },
    { id: 'worship', name: 'Worship', Icon: Building2 },
    { id: 'supermarket', name: 'Supermarkets', Icon: ShoppingCart },
    { id: 'gym', name: 'Gyms', Icon: Dumbbell },
    { id: 'school', name: 'Schools', Icon: School },
    { id: 'restaurant', name: 'Restaurants', Icon: Utensils },
    { id: 'cafe', name: 'Cafes', Icon: Coffee },
    { id: 'park', name: 'Parks', Icon: TreePine },
    { id: 'attraction', name: 'Attractions', Icon: FerrisWheel },
    { id: 'hospital', name: 'Hospitals', Icon: HeartPulse },
  ]
};

export function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker[]>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { language, direction } = useLanguage();
  const categories = categoriesData[language];

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    leafletMapRef.current = L.map(mapRef.current, {
      center: [homeCoords.lat, homeCoords.lng],
      zoom: 14,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMapRef.current);
    
    const mainPropertyIconHtml = `
      <div class="relative flex items-center justify-center">
        <svg class="h-16 w-16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16 32C16 32 32 20 32 12C32 5.37258 26.6274 0 20 0C13.3726 0 8 5.37258 8 12C8 20 16 32 16 32Z" fill="hsl(var(--primary))"/>
          <circle cx="16" cy="12" r="5" fill="hsl(var(--primary-foreground))"/>
        </svg>
      </div>`;

    const mainPropertyIcon = L.divIcon({
      html: mainPropertyIconHtml,
      className: '',
      iconSize: [64, 64],
      iconAnchor: [32, 64],
    });

    L.marker([homeCoords.lat, homeCoords.lng], {
      icon: mainPropertyIcon,
      zIndexOffset: 1000,
    })
      .addTo(leafletMapRef.current)
      .bindTooltip("Your Apartment Location", { permanent: false, direction: 'top', offset: [0, -64] });

    for (const category of categories) {
      const categoryId = category.id;
      markersRef.current[categoryId] = [];

      if (pois[categoryId as keyof typeof pois]) {
        (pois[categoryId as keyof typeof pois]).forEach(poi => {
          const poiIcon = L.divIcon({
            html: `<div class="w-9 h-9 bg-background rounded-full shadow-lg border-2 border-primary/80 flex items-center justify-center">
                   </div>`,
            className: `poi-icon-wrapper-${categoryId}`, // Unique class for each category
            iconSize: [36, 36],
            iconAnchor: [18, 18],
          });
          
          const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon }).bindTooltip(poi.name);
          markersRef.current[categoryId].push(marker);
        });
      }
    }
    
    // Hack to inject dynamic SVGs, as Leaflet's divIcon doesn't play well with React components directly.
    setTimeout(() => {
      categories.forEach(category => {
        const wrappers = document.querySelectorAll(`.poi-icon-wrapper-${category.id}`);
        const iconContainer = document.createElement('div');
        const root = ReactDOM.createRoot(iconContainer);
        root.render(<category.Icon className="w-5 h-5 text-primary" />);
        wrappers.forEach(wrapper => {
          if(wrapper.firstChild) {
            wrapper.firstChild.innerHTML = iconContainer.innerHTML;
          }
        });
      })
    }, 100);


    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCategory = (categoryId: string) => {
    const newActiveCategory = activeCategory === categoryId ? null : categoryId;
    setActiveCategory(newActiveCategory);

    // This is not a great pattern, but we need to clear all markers from all categories
    // because the categories object itself can change when language changes.
    Object.values(markersRef.current).flat().forEach(marker => marker.removeFrom(leafletMapRef.current!));


    if (newActiveCategory && markersRef.current[newActiveCategory]) {
      markersRef.current[newActiveCategory].forEach(marker => marker.addTo(leafletMapRef.current!));
    }
  };

  return (
    <div className="w-full bg-card rounded-2xl shadow-lg border p-4 md:p-6" dir={direction}>
      <div className="mb-4 overflow-x-auto pb-3 -mx-1" style={{ scrollbarWidth: 'thin' }}>
        <div className={cn("flex space-x-3 whitespace-nowrap px-1", direction === 'rtl' && 'space-x-reverse')}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={cn(
                'category-chip cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out shadow-sm border',
                'hover:translate-y-[-2px] hover:shadow-md',
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground border-transparent shadow-lg'
                  : 'bg-background text-foreground border-border'
              )}
            >
              <category.Icon className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div
        ref={mapRef}
        className="w-full h-[500px] md:h-[600px] bg-muted rounded-xl overflow-hidden shadow-inner border"
      ></div>
    </div>
  );
}
