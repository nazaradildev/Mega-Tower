
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";
import { DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const createFormSchema = (t: any) => z.object({
  fullName: z.string().min(2, { message: t.validation.nameTooShort }),
  email: z.string().email({ message: t.validation.invalidEmail }),
  phone: z.string().min(9, { message: t.validation.invalidPhone }),
  unitType: z.string().min(1, { message: t.validation.unitRequired }),
  preferredDate: z.date({ required_error: t.validation.dateRequired }),
});


const content = {
  en: {
    title: "Schedule a Viewing",
    fullName: "Full Name",
    fullNamePlaceholder: "John Doe",
    email: "Email Address",
    emailPlaceholder: "you@example.com",
    phone: "Phone Number",
    phonePlaceholder: "+1 (555) 123-4567",
    unitType: "Preferred Unit Type",
    unitTypePlaceholder: "Select an apartment type",
    unitOptions: [
      { value: "1 Bedroom", label: "1 Bedroom" },
      { value: "2 Bedroom", label: "2 Bedroom" },
      { value: "3 Bedroom", label: "3 Bedroom Sky Villa" },
      { value: "4 Bedroom", label: "4 Bedroom Penthouse" },
    ],
    preferredDate: "Preferred Date",
    datePlaceholder: "Pick a date",
    submitButton: "Request Viewing",
    toastTitle: "Booking Request Sent!",
    toastDescription: "Thank you for your interest. We will contact you shortly to confirm your viewing.",
    close: "Close",
    validation: {
        nameTooShort: "Full name must be at least 2 characters.",
        invalidEmail: "Please enter a valid email address.",
        invalidPhone: "Phone number must be at least 9 digits.",
        unitRequired: "Please select a unit type.",
        dateRequired: "A date for the viewing is required."
    }
  },
  ar: {
    title: "احجز موعد معاينة",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "جون دو",
    email: "البريد الإلكتروني",
    emailPlaceholder: "you@example.com",
    phone: "رقم الهاتف",
    phonePlaceholder: "+971 50 123 4567",
    unitType: "نوع الوحدة المفضل",
    unitTypePlaceholder: "اختر نوع الشقة",
    unitOptions: [
      { value: "1 Bedroom", label: "شقة بغرفة نوم واحدة" },
      { value: "2 Bedroom", label: "شقة بغرفتي نوم" },
      { value: "3 Bedroom", label: "فيلا سماوية بـ 3 غرف نوم" },
      { value: "4 Bedroom", label: "بنتهاوس بـ 4 غرف نوم" },
    ],
    preferredDate: "التاريخ المفضل",
    datePlaceholder: "اختر تاريخًا",
    submitButton: "اطلب المعاينة",
    toastTitle: "تم إرسال طلب الحجز!",
    toastDescription: "شكرًا لاهتمامك. سنتصل بك قريبًا لتأكيد موعد المعاينة.",
    close: "إغلاق",
    validation: {
        nameTooShort: "يجب أن يتكون الاسم الكامل من حرفين على الأقل.",
        invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صالح.",
        invalidPhone: "يجب أن يتكون رقم الهاتف من 9 أرقام على الأقل.",
        unitRequired: "يرجى تحديد نوع الوحدة.",
        dateRequired: "تاريخ المعاينة مطلوب."
    }
  },
};

type BookingFormProps = {
  onSuccess: () => void;
}

export function BookingForm({ onSuccess }: BookingFormProps) {
  const { language, direction } = useLanguage();
  const { toast } = useToast();
  const t = content[language];
  const formSchema = createFormSchema(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      unitType: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: t.toastTitle,
      description: t.toastDescription,
    });
    form.reset();
    onSuccess();
  }

  return (
    <div dir={direction}>
      <DialogHeader className="p-6 pb-2 text-center relative">
          <DialogTitle className="text-2xl font-headline">{t.title}</DialogTitle>
          <DialogClose asChild>
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full">
                  <X className="h-4 w-4" />
                  <span className="sr-only">{t.close}</span>
              </Button>
          </DialogClose>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6 pt-4 max-h-[80vh] overflow-y-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="unitType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.unitType}</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t.unitTypePlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {t.unitOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t.preferredDate}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>{t.datePlaceholder}</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date > new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="pt-4">
              <Button type="submit" size="lg" className="w-full bg-primary-gradient text-primary-foreground text-base font-bold hover:opacity-90 transition-opacity rounded-lg">
                {t.submitButton}
              </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
