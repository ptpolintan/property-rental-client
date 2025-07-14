import TopBar from '@/component/topbar/topbar';
import '@/component/topbar/topbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider } from '@/context/theme-context';
import { fetchBrandDetails } from '@/lib/api/brands';
import { use } from 'react';
import { Brand } from '@/lib/models/brands';

export default function Layout({
  params,
  children,
}: {
  params: Promise<{ brandId: string }>;
  children: React.ReactNode;
}) {
  const { brandId } = use(params);
  const brand = use(fetchBrandDetails(Number(brandId))) as Brand;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: brand.primaryColor,
        color: brand.labelColor
      }}
    >
      <ThemeProvider brand={brand}>
        <TopBar />
        <main className="flex-grow bg-[var(--brand-primary-color)]">{children}</main>
      </ThemeProvider>
    </div>
  );
}