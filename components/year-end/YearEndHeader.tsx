'use client';

import React from 'react';
import { YearEndReportState } from '@/lib/year-end-data';

interface YearEndHeaderProps {
  data: YearEndReportState;
  onChange?: (updater: (prev: YearEndReportState) => YearEndReportState) => void;
  continuationTitle?: string;
}

export const YearEndHeader: React.FC<YearEndHeaderProps> = ({
  data,
  onChange,
  continuationTitle,
}) => {
  return (
    <div className="bg-white shadow-sm border border-slate-300 rounded-lg p-6 sm:p-8 mb-6 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none text-slate-800 leading-relaxed font-serif">
      {/* Kingdom Header */}
      <div className="text-center leading-relaxed font-bold text-slate-900 mb-4">
        <div className="text-base sm:text-lg tracking-wide">ព្រះរាជាណាចក្រកម្ពុជា</div>
        <div className="text-sm sm:text-base">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
        <div className="tracking-widest font-normal text-xs text-slate-400 my-0.5">3 3 3</div>
      </div>

      {/* Ministry & School hierarchy on left */}
      <div className="flex justify-between items-start text-xs font-semibold text-slate-800 my-2 text-left leading-relaxed">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <span>មន្ទីរអប់រំ យុវជន និងកីឡា</span>
            <input
              type="text"
              value={data.province}
              onChange={(e) => onChange && onChange((p) => ({ ...p, province: e.target.value }))}
              className="font-semibold bg-transparent border-b border-dashed border-slate-300 hover:border-slate-500 focus:bg-white px-1"
            />
          </div>
          <div className="flex items-center gap-1">
            <span>ការិយាល័យអប់រំ យុវជន និងកីឡា</span>
            <input
              type="text"
              value={data.district}
              onChange={(e) => onChange && onChange((p) => ({ ...p, district: e.target.value }))}
              className="font-semibold bg-transparent border-b border-dashed border-slate-300 hover:border-slate-500 focus:bg-white px-1"
            />
          </div>
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={data.schoolName}
              onChange={(e) => onChange && onChange((p) => ({ ...p, schoolName: e.target.value }))}
              className="font-bold text-sm bg-transparent border-b border-dashed border-slate-300 hover:border-slate-500 focus:bg-white px-1 text-blue-900"
            />
          </div>
        </div>
      </div>

      {/* Main Document Title */}
      {!continuationTitle ? (
        <div className="text-center font-bold text-slate-900 mt-4 leading-relaxed">
          <h1 className="text-base sm:text-lg">
            របាយការណ៍ស្ដីពី លទ្ធផលសិក្សារបស់សិស្សនៅ
          </h1>
          <div className="flex items-center justify-center gap-1 text-sm sm:text-base">
            <span>ដំណាច់ឆ្នាំសិក្សា</span>
            <input
              type="text"
              value={data.academicYear}
              onChange={(e) => onChange && onChange((p) => ({ ...p, academicYear: e.target.value }))}
              className="text-center font-bold bg-transparent border-b border-dashed border-slate-400 focus:bg-white px-1"
            />
          </div>
        </div>
      ) : (
        <div className="text-center font-bold text-slate-900 mt-2 text-sm">
          {continuationTitle}
        </div>
      )}
    </div>
  );
};
