
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/context/language-context";

const enFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const arFormSchema = z.object({
  fullName: z.string().min(2, { message: "يجب أن يتكون الاسم الكامل من حرفين على الأقل." }),
  email: z.string().email({ message: "يرجى إدخال عنوان بريد إلكتروني صالح." }),
  phone: z.string().min(9, { message: "يجب أن يتكون رقم الهاتف من 9 أرقام على الأقل." }),
  message: z.string().min(10, { message: "يجب أن تتكون الرسالة من 10 أحرف على الأقل." }),
});

const content = {
  en: {
    title: "Get in Touch",
    subtitle: "Have a question? Fill out the form below and our team will get back to you shortly.",
    fullName: "Full Name",
    fullNamePlaceholder: "John Doe",
    email: "Email Address",
    emailPlaceholder: "you@example.com",
    phone: "Phone Number",
    phonePlaceholder: "+1 (555) 123-4567",
    message: "Your Message",
    messagePlaceholder: "How can we help you today?",
    submitButton: "Send Message",
    toastTitle: "Message Sent!",
    toastDescription: "Thank you for contacting us. We will be in touch shortly.",
    directContact: "Or contact us directly:",
    leasingEmail: "leasing@mega.com",
  },
  ar: {
    title: "تواصل معنا",
    subtitle: "هل لديك سؤال؟ املأ النموذج أدناه وسيقوم فريقنا بالرد عليك قريبًا.",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "جون دو",
    email: "البريد الإلكتروني",
    emailPlaceholder: "you@example.com",
    phone: "رقم الهاتف",
    phonePlaceholder: "+971 50 123 4567",
    message: "رسالتك",
    messagePlaceholder: "كيف يمكننا مساعدتك اليوم؟",
    submitButton: "إرسال الرسالة",
    toastTitle: "تم إرسال الرسالة!",
    toastDescription: "شكرًا لتواصلك معنا. سنتواصل معك قريبًا.",
    directContact: "أو تواصل معنا مباشرة:",
    leasingEmail: "leasing@mega.com",
  },
};

export function Contact() {
  const { language, direction } = useLanguage();
  const { toast } = useToast();
  const t = content[language];
  const formSchema = language === 'ar' ? arFormSchema : enFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: t.toastTitle,
      description: t.toastDescription,
    });
    form.reset();
  }

  return (
    <section id="contact" className="w-full py-16 md:py-24 bg-secondary" dir={direction}>
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t.title}</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-background p-8 rounded-lg shadow-lg">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.fullName}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.fullNamePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t.email}</FormLabel>
                        <FormControl>
                            <Input placeholder={t.emailPlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t.phone}</FormLabel>
                        <FormControl>
                            <Input placeholder={t.phonePlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.message}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t.messagePlaceholder} className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full bg-primary-gradient text-primary-foreground text-base font-bold hover:opacity-90 transition-opacity rounded-lg">
              {t.submitButton}
            </Button>
          </form>
        </Form>

        <div className="mt-12 text-center text-muted-foreground">
            <p className="mb-4">{t.directContact}</p>
            <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
                <a href="tel:+97141234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">+971 (4) 123 4567</span>
                </a>
                <a href={`mailto:${t.leasingEmail}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                    <span className="font-medium">{t.leasingEmail}</span>
                </a>
            </div>
        </div>
      </div>
    </section>
  );
}
