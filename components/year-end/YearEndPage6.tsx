'use client';

import React from 'react';
import { YearEndReportState, SanitationWaterRow, BreakfastFeedingRow } from '@/lib/year-end-data';

interface YearEndPage6Props {
  data: YearEndReportState;
  onChange: (updater: (prev: YearEndReportState) => YearEndReportState) => void;
}

export const YearEndPage6: React.FC<YearEndPage6Props> = ({ data, onChange }) => {
  const updateSanitationRow = (index: number, field: keyof SanitationWaterRow, val: any) => {
    onChange((prev) => {
      const updated = [...prev.sanitationWaterList];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, sanitationWaterList: updated };
    });
  };

  const updateBreakfastRow = (index: number, field: keyof BreakfastFeedingRow, val: any) => {
    onChange((prev) => {
      const updated = [...prev.breakfastList];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, breakfastList: updated };
    });
  };

  const sanitationTotal = data.sanitationWaterList.reduce(
    (acc, r) => ({
      sources: acc.sources + (Number(r.totalSources) || 0),
      usable: acc.usable + (Number(r.usableCount) || 0),
      broken: acc.broken + (Number(r.brokenCount) || 0),
    }),
    { sources: 0, usable: 0, broken: 0 }
  );

  return (
    <div className="bg-white shadow-sm border border-slate-300 rounded-lg p-6 sm:p-10 mb-8 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none text-slate-800 text-sm leading-relaxed">
      <div className="space-y-6">
        {/* Continuation of 7.2: ការរៀបចំបង្គន់អនាម័យនិងទឹកស្អាត */}
        <div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-900 text-xs text-center">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th rowSpan={2} className="border border-slate-900 p-1.5 w-[28%]">បរិយាយ</th>
                  <th colSpan={2} className="border border-slate-900 p-1">
                    <div>ចំនួនបង្គន់ឬប្រភពទឹក</div>
                    <div>ស្អាត</div>
                  </th>
                  <th colSpan={2} className="border border-slate-900 p-1">ប្រើប្រាស់បាន</th>
                  <th colSpan={2} className="border border-slate-900 p-1">ខូចប្រើមិនបាន</th>
                  <th rowSpan={2} className="border border-slate-900 p-1 w-[12%]">ផ្សេងៗ</th>
                </tr>
                <tr className="bg-slate-50 text-[11px] font-semibold">
                  <th className="border border-slate-900 p-0.5">សរុប</th>
                  <th className="border border-slate-900 p-0.5">ភាគរយ</th>
                  <th className="border border-slate-900 p-0.5">សរុប</th>
                  <th className="border border-slate-900 p-0.5">ភាគរយ</th>
                  <th className="border border-slate-900 p-0.5">សរុប</th>
                  <th className="border border-slate-900 p-0.5">ភាគរយ</th>
                </tr>
              </thead>
              <tbody>
                {data.sanitationWaterList.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50/60">
                    <td className="border border-slate-900 p-1 font-medium text-left pl-3">{row.category}</td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.totalSources}
                        onChange={(e) => updateSanitationRow(idx, 'totalSources', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent font-medium"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.totalPercent}
                        onChange={(e) => updateSanitationRow(idx, 'totalPercent', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.usableCount}
                        onChange={(e) => updateSanitationRow(idx, 'usableCount', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent text-emerald-700 font-medium"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.usablePercent}
                        onChange={(e) => updateSanitationRow(idx, 'usablePercent', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.brokenCount}
                        onChange={(e) => updateSanitationRow(idx, 'brokenCount', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent text-rose-600"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.brokenPercent}
                        onChange={(e) => updateSanitationRow(idx, 'brokenPercent', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="text"
                        value={row.others}
                        onChange={(e) => updateSanitationRow(idx, 'others', e.target.value)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-amber-50/80 font-bold">
                  <td className="border border-slate-900 p-1">សរុប</td>
                  <td className="border border-slate-900 p-1 text-blue-900">{sanitationTotal.sources}</td>
                  <td className="border border-slate-900 p-1 text-emerald-800">100%</td>
                  <td className="border border-slate-900 p-1 text-emerald-800">{sanitationTotal.usable}</td>
                  <td className="border border-slate-900 p-1 text-emerald-800">100%</td>
                  <td className="border border-slate-900 p-1 text-rose-700">{sanitationTotal.broken}</td>
                  <td className="border border-slate-900 p-1">0%</td>
                  <td className="border border-slate-900 p-1">-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs space-y-1 pl-2 pt-2 text-slate-800">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 min-w-[85px]">• ការអនុវត្ត:</span>
              <input
                type="text"
                value={data.sanitationActivities}
                onChange={(e) => onChange((p) => ({ ...p, sanitationActivities: e.target.value }))}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white"
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 min-w-[85px]">• បញ្ហាប្រឈម :</span>
              <input
                type="text"
                value={data.sanitationChallenges}
                onChange={(e) => onChange((p) => ({ ...p, sanitationChallenges: e.target.value }))}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white"
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 min-w-[85px]">• សំណូមពរ :</span>
              <input
                type="text"
                value={data.sanitationRequests}
                onChange={(e) => onChange((p) => ({ ...p, sanitationRequests: e.target.value }))}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* 7.3 ការផ្ដល់អាហារពេលព្រឹក */}
        <div className="pt-2 border-t border-slate-200 space-y-2">
          <div className="font-bold text-slate-900 text-sm">ការផ្ដល់អាហារពេលព្រឹក</div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-900 text-xs text-center">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-slate-900 p-1.5 w-[35%]">បរិយាយ</th>
                  <th className="border border-slate-900 p-1.5 w-[25%]">ចំនួនសិស្សទទួលថ្នាំ/អាហារ</th>
                  <th className="border border-slate-900 p-1.5 w-[25%]">ចំនួនភាគរយទទួលថ្នាំ/អាហារ</th>
                  <th className="border border-slate-900 p-1.5 w-[15%]">ផ្សេងៗ</th>
                </tr>
              </thead>
              <tbody>
                {data.breakfastList.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50/60">
                    <td className="border border-slate-900 p-1.5 font-medium">{row.category}</td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.studentsCount}
                        onChange={(e) => updateBreakfastRow(idx, 'studentsCount', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent font-medium"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.percentage}
                        onChange={(e) => updateBreakfastRow(idx, 'percentage', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="text"
                        value={row.others}
                        onChange={(e) => updateBreakfastRow(idx, 'others', e.target.value)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                  </tr>
                ))}
                <tr className="bg-amber-50/80 font-bold">
                  <td className="border border-slate-900 p-1">សរុប</td>
                  <td className="border border-slate-900 p-1 text-blue-900">
                    {data.breakfastList.reduce((acc, r) => acc + (Number(r.studentsCount) || 0), 0)}
                  </td>
                  <td className="border border-slate-900 p-1 text-emerald-800">100%</td>
                  <td className="border border-slate-900 p-1">-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs space-y-1 pl-2 pt-1 text-slate-800">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 min-w-[85px]">• ការអនុវត្ត:</span>
              <input
                type="text"
                value={data.breakfastActivities}
                onChange={(e) => onChange((p) => ({ ...p, breakfastActivities: e.target.value }))}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white"
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 min-w-[85px]">• បញ្ហាប្រឈម :</span>
              <input
                type="text"
                value={data.breakfastChallenges}
                onChange={(e) => onChange((p) => ({ ...p, breakfastChallenges: e.target.value }))}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white"
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 min-w-[85px]">• សំណូមពរ :</span>
              <input
                type="text"
                value={data.breakfastRequests}
                onChange={(e) => onChange((p) => ({ ...p, breakfastRequests: e.target.value }))}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* 8. សកម្មភាពអប់រំក្រៅសាលា ក្រៅថ្នាក់ */}
        <div className="pt-2 border-t border-slate-200 space-y-1">
          <h3 className="font-bold text-sm text-slate-900">
            8. សកម្មភាពអប់រំក្រៅសាលា ក្រៅថ្នាក់
          </h3>
          <textarea
            rows={2}
            value={data.extracurricularNotes}
            onChange={(e) => onChange((p) => ({ ...p, extracurricularNotes: e.target.value }))}
            className="w-full text-xs p-1.5 bg-slate-50 border border-slate-200 rounded focus:bg-white leading-relaxed"
          />
        </div>

        {/* 9. អធិការកិច្ច */}
        <div className="pt-2 border-t border-slate-200 space-y-1">
          <h3 className="font-bold text-sm text-slate-900">
            9. អធិការកិច្ច
          </h3>
          <textarea
            rows={2}
            value={data.inspectionNotes}
            onChange={(e) => onChange((p) => ({ ...p, inspectionNotes: e.target.value }))}
            className="w-full text-xs p-1.5 bg-slate-50 border border-slate-200 rounded focus:bg-white leading-relaxed"
          />
        </div>

        {/* 10. ការងារសហគមន៍ */}
        <div className="pt-2 border-t border-slate-200 space-y-1">
          <h3 className="font-bold text-sm text-slate-900">
            10. ការងារសហគមន៍
          </h3>
          <textarea
            rows={2}
            value={data.communityWorkNotes}
            onChange={(e) => onChange((p) => ({ ...p, communityWorkNotes: e.target.value }))}
            className="w-full text-xs p-1.5 bg-slate-50 border border-slate-200 rounded focus:bg-white leading-relaxed"
          />
        </div>

        {/* III. លក្ខណៈការត្រៀមបវេសនកាលធំ */}
        <div className="pt-3 border-t border-slate-200 space-y-1">
          <h2 className="font-bold text-base text-slate-900">
            III. លក្ខណៈការត្រៀមបវេសនកាលធំ
          </h2>
          <textarea
            rows={3}
            value={data.newSchoolYearPrepNotes}
            onChange={(e) => onChange((p) => ({ ...p, newSchoolYearPrepNotes: e.target.value }))}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white leading-relaxed"
          />
        </div>

        {/* IV. សេចក្ដីសន្និដ្ឋាន */}
        <div className="pt-3 border-t border-slate-200 space-y-1">
          <h2 className="font-bold text-base text-slate-900">
            IV. សេចក្ដីសន្និដ្ឋាន
          </h2>
          <textarea
            rows={3}
            value={data.conclusionNotes}
            onChange={(e) => onChange((p) => ({ ...p, conclusionNotes: e.target.value }))}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white leading-relaxed"
          />
        </div>

        {/* Signatures & Footer Date */}
        <div className="pt-6 border-t-2 border-slate-300 grid grid-cols-2 gap-8 text-center text-xs font-semibold text-slate-900">
          <div>
            <div className="font-bold text-sm mb-1">បានឃើញ និងឯកភាព</div>
            <div className="text-slate-600 mb-12">នាយកសាលា</div>
            <input
              type="text"
              value={data.directorName}
              onChange={(e) => onChange((p) => ({ ...p, directorName: e.target.value }))}
              className="text-center font-bold text-sm bg-transparent border-b border-dashed border-slate-400 pb-0.5 focus:bg-white"
            />
          </div>

          <div>
            <input
              type="text"
              value={data.reportDate}
              onChange={(e) => onChange((p) => ({ ...p, reportDate: e.target.value }))}
              className="text-center text-xs text-slate-700 bg-transparent border-b border-dashed border-slate-300 pb-0.5 mb-1 focus:bg-white w-full"
            />
            <div className="text-slate-600 mb-12">អ្នកធ្វើរបាយការណ៍</div>
            <input
              type="text"
              value={data.reporterName}
              onChange={(e) => onChange((p) => ({ ...p, reporterName: e.target.value }))}
              className="text-center font-bold text-sm bg-transparent border-b border-dashed border-slate-400 pb-0.5 focus:bg-white"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-3 border-t border-slate-200 text-right text-xs text-slate-400">
        ទំព័រទី ៦ (Page 6)
      </div>
    </div>
  );
};
