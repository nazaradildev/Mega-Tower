
'use client';

import React from 'react';
import Image from 'next/image';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Briefcase, Building, Sparkles, TrendingUp, HelpCircle, CheckCircle, Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/breadcrumb';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const galleryImages = [
  { src: "/unnamed (1).jpg", alt: "Business Bay Canal", hint: "dubai canal boats" },
  { src: "/unnamed (2).jpg", alt: "Business Bay Overview", hint: "dubai business bay" },
  { src: "/unnamed (3).jpg", alt: "Dubai Canal", hint: "dubai canal" },
  { src: "/unnamed (4).jpg", alt: "Business Bay Skyline", hint: "dubai skyline" },
  { src: "/unnamed (5).jpg", alt: "Modern Architecture", hint: "dubai architecture" },
  { src: "/unnamed (6).jpg", alt: "Cityscape at Night", hint: "cityscape night" },
  { src: "/unnamed (7).jpg", alt: "Business Bay Community", hint: "dubai architecture" },
  { src: "/unnamed (8).jpg", alt: "Bay Square", hint: "bay square" },
  { src: "/unnamed (9).jpg", alt: "JW Marriott Marquis", hint: "luxury hotel" },
];

const content = {
  en: {
    pageTitle: "Business Bay: Dubai's Vibrant Epicenter",
    breadcrumb: [
      { label: 'Apartments for rent in Dubai', href: '/#residences' },
      { label: 'Business Bay' },
    ],
    about: {
      title: "About Business Bay",
      badges: ["Luxury Lifestyle", "Business & Leisure Hub", "Ideal for Professionals & Families", "Strategic Location", "Integrated Infrastructure"],
      p1: "Business Bay is one of Dubai's most prestigious and dynamic neighborhoods, where modern living harmonizes with the world of business. Designed to be a 'city within a city,' it combines towering residential skyscrapers, global corporate headquarters, and luxurious leisure destinations.",
      p2: "With its strategic location next to Downtown Dubai, just minutes from the Burj Khalifa and The Dubai Mall, Business Bay is the ultimate address for those seeking an unparalleled lifestyle. Whether you want to live near your workplace or enjoy the best dining and entertainment Dubai has to offer, Business Bay meets all your aspirations.",
      p3: "The area spans over 4 million square meters and is characterized by its stunning views of the Dubai Water Canal, adding a touch of beauty and tranquility to its bustling skyline. It's not just a place to live, but a complete life experience that combines luxury, comfort, and practicality."
    },
    highlights: {
      title: "Exceptional Features",
      items: [
        "Unmatched central location in the heart of vibrant Dubai.",
        "Minutes away from Burj Khalifa, The Dubai Mall, and Dubai International Financial Centre (DIFC).",
        "Breathtaking water views of the Dubai Water Canal.",
        "Home to world-class entertainment venues like the 'La Perle by Dragone' water show.",
        "A wide range of luxury hotels such as the JW Marriott Marquis.",
        "A vibrant community with the finest restaurants, cafes, and leisure facilities.",
        "Advanced infrastructure and an integrated transportation network, including a metro station and water taxi.",
        "Proximity to major highways like Sheikh Zayed Road and Al Khail Road."
      ]
    },
    lifestyle: {
      title: "An Integrated Lifestyle",
      p1: "Life in Business Bay is the embodiment of diversity and dynamism. From strolling along the canal banks at sunrise to business meetings in trendy cafes, to enjoying a luxurious evening at one of the international restaurants, every day here brings a new experience.",
      h_entertainment: "Endless Entertainment",
      p_entertainment: "The Dubai Water Canal is the lifeline of the area. Its 3.2 km boardwalk offers paths for walking and cycling, surrounded by restaurants and green spaces. The stunning 'La Perle' water show at Al Habtoor City also offers an unforgettable artistic and visual experience.",
      h_dining: "A Destination for Gourmets and Nightlife",
      p_dining: "Business Bay is teeming with luxurious restaurants and venues that cater to all tastes, from international cuisines in luxury hotels to trendy cafes in Bay Square. When evening falls, the area lights up with a variety of upscale clubs and lounges, making it a major nightlife destination in Dubai."
    },
    priceInsights: {
      title: "Price Insights",
      rentTableTitle: "Average Annual Rents",
      rentTableDescription: "Average prices for residential apartments.",
      unitType: "Unit Type",
      avgPrice: "Average Price (AED/year)",
      rentData: [
        { type: 'Studio', price: '79,000' },
        { type: '1 Bedroom', price: '109,000' },
        { type: '2 Bedrooms', price: '150,000' },
        { type: '3 Bedrooms', price: '216,000' },
        { type: '4 Bedrooms', price: '360,000' },
      ],
      trendChartTitle: "Apartment Price Trends",
      trendDataType: 'Studio',
      trendData: {
        'Studio': [
          { name: 'Jul 24', value: 75000 }, { name: 'Sep 24', value: 76000 }, { name: 'Nov 24', value: 78000 },
          { name: 'Jan 25', value: 79000 }, { name: 'Mar 25', value: 81000 }, { name: 'May 25', value: 82000 },
        ],
        '1 Bedroom': [
          { name: 'Jul 24', value: 105000 }, { name: 'Sep 24', value: 106000 }, { name: 'Nov 24', value: 107500 },
          { name: 'Jan 25', value: 109000 }, { name: 'Mar 25', value: 110000 }, { name: 'May 25', value: 112000 },
        ],
        '2 Bedrooms': [
          { name: 'Jul 24', value: 145000 }, { name: 'Sep 24', value: 147000 }, { name: 'Nov 24', value: 148000 },
          { name: 'Jan 25', value: 150000 }, { name: 'Mar 25', value: 152000 }, { name: 'May 25', value: 154000 },
        ],
        '3 Bedrooms': [
          { name: 'Jul 24', value: 210000 }, { name: 'Sep 24', value: 212000 }, { name: 'Nov 24', value: 214000 },
          { name: 'Jan 25', value: 216000 }, { name: 'Mar 25', value: 218000 }, { name: 'May 25', value: 220000 },
        ],
      },
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Where is Business Bay located?", a: "Business Bay is located in the heart of Dubai, just south of Downtown Dubai. It is bordered by major roads like Sheikh Zayed Road and Al Khail Road, making it the city's most connected hub with easy access to all major destinations." },
        { q: "What are the main advantages of living in Business Bay?", a: "Business Bay offers a cosmopolitan lifestyle that blends luxury, work, and leisure. It is known for its proximity to famous landmarks, stunning views of the Dubai Water Canal and skyscrapers, and the availability of all modern facilities from fine dining restaurants and world-class hotels to shopping centers." },
        { q: "What are the available transportation options?", a: "The area is served by an integrated transportation network including the Business Bay Metro Station on the Red Line, multiple bus routes, and readily available taxis. The Dubai Water Canal also offers a water taxi service, adding a unique and enjoyable mode of transport." },
        { q: "Is it a suitable area for families?", a: "Yes, definitely. The area offers a wide range of facilities that cater to families' needs, including supermarkets, gyms, swimming pools, parks, and children's play areas, in addition to its proximity to the best international schools and nurseries in neighboring areas." },
        { q: "What are the main entertainment and shopping destinations?", a: "The area itself is an entertainment destination, where you can enjoy the La Perle by Dragone water show, or take a stroll along the Dubai Canal promenade. For a world-class shopping experience, The Dubai Mall, the world's largest shopping center, is just a 5-minute drive away." },
        { q: "What types of properties are available in Business Bay?", a: "The area mainly consists of luxury residential apartments ranging from studios to spacious 4-bedroom penthouses, offering options to suit all tastes and needs. Some podium villas are also available in some projects." }
      ]
    }
  },
  ar: {
    pageTitle: "الخليج التجاري: قلب دبي النابض بالحياة",
    breadcrumb: [
      { label: 'شقق للإيجار في دبي', href: '/#residences' },
      { label: 'الخليج التجاري' },
    ],
    about: {
      title: "نبذة عن الخليج التجاري",
      badges: ["نمط حياة فاخر", "مركز أعمال وترفيه", "مثالي للمهنيين والعائلات", "موقع استراتيجي", "بنية تحتية متكاملة"],
      p1: "يعد الخليج التجاري أحد أرقى وأكثر الأحياء حيوية في دبي، حيث تتناغم فيه الحياة العصرية مع عالم الأعمال. صُممت هذه المنطقة لتكون 'مدينة داخل مدينة'، فهي تجمع بين ناطحات السحاب السكنية الشاهقة، والمقرات التجارية العالمية، ووجهات الترفيه الفاخرة.",
      p2: "بفضل موقعه الاستراتيجي بجوار داون تاون دبي، وعلى بعد دقائق من برج خليفة ودبي مول، يمثل الخليج التجاري العنوان الأمثل للباحثين عن أسلوب حياة لا مثيل له. سواء كنت تتطلع للعيش بالقرب من مكان عملك، أو ترغب في الاستمتاع بأفضل ما تقدمه دبي من مطاعم ومرافق ترفيهية، فإن الخليج التجاري يلبي جميع تطلعاتك.",
      p3: "تمتد المنطقة على مساحة تزيد عن 4 ملايين متر مربع، وتتميز بإطلالاتها الساحرة على قناة دبي المائية، مما يضيف لمسة من الجمال والهدوء إلى أفقها المزدحم. إنها ليست مجرد مكان للعيش، بل هي تجربة حياة متكاملة تجمع بين الفخامة والراحة والعملية."
    },
    highlights: {
      title: "مميزات استثنائية",
      items: [
        "موقع مركزي لا مثيل له في قلب دبي الحيوي.",
        "على بعد دقائق من برج خليفة، دبي مول، ومركز دبي المالي العالمي.",
        "إطلالات مائية خلابة على قناة دبي المائية.",
        "يحتضن وجهات ترفيهية عالمية مثل عرض 'لابيرل باي دراغون'.",
        "مجموعة واسعة من الفنادق الفاخرة مثل فندق 'جي دبليو ماريوت ماركيز'.",
        "مجتمع نابض بالحياة يضم أرقى المطاعم والمقاهي ومرافق الترفيه.",
        "بنية تحتية متطورة وشبكة مواصلات متكاملة تشمل محطة مترو وتاكسي مائي.",
        "قربه من الطرق السريعة الرئيسية كشارع الشيخ زايد وشارع الخيل."
      ]
    },
    lifestyle: {
      title: "أسلوب حياة متكامل",
      p1: "الحياة في الخليج التجاري هي تجسيد للتنوع والديناميكية. من التنزه على ضفاف القناة المائية عند شروق الشمس، إلى اجتماعات العمل في المقاهي العصرية، وصولاً إلى الاستمتاع بأمسية فاخرة في أحد المطاعم العالمية، كل يوم هنا يحمل تجربة جديدة.",
      h_entertainment: "ترفيه لا ينتهي",
      p_entertainment: "تعد قناة دبي المائية شريان الحياة في المنطقة، حيث يوفر ممشاها البالغ طوله 3.2 كم مسارات للمشي وركوب الدراجات، محاطة بالمطاعم والمساحات الخضراء. كما أن عرض 'لابيرل' المائي المذهل في الحبتور سيتي يقدم تجربة فنية وبصرية لا تُنسى.",
      h_dining: "وجهة الذواقة والحياة الليلية",
      p_dining: "يعج الخليج التجاري بأفخم المطاعم والوجهات التي ترضي جميع الأذواق، من المطابخ العالمية في الفنادق الفاخرة إلى المقاهي العصرية في 'باي سكوير'. وعندما يحل المساء، تضيء المنطقة بمجموعة متنوعة من النوادي والصالات الراقية، مما يجعلها وجهة رئيسية للحياة الليلية في دبي."
    },
    priceInsights: {
      title: "مؤشرات الأسعار",
      rentTableTitle: "متوسط الإيجارات السنوية",
      rentTableDescription: "متوسط الأسعار للشقق السكنية.",
      unitType: "نوع الوحدة",
      avgPrice: "متوسط السعر (درهم إماراتي/سنوياً)",
      rentData: [
        { type: 'استوديو', price: '79,000' },
        { type: 'غرفة نوم واحدة', price: '109,000' },
        { type: 'غرفتا نوم', price: '150,000' },
        { type: '3 غرف نوم', price: '216,000' },
        { type: '4 غرف نوم', price: '360,000' },
      ],
      trendChartTitle: "اتجاهات أسعار الشقق",
      trendDataType: 'استوديو',
      trendData: {
        'استوديو': [
            { name: 'يوليو 24', value: 75000 }, { name: 'سبتمبر 24', value: 76000 }, { name: 'نوفمبر 24', value: 78000 },
            { name: 'يناير 25', value: 79000 }, { name: 'مارس 25', value: 81000 }, { name: 'مايو 25', value: 82000 },
        ],
        'غرفة نوم واحدة': [
            { name: 'يوليو 24', value: 105000 }, { name: 'سبتمبر 24', value: 106000 }, { name: 'نوفمبر 24', value: 107500 },
            { name: 'يناير 25', value: 109000 }, { name: 'مارس 25', value: 110000 }, { name: 'مايو 25', value: 112000 },
        ],
        'غرفتا نوم': [
            { name: 'يوليو 24', value: 145000 }, { name: 'سبتمبر 24', value: 147000 }, { name: 'نوفمبر 24', value: 148000 },
            { name: 'يناير 25', value: 150000 }, { name: 'مارس 25', value: 152000 }, { name: 'مايو 25', value: 154000 },
        ],
        '3 غرف نوم': [
            { name: 'يوليو 24', value: 210000 }, { name: 'سبتمبر 24', value: 212000 }, { name: 'نوفمبر 24', value: 214000 },
            { name: 'يناير 25', value: 216000 }, { name: 'مارس 25', value: 218000 }, { name: 'مايو 25', value: 220000 },
        ],
      },
    },
    faq: {
      title: "أسئلة شائعة",
      items: [
        { q: "أين يقع الخليج التجاري؟", a: "يقع الخليج التجاري في قلب دبي، جنوب داون تاون دبي مباشرةً. تحده الطرق الرئيسية مثل شارع الشيخ زايد وشارع الخيل، مما يجعله المحور الأكثر اتصالاً في المدينة، ويوفر وصولاً سهلاً إلى جميع الوجهات الرئيسية." },
        { q: "ما هي أبرز مميزات السكن في الخليج التجاري؟", a: "يوفر الخليج التجاري أسلوب حياة عالمي يجمع بين الفخامة والعمل والترفيه. يتميز بقربه من المعالم الشهيرة، وإطلالاته الخلابة على قناة دبي المائية وناطحات السحاب، وتوفر جميع المرافق العصرية من مطاعم فاخرة وفنادق عالمية ومراكز تسوق." },
        { q: "ما هي خيارات النقل والمواصلات المتاحة؟", a: "تخدم المنطقة شبكة مواصلات متكاملة تشمل محطة مترو الخليج التجاري على الخط الأحمر، وخطوط حافلات متعددة، وسيارات أجرة متوفرة بكثرة. كما توفر قناة دبي المائية خدمة التاكسي المائي، مما يضيف وسيلة نقل فريدة وممتعة." },
        { q: "هل تعتبر منطقة مناسبة للعائلات؟", a: "نعم، بالتأكيد. توفر المنطقة مجموعة واسعة من المرافق التي تلبي احتياجات العائلات، بما في ذلك محلات السوبر ماركت، والنوادي الرياضية، وحمامات السباحة، والحدائق، ومناطق لعب الأطفال، بالإضافة إلى قربها من أفضل المدارس والحضانات العالمية في المناطق المجاورة." },
        { q: "ما هي أبرز وجهات الترفيه والتسوق؟", a: "تعتبر المنطقة وجهة ترفيهية بحد ذاتها، حيث يمكنك الاستمتاع بعرض لابيرل باي دراغون المائي، أو التنزه على طول ممشى قناة دبي. ولتجربة تسوق عالمية، يقع دبي مول، أكبر مركز تسوق في العالم، على بعد 5 دقائق فقط بالسيارة." },
        { q: "ما أنواع العقارات المتوفرة في الخليج التجاري؟", a: "تتألف المنطقة بشكل أساسي من الشقق السكنية الفاخرة التي تتنوع من شقق الاستوديو إلى البنتهاوس الفسيحة المكونة من 4 غرف نوم، مما يوفر خيارات تناسب جميع الأذواق والاحتياجات. كما تتوفر بعض الفلل ضمن منصات الأبراج (البوديوم) في بعض المشاريع." }
      ]
    }
  }
};


