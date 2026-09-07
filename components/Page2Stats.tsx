'use client';

import React from 'react';
import { ReportHeader } from './ReportHeader';
import { ReportSignatures } from './ReportSignatures';
import { ReportState } from '@/lib/report-data';

interface Page2StatsProps {
  data: ReportState;
  onChange: (updater: (prev: ReportState) => ReportState) => void;
}

export const Page2Stats: React.FC<Page2StatsProps> = ({ data, onChange }) => {
  // Compute totals for Page 2
  const g1 = data.gradeComparisons.find((g) => g.grade === 1) || { total: 30, female: 14 };
  const g2 = data.gradeComparisons.find((g) => g.grade === 2) || { total: 42, female: 21 };
  const g3 = data.gradeComparisons.find((g) => g.grade === 3) || { total: 42, female: 20 };
  const g4 = data.gradeComparisons.find((g) => g.grade === 4) || { total: 49, female: 21 };
  const g5 = data.gradeComparisons.find((g) => g.grade === 5) || { total: 50, female: 23 };
  const g6 = data.gradeComparisons.find((g) => g.grade === 6) || { total: 35, female: 17 };

  const totalClasses =
    Number(data.classCounts.g1) +
    Number(data.classCounts.g2) +
    Number(data.classCounts.g3) +
    Number(data.classCounts.g4) +
    Number(data.classCounts.g5) +
    Number(data.classCounts.g6) +
    Number(data.classCounts.multi);

  const totalStudents = g1.total + g2.total + g3.total + g4.total + g5.total + g6.total;
  const totalFemales = g1.female + g2.female + g3.female + g4.female + g5.female + g6.female;

  const totalPass = data.results.reduce((acc, r) => acc + (Number(r.passTotal) || 0), 0);
  const totalFail = data.results.reduce((acc, r) => acc + (Number(r.failTotal) || 0), 0);
  const totalFailF = data.results.reduce((acc, r) => acc + (Number(r.failFemale) || 0), 0);

  return (
    <article className="page-container bg-white p-3 sm:p-6 rounded-xl shadow-xs border border-slate-200 print:border-none print:shadow-none print:p-0 max-w-5xl mx-auto my-2 sm:my-4 text-xs">
      <ReportHeader continuation={true} />

      {/* 1. School, Building & Student Statistics Table */}
      <div className="flex items-center justify-between my-2">
        <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 text-xs">
          ១. តារាងស្ថិតិសាលារៀន អគារ និងសិស្ស
        </h3>
        <span className="sm:hidden text-[10px] text-slate-400">↔ អូសផ្ដេកដើម្បីមើលតារាង</span>
      </div>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
          <thead>
            <tr>
              <th rowSpan={2} className="w-8">ល.រ</th>
              <th rowSpan={2} className="w-20">ឈ្មោះសាលា</th>
              <th rowSpan={2} className="w-12">អគារ</th>
              <th colSpan={3}>ចំនួនបន្ទប់</th>
              <th colSpan={3}>ថ្នាក់ទី១</th>
              <th colSpan={3}>ថ្នាក់ទី២</th>
              <th colSpan={3}>ថ្នាក់ទី៣</th>
              <th colSpan={3}>ថ្នាក់ទី៤</th>
              <th colSpan={3}>ថ្នាក់ទី៥</th>
              <th colSpan={3}>ថ្នាក់ទី៦</th>
              <th colSpan={3}>សរុបរួម</th>
            </tr>
            <tr className="text-[10px]">
              <th>ប.បរ</th><th>ផ្សេងៗ</th><th>សរុប</th>
              <th>ថ្នាក់</th><th>សរុប</th><th>ស្រី</th>
              <th>ថ្នាក់</th><th>សរុប</th><th>ស្រី</th>
              <th>ថ្នាក់</th><th>សរុប</th><th>ស្រី</th>
              <th>ថ្នាក់</th><th>សរុប</th><th>ស្រី</th>
              <th>ថ្នាក់</th><th>សរុប</th><th>ស្រី</th>
              <th>ថ្នាក់</th><th>សរុប</th><th>ស្រី</th>
              <th>ថ្នាក់</th><th>សរុប</th><th>ស្រី</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td>1</td>
              <td className="font-medium">សាលារោគ</td>
              <td>4</td>
              <td>{data.teachingRooms}</td>
              <td>{data.nonTeachingRooms}</td>
              <td className="font-bold">{data.totalRooms}</td>

              {/* Grade 1 */}
              <td>{data.classCounts.g1}</td>
              <td className="font-medium">{g1.total}</td>
              <td>{g1.female}</td>

              {/* Grade 2 */}
              <td>{data.classCounts.g2}</td>
              <td className="font-medium">{g2.total}</td>
              <td>{g2.female}</td>

              {/* Grade 3 */}
              <td>{data.classCounts.g3}</td>
              <td className="font-medium">{g3.total}</td>
              <td>{g3.female}</td>

              {/* Grade 4 */}
              <td>{data.classCounts.g4}</td>
              <td className="font-medium">{g4.total}</td>
              <td>{g4.female}</td>

              {/* Grade 5 */}
              <td>{data.classCounts.g5}</td>
              <td className="font-medium">{g5.total}</td>
              <td>{g5.female}</td>

              {/* Grade 6 */}
              <td>{data.classCounts.g6}</td>
              <td className="font-medium">{g6.total}</td>
              <td>{g6.female}</td>

              {/* Totals */}
              <td className="font-bold text-blue-900">{totalClasses}</td>
              <td className="font-bold text-blue-900">{totalStudents}</td>
              <td className="font-bold text-blue-900">{totalFemales}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2. Teaching and Non-Teaching Staff Statistics Table */}
      <div className="flex items-center justify-between my-2">
        <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 text-xs">
          ២. តារាងស្ថិតិបុគ្គលិកបង្រៀន និងមិនបង្រៀន(ត)
        </h3>
        <span className="sm:hidden text-[10px] text-slate-400">↔ អូសផ្ដេកដើម្បីមើលតារាង</span>
      </div>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
          <thead>
            <tr>
              <th rowSpan={3} className="w-8">ល.រ</th>
              <th rowSpan={3} className="w-20">ឈ្មោះសាលា</th>
              <th colSpan={4}>មិនបង្រៀន</th>
              <th colSpan={10}>បុគ្គលិកបង្រៀន</th>
              <th colSpan={2} rowSpan={2}>ក្នុងនោះ</th>
              <th colSpan={2} rowSpan={2}>ជួយប.រ</th>
              <th colSpan={2} rowSpan={2}>ក្របខ័ណ្ឌសរុប</th>
            </tr>
            <tr>
              <th colSpan={2}>នាយករង</th>
              <th colSpan={2}>ទីចាត់ការ</th>
              <th colSpan={2}>បរ.សុទ្ធ</th>
              <th colSpan={2}>គូប</th>
              <th colSpan={2}>នាយករង</th>
              <th colSpan={2}>កិ.ស</th>
              <th colSpan={2}>សរុប</th>
            </tr>
            <tr className="text-[10px]">
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td>1</td>
              <td className="font-medium">សាលារោគ</td>
              {/* មិនបង្រៀន: នាយករង */}
              <td>2</td><td>1</td>
              {/* ទីចាត់ការ */}
              <td>1</td><td>0</td>
              {/* បង្រៀន: បរ.សុទ្ធ */}
              <td>10</td><td>9</td>
              {/* គូប */}
              <td>0</td><td>0</td>
              {/* នាយករងបង្រៀន */}
              <td>0</td><td>0</td>
              {/* កិ.ស */}
              <td>0</td><td>0</td>
              {/* បង្រៀនសរុប */}
              <td className="font-semibold">10</td><td className="font-semibold">9</td>
              {/* ក្នុងនោះ */}
              <td>0</td><td>0</td>
              {/* ជួយប.រ */}
              <td>4</td><td>2</td>
              {/* ក្របខ័ណ្ឌសរុប */}
              <td className="font-bold text-blue-900">{data.staffStats.total}</td>
              <td className="font-bold text-blue-900">{data.staffStats.female}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. Detailed Results Matrix */}
      <div className="flex items-center justify-between my-2">
        <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 text-xs">
          ៣. លទ្ធផលសិក្សា ឆមាសទី ១
        </h3>
        <span className="sm:hidden text-[10px] text-slate-400">↔ អូសផ្ដេកដើម្បីមើលតារាង</span>
      </div>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
          <thead>
            <tr>
              <th rowSpan={3} className="w-8">ល.រ</th>
              <th rowSpan={3} className="w-14">ថ្នាក់</th>
              <th colSpan={24}>សិស្សសរុបឆមាសទី១ ពីថ្នាក់ទី១ - ៦</th>
            </tr>
            <tr>
              <th colSpan={2}>សិស្សបវេសនកាស</th>
              <th colSpan={2}>សិស្សឆមាសទី១</th>
              <th colSpan={2}>សិស្សចូលថ្មី</th>
              <th colSpan={2}>សិស្សជាប់មធ្យម</th>
              <th colSpan={4}>សិស្សធ្លាក់ (០-៤.៩៩)</th>
              <th colSpan={4}>សិស្សធ្លាក់ (៤-៤.៩៩)</th>
              <th colSpan={4}>សិស្សបោះបង់</th>
              <th colSpan={4}>ផ្សេងៗ/សរុប</th>
            </tr>
            <tr className="text-[9.5px]">
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>%</th>
              <th>សរុប</th><th>%</th>
              <th>សរុប</th><th>%</th>
              <th>សរុប</th><th>%</th>
              <th>សរុប</th><th>%</th>
              <th>សរុប</th><th>%</th>
              <th>សរុប</th><th>%</th>
              <th>សរុប</th><th>%</th>
              <th>សរុប</th><th>%</th>
              <th>សរុប</th><th>%</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((r, idx) => {
              const passPct = r.s1Total > 0 ? ((r.passTotal / r.s1Total) * 100).toFixed(1) + '%' : '0%';
              const failPct = r.s1Total > 0 ? ((r.failTotal / r.s1Total) * 100).toFixed(1) + '%' : '0%';
              const failFPct = r.s1Female > 0 ? ((r.failFemale / r.s1Female) * 100).toFixed(1) + '%' : '0%';

              return (
                <tr key={r.grade} className="text-center">
                  <td>{idx + 1}</td>
                  <td className="font-medium">ទី{r.grade}</td>
                  {/* បវេសនកាល */}
                  <td>{r.bvesTotal}</td>
                  <td>{r.bvesFemale}</td>
                  {/* ឆមាសទី១ */}
                  <td className="font-semibold">{r.s1Total}</td>
                  <td className="font-semibold">{r.s1Female}</td>
                  {/* ចូលថ្មី */}
                  <td>{r.newTotal}</td>
                  <td>0%</td>
                  {/* ជាប់មធ្យម */}
                  <td className="font-semibold text-emerald-800">{r.passTotal}</td>
                  <td className="text-emerald-800">{passPct}</td>
                  {/* ធ្លាក់ (០-៤.៩៩) */}
                  <td className="text-rose-700">{r.failTotal}</td>
                  <td className="text-rose-700">{failPct}</td>
                  <td className="text-rose-700">{r.failFemale}</td>
                  <td className="text-rose-700">{failFPct}</td>
                  {/* ធ្លាក់ ៤-៤.៩៩ */}
                  <td>0</td><td>0%</td>
                  <td>0</td><td>0%</td>
                  {/* បោះបង់ */}
                  <td>0</td><td>0%</td>
                  <td>0</td><td>0%</td>
                  {/* ផ្សេងៗ */}
                  <td>0</td><td>0%</td>
                  <td>0</td><td>0%</td>
                </tr>
              );
            })}
            <tr className="bg-blue-50 font-bold text-center text-blue-950">
              <th>សរុប</th>
              <th></th>
              <th>{totalStudents}</th>
              <th>{totalFemales}</th>
              <th>{totalStudents}</th>
              <th>{totalFemales}</th>
              <th>0</th>
              <th>0%</th>
              <th className="text-emerald-900">{totalPass}</th>
              <th className="text-emerald-900">
                {totalStudents > 0 ? ((totalPass / totalStudents) * 100).toFixed(1) + '%' : '0%'}
              </th>
              <th className="text-rose-900">{totalFail}</th>
              <th className="text-rose-900">
                {totalStudents > 0 ? ((totalFail / totalStudents) * 100).toFixed(1) + '%' : '0%'}
              </th>
              <th className="text-rose-900">{totalFailF}</th>
              <th className="text-rose-900">
                {totalFemales > 0 ? ((totalFailF / totalFemales) * 100).toFixed(1) + '%' : '0%'}
              </th>
              <th>0</th><th>0%</th>
              <th>0</th><th>0%</th>
              <th>0</th><th>0%</th>
              <th>0</th><th>0%</th>
              <th>0</th><th>0%</th>
              <th>0</th><th>0%</th>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Signatures */}
      <ReportSignatures
        reporterName={data.reporterName}
        onReporterChange={(name) => onChange((p) => ({ ...p, reporterName: name }))}
      />
    </article>
  );
};
