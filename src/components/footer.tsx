
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { useLanguage } from '@/context/language-context';

const content = {
  en: {
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    follow: 'Follow Us',
    info: 'Click for important information about this website.',
    dialogTitle: 'Demonstration Website',
    dialogP1: 'Please note that this is a fictional website created for marketing and demonstration purposes only.',
    dialogP2: 'All properties, prices, names, and other data presented on this site are not real and should not be considered as actual offers or information.',
    dialogP3: 'Thank you for your understanding.',
    acknowledge: 'Acknowledge',
    rights: 'All rights reserved.',
  },
  ar: {
    legal: 'قانوني',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    follow: 'تابعنا',
    info: 'انقر للحصول على معلومات هامة حول هذا الموقع.',
    dialogTitle: 'موقع ويب تجريبي',
    dialogP1: 'يرجى ملاحظة أن هذا موقع ويب خيالي تم إنشاؤه لأغراض التسويق والعرض التوضيحي فقط.',
    dialogP2: 'جميع العقارات والأسعار والأسماء والبيانات الأخرى المعروضة على هذا الموقع ليست حقيقية ولا ينبغي اعتبارها عروضًا أو معلومات فعلية.',
    dialogP3: 'شكرا لتفهمك.',
    acknowledge: 'أقر بذلك',
    rights: 'جميع الحقوق محفوظة.',
  },
};

export function Footer() {
  const { language, direction } = useLanguage();
  const t = content[language];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <footer className="bg-secondary/30 border-t cursor-pointer" title="About this site" dir={direction}>
          <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start">
                <Link href="/" className="inline-block mb-4">
                  <div className="bg-foreground text-background p-2 rounded-md flex items-center justify-center">
                    <Image src="/MEGA.png" alt="MEGA Logo" width={100} height={34} style={{ height: 'auto' }} />
                  </div>
                </Link>
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} MEGA Living. <br /> {t.rights}
                </p>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <h4 className="font-semibold mb-3">{t.legal}</h4>
                <div className="flex flex-col space-y-2 text-sm">
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-primary transition-colors">
                        {t.privacy}
                    </Link>
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-primary transition-colors">
                        {t.terms}
                    </Link>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                 <h4 className="font-semibold mb-3">{t.follow}</h4>
                 <div className="flex items-center space-x-4">
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
                    </Link>
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                    </Link>
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                    </Link>
                </div>
              </div>
            </div>
             <div className="flex items-center justify-center gap-2 mt-8 text-xs text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>{t.info}</span>
            </div>
          </div>
        </footer>
      </DialogTrigger>
      <DialogContent className="max-w-md" dir={direction}>
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-center">{t.dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="text-center text-muted-foreground space-y-4 py-4">
          <p>{t.dialogP1}</p>
          <p>{t.dialogP2}</p>
          <p>{t.dialogP3}</p>
        </div>
        <DialogClose asChild>
            <Button className="w-full mt-4 rounded-lg">{t.acknowledge}</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
