
export type Translation = {
  en: string;
  ar: string;
}

export type Unit = {
  id: number;
  type: Translation;
  propertyType: Translation;
  beds: number;
  baths: number;
  title: Translation;
  images: string[];
  floorPlanImage: string | null;
  floorPlanImage3d: string | null;
  virtualTourUrl: string | null;
  aiHint: string;
  area: number;
  view: Translation;
  status: Translation;
  rent: number;
  furnished: boolean;
  exclusive: boolean;
  verified: boolean;
  amenities: { en: string; ar: string }[];
  serviceCharges: number;
};

export const units: Unit[] = [
  {
    id: 1,
    type: { en: '1 Bedroom', ar: 'غرفة نوم واحدة' },
    propertyType: { en: 'Apartment', ar: 'شقة' },
    beds: 1,
    baths: 2,
    title: { en: 'One-Bedroom with Burj & Canal View', ar: 'غرفة نوم واحدة بإطلالة على برج خليفة والقناة' },
    images: [
        '/apparment1.1.webp',
        '/apparment1.2.jpg',
        '/apparment1.3.jpg',
        '/apparment1.4.jpg',
        '/apparment1.5.jpg',
        '/apparment1.6.jpg',
        '/apparment1.7.jpg',
        '/apparment1.8.jpg',
        '/apparment1.9.jpg',
        '/apparment1.10.webp',
    ],
    floorPlanImage: '/1-bed-type-1.png',
    floorPlanImage3d: '/3dfloor2A1.png',
    virtualTourUrl: 'https://my.matterport.com/show/?m=69UUKm16w39',
    aiHint: 'luxury living room',
    area: 830,
    view: { en: 'Burj Khalifa & Canal View', ar: 'إطلالة على برج خليفة والقناة' },
    status: { en: 'Available Now', ar: 'متاح الآن' },
    rent: 95000,
    furnished: true,
    exclusive: true,
    verified: true,
    amenities: [
        { en: 'Balcony', ar: 'شرفة' },
        { en: 'Shared Pool', ar: 'مسبح مشترك' },
        { en: 'Shared Gym', ar: 'صالة رياضية مشتركة' },
        { en: 'Covered Parking', ar: 'موقف سيارات مغطى' },
        { en: 'View of Landmark', ar: 'إطلالة على معلم بارز' },
        { en: 'Security', ar: 'أمن' },
        { en: 'Concierge', ar: 'كونسيرج' },
        { en: 'Built in Wardrobes', ar: 'خزائن مدمجة' }
    ],
    serviceCharges: 14.19
  },
  {
    id: 2,
    type: { en: '1 Bedroom', ar: 'غرفة نوم واحدة' },
    propertyType: { en: 'Apartment', ar: 'شقة' },
    beds: 1,
    baths: 2,
    title: { en: 'One-Bedroom Apartment - Type A', ar: 'شقة بغرفة نوم واحدة - نوع A' },
    images: ['/apparment2.1.webp'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'modern apartment interior',
    area: 990,
    view: { en: 'Canal View', ar: 'إطلالة على القناة' },
    status: { en: 'Available Now', ar: 'متاح الآن' },
    rent: 160000,
    furnished: false,
    exclusive: false,
    verified: true,
    amenities: [
        { en: 'Balcony', ar: 'شرفة' },
        { en: 'Shared Pool', ar: 'مسبح مشترك' },
        { en: 'Shared Gym', ar: 'صالة رياضية مشتركة' },
        { en: 'Covered Parking', ar: 'موقف سيارات مغطى' },
        { en: 'View of Water', ar: 'إطلالة على الماء' },
        { en: 'Security', ar: 'أمن' },
        { en: 'Concierge', ar: 'كونسيرج' },
        { en: 'Built in Wardrobes', ar: 'خزائن مدمجة' }
    ],
    serviceCharges: 15.50
  },
  {
    id: 3,
    type: { en: '3 Bedroom', ar: '3 غرف نوم' },
    propertyType: { en: 'Apartment', ar: 'شقة' },
    beds: 3,
    baths: 4,
    title: { en: 'Three-Bedroom Sky Villa', ar: 'فيلا سماوية بثلاث غرف نوم' },
    images: ['/apparment3.1.webp'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'spacious apartment kitchen',
    area: 2300,
    view: { en: 'Full Canal View', ar: 'إطلالة كاملة على القناة' },
    status: { en: 'Available Now', ar: 'متاح الآن' },
    rent: 375000,
    furnished: true,
    exclusive: true,
    verified: true,
    amenities: [
        { en: 'Balcony', ar: 'شرفة' },
        { en: 'Shared Pool', ar: 'مسبح مشترك' },
        { en: 'Shared Gym', ar: 'صالة رياضية مشتركة' },
        { en: 'Covered Parking', ar: 'موقف سيارات مغطى' },
        { en: 'View of Water', ar: 'إطلالة على الماء' },
        { en: 'View of Landmark', ar: 'إطلالة على معلم بارز' },
        { en: 'Walk-in Closet', ar: 'خزانة ملابس' },
        { en: 'Pets Allowed', ar: 'مسموح بالحيوانات الأليفة' },
        { en: 'Security', ar: 'أمن' },
        { en: 'Concierge', ar: 'كونسيرج' }
    ],
    serviceCharges: 18.25
  },
  {
    id: 4,
    type: { en: '4 Bedroom', ar: '4 غرف نوم' },
    propertyType: { en: 'Penthouse', ar: 'بنتهاوس' },
    beds: 4,
    baths: 5,
    title: { en: 'Four-Bedroom Penthouse', ar: 'بنتهاوس بأربع غرف نوم' },
    images: ['/apparment4.1.webp'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'penthouse apartment view',
    area: 4000,
    view: { en: '360° Panoramic View', ar: 'إطلالة بانورامية 360 درجة' },
    status: { en: 'Available from 25 July', ar: 'متاح من 25 يوليو' },
    rent: 600000,
    furnished: true,
    exclusive: true,
    verified: true,
    amenities: [
        { en: 'Balcony', ar: 'شرفة' },
        { en: 'Shared Pool', ar: 'مسبح مشترك' },
        { en: 'Shared Gym', ar: 'صالة رياضية مشتركة' },
        { en: 'Covered Parking', ar: 'موقف سيارات مغطى' },
        { en: 'View of Water', ar: 'إطلالة على الماء' },
        { en: 'View of Landmark', ar: 'إطلالة على معلم بارز' },
        { en: 'Private Jacuzzi', ar: 'جاكوزي خاص' },
        { en: 'Study', ar: 'غرفة دراسة' },
        { en: 'Security', ar: 'أمن' },
        { en: 'Concierge', ar: 'كونسيرج' }
    ],
    serviceCharges: 22.00
  },
  {
    id: 5,
    type: { en: '1 Bedroom', ar: 'غرفة نوم واحدة' },
    propertyType: { en: 'Apartment', ar: 'شقة' },
    beds: 1,
    baths: 1,
    title: { en: 'One-Bedroom Apartment - Type B', ar: 'شقة بغرفة نوم واحدة - نوع B' },
    images: ['/apparment5.1.webp'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'cozy bedroom apartment',
    area: 1100,
    view: { en: 'Business Bay View', ar: 'إطلالة على الخليج التجاري' },
    status: { en: 'Available Now', ar: 'متاح الآن' },
    rent: 175000,
    furnished: true,
    exclusive: false,
    verified: true,
    amenities: [
        { en: 'Balcony', ar: 'شرفة' },
        { en: 'Shared Pool', ar: 'مسبح مشترك' },
        { en: 'Shared Gym', ar: 'صالة رياضية مشتركة' },
        { en: 'Covered Parking', ar: 'موقف سيارات مغطى' },
        { en: 'Security', ar: 'أمن' },
        { en: 'Concierge', ar: 'كونسيرج' },
        { en: 'Pets Allowed', ar: 'مسموح بالحيوانات الأليفة' }
    ],
    serviceCharges: 16.00
  },
  {
    id: 6,
    type: { en: '2 Bedroom', ar: 'غرفتي نوم' },
    propertyType: { en: 'Apartment', ar: 'شقة' },
    beds: 2,
    baths: 2,
    title: { en: 'Two-Bedroom Apartment - Type D', ar: 'شقة بغرفتي نوم - نوع D' },
    images: ['/apparment6.1.webp'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'minimalist apartment design',
    area: 1700,
    view: { en: 'Downtown View', ar: 'إطلالة على وسط المدينة' },
    status: { en: 'Available Now', ar: 'متاح الآن' },
    rent: 265000,
    furnished: false,
    exclusive: false,
    verified: true,
    amenities: [
        { en: 'Shared Pool', ar: 'مسبح مشترك' },
        { en: 'Shared Gym', ar: 'صالة رياضية مشتركة' },
        { en: 'Covered Parking', ar: 'موقف سيارات مغطى' },
        { en: 'View of Landmark', ar: 'إطلالة على معلم بارز' },
        { en: 'Security', ar: 'أمن' },
        { en: 'Concierge', ar: 'كونسيرج' },
        { en: 'Built in Wardrobes', ar: 'خزائن مدمجة' }
    ],
    serviceCharges: 17.50
  },
];
