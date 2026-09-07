'use client';

import React from 'react';
import { YearEndReportState, FinanceRow } from '@/lib/year-end-data';

interface YearEndPage2Props {
  data: YearEndReportState;
  onChange: (updater: (prev: YearEndReportState) => YearEndReportState) => void;
}

export const YearEndPage2: React.FC<YearEndPage2Props> = ({ data, onChange }) => {
  // Sum of classes
  const totalClasses =
    (data.classesKindergarten || 0) +
    (data.classesG1 || 0) +
    (data.classesG2 || 0) +
    (data.classesG3 || 0) +
    (data.classesG4 || 0) +
    (data.classesG5 || 0) +
    (data.classesG6 || 0);

  const updateFinanceRow = (index: number, field: keyof FinanceRow, val: string) => {
    onChange((prev) => {
      const updated = [...prev.financeList];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, financeList: updated };
    });
  };

  return (
    <div className="bg-white shadow-sm border border-slate-300 rounded-lg p-6 sm:p-10 mb-8 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none text-slate-800 text-sm leading-relaxed">
      {/* Continuing from Page 1: Classes 5 and 6 */}
      <div className="space-y-5">
        <div className="pl-2 space-y-1">
          <ul className="list-disc pl-5 space-y-1 text-slate-800">
            <li className="flex items-center gap-2">
              <span className="min-w-[120px]">ថ្នាក់ទី៥ :</span>
              <input
                type="number"
                value={data.classesG5}
                onChange={(e) => onChange((p) => ({ ...p, classesG5: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
              <span>ថ្នាក់</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="min-w-[120px]">ថ្នាក់ទី៦ :</span>
              <input
                type="number"
                value={data.classesG6}
                onChange={(e) => onChange((p) => ({ ...p, classesG6: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
              <span>ថ្នាក់</span>
            </li>
            <li className="flex items-center gap-2 font-bold text-slate-900 bg-amber-50/60 p-1 rounded">
              <span className="min-w-[120px]">សរុបថ្នាក់ :</span>
              <span className="text-blue-900 font-bold text-base px-2">{totalClasses}</span>
              <span>ថ្នាក់</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="min-w-[120px]">សរុបថ្នាក់គួប :</span>
              <input
                type="number"
                value={data.classesMulti}
                onChange={(e) => onChange((p) => ({ ...p, classesMulti: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
              <span>ថ្នាក់</span>
            </li>
          </ul>
        </div>

        {/* 4. ចំនួនមន្ត្រីអប់រំ */}
        <div className="pl-2 space-y-2 pt-2 border-t border-slate-200">
          <h3 className="font-bold text-base text-slate-900">4. ចំនួនមន្ត្រីអប់រំ</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold text-slate-900 bg-slate-50 p-1.5 rounded">
              <span>បុគ្គលិកសរុបរួម :</span>
              <input
                type="number"
                value={data.staffTotal}
                onChange={(e) => onChange((p) => ({ ...p, staffTotal: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center font-bold text-blue-900 bg-white border border-slate-300 rounded"
              />
              <span>នាក់</span>
              <span>ស្រី :</span>
              <input
                type="number"
                value={data.staffFemale}
                onChange={(e) => onChange((p) => ({ ...p, staffFemale: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center font-bold text-purple-800 bg-white border border-slate-300 rounded"
              />
              <span>កើន/ថយ</span>
              <input
                type="number"
                value={data.staffChange}
                onChange={(e) => onChange((p) => ({ ...p, staffChange: Number(e.target.value) || 0 }))}
                className="w-10 px-1 text-center bg-white border border-slate-300 rounded"
              />
              <span>មូលហេតុ បោះបង់</span>
              <input
                type="number"
                value={data.staffDropout}
                onChange={(e) => onChange((p) => ({ ...p, staffDropout: Number(e.target.value) || 0 }))}
                className="w-10 px-1 text-center bg-white border border-slate-300 rounded"
              />
            </li>

            <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>សរុបគ្រូបង្រៀន១ថ្នាក់ :</span>
              <input
                type="number"
                value={data.teachers1ClassTotal}
                onChange={(e) => onChange((p) => ({ ...p, teachers1ClassTotal: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
              <span>នាក់</span>
              <span>ស្រី :</span>
              <input
                type="number"
                value={data.teachers1ClassFemale}
                onChange={(e) => onChange((p) => ({ ...p, teachers1ClassFemale: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white text-purple-700"
              />
              <span>កើន/ថយ</span>
              <input
                type="number"
                value={data.teachers1ClassChange}
                onChange={(e) => onChange((p) => ({ ...p, teachers1ClassChange: Number(e.target.value) || 0 }))}
                className="w-10 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
              <span>មូលហេតុ បោះបង់</span>
              <input
                type="number"
                value={data.teachers1ClassDropout}
                onChange={(e) => onChange((p) => ({ ...p, teachers1ClassDropout: Number(e.target.value) || 0 }))}
                className="w-10 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
            </li>

            <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>សរុបគ្រូបង្រៀន២ថ្នាក់ :</span>
              <input
                type="number"
                value={data.teachers2ClassTotal}
                onChange={(e) => onChange((p) => ({ ...p, teachers2ClassTotal: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
              <span>នាក់</span>
              <span>ស្រី :</span>
              <input
                type="number"
                value={data.teachers2ClassFemale}
                onChange={(e) => onChange((p) => ({ ...p, teachers2ClassFemale: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
              <span>កើន/ថយ</span>
              <input
                type="number"
                value={data.teachers2ClassChange}
                onChange={(e) => onChange((p) => ({ ...p, teachers2ClassChange: Number(e.target.value) || 0 }))}
                className="w-10 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
              <span>មូលហេតុ បោះបង់</span>
              <input
                type="number"
                value={data.teachers2ClassDropout}
                onChange={(e) => onChange((p) => ({ ...p, teachers2ClassDropout: Number(e.target.value) || 0 }))}
                className="w-10 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
            </li>

            <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>សរុបគ្រូបង្រៀនថ្នាក់គួប :</span>
              <input
                type="number"
                value={data.teachersMultiTotal}
                onChange={(e) => onChange((p) => ({ ...p, teachersMultiTotal: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
              <span>នាក់</span>
              <span>ស្រី :</span>
              <input
                type="number"
                value={data.teachersMultiFemale}
                onChange={(e) => onChange((p) => ({ ...p, teachersMultiFemale: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
              <span>កើន/ថយ</span>
              <input
                type="number"
                value={data.teachersMultiChange}
                onChange={(e) => onChange((p) => ({ ...p, teachersMultiChange: Number(e.target.value) || 0 }))}
                className="w-10 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
              <span>មូលហេតុ បោះបង់</span>
              <input
                type="number"
                value={data.teachersMultiDropout}
                onChange={(e) => onChange((p) => ({ ...p, teachersMultiDropout: Number(e.target.value) || 0 }))}
                className="w-10 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
            </li>
          </ul>
        </div>

        {/* 5. ហិរញ្ញប្បទាន ចាប់ពីខែកក្កដា ដល់កញ្ញា */}
        <div className="pt-2 border-t border-slate-200">
          <h3 className="font-bold text-base text-slate-900 mb-2">
            5. ហិរញ្ញប្បទាន ចាប់ពីខែកក្កដា ដល់កញ្ញា
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-900 text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-bold text-center">
                  <th className="border border-slate-900 px-2 py-1.5 w-[35%]">បរិយាយ</th>
                  <th className="border border-slate-900 px-2 py-1.5 w-[15%]">បរិមាណ</th>
                  <th className="border border-slate-900 px-2 py-1.5 w-[16%]">ទឹកប្រាក់សរុប</th>
                  <th className="border border-slate-900 px-2 py-1.5 w-[20%]">ប្រភពថវិកា</th>
                  <th className="border border-slate-900 px-2 py-1.5 w-[14%]">កង្វះថវិកា</th>
                </tr>
              </thead>
              <tbody>
                {data.financeList.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50/50">
                    <td className="border border-slate-900 px-2 py-1 font-medium">
                      - {row.description}
                    </td>
                    <td className="border border-slate-900 p-0.5 text-center">
                      <input
                        type="text"
                        value={row.quantity}
                        onChange={(e) => updateFinanceRow(idx, 'quantity', e.target.value)}
                        className="w-full text-center p-1 bg-transparent hover:bg-white focus:bg-white"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5 text-center">
                      <input
                        type="text"
                        value={row.totalCost}
                        onChange={(e) => updateFinanceRow(idx, 'totalCost', e.target.value)}
                        className="w-full text-center p-1 bg-transparent hover:bg-white focus:bg-white"
                        placeholder="....."
                      />
                    </td>
                    <td className="border border-slate-900 p-1 text-xs">
                      <textarea
                        rows={row.sources.includes('\n') ? 3 : 1}
                        value={row.sources}
                        onChange={(e) => updateFinanceRow(idx, 'sources', e.target.value)}
                        className="w-full p-0.5 bg-transparent hover:bg-white focus:bg-white resize-none leading-tight"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5 text-center">
                      <input
                        type="text"
                        value={row.deficit}
                        onChange={(e) => updateFinanceRow(idx, 'deficit', e.target.value)}
                        className="w-full text-center p-1 bg-transparent hover:bg-white focus:bg-white"
                        placeholder="....."
                      />
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-slate-100/70 font-bold">
                  <td className="border border-slate-900 px-2 py-1.5 text-center">- សរុប</td>
                  <td className="border border-slate-900 text-center">-</td>
                  <td className="border border-slate-900 text-center">-</td>
                  <td className="border border-slate-900 text-center">-</td>
                  <td className="border border-slate-900 text-center">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. សកម្មភាពបណ្ណាល័យ */}
        <div className="pl-2 space-y-2 pt-2 border-t border-slate-200">
          <h3 className="font-bold text-base text-slate-900">6. សកម្មភាពបណ្ណាល័យ</h3>
          <ul className="list-disc pl-5 space-y-1 text-slate-800">
            <li className="flex items-center gap-2">
              <span>បណ្ណាល័យដំណើរការជាប្រចាំចំនួន :</span>
              <input
                type="number"
                value={data.libraryRegular}
                onChange={(e) => onChange((p) => ({ ...p, libraryRegular: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
            </li>
            <li className="flex items-center gap-2">
              <span>បណ្ណាល័យតែដំណើរការមិនសូវបានល្អចំនួន :</span>
              <input
                type="number"
                value={data.libraryIrregular}
                onChange={(e) => onChange((p) => ({ ...p, libraryIrregular: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
            </li>
            <li className="flex items-center gap-2">
              <span>គ្មានបណ្ណាល័យសោះចំនួន :</span>
              <input
                type="number"
                value={data.libraryNone}
                onChange={(e) => onChange((p) => ({ ...p, libraryNone: Number(e.target.value) || 0 }))}
                className="w-12 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-3 border-t border-slate-200 text-right text-xs text-slate-400">
        ទំព័រទី ២ (Page 2)
      </div>
    </div>
  );
};
