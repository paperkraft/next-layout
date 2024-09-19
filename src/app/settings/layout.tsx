import type { Metadata } from "next";
import { SidebarNav } from "./components/sidebar-nav";
import { Suspense } from "react";
import AppLayout from "@/components/custom/layout/AppLayout";
import TitlePage from "@/components/custom/page-heading";
import { useServerTranslation } from "@/i18n/server";

export const metadata: Metadata = {
  title:{
    default:"Setting",
    template:"%s | Settings"
  }
};

type LayoutProps = {
  children: React.ReactNode;
}


export default async function Layout({ children }: LayoutProps) {
  
  const {t} = await useServerTranslation('setting');
  
  const sidebarNavItems = [
    {
      title: t('profile.title'),
      href: "/settings",
    },
    {
      title: t('account.title'),
      href: "/settings/account",
    },
    {
      title: t('appearance.title'),
      href: "/settings/appearance",
    },
    {
      title: t('notifications.title'),
      href: "/settings/notifications",
    },
    {
      title: t('display.title'),
      href: "/settings/display",
    },
  ]

  return (
    <AppLayout>
      <TitlePage title={t('title')} description={t('description')} />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 p-4">
        <aside className="-mx-4 lg:w-1/5 overflow-x-auto px-1 pt-1">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-4xl">
          <Suspense fallback={<>Loading...</>}>
            {children}
          </Suspense>
        </div>
      </div>
    </AppLayout>
  );
}
