
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
        'https://www.propertyfinder.ae/property/1841ae8e8c256855ce7d0e30ef6ef82f/1312/894/MODE/ad484c/14446875-0682co.jpg?ctr=ae',
        'https://www.propertyfinder.ae/property/cf729a31177dd42be68fe373c5cdb16b/1312/894/MODE/dcd8c0/14446875-646c3o.jpg?ctr=ae',
        'https://www.propertyfinder.ae/property/3febfbc30013bad43391f176d80332fd/1312/894/MODE/8c6c29/14446875-f72c5o.jpg?ctr=ae',
        'https://www.propertyfinder.ae/property/9deb7fe0efa08a4ea926b38d35a24092/1312/894/MODE/17f7bd/14446875-cce66o.jpg?ctr=ae',
        'https://www.propertyfinder.ae/property/965bba2759e1ad0eaa75be43a18352d3/1312/894/MODE/54e2e7/14446875-ed417o.jpg?ctr=ae',
        'https://www.propertyfinder.ae/property/8162edffa729667a0f10b6d3bb34e6e6/1312/894/MODE/342c4e/14446875-3ad89o.jpg?ctr=ae',
        'https://www.propertyfinder.ae/property/ae59bc5c9f3ebe26155b7a8bd9db9741/1312/894/MODE/cf6f80/14446875-ce281o.jpg?ctr=ae',
        'https://www.propertyfinder.ae/property/31a94f8fa3dd1793e320d8e1deae3196/1312/894/MODE/19e637/14446875-f7ca1o.jpg?ctr=ae',
        'https://www.propertyfinder.ae/property/dcd1783f07629cbce735f5793012bb53/1312/894/MODE/1595d8/14446875-4751ao.jpg?ctr=ae',
        'https://www.propertyfinder.ae/property/e493249482f5b48555b6425c37170bd1/1312/894/MODE/4e1059/14446875-92927o.jpg?ctr=ae',
        'https://www.propertyfinder.ae/property/012571b5c67710829530f313ee90c40e/1312/894/MODE/679eb1/14446875-dd0e7o.jpg?ctr=ae',
        'https://www.propertyfinder.ae/property/2d8384c5a9b78a4404f7f1758f82f3df/1312/894/MODE/8833d6/14446875-c093ao.jpg?ctr=ae'
    ],
    floorPlanImage: '/1-bed-type-1.png',
    floorPlanImage3d: 'https://placehold.co/800x1100.png',
    virtualTourUrl: 'https://my.matterport.com/show/?m=69UUKm16w39',
    aiHint: 'luxury living room',
    area: 781,
    view: 'Burj Khalifa & Canal View',
    status: 'Available Now',
    rent: 88000,
    furnished: true,
    exclusive: true,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Landmark']
  },
  {
    id: 2,
    type: '1 Bedroom',
    propertyType: 'Apartment',
    beds: 1,
    baths: 2,
    title: 'One-Bedroom Apartment - Type A',
    images: ['https://placehold.co/600x400.png'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'modern apartment interior',
    area: 950,
    view: 'Canal View',
    status: 'Available Now',
    rent: 150000,
    furnished: false,
    exclusive: false,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Water']
  },
  {
    id: 3,
    type: '3 Bedroom',
    propertyType: 'Apartment',
    beds: 3,
    baths: 4,
    title: 'Three-Bedroom Sky Villa',
    images: ['https://placehold.co/600x400.png'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'spacious apartment kitchen',
    area: 2200,
    view: 'Full Canal View',
    status: 'Available Now',
    rent: 350000,
    furnished: true,
    exclusive: true,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Water', 'View of Landmark', 'Walk-in Closet']
  },
  {
    id: 4,
    type: '4 Bedroom',
    propertyType: 'Penthouse',
    beds: 4,
    baths: 5,
    title: 'Four-Bedroom Penthouse',
    images: ['https://placehold.co/600x400.png'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'penthouse apartment view',
    area: 3800,
    view: '360° Panoramic View',
    status: 'Limited Availability',
    rent: 550000,
    furnished: true,
    exclusive: true,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Water', 'View of Landmark', 'Private Jacuzzi', 'Study']
  },
  {
    id: 5,
    type: '1 Bedroom',
    propertyType: 'Apartment',
    beds: 1,
    baths: 1,
    title: 'One-Bedroom Apartment - Type B',
    images: ['https://placehold.co/600x400.png'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'cozy bedroom apartment',
    area: 1050,
    view: 'Business Bay View',
    status: 'Available Now',
    rent: 165000,
    furnished: true,
    exclusive: false,
    verified: true,
    amenities: ['Balcony', 'Shared Pool', 'Shared Gym', 'Covered Parking']
  },
  {
    id: 6,
    type: '2 Bedroom',
    propertyType: 'Apartment',
    beds: 2,
    baths: 2,
    title: 'Two-Bedroom Apartment - Type D',
    images: ['https://placehold.co/600x400.png'],
    floorPlanImage: 'https://placehold.co/800x1100.png',
    floorPlanImage3d: null,
    virtualTourUrl: null,
    aiHint: 'minimalist apartment design',
    area: 1600,
    view: 'Downtown View',
    status: 'Available Now',
    rent: 245000,
    furnished: false,
    exclusive: false,
    verified: true,
    amenities: ['Shared Pool', 'Shared Gym', 'Covered Parking', 'View of Landmark']
  },
];
