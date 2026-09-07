'use client';

import React from 'react';
import { YearEndHeader } from './YearEndHeader';
import { YearEndReportState, GradeStudentCount } from '@/lib/year-end-data';

interface YearEndPage1Props {
  data: YearEndReportState;
  onChange: (updater: (prev: YearEndReportState) => YearEndReportState) => void;
}

export const YearEndPage1: React.FC<YearEndPage1Props> = ({ data, onChange }) => {
  // Calculate total students and total female across all grade rows
  const sumTotalStudents = data.studentsByGrade.reduce((acc, g) => acc + (Number(g.total) || 0), 0);
  const sumFemaleStudents = data.studentsByGrade.reduce((acc, g) => acc + (Number(g.female) || 0), 0);
  const sumChange = data.studentsByGrade.reduce((acc, g) => acc + (Number(g.change) || 0), 0);
  const sumMigrated = data.studentsByGrade.reduce((acc, g) => acc + (Number(g.migratedCount) || 0), 0);
  const sumTransferIn = data.studentsByGrade.reduce((acc, g) => acc + (Number(g.transferInCount) || 0), 0);

  const updateGradeRow = (index: number, field: keyof GradeStudentCount, val: any) => {
    onChange((prev) => {
      const updated = [...prev.studentsByGrade];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, studentsByGrade: updated };
    });
  };

  return (
    <div className="bg-white shadow-sm border border-slate-300 rounded-lg p-6 sm:p-10 mb-8 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none text-slate-800 text-sm leading-relaxed">
      <YearEndHeader
        data={data}
        onChange={onChange}
      />

      <div className="mt-6 space-y-5">
        {/* I. ការប្រែប្រួលខាងបរិមាណ */}
        <div>
          <h2 className="font-bold text-base text-slate-900 border-b border-slate-200 pb-1 mb-3">
            I. ការប្រែប្រួលខាងបរិមាណ
          </h2>

          {/* 1. សាលារៀន */}
          <div className="space-y-2 pl-2">
            <h3 className="font-bold text-slate-900">1. សាលារៀន</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-800">
              <li className="flex flex-wrap items-center gap-x-2">
                <span>សាលារៀនសរុប :</span>
                <input
                  type="number"
                  value={data.schoolTotal}
                  onChange={(e) => onChange((p) => ({ ...p, schoolTotal: Number(e.target.value) || 0 }))}
                  className="w-14 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
                />
                <span>ទីប្រជុំជន :</span>
                <input
                  type="number"
                  value={data.schoolUrban}
                  onChange={(e) => onChange((p) => ({ ...p, schoolUrban: Number(e.target.value) || 0 }))}
                  className="w-12 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
                />
                <span>តំបន់ធម្មតា :</span>
                <input
                  type="number"
                  value={data.schoolNormal}
                  onChange={(e) => onChange((p) => ({ ...p, schoolNormal: Number(e.target.value) || 0 }))}
                  className="w-12 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
                />
                <span>តំបន់ដាច់ស្រយាល/តំបន់ជួបការលំបាក :</span>
                <input
                  type="number"
                  value={data.schoolRemote}
                  onChange={(e) => onChange((p) => ({ ...p, schoolRemote: Number(e.target.value) || 0 }))}
                  className="w-12 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
                />
              </li>

              <li className="space-y-1">
                <div className="flex items-center gap-2">
                  <span>ចំនួនអង្គការ :</span>
                  <input
                    type="number"
                    value={data.orgCount}
                    onChange={(e) => onChange((p) => ({ ...p, orgCount: Number(e.target.value) || 0 }))}
                    className="w-14 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
                  />
                  <span>ឈ្មោះអង្គការ ៖</span>
                </div>
                <textarea
                  rows={2}
                  value={data.orgNames}
                  onChange={(e) => onChange((p) => ({ ...p, orgNames: e.target.value }))}
                  className="w-full text-xs p-1.5 bg-slate-50 border border-slate-300 rounded focus:bg-white leading-relaxed"
                />
              </li>

              <li className="flex flex-wrap items-center gap-x-2">
                <span>ចំនួនបន្ទប់សរុប :</span>
                <input
                  type="number"
                  value={data.roomsTotal}
                  onChange={(e) => onChange((p) => ({ ...p, roomsTotal: Number(e.target.value) || 0 }))}
                  className="w-14 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
                />
                <span>ចំនួនបន្ទប់បង្រៀន :</span>
                <input
                  type="number"
                  value={data.roomsTeaching}
                  onChange={(e) => onChange((p) => ({ ...p, roomsTeaching: Number(e.target.value) || 0 }))}
                  className="w-14 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
                />
                <span>ចំនួនបន្ទប់មិនបង្រៀន :</span>
                <input
                  type="number"
                  value={data.roomsNonTeaching}
                  onChange={(e) => onChange((p) => ({ ...p, roomsNonTeaching: Number(e.target.value) || 0 }))}
                  className="w-12 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white"
                />
                <span>។</span>
              </li>
            </ul>
          </div>

          {/* 2. សិស្សប្រៀបធៀបឆមាស១ */}
          <div className="mt-5 pl-2 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900">2. សិស្សប្រៀបធៀបឆមាស១</h3>
              <span className="text-xs text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded print:hidden">
                បូកស្វ័យប្រវត្តិតាមថ្នាក់ (Auto-summed)
              </span>
            </div>

            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              {/* សរុបរួម */}
              <li className="font-bold text-slate-900 bg-amber-50/70 p-1.5 rounded border border-amber-200/80">
                <span className="text-blue-900">សិស្សសរុបរួមៈ</span>{' '}
                <span className="text-emerald-700 text-base">{sumTotalStudents}</span> នាក់{' '}
                <span>ស្រី:</span> <span className="text-emerald-700 text-base">{sumFemaleStudents}</span> នាក់{' '}
                <span>កើន/ថយ</span> <span>{sumChange}</span>{' '}
                <span>មូលហេតុ ០</span>{' '}
                <span>ចំណាកស្រុក {sumMigrated}</span>{' '}
                <span>ផ្ទេរចូល {sumTransferIn}</span>
              </li>

              {/* Grade details */}
              {data.studentsByGrade.map((gradeRow, idx) => (
                <li key={gradeRow.gradeId} className="flex flex-wrap items-center gap-x-1.5 gap-y-1 py-0.5">
                  <span className="font-medium text-slate-800 min-w-[170px]">
                    សិស្សសរុប{gradeRow.gradeLabel} :
                  </span>
                  <input
                    type="number"
                    value={gradeRow.total}
                    onChange={(e) => updateGradeRow(idx, 'total', Number(e.target.value) || 0)}
                    className="w-12 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
                  />
                  <span>ស្រី:</span>
                  <input
                    type="number"
                    value={gradeRow.female}
                    onChange={(e) => updateGradeRow(idx, 'female', Number(e.target.value) || 0)}
                    className="w-12 px-1 text-center font-semibold text-purple-700 bg-slate-50 border border-slate-300 rounded focus:bg-white"
                  />
                  <span>កើន/ថយ</span>
                  <input
                    type="number"
                    value={gradeRow.change}
                    onChange={(e) => updateGradeRow(idx, 'change', Number(e.target.value) || 0)}
                    className="w-10 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white text-xs"
                  />
                  <span>មូលហេតុ</span>
                  <input
                    type="text"
                    value={gradeRow.reason || '០'}
                    onChange={(e) => updateGradeRow(idx, 'reason', e.target.value)}
                    className="w-10 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white text-xs"
                  />
                  <span>ចំណាកស្រុក</span>
                  <input
                    type="number"
                    value={gradeRow.migratedCount}
                    onChange={(e) => updateGradeRow(idx, 'migratedCount', Number(e.target.value) || 0)}
                    className="w-10 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white text-xs"
                  />
                  <span>ផ្ទេរចូល</span>
                  <input
                    type="number"
                    value={gradeRow.transferInCount}
                    onChange={(e) => updateGradeRow(idx, 'transferInCount', Number(e.target.value) || 0)}
                    className="w-10 px-1 text-center bg-slate-50 border border-slate-300 rounded focus:bg-white text-xs"
                  />
                </li>
              ))}
            </ul>

            <div className="text-xs text-slate-500 italic mt-2">
              <input
                type="text"
                value={data.studentsNote}
                onChange={(e) => onChange((p) => ({ ...p, studentsNote: e.target.value }))}
                className="w-full bg-transparent border-b border-dashed border-slate-300 px-1 text-slate-600 focus:bg-white"
              />
            </div>
          </div>

          {/* 3. ចំនួនថ្នាក់តាមកម្រិត (Part 1 on Page 1) */}
          <div className="mt-5 pl-2 space-y-2">
            <h3 className="font-bold text-slate-900">3. ចំនួនថ្នាក់តាមកម្រិត</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-800">
              <li className="flex items-center gap-2">
                <span className="min-w-[120px]">ថ្នាក់មត្តេយ្យ :</span>
                <input
                  type="number"
                  value={data.classesKindergarten}
                  onChange={(e) => onChange((p) => ({ ...p, classesKindergarten: Number(e.target.value) || 0 }))}
                  className="w-12 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
                />
                <span>ថ្នាក់</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="min-w-[120px]">ថ្នាក់ទី១ :</span>
                <input
                  type="number"
                  value={data.classesG1}
                  onChange={(e) => onChange((p) => ({ ...p, classesG1: Number(e.target.value) || 0 }))}
                  className="w-12 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
                />
                <span>ថ្នាក់</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="min-w-[120px]">ថ្នាក់ទី២ :</span>
                <input
                  type="number"
                  value={data.classesG2}
                  onChange={(e) => onChange((p) => ({ ...p, classesG2: Number(e.target.value) || 0 }))}
                  className="w-12 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
                />
                <span>ថ្នាក់</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="min-w-[120px]">ថ្នាក់ទី៣ :</span>
                <input
                  type="number"
                  value={data.classesG3}
                  onChange={(e) => onChange((p) => ({ ...p, classesG3: Number(e.target.value) || 0 }))}
                  className="w-12 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
                />
                <span>ថ្នាក់</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="min-w-[120px]">ថ្នាក់ទី៤ :</span>
                <input
                  type="number"
                  value={data.classesG4}
                  onChange={(e) => onChange((p) => ({ ...p, classesG4: Number(e.target.value) || 0 }))}
                  className="w-12 px-1 text-center font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white"
                />
                <span>ថ្នាក់</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-3 border-t border-slate-200 text-right text-xs text-slate-400">
        ទំព័រទី ១ (Page 1)
      </div>
    </div>
  );
};
