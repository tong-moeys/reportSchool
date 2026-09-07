'use client';

import React from 'react';
import { YearEndReportState, LifeSkillsRow, DewormingRow } from '@/lib/year-end-data';

interface YearEndPage5Props {
  data: YearEndReportState;
  onChange: (updater: (prev: YearEndReportState) => YearEndReportState) => void;
}

export const YearEndPage5: React.FC<YearEndPage5Props> = ({ data, onChange }) => {
  const updateLifeSkillRow = (index: number, field: keyof LifeSkillsRow, val: any) => {
    onChange((prev) => {
      const updated = [...prev.lifeSkillsList];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, lifeSkillsList: updated };
    });
  };

  const updateDewormingRow = (index: number, field: keyof DewormingRow, val: any) => {
    onChange((prev) => {
      const updated = [...prev.dewormingList];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, dewormingList: updated };
    });
  };

  const dewormingTotal = data.dewormingList.reduce(
    (acc, r) => acc + (Number(r.studentsCount) || 0),
    0
  );

  return (
    <div className="bg-white shadow-sm border border-slate-300 rounded-lg p-6 sm:p-10 mb-8 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none text-slate-800 text-sm leading-relaxed">
      <div className="space-y-6">
        {/* 5. កម្មវិធីអប់រំបំណិនជីវិត */}
        <div>
          <h3 className="font-bold text-base text-slate-900 mb-2">
            5. កម្មវិធីអប់រំបំណិនជីវិត
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-900 text-xs">
              <thead>
                <tr className="bg-slate-100 font-bold text-center">
                  <th rowSpan={2} className="border border-slate-900 p-1.5 w-[38%]">បរិយាយ</th>
                  <th colSpan={2} className="border border-slate-900 p-1">ចំនួនសាលា</th>
                  <th colSpan={4} className="border border-slate-900 p-1">ចំនួនសិស្ស</th>
                  <th rowSpan={2} className="border border-slate-900 p-1 w-[12%]">ផ្សេងៗ</th>
                </tr>
                <tr className="bg-slate-50 text-[11px] font-semibold text-center">
                  <th className="border border-slate-900 p-0.5 w-[8%]">សរុប</th>
                  <th className="border border-slate-900 p-0.5 w-[7%]">%</th>
                  <th className="border border-slate-900 p-0.5 w-[9%]">សរុប</th>
                  <th className="border border-slate-900 p-0.5 w-[7%]">%</th>
                  <th className="border border-slate-900 p-0.5 w-[9%] text-purple-700">ស្រី</th>
                  <th className="border border-slate-900 p-0.5 w-[7%] text-purple-700">%</th>
                </tr>
              </thead>
              <tbody>
                {data.lifeSkillsList.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50/60">
                    <td className="border border-slate-900 p-1.5 font-medium leading-tight">
                      {row.description}
                    </td>
                    <td className="border border-slate-900 p-0.5 text-center">
                      <input
                        type="number"
                        value={row.schoolsCount}
                        onChange={(e) => updateLifeSkillRow(idx, 'schoolsCount', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5 text-center">
                      <input
                        type="number"
                        value={row.schoolsPercent}
                        onChange={(e) => updateLifeSkillRow(idx, 'schoolsPercent', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5 text-center">
                      <input
                        type="number"
                        value={row.studentsCount}
                        onChange={(e) => updateLifeSkillRow(idx, 'studentsCount', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent font-medium"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5 text-center">
                      <input
                        type="number"
                        value={row.studentsPercent}
                        onChange={(e) => updateLifeSkillRow(idx, 'studentsPercent', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5 text-center">
                      <input
                        type="number"
                        value={row.femaleCount}
                        onChange={(e) => updateLifeSkillRow(idx, 'femaleCount', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent text-purple-700 font-medium"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5 text-center">
                      <input
                        type="number"
                        value={row.femalePercent}
                        onChange={(e) => updateLifeSkillRow(idx, 'femalePercent', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent text-purple-700"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5 text-center">
                      <input
                        type="text"
                        value={row.others}
                        onChange={(e) => updateLifeSkillRow(idx, 'others', e.target.value)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-xs space-y-1.5 pl-2 pt-2 text-slate-800">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 min-w-[95px]">• សកម្មភាពអនុវត្ត:</span>
              <textarea
                rows={2}
                value={data.lifeSkillsActivities}
                onChange={(e) => onChange((p) => ({ ...p, lifeSkillsActivities: e.target.value }))}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white leading-relaxed"
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 min-w-[95px]">• បញ្ហាប្រឈម :</span>
              <textarea
                rows={2}
                value={data.lifeSkillsChallenges}
                onChange={(e) => onChange((p) => ({ ...p, lifeSkillsChallenges: e.target.value }))}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white leading-relaxed"
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 min-w-[95px]">• សំណូមពរ :</span>
              <textarea
                rows={2}
                value={data.lifeSkillsRequests}
                onChange={(e) => onChange((p) => ({ ...p, lifeSkillsRequests: e.target.value }))}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* 6. ការបង្រៀន និង ការអនុវត្តកម្មវិធីសិក្សា / គ្រូបង្រៀនល្អ */}
        <div className="pt-2 border-t border-slate-200 space-y-1">
          <h3 className="font-bold text-sm text-slate-900">
            6. ការបង្រៀន និង ការអនុវត្តកម្មវិធីសិក្សា
          </h3>
          <div className="pl-4 font-semibold text-slate-800 text-xs">គ្រូបង្រៀនល្អ</div>
          <textarea
            rows={2}
            value={data.goodTeachersNotes}
            onChange={(e) => onChange((p) => ({ ...p, goodTeachersNotes: e.target.value }))}
            className="w-full text-xs p-1.5 bg-slate-50 border border-slate-200 rounded focus:bg-white ml-2"
          />
        </div>

        {/* 7. សុខភាពសិក្សា -> ការទម្លាក់ព្រូន */}
        <div className="pt-2 border-t border-slate-200 space-y-2">
          <h3 className="font-bold text-base text-slate-900">7. សុខភាពសិក្សា</h3>
          <div className="pl-2 font-semibold text-slate-900 text-sm">ការទម្លាក់ព្រូន</div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-900 text-xs text-center">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-slate-900 p-1.5 w-[35%]">បរិយាយ</th>
                  <th className="border border-slate-900 p-1.5 w-[25%]">ចំនួនសិស្សទទួលថ្នាំ</th>
                  <th className="border border-slate-900 p-1.5 w-[25%]">ចំនួនភាគរយទទួលថ្នាំ</th>
                  <th className="border border-slate-900 p-1.5 w-[15%]">ផ្សេងៗ</th>
                </tr>
              </thead>
              <tbody>
                {data.dewormingList.map((row, idx) => (
                  <tr key={row.round} className="hover:bg-slate-50/60">
                    <td className="border border-slate-900 p-1.5 font-medium">{row.round}</td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.studentsCount}
                        onChange={(e) => updateDewormingRow(idx, 'studentsCount', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent font-medium"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.percentage}
                        onChange={(e) => updateDewormingRow(idx, 'percentage', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="text"
                        value={row.others}
                        onChange={(e) => updateDewormingRow(idx, 'others', e.target.value)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-amber-50/80 font-bold">
                  <td className="border border-slate-900 p-1">សរុប</td>
                  <td className="border border-slate-900 p-1 text-blue-900">{dewormingTotal}</td>
                  <td className="border border-slate-900 p-1 text-emerald-800">100%</td>
                  <td className="border border-slate-900 p-1">-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs space-y-1.5 pl-2 pt-1 text-slate-800">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 min-w-[85px]">○ សកម្មភាព :</span>
              <textarea
                rows={2}
                value={data.dewormingActivities}
                onChange={(e) => onChange((p) => ({ ...p, dewormingActivities: e.target.value }))}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white leading-relaxed"
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 min-w-[85px]">○ បញ្ហាប្រឈម :</span>
              <textarea
                rows={2}
                value={data.dewormingChallenges}
                onChange={(e) => onChange((p) => ({ ...p, dewormingChallenges: e.target.value }))}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white leading-relaxed"
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 min-w-[85px]">○ សំណូមពរ :</span>
              <textarea
                rows={2}
                value={data.dewormingRequests}
                onChange={(e) => onChange((p) => ({ ...p, dewormingRequests: e.target.value }))}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white leading-relaxed"
              />
            </div>
          </div>

          <div className="font-bold text-slate-900 text-sm mt-3 pt-2 border-t border-slate-200">
            ការរៀបចំបង្គន់អនាម័យនិង ទឹកស្អាត
          </div>
        </div>
      </div>

      <div className="mt-8 pt-3 border-t border-slate-200 text-right text-xs text-slate-400">
        ទំព័រទី ៥ (Page 5)
      </div>
    </div>
  );
};
