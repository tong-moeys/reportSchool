import type {Metadata, Viewport} from 'next';
import './globals.css'; // Global styles

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3,
};

export const metadata: Metadata = {
  title: 'របាយការណ៍បូកសរុបលទ្ធផលការងារអប់រំ',
  description: 'ប្រព័ន្ធគ្រប់គ្រង និងបូកសរុបរបាយការណ៍ការងារអប់រំ ផ្នែកបឋមសិក្សា (Educational Summary Report for Primary School)',
  openGraph: {
    title: 'របាយការណ៍បូកសរុបលទ្ធផលការងារអប់រំ',
    description: 'ប្រព័ន្ធគ្រប់គ្រង និងបូកសរុបរបាយការណ៍ការងារអប់រំ ផ្នែកបឋមសិក្សា (Educational Summary Report for Primary School)',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'របាយការណ៍បូកសរុបលទ្ធផលការងារអប់រំ',
    description: 'ប្រព័ន្ធគ្រប់គ្រង និងបូកសរុបរបាយការណ៍ការងារអប់រំ ផ្នែកបឋមសិក្សា (Educational Summary Report for Primary School)',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="km" suppressHydrationWarning>
      <body className="font-sans antialiased bg-slate-100 text-slate-900" suppressHydrationWarning>{children}</body>
    </html>
  );
}
