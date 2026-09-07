'use client';

import React from 'react';
import { getKhmerDateStrings } from '@/lib/report-data';

interface ReportSignaturesProps {
  reporterName?: string;
  onReporterChange?: (name: string) => void;
  dateStr?: { lunar: string; solar: string };
}

export const ReportSignatures: React.FC<ReportSignaturesProps> = ({
  reporterName = 'អ៊ុន ប៊ុនទុង',
  onReporterChange,
  dateStr,
}) => {
  const dates = dateStr || getKhmerDateStrings();

  return (
    <div className="mt-8 pt-4 border-t border-slate-200/60 print:border-none print:mt-6 text-xs text-slate-800 break-inside-avoid">
      <div className="flex justify-between items-start text-center">
        {/* Left Side: School Principal Approval */}
        <div className="w-1/2 flex flex-col items-center">
          <div className="font-bold text-slate-900">បានឃើញ និងឯកភាព</div>
          <div className="font-bold text-slate-900 mb-2">នាយកសាលា</div>
          <div className="mt-14 text-slate-400 font-mono">..........................................</div>
        </div>

        {/* Right Side: Reporter and Date */}
        <div className="w-1/2 text-left pl-6">
          <div className="text-xs text-slate-700">{dates.lunar}</div>
          <div className="text-xs text-slate-700 font-medium">{dates.solar}</div>
          <div className="font-bold text-slate-900 mt-2">អ្នកធ្វើរបាយការណ៍</div>
          <div className="mt-14 font-bold text-slate-900">
            {onReporterChange ? (
              <input
                type="text"
                value={reporterName}
                onChange={(e) => onReporterChange(e.target.value)}
                className="editable-cell font-bold text-slate-900 text-left w-auto"
              />
            ) : (
              <span>{reporterName}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