export default function BusinessBayPage() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { language, direction } = useLanguage();
  const t = content[language];
  const [fullscreenImageIndex, setFullscreenImageIndex] = React.useState<number | null>(null);
  
  const rentDataTypes = t.priceInsights.rentData.map(d => d.type);
  const [selectedRentType, setSelectedRentType] = React.useState(rentDataTypes[0]);

  React.useEffect(() => {
    setSelectedRentType(t.priceInsights.rentData.map(d => d.type)[0]);
  }, [language, t.priceInsights.rentData]);
  
  React.useEffect(() => {
      if (!api || !thumbApi) {
          return;
      }

      const onSelect = () => {
          setSelectedIndex(api.selectedScrollSnap());
          thumbApi?.scrollTo(api.selectedScrollSnap());
      };

      api.on('select', onSelect);
      onSelect();

      return () => {
          api.off('select', onSelect);
      };
  }, [api, thumbApi]);

  const onThumbClick = (index: number) => {
      api?.scrollTo(index);
  };
  
  const chartData = t.priceInsights.trendData[selectedRentType as keyof typeof t.priceInsights.trendData] || [];
  
  const openFullscreen = (index: number) => {
    setFullscreenImageIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenImageIndex(null);
  };

  const nextImage = () => {
    if (fullscreenImageIndex !== null) {
      setFullscreenImageIndex((prev) => (prev! + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (fullscreenImageIndex !== null) {
      setFullscreenImageIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <div className="bg-background" dir={direction}>
      <Header />
      <main className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <Breadcrumb items={t.breadcrumb} className="mb-4" />
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline mb-2">
              {t.pageTitle}
            </h1>
          </div>

          <div className="space-y-2 mb-8">
              <Carousel setApi={setApi} className="w-full mx-auto max-w-7xl" opts={{ loop: true }}>
                  <CarouselContent className="m-0">
                      {galleryImages.map((image, index) => (
                          <CarouselItem key={index} className="p-0">
                               <div className="aspect-[16/9] relative rounded-lg overflow-hidden w-full mx-auto max-h-[80vh]">
                                  <Image
                                      src={image.src}
                                      data-ai-hint={image.hint}
                                      alt={image.alt}
                                      fill
                                      className="object-cover"
                                      priority={index === 0}
                                      sizes="100vw"
                                  />
                                   <Button
                                      variant="ghost"
                                      size="icon"
                                      className="absolute top-4 right-4 z-10 md:hidden bg-black/50 hover:bg-black/70 text-white rounded-full"
                                      aria-label="View fullscreen"
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

              <Carousel
                  setApi={setThumbApi}
                  opts={{
                      containScroll: 'keepSnaps',
                      dragFree: true,
                  }}
                  className="w-full mx-auto max-w-7xl"
              >
                  <CarouselContent className="m-0">
                      {galleryImages.map((image, index) => (
                          <CarouselItem
                              key={index}
                              onClick={() => onThumbClick(index)}
                              className="pl-2 basis-1/4 md:basis-1/6 cursor-pointer"
                          >
                              <div
                                  className={cn(
                                      'aspect-video p-1 rounded-md',
                                      index === selectedIndex
                                          ? 'bg-primary'
                                          : 'bg-transparent'
                                  )}
                              >
                                  <div className="relative h-full w-full overflow-hidden rounded-md">
                                      <Image
                                          src={image.src}
                                          alt={`Thumbnail ${image.alt}`}
                                          fill
                                          className="object-cover"
                                          loading="lazy"
                                          sizes="15vw"
                                      />
                                  </div>
                              </div>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
              </Carousel>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3 space-y-12">
              <section id="about">
                 <div className="flex items-center gap-3 mb-4">
                    <Building className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold font-headline">
                      {t.about.title}
                    </h2>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {t.about.badges.map(badge => <Badge key={badge} variant="secondary">{badge}</Badge>)}
                </div>
                <div className="space-y-4 text-muted-foreground prose prose-lg max-w-none">
                    <p>{t.about.p1}</p>
                    <p>{t.about.p2}</p>
                    <p>{t.about.p3}</p>
                </div>
              </section>

              <section id="highlights">
                <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold font-headline">
                      {t.highlights.title}
                    </h2>
                </div>
                <ul className="space-y-3 text-muted-foreground text-base">
                  {t.highlights.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="lifestyle">
                <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold font-headline">{t.lifestyle.title}</h2>
                </div>
                <div className="space-y-4 text-muted-foreground prose prose-lg max-w-none">
                    <p>{t.lifestyle.p1}</p>
                    <h3 className="text-xl font-bold font-headline !text-foreground !mt-6 !mb-2">{t.lifestyle.h_entertainment}</h3>
                    <p>{t.lifestyle.p_entertainment}</p>
                    <h3 className="text-xl font-bold font-headline !text-foreground !mt-6 !mb-2">{t.lifestyle.h_dining}</h3>
                    <p>{t.lifestyle.p_dining}</p>
                </div>
              </section>

              <section id="price-insights">
                <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold font-headline">
                      {t.priceInsights.title}
                    </h2>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>{t.priceInsights.rentTableTitle}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {t.priceInsights.rentTableDescription}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t.priceInsights.unitType}</TableHead>
                          <TableHead className="text-right">
                            {t.priceInsights.avgPrice}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {t.priceInsights.rentData.map((item) => (
                          <TableRow key={item.type}>
                            <TableCell className="font-medium">
                              {item.type}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.price}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>{t.priceInsights.trendChartTitle}</CardTitle>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {rentDataTypes.slice(0, 4).map((type) => (
                            <Button
                                key={type}
                                variant={selectedRentType === type ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedRentType(type)}
                                className="rounded-full"
                            >
                                {type}
                            </Button>
                        ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} key={selectedRentType}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis
                            tickFormatter={(value) => `${value / 1000}k`}
                          />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="p-2 bg-background border rounded-lg shadow-sm">
                                    <p className="font-bold">{label}</p>
                                    <p className="text-primary">
                                      {language === 'en' ? `AED ${payload[0].value?.toLocaleString()}/year` : `درهم ${payload[0].value?.toLocaleString()}/سنة`}
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id="faq">
                <div className="flex items-center gap-3 mb-4">
                    <HelpCircle className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold font-headline">
                      {t.faq.title}
                    </h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {t.faq.items.map((item, index) => (
                      <AccordionItem value={`item-${index+1}`} key={index}>
                          <AccordionTrigger className="text-left text-lg">{index+1}. {item.q}</AccordionTrigger>
                          <AccordionContent className="text-base text-muted-foreground">
                              {item.a}
                          </AccordionContent>
                      </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={fullscreenImageIndex !== null} onOpenChange={(open) => !open && closeFullscreen()}>
        <DialogContent className="p-0 w-screen h-screen max-w-none bg-black/80 border-0 flex items-center justify-center outline-none ring-0">
          <DialogClose asChild>
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-50 text-white hover:text-white bg-black/50 hover:bg-black/70 rounded-full h-10 w-10">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
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
                src={galleryImages[fullscreenImageIndex].src}
                alt={galleryImages[fullscreenImageIndex].alt}
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
}
    