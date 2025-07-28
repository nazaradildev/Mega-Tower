
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield, Bell } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

const content = {
  en: {
    title: 'My Account',
    description: 'Manage your profile, settings, and preferences.',
    profile: 'Profile',
    name: 'John Doe',
    email: 'john.doe@example.com',
    security: 'Security',
    password: 'Change password',
    notifications: 'Notifications',
    status: 'Enabled',
    manage: 'Manage notifications',
  },
  ar: {
    title: 'حسابي',
    description: 'إدارة ملفك الشخصي وإعداداتك وتفضيلاتك.',
    profile: 'الملف الشخصي',
    name: 'جون دو',
    email: 'john.doe@example.com',
    security: 'الأمان',
    password: 'تغيير كلمة المرور',
    notifications: 'الإشعارات',
    status: 'مفعلة',
    manage: 'إدارة الإشعارات',
  },
};

export default function AccountPage() {
  const { language, direction } = useLanguage();
  const t = content[language];

  return (
    <div className="bg-background">
      <Header />
      <main className="w-full py-16 md:py-24 bg-secondary/50" dir={direction}>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold font-headline">{t.title}</h1>
              <p className="text-muted-foreground mt-2 text-lg">
                {t.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.profile}</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{t.name}</div>
                        <p className="text-xs text-muted-foreground">{t.email}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.security}</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                     <CardContent>
                        <div className="text-2xl font-bold">******</div>
                        <p className="text-xs text-muted-foreground">{t.password}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.notifications}</CardTitle>
                        <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                     <CardContent>
                        <div className="text-2xl font-bold">{t.status}</div>
                        <p className="text-xs text-muted-foreground">{t.manage}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
