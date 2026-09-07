'use client';

import React from 'react';

interface ReportHeaderProps {
  continuation?: boolean;
  subTitle?: string;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({ continuation, subTitle }) => {
  return (
    <div className="mb-4 text-center">
      {/* Kingdom Header */}
      <div className="leading-relaxed font-bold text-sm text-slate-900">
        <div>ព្រះរាជាណាចក្រកម្ពុជា</div>
        <div>ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
        <div className="tracking-widest font-normal text-xs text-slate-500">-------xxx-------</div>
      </div>

      {/* Ministry & School hierarchy on left */}
      <div className="flex justify-between items-start text-xs font-semibold text-slate-800 my-2 text-left leading-normal">
        <div>
          <div>រដ្ឋបាលស្រុកភ្នំស្រុក</div>
          <div>ការិយាល័យអប់រំ យុវជន និងកីឡាស្រុក</div>
          <div>កម្រងស្ពានស្រែង</div>
          <div>សាលាបឋមសិក្សា រោគ</div>
        </div>
      </div>

      {/* Main Document Title */}
      <div className="font-bold text-sm text-slate-900 mt-2 leading-relaxed">
        <div>របាយការណ៍បូកសរុបលទ្ធផលការងារអប់រំ ផ្នែកបឋមសិក្សា</div>
        <div className="text-xs font-semibold text-slate-700">
          (នាឆមាសទី១ ឆ្នាំសិក្សា២០២៥-២០២៦) {continuation ? '(ត)' : ''}
        </div>
        {subTitle && <div className="text-xs font-semibold text-blue-900 mt-0.5">{subTitle}</div>}
      </div>
    </div>
  );
};
