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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  unitType: z.string().min(1, { message: "Please select a unit type." }),
  message: z.string().optional(),
});

export function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      unitType: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Booking Request Sent!",
      description: "Thank you for your interest. We will contact you shortly to confirm your viewing.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="w-full py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Your New Home Awaits</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Schedule a viewing or get in touch with our leasing team. We're here to help you find your perfect home at MEGA Towers.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-background p-8 rounded-lg shadow-lg">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input placeholder="you@example.com" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
              control={form.control}
              name="unitType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Unit Type</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an apartment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1 Bedroom">1 Bedroom</SelectItem>
                      <SelectItem value="2 Bedroom">2 Bedroom</SelectItem>
                      <SelectItem value="3 Bedroom">3 Bedroom Sky Villa</SelectItem>
                      <SelectItem value="4 Bedroom">4 Bedroom Penthouse</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any questions or specific requirements?" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full bg-primary-gradient text-primary-foreground text-base font-bold hover:opacity-90 transition-opacity rounded-lg">
              Schedule My Viewing
            </Button>
          </form>
        </Form>

        <div className="mt-12 text-center text-muted-foreground">
            <p className="mb-4">Or contact us directly:</p>
            <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
                <a href="tel:+97141234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">+971 (4) 123 4567</span>
                </a>
                <a href="mailto:leasing@mega.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                    <span className="font-medium">leasing@mega.com</span>
                </a>
            </div>
        </div>
      </div>
    </section>
  );
}
