
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
  FerrisWheel,
  Expand,
  X,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import * as ReactDOMServer from 'react-dom/server';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';
import Image from 'next/image';
import { Card } from './ui/card';

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

type PoiCardInfo = {
  name: string;
  image: string;
} | null;


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

type InteractiveMapProps = {
  mapStyle?: 'street' | 'satellite';
  initialView?: { lat: number; lng: number; zoom: number };
  showExpandButton?: boolean;
}

function MapComponent({ mapStyle = 'street', initialView, onMapReady }: Omit<InteractiveMapProps, 'showExpandButton'> & { onMapReady: (map: L.Map) => void }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker[]>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { language, direction } = useLanguage();
  const categories = categoriesData[language];
  const [selectedPoi, setSelectedPoi] = useState<PoiCardInfo>(null);


  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current || leafletMapRef.current) return;

    const view = initialView || { lat: homeCoords.lat, lng: homeCoords.lng, zoom: 14 };

    leafletMapRef.current = L.map(mapContainerRef.current, {
      center: [view.lat, view.lng],
      zoom: view.zoom,
      attributionControl: false,
    });

    onMapReady(leafletMapRef.current);

    const tileLayerUrl = mapStyle === 'satellite' 
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileLayerUrl).addTo(leafletMapRef.current);
    
    const mainPropertyIcon = L.icon({
        iconUrl: '/megatowericon.png',
        iconSize: [80, 80],
        iconAnchor: [40, 80],
        popupAnchor: [0, -80]
    });

    const mainMarker = L.marker([homeCoords.lat, homeCoords.lng], {
        icon: mainPropertyIcon,
        zIndexOffset: 1000,
    }).addTo(leafletMapRef.current);
    
    mainMarker.on('click', () => {
        setSelectedPoi({ name: 'MEGA Tower', image: '/mega tower1.png' });
    });
    
    leafletMapRef.current.on('click', () => {
        setSelectedPoi(null);
    });

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [mapStyle, initialView, onMapReady]);

  useEffect(() => {
     if (!leafletMapRef.current) return;
     Object.values(markersRef.current).flat().forEach(marker => marker.removeFrom(leafletMapRef.current!));
     markersRef.current = {};

    for (const category of categories) {
      const categoryId = category.id;
      markersRef.current[categoryId] = [];

      if (pois[categoryId]) {
        (pois[categoryId]).forEach(poi => {
          const poiIcon = L.divIcon({
            html: ReactDOMServer.renderToString(
                <div className="w-9 h-9 bg-background rounded-full shadow-lg border-2 border-primary/80 flex items-center justify-center">
                    <category.Icon className="w-5 h-5 text-primary" />
                </div>
            ),
            className: '',
            iconSize: [36, 36],
            iconAnchor: [18, 18],
          });
          
          const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon })
            .bindTooltip(poi.name[language]);
          markersRef.current[categoryId].push(marker);
        });
      }
    }
    
    if (activeCategory && markersRef.current[activeCategory]) {
      markersRef.current[activeCategory].forEach(marker => marker.addTo(leafletMapRef.current!));
    }

  }, [language, categories, activeCategory]);


  const toggleCategory = (categoryId: string) => {
    setActiveCategory(prev => {
        const newCategory = prev === categoryId ? null : categoryId;
        if (newCategory) {
            setSelectedPoi(null);
        }
        return newCategory;
    });
  };
  
  return (
    <div className="relative w-full h-full bg-card rounded-2xl flex flex-col overflow-hidden" dir={direction}>
      <div
        ref={mapContainerRef}
        className="w-full flex-grow bg-muted rounded-xl shadow-inner border"
      ></div>
      {selectedPoi && (
          <Card className="absolute bottom-4 left-4 z-[1000] w-64 shadow-2xl animate-in fade-in-50 slide-in-from-bottom-5">
              <div className="relative">
                  <Image
                      src={selectedPoi.image}
                      alt={selectedPoi.name}
                      width={256}
                      height={144}
                      className="w-full h-36 object-cover rounded-t-lg"
                  />
                  <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-7 w-7 rounded-full bg-black/40 hover:bg-black/60 text-white"
                      onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPoi(null);
                      }}
                  >
                      <X className="h-4 w-4" />
                  </Button>
              </div>
              <div className="p-3">
                  <p className="font-bold text-foreground">{selectedPoi.name}</p>
              </div>
          </Card>
      )}
      <div className="pt-4 overflow-x-auto overflow-y-visible pb-2 -mx-1" style={{ scrollbarWidth: 'thin' }}>
        <div className={cn("flex space-x-3 whitespace-nowrap px-1 py-2", direction === 'rtl' && 'space-x-reverse')}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={cn(
                'category-chip cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out shadow-sm border',
                'hover:-translate-y-1 hover:shadow-md',
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground border-transparent shadow-lg -translate-y-1'
                  : 'bg-background text-foreground border-border'
              )}
            >
              <category.Icon className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


export function InteractiveMap({ mapStyle = 'street', initialView, showExpandButton = false }: InteractiveMapProps) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const [currentMapState, setCurrentMapState] = useState(initialView || { lat: homeCoords.lat, lng: homeCoords.lng, zoom: 14 });

  const handleExpandClick = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const zoom = mapRef.current.getZoom();
      setCurrentMapState({ lat: center.lat, lng: center.lng, zoom: zoom });
    }
    setIsMapOpen(true);
  };
  
  return (
    <>
      <div className={cn("relative w-full h-full shadow-lg border rounded-2xl p-4 md:p-6", isMapOpen && "invisible")}>
         <MapComponent mapStyle={mapStyle} initialView={initialView} onMapReady={(map) => mapRef.current = map} />
         {showExpandButton && (
             <div className="absolute top-4 right-4 z-[1000]">
                 <Button variant="secondary" size="icon" className="rounded-full h-10 w-10" onClick={handleExpandClick}>
                     <Expand className="h-5 w-5" />
                 </Button>
             </div>
         )}
     </div>

      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="p-0 w-screen h-screen max-w-none bg-background border-0 flex flex-col outline-none ring-0">
            <div className="absolute top-4 right-4 z-[1001]">
                <Button variant="secondary" size="icon" className="rounded-full h-10 w-10" onClick={() => setIsMapOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </Button>
            </div>
            <div className="flex-grow p-4 md:p-6">
                 <MapComponent mapStyle={mapStyle} initialView={currentMapState} onMapReady={() => {}} />
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
