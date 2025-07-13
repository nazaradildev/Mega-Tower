
export type Unit = {
  id: number;
  type: string;
  propertyType: string;
  beds: number;
  baths: number;
  title: string;
  images: string[];
  floorPlanImage: string | null;
  floorPlanImage3d: string | null;
  virtualTourUrl: string | null;
  aiHint: string;
  area: number;
  view: string;
  status: string;
  rent: number;
  furnished: boolean;
  exclusive: boolean;
  verified: boolean;
  amenities: string[];
  serviceCharges: number;
};

export const units: Unit[] = [
  {
    id: 1,
    type: '1 Bedroom',
    propertyType: 'Apartment',
    beds: 1,
    baths: 2,
    title: 'One-Bedroom with Burj & Canal View',
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
    floorPlanImage3d: 'https://placehold.co/800x1100.png',
    virtualTourUrl: 'https://my.matterport.com/show/?m=69UUKm16w39',
    aiHint: 'luxury living room',
    area: 830,
    view: 'Burj Khalifa & Canal View',
    status: 'Available Now',
    rent: 95000,
    furnished: true,
    exclusive: true,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Landmark', 'Security', 'Concierge', 'Built in Wardrobes'],
    serviceCharges: 14.19
  },
  {
    id: 2,
    type: '1 Bedroom',
    propertyType: 'Apartment',
    beds: 1,
    baths: 2,
    title: 'One-Bedroom Apartment - Type A',
    images: ['/apparment2.1.webp'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'modern apartment interior',
    area: 990,
    view: 'Canal View',
    status: 'Available Now',
    rent: 160000,
    furnished: false,
    exclusive: false,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Water', 'Security', 'Concierge', 'Built in Wardrobes'],
    serviceCharges: 15.50
  },
  {
    id: 3,
    type: '3 Bedroom',
    propertyType: 'Apartment',
    beds: 3,
    baths: 4,
    title: 'Three-Bedroom Sky Villa',
    images: ['/apparment3.1.webp'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'spacious apartment kitchen',
    area: 2300,
    view: 'Full Canal View',
    status: 'Available Now',
    rent: 375000,
    furnished: true,
    exclusive: true,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Water', 'View of Landmark', 'Walk-in Closet', 'Pets Allowed', 'Security', 'Concierge'],
    serviceCharges: 18.25
  },
  {
    id: 4,
    type: '4 Bedroom',
    propertyType: 'Penthouse',
    beds: 4,
    baths: 5,
    title: 'Four-Bedroom Penthouse',
    images: ['/apparment4.1.webp'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'penthouse apartment view',
    area: 4000,
    view: '360° Panoramic View',
    status: 'Available from 25 July',
    rent: 600000,
    furnished: true,
    exclusive: true,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Water', 'View of Landmark', 'Private Jacuzzi', 'Study', 'Security', 'Concierge'],
    serviceCharges: 22.00
  },
  {
    id: 5,
    type: '1 Bedroom',
    propertyType: 'Apartment',
    beds: 1,
    baths: 1,
    title: 'One-Bedroom Apartment - Type B',
    images: ['/apparment5.1.webp'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'cozy bedroom apartment',
    area: 1100,
    view: 'Business Bay View',
    status: 'Available Now',
    rent: 175000,
    furnished: true,
    exclusive: false,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'Security', 'Concierge', 'Pets Allowed'],
    serviceCharges: 16.00
  },
  {
    id: 6,
    type: '2 Bedroom',
    propertyType: 'Apartment',
    beds: 2,
    baths: 2,
    title: 'Two-Bedroom Apartment - Type D',
    images: ['/apparment6.1.webp'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'minimalist apartment design',
    area: 1700,
    view: 'Downtown View',
    status: 'Available Now',
    rent: 265000,
    furnished: false,
    exclusive: false,
    verified: true,
    amenities: ['Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Landmark', 'Security', 'Concierge', 'Built in Wardrobes'],
    serviceCharges: 17.50
  },
];
