
"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';

type NavLink = {
  id: string;
  en: string;
  ar: string;
};

const navLinks: NavLink[] = [
  { id: 'residences', en: 'Residences', ar: 'الوحدات السكنية' },
  { id: 'amenities', en: 'Amenities', ar: 'المرافق' },
  { id: 'experience', en: 'Experience', ar: 'التجربة' },
  { id: 'location', en: 'Location', ar: 'الموقع' },
  { id: 'insights', en: 'Insights', ar: 'الرؤى' },
  { id: 'contact', en: 'Contact', ar: 'التواصل' },
];

export function StickyNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { language } = useLanguage();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show only if scrolling down and past the hero section
      if (currentScrollY > lastScrollY.current && currentScrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px', threshold: 0 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.current?.observe(section));

    return () => {
      sections.forEach((section) => observer.current?.unobserve(section));
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80; // Account for header height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        'sticky top-16 z-40 w-full bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80 transition-all duration-300',
        isVisible ? 'h-14 border-b' : 'h-0 border-b-0 overflow-hidden'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 h-full overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <ul className="flex items-center justify-start h-full gap-4 md:gap-8 [&::-webkit-scrollbar]:hidden">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  'whitespace-nowrap text-sm font-medium transition-colors hover:text-primary pb-1',
                  activeSection === link.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground'
                )}
              >
                {language === 'ar' ? link.ar : link.en}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
