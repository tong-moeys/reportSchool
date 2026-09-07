'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SchoolReportApp = dynamic(
  () => import('@/components/SchoolReportApp').then((mod) => mod.SchoolReportApp),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-slate-100/80 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center max-w-sm w-full">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <h2 className="font-semibold text-slate-800 text-base">កំពុងដំណើរការប្រព័ន្ធ...</h2>
          <p className="text-slate-500 text-xs mt-1">របាយការណ៍បូកសរុបលទ្ធផលការងារអប់រំ បឋមសិក្សា</p>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return <SchoolReportApp />;
}
