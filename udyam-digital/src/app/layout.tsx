import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Project Udyam Digital | Airtel Business MSME Onboarding',
  description: 'Digital-first MSME Acquisition, AI Advisor, Smart KYC, Quotation & Fulfilment Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen text-slate-900 antialiased font-sans flex flex-col justify-between">
        <AppProvider>
          <div>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </main>
          </div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
