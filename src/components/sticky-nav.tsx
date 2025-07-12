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
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(false);

  useEffect(() => {
    // Find the hero section once on mount
    heroSectionRef.current = document.querySelector('main > section:first-of-type');

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroBottom = heroSectionRef.current
        ? heroSectionRef.current.offsetTop + heroSectionRef.current.offsetHeight
        : 0;

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Check if we're past the hero section
      if (currentScrollY > heroBottom) {
        // Determine scroll direction
        const scrollingDown = currentScrollY > lastScrollY.current;
        isScrollingDown.current = scrollingDown;

        // Show navigation while scrolling
        setIsVisible(true);

        // Set timeout to hide after scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          // Only hide if we're not in the middle of scrolling
          setIsVisible(false);
        }, 1500); // Hide after 1.5 seconds of inactivity
      } else {
        // Hide navigation when in hero section
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    // Use throttling for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
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
      
      // Keep navigation visible when user interacts with it
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      setIsVisible(true);
      
      // Set a longer timeout after user interaction
      scrollTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  };

  return (
    <nav
      className={cn(
        'sticky top-16 z-40 w-full bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80 transition-all duration-300 ease-in-out',
        isVisible ? 'transform-none opacity-100 border-b' : '-translate-y-full opacity-0 border-b-0'
      )}
      // Keep navigation visible on hover
      onMouseEnter={() => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        const currentScrollY = window.scrollY;
        const heroBottom = heroSectionRef.current
          ? heroSectionRef.current.offsetTop + heroSectionRef.current.offsetHeight
          : 0;
        
        if (currentScrollY > heroBottom) {
          scrollTimeoutRef.current = setTimeout(() => {
            setIsVisible(false);
          }, 1000);
        }
      }}
    >
      <div className="container mx-auto px-4 md:px-6 h-14 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <ul className="flex items-center justify-start md:justify-center h-full gap-4 md:gap-8">
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