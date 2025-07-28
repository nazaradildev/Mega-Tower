
'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import {
  Star,
  Building,
  CalendarDays,
  Layers,
  Percent,
  RefreshCcw,
  CheckCircle,
  ParkingCircle,
  Wind,
  ShieldCheck,
  User,
  Utensils,
  ShoppingCart,
  School,
  Stethoscope,
  Landmark,
  Quote,
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/language-context';

const InteractiveMap = dynamic(() => import('@/components/interactive-map').then(mod => mod.InteractiveMap), {
    ssr: false,
    loading: () => (
        <div className="h-[500px] w-full bg-muted rounded-lg flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
});

const content = {
  en: {
    title: 'MEGA Residency Tower',
    reviews: '(Based on 163 Reviews)',
    galleryImages: [
      { src: "/mega tower1.png", alt: "Building Exterior", hint: "dubai cityscape" },
      { src: "/swim1.jpg", alt: "Infinity Pool", hint: "luxury infinity pool" },
      { src: "/gym1.jpg", alt: "Gym", hint: "modern gym interior" },
      { src: "/sauna1.jpg", alt: "Sauna", hint: "luxury spa sauna" },
      { src: "/garden1.jpg", alt: "Garden", hint: "modern building garden" },
      { src: "/swim2.jpg", alt: "Apartment View", hint: "city view apartment" },
      { src: "/gym2.jpg", alt: "Play Area", hint: "kids play area" },
      { src: "/garden2.jpg", alt: "Lush Gardens", hint: "lush gardens" },
    ],
    facilities: [
        { icon: ParkingCircle, text: 'Dedicated Parking Space' },
        { icon: Wind, text: 'Central Air Conditioning' },
        { icon: ShieldCheck, text: 'CCTV & 24-Hour Security' },
        { icon: User, text: '24-Hour Concierge & Valet' },
    ],
    pointsOfInterest: [
        {
            category: 'Fine Dining',
            icon: Utensils,
            items: [
                { name: 'The Azure Table', distance: '60 m' },
                { name: 'Terra Bistro', distance: '75 m' },
                { name: 'Orchid Fusion', distance: '90 m' },
                { name: 'Celeste Cafe & Lounge', distance: '280 m' },
                { name: 'Le Jardin Secret', distance: '400 m' },
            ],
        },
        {
            category: 'Gourmet Groceries',
            icon: ShoppingCart,
            items: [
                { name: 'The Urban Pantry', distance: '110 m' },
                { name: 'Al Fresco Market', distance: '450 m' },
                { name: 'The Daily Harvest', distance: '510 m' },
                { name: 'Eataly Express', distance: '580 m' },
                { name: 'Artisan Corner', distance: '720 m' },
            ],
        },
        {
            category: 'Elite Schools',
            icon: School,
            items: [
                { name: 'Global Horizons International School', distance: '1.1 km' },
                { name: 'GEMS Legacy School', distance: '1.3 km' },
                { name: 'Dubai International Academy', distance: '1.5 km' },
                { name: 'Lycée Français Jean Mermoz', distance: '1.6 km' },
                { name: 'Kings\' School Dubai', distance: '2.0 km' },
            ],
        },
        {
            category: 'Wellness & Clinics',
            icon: Stethoscope,
            items: [
                { name: 'The Wellness Sanctuary Spa', distance: '400 m' },
                { name: 'Elysian Clinic by Dr. Rashed', distance: '550 m' },
                { name: 'The Valens Clinic', distance: '750 m' },
                { name: 'Perfect Smile Dental Studio', distance: '830 m' },
                { name: 'Pro Derma Aesthetics', distance: '900 m' },
            ],
        },
        {
            category: 'Cultural & Religious',
            icon: Landmark,
            items: [
                { name: 'Al-Noor Mosque', distance: '1.4 km' },
                { name: 'Masjid Al Ghafoor', distance: '1.7 km' },
                { name: 'The Grand Mosque', distance: '2.1 km' },
                { name: 'St. Mary\'s Catholic Church', distance: '8.5 km' },
                { name: 'Shiva Temple', distance: '9.0 km' },
            ],
        },
    ],
    testimonials: [
        {
            name: "Aisha Al-Futtaim",
            role: "Resident, 3 Years",
            avatar: "https://placehold.co/100x100.png",
            hint: "woman portrait",
            text: "Living at MEGA Residency is an unparalleled experience. The views are breathtaking, the amenities are world-class, and the service is impeccable. It’s more than a home; it’s a lifestyle."
        },
        {
            name: "David Chen",
            role: "Penthouse Owner",
            avatar: "https://placehold.co/100x100.png",
            hint: "man portrait",
            text: "As an international professional, convenience and luxury are paramount. MEGA Residency Tower delivers on both fronts. Its strategic location and premium facilities make it the perfect base in Dubai."
        },
        {
            name: "The Khan Family",
            role: "Residents, 5 Years",
            avatar: "https://placehold.co/100x100.png",
            hint: "family portrait",
            text: "We’ve raised our children here, and it’s been a dream. The secure environment, dedicated play areas, and sense of community are things we cherish. We couldn’t imagine living anywhere else."
        }
    ],
    breadcrumb: [
        { label: 'Apartments for rent in Dubai', href: '/#residences' },
        { label: 'Business Bay', href: '/community/business-bay' },
        { label: 'MEGA Residency Tower' },
    ],
    aboutTitle: "An Address of Distinction",
    aboutText: "Discover a new standard of elevated living at MEGA Residency Tower, an architectural masterpiece nestled in the vibrant heart of Business Bay. Soaring 42 stories high, this iconic residence offers an exclusive collection of 1, 2, 3, and 4-bedroom apartments and penthouses, each meticulously crafted to perfection. Wake up to breathtaking, panoramic views of the Dubai Canal and the majestic Burj Khalifa. Every residence is a sanctuary of style, featuring high-end finishes, expansive living spaces, and floor-to-ceiling windows that bathe your home in natural light. Here, luxury is not just an option—it's the standard.",
    showLess: "Show Less",
    showMore: "Show More",
    facilitiesTitle: "World-Class Facilities",
    lifestyleAmenities: "Lifestyle Amenities",
    lifestyleAmenitiesList: ['Infinity Pool', 'State-of-the-Art Fitness Center', 'Luxury Spa, Sauna & Jacuzzi', 'Championship Tennis & Basketball Courts', 'Landscaped Gardens & BBQ Area', 'Secure Children’s Playground', 'Exclusive Residents Lounge'],
    convenienceSecurity: "Convenience & Security",
    residencesTitle: "Exquisite Residences",
    residencesText: "MEGA Residency Tower presents a curated collection of residences, from elegant one-bedroom apartments to magnificent four-bedroom penthouses. Each home is a masterpiece of design, boasting en-suite bathrooms for every bedroom, bespoke built-in wardrobes, and private balconies to soak in the stunning cityscapes. Select larger apartments and all penthouses feature additional luxuries such as a dedicated maid's room, a stylish powder room, and a separate laundry space, ensuring a life of ultimate comfort and convenience.",
    connectivityTitle: "Seamless Connectivity",
    connectivityText: "Your gateway to the city, MEGA Residency Tower offers effortless travel throughout Dubai. With immediate access to major arteries like Sheikh Zayed Road and Al Khail Road, you are always just moments away from your destination. The Business Bay Metro Station and an extensive network of bus routes are within a short stroll, providing sophisticated and convenient transport options.",
    testimonialsTitle: "What Our Residents Say",
    doorstepTitle: "At Your Doorstep",
    locationTitle: "Location",
    keyInfoTitle: "Key Information",
    buildingAge: "Building Age",
    ageValue: "10 Years",
    floors: "Floors",
    floorValue: "42",
    occupancyRate: "Occupancy Rate",
    occupancyValue: "97.5%",
    residentRetention: "Resident Retention",
    retentionValue: "Avg. 86%",
    fullscreen: "View fullscreen",
    close: "Close"
  },
  ar: {
    title: 'برج ميغا السكني',
    reviews: '(بناءً على 163 تقييمًا)',
    galleryImages: [
      { src: "/mega tower1.png", alt: "المنظر الخارجي للمبنى", hint: "dubai cityscape" },
      { src: "/swim1.jpg", alt: "مسبح إنفينيتي", hint: "luxury infinity pool" },
      { src: "/gym1.jpg", alt: "صالة رياضية", hint: "modern gym interior" },
      { src: "/sauna1.jpg", alt: "ساونا", hint: "luxury spa sauna" },
      { src: "/garden1.jpg", alt: "حديقة", hint: "modern building garden" },
      { src: "/swim2.jpg", alt: "إطلالة من الشقة", hint: "city view apartment" },
      { src: "/gym2.jpg", alt: "منطقة لعب", hint: "kids play area" },
      { src: "/garden2.jpg", alt: "حدائق غناء", hint: "lush gardens" },
    ],
    facilities: [
        { icon: ParkingCircle, text: 'موقف سيارات مخصص' },
        { icon: Wind, text: 'تكييف مركزي' },
        { icon: ShieldCheck, text: 'كاميرات مراقبة وأمن على مدار 24 ساعة' },
        { icon: User, text: 'خدمة كونسيرج وصف السيارات على مدار 24 ساعة' },
    ],
    pointsOfInterest: [
        {
            category: 'مطاعم فاخرة',
            icon: Utensils,
            items: [
                { name: 'ذا أزور تيبل', distance: '60 م' },
                { name: 'تيرا بيسترو', distance: '75 م' },
                { name: 'أوركيد فيوجن', distance: '90 م' },
                { name: 'سيليست كافيه ولاونج', distance: '280 م' },
                { name: 'لو جاردان سيكريت', distance: '400 م' },
            ],
        },
        {
            category: 'بقالة جورميه',
            icon: ShoppingCart,
            items: [
                { name: 'ذا أوربان بانتري', distance: '110 م' },
                { name: 'ال فريسكو ماركت', distance: '450 م' },
                { name: 'ذا ديلي هارفست', distance: '510 م' },
                { name: 'إيتالي إكسبريس', distance: '580 م' },
                { name: 'أرتيزان كورنر', distance: '720 م' },
            ],
        },
        {
            category: 'مدارس النخبة',
            icon: School,
            items: [
                { name: 'مدرسة جلوبال هورايزونز الدولية', distance: '1.1 كم' },
                { name: 'مدرسة جيمس ليجاسي', distance: '1.3 كم' },
                { name: 'أكاديمية دبي الدولية', distance: '1.5 كم' },
                { name: 'ليسيه فرانسيه جان ميرموز', distance: '1.6 كم' },
                { name: 'مدرسة كينجز دبي', distance: '2.0 كم' },
            ],
        },
        {
            category: 'العافية والعيادات',
            icon: Stethoscope,
            items: [
                { name: 'ذا ويلنس سانكشواري سبا', distance: '400 م' },
                { name: 'عيادة إليزيان للدكتور راشد', distance: '550 م' },
                { name: 'عيادة فالنس', distance: '750 م' },
                { name: 'استوديو بيرفكت سمايل للأسنان', distance: '830 م' },
                { name: 'برو ديرما للتجميل', distance: '900 م' },
            ],
        },
        {
            category: 'ثقافية ودينية',
            icon: Landmark,
            items: [
                { name: 'مسجد النور', distance: '1.4 كم' },
                { name: 'مسجد الغفور', distance: '1.7 كم' },
                { name: 'المسجد الكبير', distance: '2.1 كم' },
                { name: 'كنيسة سانت ماري الكاثوليكية', distance: '8.5 كم' },
                { name: 'معبد شيفا', distance: '9.0 كم' },
            ],
        },
    ],
    testimonials: [
        {
            name: "عائشة الفطيم",
            role: "مقيمة، 3 سنوات",
            avatar: "https://placehold.co/100x100.png",
            hint: "woman portrait",
            text: "العيش في برج ميغا السكني تجربة لا مثيل لها. الإطلالات تخطف الأنفاس، والمرافق عالمية المستوى، والخدمة لا تشوبها شائبة. إنه أكثر من مجرد منزل؛ إنه أسلوب حياة."
        },
        {
            name: "ديفيد تشين",
            role: "مالك بنتهاوس",
            avatar: "https://placehold.co/100x100.png",
            hint: "man portrait",
            text: "بصفتي مهنيًا دوليًا، فإن الراحة والرفاهية أمران أساسيان. برج ميغا السكني يقدم كليهما. موقعه الاستراتيجي ومرافقه المتميزة تجعله القاعدة المثالية في دبي."
        },
        {
            name: "عائلة خان",
            role: "مقيمون، 5 سنوات",
            avatar: "https://placehold.co/100x100.png",
            hint: "family portrait",
            text: "لقد قمنا بتربية أطفالنا هنا، وكان الأمر حلمًا. البيئة الآمنة، ومناطق اللعب المخصصة، والشعور بالانتماء للمجتمع هي أشياء نعتز بها. لا يمكننا تخيل العيش في أي مكان آخر."
        }
    ],
    breadcrumb: [
        { label: 'شقق للإيجار في دبي', href: '/#residences' },
        { label: 'الخليج التجاري', href: '/community/business-bay' },
        { label: 'برج ميغا السكني' },
    ],
    aboutTitle: "عنوان التميز",
    aboutText: "اكتشف معيارًا جديدًا للحياة الراقية في برج ميغا السكني، التحفة المعمارية التي تقع في قلب الخليج التجاري النابض بالحياة. بارتفاعه الشاهق البالغ 42 طابقًا، يقدم هذا الصرح السكني الأيقوني مجموعة حصرية من الشقق والبنتهاوس المكونة من غرفة نوم واحدة، غرفتين، ثلاث، وأربع غرف نوم، كل منها مصمم بدقة وإتقان. استيقظ على إطلالات بانورامية خلابة على قناة دبي المائية وبرج خليفة المهيب. كل وحدة سكنية هي ملاذ من الأناقة، تتميز بتشطيبات راقية، ومساحات معيشة واسعة، ونوافذ ممتدة من الأرض إلى السقف تغمر منزلك بالضوء الطبيعي. هنا، الفخامة ليست مجرد خيار - إنها المعيار.",
    showLess: "عرض أقل",
    showMore: "عرض المزيد",
    facilitiesTitle: "مرافق عالمية المستوى",
    lifestyleAmenities: "وسائل راحة عصرية",
    lifestyleAmenitiesList: ['مسبح إنفينيتي', 'مركز لياقة بدنية على أحدث طراز', 'سبا فاخر، ساونا وجاكوزي', 'ملاعب تنس وكرة سلة بمعايير بطولات', 'حدائق ذات مناظر طبيعية ومنطقة شواء', 'ملعب آمن للأطفال', 'صالة حصرية للسكان'],
    convenienceSecurity: "الراحة والأمان",
    residencesTitle: "وحدات سكنية رائعة",
    residencesText: "يقدم برج ميغا السكني مجموعة منسقة من الوحدات السكنية، من الشقق الأنيقة بغرفة نوم واحدة إلى البنتهاوس الرائعة بأربع غرف نوم. كل منزل هو تحفة فنية في التصميم، يضم حمامات داخلية لكل غرفة نوم، وخزائن ملابس مدمجة مصممة خصيصًا، وشرفات خاصة للاستمتاع بالمناظر الخلابة للمدينة. تتميز الشقق الكبيرة وجميع وحدات البنتهاوس بكماليات إضافية مثل غرفة خادمة مخصصة، وغرفة تجميل أنيقة، ومساحة منفصلة لغسيل الملابس، مما يضمن حياة من الراحة والرفاهية المطلقة.",
    connectivityTitle: "اتصال سلس",
    connectivityText: "بوابتك إلى المدينة، يوفر برج ميغا السكني تنقلاً سهلاً في جميع أنحاء دبي. مع وصول فوري إلى الشرايين الرئيسية مثل شارع الشيخ زايد وشارع الخيل، فأنت دائمًا على بعد لحظات من وجهتك. تقع محطة مترو الخليج التجاري وشبكة واسعة من خطوط الحافلات على بعد مسافة قصيرة سيرًا على الأقدام، مما يوفر خيارات نقل متطورة ومريحة.",
    testimonialsTitle: "ماذا يقول سكاننا",
    doorstepTitle: "على عتبة داركم",
    locationTitle: "الموقع",
    keyInfoTitle: "معلومات أساسية",
    buildingAge: "عمر المبنى",
    ageValue: "10 سنوات",
    floors: "الطوابق",
    floorValue: "42",
    occupancyRate: "معدل الإشغال",
    occupancyValue: "97.5%",
    residentRetention: "معدل الاحتفاظ بالسكان",
    retentionValue: "متوسط 86%",
    fullscreen: "عرض ملء الشاشة",
    close: "إغلاق"
  }
};


export default function BuildingDetailsPage() {
    const { language, direction } = useLanguage();
    const t = content[language];

    const [api, setApi] = React.useState<CarouselApi>();
    const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [fullscreenImageIndex, setFullscreenImageIndex] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (!api || !thumbApi) return;
        const onSelect = () => {
            setSelectedIndex(api.selectedScrollSnap());
            thumbApi?.scrollTo(api.selectedScrollSnap());
        };
        api.on('select', onSelect);
        onSelect();
        return () => api.off('select', onSelect);
    }, [api, thumbApi]);

    const onThumbClick = (index: number) => {
        api?.scrollTo(index);
    };
    
    const openFullscreen = (index: number) => {
      setFullscreenImageIndex(index);
    };

    const closeFullscreen = () => {
      setFullscreenImageIndex(null);
    };

    const nextImage = () => {
      if (fullscreenImageIndex !== null) {
        setFullscreenImageIndex((prev) => (prev! + 1) % t.galleryImages.length);
      }
    };

    const prevImage = () => {
      if (fullscreenImageIndex !== null) {
        setFullscreenImageIndex((prev) => (prev! - 1 + t.galleryImages.length) % t.galleryImages.length);
      }
    };


    return (
        <div className="bg-background" dir={direction}>
            <Header />
            <main className="py-8 sm:py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumb items={t.breadcrumb} className="mb-4" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold font-headline mb-1">{t.title}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="h-5 w-5" />)}
                                </div>
                                <span className="font-semibold">5.0/5</span>
                                <span>{t.reviews}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 mb-8">
                        <Carousel setApi={setApi} className="w-full mx-auto max-w-7xl" opts={{ loop: true }}>
                            <CarouselContent className="m-0">
                                {t.galleryImages.map((image, index) => (
                                    <CarouselItem key={index} className="p-0">
                                        <div className="aspect-[16/9] relative rounded-lg overflow-hidden w-full mx-auto max-h-[80vh]">
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                data-ai-hint={image.hint}
                                                fill
                                                className="object-cover"
                                                priority={index === 0}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                            />
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="absolute top-4 right-4 z-10 md:hidden bg-black/50 hover:bg-black/70 text-white rounded-full"
                                              aria-label={t.fullscreen}
                                              onClick={() => openFullscreen(index)}
                                            >
                                              <Expand className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
                        </Carousel>

                        <Carousel setApi={setThumbApi} opts={{ containScroll: 'keepSnaps', dragFree: true }} className="w-full mx-auto max-w-7xl">
                            <CarouselContent className="m-0">
                                {t.galleryImages.map((image, index) => (
                                    <CarouselItem key={index} onClick={() => onThumbClick(index)} className="pl-2 basis-1/4 md:basis-1/6 cursor-pointer">
                                        <div className={cn('aspect-video p-1 rounded-md', index === selectedIndex ? 'bg-primary' : 'bg-transparent')}>
                                            <div className="relative h-full w-full overflow-hidden rounded-md">
                                                <Image src={image.src} alt={`Thumbnail ${image.alt}`} fill className="object-cover" loading="lazy" sizes="15vw" />
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">{t.aboutTitle}</h2>
                                <div className={cn("space-y-4 text-muted-foreground prose prose-lg max-w-none", !isExpanded && "max-h-48 overflow-hidden relative")}>
                                    <p>{t.aboutText}</p>
                                    {!isExpanded && <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent" />}
                                </div>
                                 <Button variant="link" onClick={() => setIsExpanded(!isExpanded)} className="text-primary px-0 mt-2">
                                    {isExpanded ? t.showLess : t.showMore}
                                 </Button>
                            </section>

                             <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">{t.facilitiesTitle}</h2>
                                <Card>
                                  <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h3 className="font-semibold mb-3">{t.lifestyleAmenities}</h3>
                                      <ul className="space-y-2 text-muted-foreground">
                                        {t.lifestyleAmenitiesList.map(item => (
                                          <li key={item} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                     <div>
                                      <h3 className="font-semibold mb-3">{t.convenienceSecurity}</h3>
                                      <ul className="space-y-2 text-muted-foreground">
                                        {t.facilities.map(item => (
                                          <li key={item.text} className="flex items-start gap-3">
                                            <item.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span>{item.text}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </CardContent>
                                </Card>
                            </section>

                             <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">{t.residencesTitle}</h2>
                                <div className="space-y-4 text-muted-foreground prose prose-lg max-w-none">
                                    <p>{t.residencesText}</p>
                                </div>
                            </section>
                            
                             <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">{t.connectivityTitle}</h2>
                                <div className="space-y-4 text-muted-foreground prose prose-lg max-w-none">
                                    <p>{t.connectivityText}</p>
                                </div>
                            </section>

                             <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">{t.testimonialsTitle}</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {t.testimonials.map((testimonial, index) => (
                                        <Card key={index} className="bg-secondary/50 border-0">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <Quote className="h-8 w-8 text-primary/50 flex-shrink-0 transform -scale-x-100" />
                                                    <div className="flex-1">
                                                        <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar>
                                                                <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.hint} />
                                                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="font-semibold text-foreground">{testimonial.name}</p>
                                                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                            
                            <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">{t.doorstepTitle}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {t.pointsOfInterest.map(category => (
                                      <Card key={category.category} className="h-full">
                                          <CardHeader className="flex flex-row items-center gap-3">
                                              <category.icon className="h-6 w-6 text-primary" />
                                              <CardTitle className="text-xl">{category.category}</CardTitle>
                                          </CardHeader>
                                          <CardContent>
                                              <ul className="space-y-2">
                                                  {category.items.map(item => (
                                                      <li key={item.name} className="flex justify-between items-baseline text-sm">
                                                          <span className="text-muted-foreground">{item.name}</span>
                                                          <span className="font-medium text-foreground">{item.distance}</span>
                                                      </li>
                                                  ))}
                                              </ul>
                                          </CardContent>
                                      </Card>
                                  ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-headline mb-4">{t.locationTitle}</h2>
                                <Card>
                                    <CardContent className="h-[500px] w-full p-0">
                                        <InteractiveMap showExpandButton={true} />
                                    </CardContent>
                                </Card>
                            </section>

                        </div>

                        <aside className="lg:col-span-1 lg:sticky lg:top-24 self-start space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl">{t.keyInfoTitle}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground"><CalendarDays className="h-4 w-4"/> {t.buildingAge}</div>
                                        <div className="font-semibold">{t.ageValue}</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground"><Layers className="h-4 w-4"/> {t.floors}</div>
                                        <div className="font-semibold">{t.floorValue}</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground"><Percent className="h-4 w-4"/> {t.occupancyRate}</div>
                                        <div className="font-semibold">{t.occupancyValue}</div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground"><RefreshCcw className="h-4 w-4"/> {t.residentRetention}</div>
                                        <div className="font-semibold">{t.retentionValue}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </aside>
                    </div>
                </div>
            </main>
            
            <Dialog open={fullscreenImageIndex !== null} onOpenChange={(open) => !open && closeFullscreen()}>
              <DialogContent className="p-0 w-screen h-screen max-w-none bg-black/80 border-0 flex items-center justify-center outline-none ring-0">
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-50 text-white hover:text-white bg-black/50 hover:bg-black/70 rounded-full h-10 w-10">
                        <X className="h-6 w-6" />
                        <span className="sr-only">{t.close}</span>
                    </Button>
                </DialogClose>
                
                <Button variant="ghost" size="icon" onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-white bg-black/50 hover:bg-black/70 rounded-full h-10 w-10">
                    <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button variant="ghost" size="icon" onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-white bg-black/50 hover:bg-black/70 rounded-full h-10 w-10">
                    <ChevronRight className="h-6 w-6" />
                </Button>

                {fullscreenImageIndex !== null && (
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <Image
                      src={t.galleryImages[fullscreenImageIndex].src}
                      alt={t.galleryImages[fullscreenImageIndex].alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
}
