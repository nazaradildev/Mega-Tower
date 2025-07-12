
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

type PoiName = {
  en: string;
  ar: string;
}

type Poi = {
  lat: number;
  lng: number;
  name: PoiName;
}

const pois: Record<string, Poi[]> = {
    supermarket: [
        { lat: 25.1883, lng: 55.2688, name: { en: "Spinneys Bay Avenue", ar: "سبينيس باي أفينيو" } },
        { lat: 25.1835, lng: 55.2580, name: { en: "Choithrams", ar: "شويترام" } },
        { lat: 25.1910, lng: 55.2621, name: { en: "W Mart Supermarket", ar: "دبليو مارت سوبر ماركت" } }
    ],
    gym: [
        { lat: 25.1875, lng: 55.2543, name: { en: "Warehouse Gym", ar: "ويرهاوس جيم" } },
        { lat: 25.1892, lng: 55.2691, name: { en: "UFC Gym Business Bay", ar: "يو إف سي جيم الخليج التجاري" } },
        { lat: 25.1798, lng: 55.2599, name: { en: "F45 Training", ar: "إف 45 ترينينج" } }
    ],
    school: [
        { lat: 25.1664, lng: 55.2501, name: { en: "JSS Private School", ar: "مدرسة JSS الخاصة" } },
        { lat: 25.2111, lng: 55.2789, name: { en: "GEMS Jumeirah Primary School", ar: "مدرسة جيمس جميرا الابتدائية" } },
    ],
    restaurant: [
        { lat: 25.1845, lng: 55.2632, name: { en: "Tong Thai", ar: "تونغ تاي" } },
        { lat: 25.1811, lng: 55.2575, name: { en: "The Maine Land Brasserie", ar: "ذا ماين لاند براسيري" } },
        { lat: 25.1899, lng: 55.2701, name: { en: "Mama'esh", ar: "ماما إيش" } }
    ],
    cafe: [
        { lat: 25.1888, lng: 55.2680, name: { en: "Starbucks Bay Avenue", ar: "ستاربكس باي أفينيو" } },
        { lat: 25.1820, lng: 55.2590, name: { en: "The Kana Cafe", ar: "ذا كنافة كافيه" } },
        { lat: 25.1865, lng: 55.2655, name: { en: "Espresso Lab", ar: "اسبريسو لاب" } }
    ],
    shop: [
        { lat: 25.1885, lng: 55.2686, name: { en: "Bay Avenue Mall", ar: "باي أفينيو مول" } },
        { lat: 25.1955, lng: 55.2742, name: { en: "Dubai Mall (nearby)", ar: "دبي مول (قريب)" } },
    ],
    park: [
        { lat: 25.1878, lng: 55.2677, name: { en: "Bay Avenue Park", ar: "حديقة باي أفينيو" } },
        { lat: 25.1972, lng: 55.2598, name: { en: "Safa Park (nearby)", ar: "حديقة الصفا (قريبة)" } },
    ],
    attraction: [
        { lat: 25.1860, lng: 55.2620, name: { en: "Dubai Water Canal Walk", ar: "ممشى قناة دبي المائية" } },
        { lat: 25.1972, lng: 55.2744, name: { en: "Burj Khalifa (nearby)", ar: "برج خليفة (قريب)" } },
    ],
    hospital: [
        { lat: 25.1805, lng: 55.2550, name: { en: "Aster Clinic, Business Bay", ar: "عيادة أستر، الخليج التجاري" } },
        { lat: 25.1940, lng: 55.2510, name: { en: "Medcare Hospital Al Safa", ar: "مستشفى ميدكير الصفا" } },
    ],
    landmark: [
        { lat: 25.2532, lng: 55.3657, name: { en: "Dubai International Airport (DXB)", ar: "مطار دبي الدولي (DXB)" } },
        { lat: 25.1972, lng: 55.2744, name: { en: "Burj Khalifa", ar: "برج خليفة" } },
        { lat: 25.1983, lng: 55.2795, name: { en: "The Dubai Mall", ar: "دبي مول" } },
        { lat: 25.1412, lng: 55.1852, name: { en: "Burj Al Arab", ar: "برج العرب" } },
        { lat: 25.1200, lng: 55.1494, name: { en: "The Palm Jumeirah", ar: "نخلة جميرا" } },
        { lat: 25.0783, lng: 55.1378, name: { en: "Dubai Marina", ar: "مرسى دبي" } },
        { lat: 25.2191, lng: 55.2811, name: { en: "Museum of the Future", ar: "متحف المستقبل" } },
        { lat: 25.2359, lng: 55.3009, name: { en: "Dubai Frame", ar: "برواز دبي" } },
        { lat: 25.0798, lng: 55.1245, name: { en: "Ain Dubai", ar: "عين دبي" } }
    ],
    worship: [
        { lat: 25.1895, lng: 55.2755, name: { en: "Al Ghafoor Mosque", ar: "مسجد الغفور" } },
        { lat: 25.1765, lng: 55.2593, name: { en: "Sheikh Zayed bin Mansour Al Nahyan Mosque", ar: "مسجد الشيخ زايد بن منصور آل نهيان" } },
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
  const homeLocationName = language === 'en' ? 'Your Apartment Location' : 'موقع شقتك';

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
      .bindTooltip(homeLocationName, { permanent: false, direction: 'top', offset: [0, -64] });

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
     if (!leafletMapRef.current) return;
     // Clear all markers
     Object.values(markersRef.current).flat().forEach(marker => marker.removeFrom(leafletMapRef.current!));
     markersRef.current = {};

    // Create markers for the current language
    for (const category of categories) {
      const categoryId = category.id;
      markersRef.current[categoryId] = [];

      if (pois[categoryId]) {
        (pois[categoryId]).forEach(poi => {
          const poiIcon = L.divIcon({
            html: `<div class="w-9 h-9 bg-background rounded-full shadow-lg border-2 border-primary/80 flex items-center justify-center">
                   </div>`,
            className: `poi-icon-wrapper-${categoryId}`, // Unique class for each category
            iconSize: [36, 36],
            iconAnchor: [18, 18],
          });
          
          const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon })
            .bindTooltip(poi.name[language]); // Use name based on language
          markersRef.current[categoryId].push(marker);
        });
      }
    }
    
    // Show markers for the active category
    if (activeCategory && markersRef.current[activeCategory]) {
      markersRef.current[activeCategory].forEach(marker => marker.addTo(leafletMapRef.current!));
    }
    
    // Inject icon components
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

  }, [language, categories, activeCategory]);


  const toggleCategory = (categoryId: string) => {
    setActiveCategory(prev => prev === categoryId ? null : categoryId);
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

