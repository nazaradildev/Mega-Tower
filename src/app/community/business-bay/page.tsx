
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
import { Briefcase, Building, Sparkles, TrendingUp, HelpCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/breadcrumb';

const galleryImages = [
  { src: "https://placehold.co/800x600.png", alt: "Business Bay Overview", hint: "dubai business bay" },
  { src: "https://placehold.co/800x600.png", alt: "Dubai Canal", hint: "dubai canal" },
  { src: "https://placehold.co/800x600.png", alt: "Business Bay Skyline", hint: "dubai skyline" },
  { src: "https://placehold.co/800x600.png", alt: "Modern Architecture", hint: "dubai architecture" },
  { src: "https://placehold.co/800x600.png", alt: "Cityscape at Night", hint: "cityscape night" },
  { src: "https://placehold.co/800x600.png", alt: "Waterfront Promenade", hint: "waterfront promenade" },
  { src: "https://placehold.co/800x600.png", alt: "Bay Square", hint: "bay square" },
  { src: "https://placehold.co/800x600.png", alt: "JW Marriott Marquis", hint: "luxury hotel" },
];

const rentData = [
  { type: 'Studio', price: '79,000' },
  { type: '1 Bedroom', price: '109,000' },
  { type: '2 Bedrooms', price: '150,000' },
  { type: '3 Bedrooms', price: '216,000' },
  { type: '4 Bedrooms', price: '360,000' },
];

const trendData = [
  { name: 'Jul 24', value: 75000 },
  { name: 'Sep 24', value: 76000 },
  { name: 'Nov 24', value: 78000 },
  { name: 'Jan 25', value: 79000 },
  { name: 'Mar 25', value: 81000 },
  { name: 'May 25', value: 82000 },
];

const faqItems = [
    { q: "أين يقع الخليج التجاري؟", a: "يقع الخليج التجاري في قلب دبي، جنوب داون تاون دبي مباشرةً. تحده الطرق الرئيسية مثل شارع الشيخ زايد وشارع الخيل، مما يجعله المحور الأكثر اتصالاً في المدينة، ويوفر وصولاً سهلاً إلى جميع الوجهات الرئيسية." },
    { q: "ما هي أبرز مميزات السكن في الخليج التجاري؟", a: "يوفر الخليج التجاري أسلوب حياة عالمي يجمع بين الفخامة والعمل والترفيه. يتميز بقربه من المعالم الشهيرة، وإطلالاته الخلابة على قناة دبي المائية وناطحات السحاب، وتوفر جميع المرافق العصرية من مطاعم فاخرة وفنادق عالمية ومراكز تسوق." },
    { q: "ما هي خيارات النقل والمواصلات المتاحة؟", a: "تخدم المنطقة شبكة مواصلات متكاملة تشمل محطة مترو الخليج التجاري على الخط الأحمر، وخطوط حافلات متعددة، وسيارات أجرة متوفرة بكثرة. كما توفر قناة دبي المائية خدمة التاكسي المائي، مما يضيف وسيلة نقل فريدة وممتعة." },
    { q: "هل تعتبر منطقة مناسبة للعائلات؟", a: "نعم، بالتأكيد. توفر المنطقة مجموعة واسعة من المرافق التي تلبي احتياجات العائلات، بما في ذلك محلات السوبر ماركت، والنوادي الرياضية، وحمامات السباحة، والحدائق، ومناطق لعب الأطفال، بالإضافة إلى قربها من أفضل المدارس والحضانات العالمية في المناطق المجاورة." },
    { q: "ما هي أبرز وجهات الترفيه والتسوق؟", a: "تعتبر المنطقة وجهة ترفيهية بحد ذاتها، حيث يمكنك الاستمتاع بعرض لابيرل باي دراغون المائي، أو التنزه على طول ممشى قناة دبي. ولتجربة تسوق عالمية، يقع دبي مول، أكبر مركز تسوق في العالم، على بعد 5 دقائق فقط بالسيارة." },
    { q: "ما أنواع العقارات المتوفرة في الخليج التجاري؟", a: "تتألف المنطقة بشكل أساسي من الشقق السكنية الفاخرة التي تتنوع من شقق الاستوديو إلى البنتهاوس الفسيحة المكونة من 4 غرف نوم، مما يوفر خيارات تناسب جميع الأذواق والاحتياجات. كما تتوفر بعض الفلل ضمن منصات الأبراج (البوديوم) في بعض المشاريع." },
];

const breadcrumbItems = [
    { label: 'شقق للإيجار في دبي', href: '/#residences' },
    { label: 'الخليج التجاري' },
];

export default function BusinessBayPage() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  
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

  return (
    <div className="bg-background">
      <Header />
      <main className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="mb-4" />
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline mb-2">
              الخليج التجاري: قلب دبي النابض بالحياة
            </h1>
          </div>

          <div className="space-y-2 mb-8">
              <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
                  <CarouselContent className="m-0">
                      {galleryImages.map((image, index) => (
                          <CarouselItem key={index} className="p-0">
                              <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                                  <Image
                                      src={image.src}
                                      data-ai-hint={image.hint}
                                      alt={image.alt}
                                      fill
                                      className="object-cover"
                                      priority={index === 0}
                                  />
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
                  className="w-full"
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
                      نبذة عن الخليج التجاري
                    </h2>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">نمط حياة فاخر</Badge>
                  <Badge variant="secondary">
                    مركز أعمال وترفيه
                  </Badge>
                  <Badge variant="secondary">مثالي للمهنيين والعائلات</Badge>
                  <Badge variant="secondary">موقع استراتيجي</Badge>
                  <Badge variant="secondary">بنية تحتية متكاملة</Badge>
                </div>
                <div className="space-y-4 text-muted-foreground prose prose-lg max-w-none">
                    <p>يعد الخليج التجاري أحد أرقى وأكثر الأحياء حيوية في دبي، حيث تتناغم فيه الحياة العصرية مع عالم الأعمال. صُممت هذه المنطقة لتكون "مدينة داخل مدينة"، فهي تجمع بين ناطحات السحاب السكنية الشاهقة، والمقرات التجارية العالمية، ووجهات الترفيه الفاخرة.</p>
                    <p>بفضل موقعه الاستراتيجي بجوار داون تاون دبي، وعلى بعد دقائق من برج خليفة ودبي مول، يمثل الخليج التجاري العنوان الأمثل للباحثين عن أسلوب حياة لا مثيل له. سواء كنت تتطلع للعيش بالقرب من مكان عملك، أو ترغب في الاستمتاع بأفضل ما تقدمه دبي من مطاعم ومرافق ترفيهية، فإن الخليج التجاري يلبي جميع تطلعاتك.</p>
                    <p>تمتد المنطقة على مساحة تزيد عن 4 ملايين متر مربع، وتتميز بإطلالاتها الساحرة على قناة دبي المائية، مما يضيف لمسة من الجمال والهدوء إلى أفقها المزدحم. إنها ليست مجرد مكان للعيش، بل هي تجربة حياة متكاملة تجمع بين الفخامة والراحة والعملية.</p>
                </div>
              </section>

              <section id="highlights">
                <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold font-headline">
                      مميزات استثنائية
                    </h2>
                </div>
                <ul className="space-y-3 text-muted-foreground text-base">
                  {[
                    'موقع مركزي لا مثيل له في قلب دبي الحيوي.',
                    'على بعد دقائق من برج خليفة، دبي مول، ومركز دبي المالي العالمي.',
                    'إطلالات مائية خلابة على قناة دبي المائية.',
                    'يحتضن وجهات ترفيهية عالمية مثل عرض " لابيرل باي دراغون".',
                    'مجموعة واسعة من الفنادق الفاخرة مثل فندق "جي دبليو ماريوت ماركيز".',
                    'مجتمع نابض بالحياة يضم أرقى المطاعم والمقاهي ومرافق الترفيه.',
                    'بنية تحتية متطورة وشبكة مواصلات متكاملة تشمل محطة مترو وتاكسي مائي.',
                    'قربه من الطرق السريعة الرئيسية كشارع الشيخ زايد وشارع الخيل.',
                  ].map((item) => (
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
                    <h2 className="text-2xl font-bold font-headline">أسلوب حياة متكامل</h2>
                </div>
                <div className="space-y-4 text-muted-foreground prose prose-lg max-w-none">
                    <p>الحياة في الخليج التجاري هي تجسيد للتنوع والديناميكية. من التنزه على ضفاف القناة المائية عند شروق الشمس، إلى اجتماعات العمل في المقاهي العصرية، وصولاً إلى الاستمتاع بأمسية فاخرة في أحد المطاعم العالمية، كل يوم هنا يحمل تجربة جديدة.</p>
                    <h3 className="text-xl font-bold font-headline !text-foreground !mt-6 !mb-2">ترفيه لا ينتهي</h3>
                    <p>تعد قناة دبي المائية شريان الحياة في المنطقة، حيث يوفر ممشاها البالغ طوله 3.2 كم مسارات للمشي وركوب الدراجات، محاطة بالمطاعم والمساحات الخضراء. كما أن عرض "لابيرل" المائي المذهل في الحبتور سيتي يقدم تجربة فنية وبصرية لا تُنسى.</p>
                    <h3 className="text-xl font-bold font-headline !text-foreground !mt-6 !mb-2">وجهة الذواقة والحياة الليلية</h3>
                    <p>يعج الخليج التجاري بأفخم المطاعم والوجهات التي ترضي جميع الأذواق، من المطابخ العالمية في الفنادق الفاخرة إلى المقاهي العصرية في "باي سكوير". وعندما يحل المساء، تضيء المنطقة بمجموعة متنوعة من النوادي والصالات الراقية، مما يجعلها وجهة رئيسية للحياة الليلية في دبي.</p>
                </div>
              </section>

              <section id="price-insights">
                <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold font-headline">
                      مؤشرات الأسعار
                    </h2>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>متوسط الإيجارات السنوية</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      متوسط الأسعار للشقق السكنية.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>نوع الوحدة</TableHead>
                          <TableHead className="text-right">
                            متوسط السعر (درهم إماراتي/سنوياً)
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rentData.map((item) => (
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
                    <p className="text-xs text-muted-foreground mt-2">
                      البيانات المعروضة تستند إلى بيانات قوائم Property Finder لآخر 12 شهرًا.
                    </p>
                  </CardContent>
                </Card>
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>اتجاهات أسعار شقق الاستوديو</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
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
                                      {`AED ${payload[0].value?.toLocaleString()}/year`}
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
                      أسئلة شائعة
                    </h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                      <AccordionItem value={`item-${index+1}`} key={index}>
                          <AccordionTrigger className="text-right text-lg">{index+1}. {item.q}</AccordionTrigger>
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
      <Footer />
    </div>
  );
}
