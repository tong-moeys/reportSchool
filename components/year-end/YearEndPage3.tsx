'use client';

import React from 'react';
import { YearEndReportState, StudentResultRow, calculateYearEndPercentages } from '@/lib/year-end-data';

interface YearEndPage3Props {
  data: YearEndReportState;
  onChange: (updater: (prev: YearEndReportState) => YearEndReportState) => void;
}

export const YearEndPage3: React.FC<YearEndPage3Props> = ({ data, onChange }) => {
  // Compute sums for Table 1
  const totals = data.resultsList.reduce(
    (acc, row) => ({
      semEndTotal: acc.semEndTotal + (Number(row.semEndTotal) || 0),
      semEndFemale: acc.semEndFemale + (Number(row.semEndFemale) || 0),
      yearEndTotal: acc.yearEndTotal + (Number(row.yearEndTotal) || 0),
      yearEndFemale: acc.yearEndFemale + (Number(row.yearEndFemale) || 0),
      averagePassTotal: acc.averagePassTotal + (Number(row.averagePassTotal) || 0),
      averagePassFemale: acc.averagePassFemale + (Number(row.averagePassFemale) || 0),
      testPassTotal: acc.testPassTotal + (Number(row.testPassTotal) || 0),
      testPassFemale: acc.testPassFemale + (Number(row.testPassFemale) || 0),
      testFailTotal: acc.testFailTotal + (Number(row.testFailTotal) || 0),
      testFailFemale: acc.testFailFemale + (Number(row.testFailFemale) || 0),
      dropoutTotal: acc.dropoutTotal + (Number(row.dropoutTotal) || 0),
      dropoutFemale: acc.dropoutFemale + (Number(row.dropoutFemale) || 0),
    }),
    {
      semEndTotal: 0,
      semEndFemale: 0,
      yearEndTotal: 0,
      yearEndFemale: 0,
      averagePassTotal: 0,
      averagePassFemale: 0,
      testPassTotal: 0,
      testPassFemale: 0,
      testFailTotal: 0,
      testFailFemale: 0,
      dropoutTotal: 0,
      dropoutFemale: 0,
    }
  );

  // Auto-calculated percentages for Table 2
  const computedPercentages = calculateYearEndPercentages(data.resultsList);

  const totalPctCalc = (val: number, base: number) => {
    if (!base || base === 0) return 0;
    return Number(((val / base) * 100).toFixed(1));
  };

  const totalPercentages = {
    semEndTotalPercent: 100,
    semEndFemalePercent: totalPctCalc(totals.semEndFemale, totals.semEndTotal),
    yearEndTotalPercent: 100,
    yearEndFemalePercent: totalPctCalc(totals.yearEndFemale, totals.yearEndTotal),
    averagePassTotalPercent: totalPctCalc(totals.averagePassTotal, totals.yearEndTotal),
    averagePassFemalePercent: totalPctCalc(totals.averagePassFemale, totals.yearEndFemale),
    testPassTotalPercent: totalPctCalc(totals.testPassTotal, totals.yearEndTotal),
    testPassFemalePercent: totalPctCalc(totals.testPassFemale, totals.yearEndFemale),
    testFailTotalPercent: totalPctCalc(totals.testFailTotal, totals.yearEndTotal),
    testFailFemalePercent: totalPctCalc(totals.testFailFemale, totals.yearEndFemale),
    dropoutTotalPercent: totalPctCalc(totals.dropoutTotal, totals.semEndTotal),
    dropoutFemalePercent: totalPctCalc(totals.dropoutFemale, totals.semEndFemale),
  };

  const updateResultRow = (index: number, field: keyof StudentResultRow, val: any) => {
    onChange((prev) => {
      const updated = [...prev.resultsList];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, resultsList: updated };
    });
  };

  return (
    <div className="bg-white shadow-sm border border-slate-300 rounded-lg p-6 sm:p-10 mb-8 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none text-slate-800 text-sm leading-relaxed">
      <div className="space-y-6">
        <div>
          <h2 className="font-bold text-base text-slate-900 border-b border-slate-200 pb-1 mb-4">
            II. ការធានាលើគុណភាព
          </h2>

          {/* 1. លទ្ធផលសិក្សារបស់សិស្ស */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900">
              1. លទ្ធផលសិក្សារបស់សិស្ស
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-900 text-xs text-center">
                <thead>
                  <tr className="bg-slate-50 font-bold">
                    <th rowSpan={3} className="border border-slate-900 p-1 w-[8%]">ថ្នាក់</th>
                    <th colSpan={12} className="border border-slate-900 py-1 px-2 font-bold bg-slate-100">
                      លទ្ធផលសិក្សារបស់សិស្សចាប់ពីថ្នាក់ទី១ ដល់៦
                    </th>
                  </tr>
                  <tr className="bg-slate-50 font-semibold text-[11px]">
                    <th colSpan={2} className="border border-slate-900 p-1">សរុបដំណាច់ឆ្នាំ</th>
                    <th colSpan={2} className="border border-slate-900 p-1">សរុបចុងឆ្នាំ</th>
                    <th colSpan={2} className="border border-slate-900 p-1">សរុបជាប់មធ្យមភាគ</th>
                    <th colSpan={2} className="border border-slate-900 p-1">សរុបធ្វើតេស្តជាប់</th>
                    <th colSpan={2} className="border border-slate-900 p-1">សរុបធ្វើតេស្តធ្លាក់</th>
                    <th colSpan={2} className="border border-slate-900 p-1">សរុបបោះបង់</th>
                  </tr>
                  <tr className="bg-slate-100 font-bold text-[10px]">
                    <th className="border border-slate-900 p-0.5">សរុប</th>
                    <th className="border border-slate-900 p-0.5 text-purple-700">ស្រី</th>
                    <th className="border border-slate-900 p-0.5">សរុប</th>
                    <th className="border border-slate-900 p-0.5 text-purple-700">ស្រី</th>
                    <th className="border border-slate-900 p-0.5">សរុប</th>
                    <th className="border border-slate-900 p-0.5 text-purple-700">ស្រី</th>
                    <th className="border border-slate-900 p-0.5">សរុប</th>
                    <th className="border border-slate-900 p-0.5 text-purple-700">ស្រី</th>
                    <th className="border border-slate-900 p-0.5">សរុប</th>
                    <th className="border border-slate-900 p-0.5 text-purple-700">ស្រី</th>
                    <th className="border border-slate-900 p-0.5">សរុប</th>
                    <th className="border border-slate-900 p-0.5 text-purple-700">ស្រី</th>
                  </tr>
                </thead>
                <tbody>
                  {data.resultsList.map((row, idx) => (
                    <tr key={row.grade} className="hover:bg-slate-50/60">
                      <td className="border border-slate-900 font-bold bg-slate-50 p-1">{row.grade}</td>
                      <td className="border border-slate-900 p-0.5">
                        <input
                          type="number"
                          value={row.semEndTotal}
                          onChange={(e) => updateResultRow(idx, 'semEndTotal', Number(e.target.value) || 0)}
                          className="w-full text-center p-0.5 bg-transparent font-medium"
                        />
                      </td>
                      <td className="border border-slate-900 p-0.5">
                        <input
                          type="number"
                          value={row.semEndFemale}
                          onChange={(e) => updateResultRow(idx, 'semEndFemale', Number(e.target.value) || 0)}
                          className="w-full text-center p-0.5 bg-transparent text-purple-700"
                        />
                      </td>
                      <td className="border border-slate-900 p-0.5">
                        <input
                          type="number"
                          value={row.yearEndTotal}
                          onChange={(e) => updateResultRow(idx, 'yearEndTotal', Number(e.target.value) || 0)}
                          className="w-full text-center p-0.5 bg-transparent font-medium"
                        />
                      </td>
                      <td className="border border-slate-900 p-0.5">
                        <input
                          type="number"
                          value={row.yearEndFemale}
                          onChange={(e) => updateResultRow(idx, 'yearEndFemale', Number(e.target.value) || 0)}
                          className="w-full text-center p-0.5 bg-transparent text-purple-700"
                        />
                      </td>
                      <td className="border border-slate-900 p-0.5">
                        <input
                          type="number"
                          value={row.averagePassTotal}
                          onChange={(e) => updateResultRow(idx, 'averagePassTotal', Number(e.target.value) || 0)}
                          className="w-full text-center p-0.5 bg-transparent font-medium text-emerald-700"
                        />
                      </td>
                      <td className="border border-slate-900 p-0.5">
                        <input
                          type="number"
                          value={row.averagePassFemale}
                          onChange={(e) => updateResultRow(idx, 'averagePassFemale', Number(e.target.value) || 0)}
                          className="w-full text-center p-0.5 bg-transparent text-purple-700"
                        />
                      </td>
                      <td className="border border-slate-900 p-0.5">
                        <input
                          type="number"
                          value={row.testPassTotal}
                          onChange={(e) => updateResultRow(idx, 'testPassTotal', Number(e.target.value) || 0)}
                          className="w-full text-center p-0.5 bg-transparent font-medium"
                        />
                      </td>
                      <td className="border border-slate-900 p-0.5">
                        <input
                          type="number"
                          value={row.testPassFemale}
                          onChange={(e) => updateResultRow(idx, 'testPassFemale', Number(e.target.value) || 0)}
                          className="w-full text-center p-0.5 bg-transparent text-purple-700"
                        />
                      </td>
                      <td className="border border-slate-900 p-0.5">
                        <input
                          type="number"
                          value={row.testFailTotal}
                          onChange={(e) => updateResultRow(idx, 'testFailTotal', Number(e.target.value) || 0)}
                          className="w-full text-center p-0.5 bg-transparent text-rose-600"
                        />
                      </td>
                      <td className="border border-slate-900 p-0.5">
                        <input
                          type="number"
                          value={row.testFailFemale}
                          onChange={(e) => updateResultRow(idx, 'testFailFemale', Number(e.target.value) || 0)}
                          className="w-full text-center p-0.5 bg-transparent text-purple-700"
                        />
                      </td>
                      <td className="border border-slate-900 p-0.5">
                        <input
                          type="number"
                          value={row.dropoutTotal}
                          onChange={(e) => updateResultRow(idx, 'dropoutTotal', Number(e.target.value) || 0)}
                          className="w-full text-center p-0.5 bg-transparent text-slate-500"
                        />
                      </td>
                      <td className="border border-slate-900 p-0.5">
                        <input
                          type="number"
                          value={row.dropoutFemale}
                          onChange={(e) => updateResultRow(idx, 'dropoutFemale', Number(e.target.value) || 0)}
                          className="w-full text-center p-0.5 bg-transparent text-purple-700"
                        />
                      </td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-amber-50/80 font-bold">
                    <td className="border border-slate-900 p-1">សរុបរួម</td>
                    <td className="border border-slate-900 p-1 font-bold text-blue-900">{totals.semEndTotal}</td>
                    <td className="border border-slate-900 p-1 font-bold text-purple-700">{totals.semEndFemale}</td>
                    <td className="border border-slate-900 p-1 font-bold text-blue-900">{totals.yearEndTotal}</td>
                    <td className="border border-slate-900 p-1 font-bold text-purple-700">{totals.yearEndFemale}</td>
                    <td className="border border-slate-900 p-1 font-bold text-emerald-800">{totals.averagePassTotal}</td>
                    <td className="border border-slate-900 p-1 font-bold text-purple-700">{totals.averagePassFemale}</td>
                    <td className="border border-slate-900 p-1 font-bold">{totals.testPassTotal}</td>
                    <td className="border border-slate-900 p-1 font-bold text-purple-700">{totals.testPassFemale}</td>
                    <td className="border border-slate-900 p-1 font-bold text-rose-700">{totals.testFailTotal}</td>
                    <td className="border border-slate-900 p-1 font-bold text-purple-700">{totals.testFailFemale}</td>
                    <td className="border border-slate-900 p-1 font-bold">{totals.dropoutTotal}</td>
                    <td className="border border-slate-900 p-1 font-bold text-purple-700">{totals.dropoutFemale}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. លទ្ធផលសិក្សាដំណាច់ឆ្នាំគិតជាភាគរយ */}
          <div className="space-y-2 mt-6 pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900">
                2. លទ្ធផលសិក្សាដំណាច់ឆ្នាំគិតជាភាគរយ
              </h3>
              <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded print:hidden">
                គណនាភាគរយស្វ័យប្រវត្តិតាមរូបមន្ត (%)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-900 text-xs text-center">
                <thead>
                  <tr className="bg-slate-50 font-bold">
                    <th rowSpan={3} className="border border-slate-900 p-1 w-[8%]">ថ្នាក់</th>
                    <th colSpan={12} className="border border-slate-900 py-1 px-2 font-bold bg-slate-100">
                      លទ្ធផលសិក្សារបស់សិស្សចាប់ពីថ្នាក់ទី១ ដល់៦
                    </th>
                  </tr>
                  <tr className="bg-slate-50 font-semibold text-[11px]">
                    <th colSpan={2} className="border border-slate-900 p-1">សរុបដំណាច់ឆ្នាំ</th>
                    <th colSpan={2} className="border border-slate-900 p-1">សរុបចុងឆ្នាំ</th>
                    <th colSpan={2} className="border border-slate-900 p-1">សរុបជាប់មធ្យមភាគ</th>
                    <th colSpan={2} className="border border-slate-900 p-1">សរុបធ្វើតេស្តជាប់</th>
                    <th colSpan={2} className="border border-slate-900 p-1">សរុបធ្វើតេស្តធ្លាក់</th>
                    <th colSpan={2} className="border border-slate-900 p-1">សរុបបោះបង់</th>
                  </tr>
                  <tr className="bg-slate-100 font-bold text-[10px]">
                    <th className="border border-slate-900 p-0.5">សរុប%</th>
                    <th className="border border-slate-900 p-0.5 text-purple-700">%ស្រី</th>
                    <th className="border border-slate-900 p-0.5">សរុប%</th>
                    <th className="border border-slate-900 p-0.5 text-purple-700">%ស្រី</th>
                    <th className="border border-slate-900 p-0.5">សរុប%</th>
                    <th className="border border-slate-900 p-0.5 text-purple-700">%ស្រី</th>
                    <th className="border border-slate-900 p-0.5">សរុប%</th>
                    <th className="border border-slate-900 p-0.5 text-purple-700">%ស្រី</th>
                    <th className="border border-slate-900 p-0.5">សរុប%</th>
                    <th className="border border-slate-900 p-0.5 text-purple-700">%ស្រី</th>
                    <th className="border border-slate-900 p-0.5">សរុប%</th>
                    <th className="border border-slate-900 p-0.5 text-purple-700">%ស្រី</th>
                  </tr>
                </thead>
                <tbody>
                  {computedPercentages.map((pRow) => (
                    <tr key={pRow.grade} className="hover:bg-slate-50/60">
                      <td className="border border-slate-900 font-bold bg-slate-50 p-1">{pRow.grade}</td>
                      <td className="border border-slate-900 p-1 font-medium">{pRow.semEndTotalPercent}%</td>
                      <td className="border border-slate-900 p-1 text-purple-700">{pRow.semEndFemalePercent}%</td>
                      <td className="border border-slate-900 p-1 font-medium">{pRow.yearEndTotalPercent}%</td>
                      <td className="border border-slate-900 p-1 text-purple-700">{pRow.yearEndFemalePercent}%</td>
                      <td className="border border-slate-900 p-1 font-semibold text-emerald-700">{pRow.averagePassTotalPercent}%</td>
                      <td className="border border-slate-900 p-1 text-purple-700">{pRow.averagePassFemalePercent}%</td>
                      <td className="border border-slate-900 p-1">{pRow.testPassTotalPercent}%</td>
                      <td className="border border-slate-900 p-1 text-purple-700">{pRow.testPassFemalePercent}%</td>
                      <td className="border border-slate-900 p-1 text-rose-600">{pRow.testFailTotalPercent}%</td>
                      <td className="border border-slate-900 p-1 text-purple-700">{pRow.testFailFemalePercent}%</td>
                      <td className="border border-slate-900 p-1 text-slate-500">{pRow.dropoutTotalPercent}%</td>
                      <td className="border border-slate-900 p-1 text-purple-700">{pRow.dropoutFemalePercent}%</td>
                    </tr>
                  ))}
                  {/* Total Percentages Row */}
                  <tr className="bg-amber-50/80 font-bold">
                    <td className="border border-slate-900 p-1">សរុបរួម</td>
                    <td className="border border-slate-900 p-1 text-blue-900">{totalPercentages.semEndTotalPercent}%</td>
                    <td className="border border-slate-900 p-1 text-purple-700">{totalPercentages.semEndFemalePercent}%</td>
                    <td className="border border-slate-900 p-1 text-blue-900">{totalPercentages.yearEndTotalPercent}%</td>
                    <td className="border border-slate-900 p-1 text-purple-700">{totalPercentages.yearEndFemalePercent}%</td>
                    <td className="border border-slate-900 p-1 text-emerald-800">{totalPercentages.averagePassTotalPercent}%</td>
                    <td className="border border-slate-900 p-1 text-purple-700">{totalPercentages.averagePassFemalePercent}%</td>
                    <td className="border border-slate-900 p-1">{totalPercentages.testPassTotalPercent}%</td>
                    <td className="border border-slate-900 p-1 text-purple-700">{totalPercentages.testPassFemalePercent}%</td>
                    <td className="border border-slate-900 p-1 text-rose-700">{totalPercentages.testFailTotalPercent}%</td>
                    <td className="border border-slate-900 p-1 text-purple-700">{totalPercentages.testFailFemalePercent}%</td>
                    <td className="border border-slate-900 p-1">{totalPercentages.dropoutTotalPercent}%</td>
                    <td className="border border-slate-900 p-1 text-purple-700">{totalPercentages.dropoutFemalePercent}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-3 border-t border-slate-200 text-right text-xs text-slate-400">
        ទំព័រទី ៣ (Page 3)
      </div>
    </div>
  );
};
