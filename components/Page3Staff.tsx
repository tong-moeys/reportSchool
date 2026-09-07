'use client';

import React from 'react';
import { ReportHeader } from './ReportHeader';
import { ReportSignatures } from './ReportSignatures';
import { ReportState, StaffMember } from '@/lib/report-data';

interface Page3StaffProps {
  data: ReportState;
  onChange: (updater: (prev: ReportState) => ReportState) => void;
}

export const Page3Staff: React.FC<Page3StaffProps> = ({ data, onChange }) => {
  const updateAdmin = (index: number, field: keyof StaffMember, value: string) => {
    onChange((p) => {
      const updated = [...p.adminStaff];
      updated[index] = { ...updated[index], [field]: value };
      return { ...p, adminStaff: updated };
    });
  };

  const updateTeacher = (index: number, field: keyof StaffMember, value: unknown) => {
    onChange((p) => {
      const updated = [...p.teachingStaff];
      updated[index] = { ...updated[index], [field]: value };
      return { ...p, teachingStaff: updated };
    });
  };

  // Group 1: index 0 to 11 (04 - 15)
  const group1 = data.teachingStaff.slice(0, 12);
  const group1Students = group1.reduce((acc, t) => acc + (Number(t.studentsTotal) || 0), 0);
  const group1Females = group1.reduce((acc, t) => acc + (Number(t.studentsFemale) || 0), 0);

  // Group 2: index 12 to end (16, 17)
  const group2 = data.teachingStaff.slice(12);
  const group2Students = group2.reduce((acc, t) => acc + (Number(t.studentsTotal) || 0), 0);
  const group2Females = group2.reduce((acc, t) => acc + (Number(t.studentsFemale) || 0), 0);

  // Grand totals
  const totalTeacherStudents = group1Students + group2Students;
  const totalTeacherFemales = group1Females + group2Females;

  return (
    <article className="page-container bg-white p-3 sm:p-6 rounded-xl shadow-xs border border-slate-200 print:border-none print:shadow-none print:p-0 max-w-5xl mx-auto my-2 sm:my-4 text-xs">
      <ReportHeader />

      <div className="text-center my-3">
        <h2 className="text-sm font-bold text-blue-900">បញ្ជីរាយនាមបុគ្គលិកឆមាសទី១ឆ្នាំសិក្សា២០២៥ - ២០២៦</h2>
        <p className="text-[11px] text-slate-500 font-medium text-right mt-1">
          (៣ដង ៖ បវេសនកាល, ឆមាសទី១ និង ឆមាសទី២)
        </p>
      </div>

      {/* Part I: Administration Staff */}
      <div className="flex items-center justify-between my-2">
        <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 text-xs">
          I - បុគ្គលិកទីចាត់ការ
        </h3>
        <span className="sm:hidden text-[10px] text-slate-400">↔ អូសផ្ដេកដើម្បីមើលតារាង</span>
      </div>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
          <thead>
            <tr>
              <th className="w-10">ល.រ</th>
              <th className="w-36">នាមត្រកូល.នាម</th>
              <th className="w-12">ភេទ</th>
              <th className="w-24">ក្របខ័ណ្ឌ</th>
              <th className="w-28">កម្រិតវប្បធម៌</th>
              <th className="w-28">មុខងារ</th>
              <th className="w-28">លេខទូរស័ព្ទ</th>
              <th>ផ្សេងៗ</th>
            </tr>
          </thead>
          <tbody>
            {data.adminStaff.map((staff, idx) => (
              <tr key={staff.id} className="text-center">
                <td className="font-medium">{staff.no}</td>
                <td className="text-left font-semibold">
                  <input
                    type="text"
                    value={staff.name}
                    onChange={(e) => updateAdmin(idx, 'name', e.target.value)}
                    className="editable-cell editable-cell-left w-full"
                  />
                </td>
                <td>
                  <select
                    value={staff.gender}
                    onChange={(e) => updateAdmin(idx, 'gender', e.target.value)}
                    className="bg-transparent border-none text-center font-medium"
                  >
                    <option value="ស">ស</option>
                    <option value="ប">ប</option>
                  </select>
                </td>
                <td>{staff.framework}</td>
                <td>
                  <input
                    type="text"
                    value={staff.education}
                    onChange={(e) => updateAdmin(idx, 'education', e.target.value)}
                    className="editable-cell w-full text-center"
                  />
                </td>
                <td className="font-semibold text-blue-900">
                  <input
                    type="text"
                    value={staff.roleOrGrade}
                    onChange={(e) => updateAdmin(idx, 'roleOrGrade', e.target.value)}
                    className="editable-cell w-full text-center"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={staff.phone}
                    onChange={(e) => updateAdmin(idx, 'phone', e.target.value)}
                    className="editable-cell w-full text-center font-mono text-xs"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={staff.notes}
                    onChange={(e) => updateAdmin(idx, 'notes', e.target.value)}
                    className="editable-cell w-full text-left"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Part II: Teaching Staff */}
      <div className="flex items-center justify-between my-2">
        <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 text-xs">
          II - បុគ្គលិកបង្រៀន
        </h3>
        <span className="sm:hidden text-[10px] text-slate-400">↔ អូសផ្ដេកដើម្បីមើលតារាង</span>
      </div>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
          <thead>
            <tr>
              <th rowSpan={2} className="w-10">ល.រ</th>
              <th rowSpan={2} className="w-36">នាមត្រកូល.នាម</th>
              <th rowSpan={2} className="w-12">ភេទ</th>
              <th rowSpan={2} className="w-24">ក្របខ័ណ្ឌ</th>
              <th rowSpan={2} className="w-28">កម្រិតវប្បធម៌</th>
              <th rowSpan={2} className="w-16">ថ្នាក់</th>
              <th colSpan={2}>ចំនួនសិស្ស</th>
              <th colSpan={2}>វេន</th>
              <th rowSpan={2} className="w-28">លេខទូរស័ព្ទ</th>
              <th rowSpan={2}>ផ្សេងៗ</th>
            </tr>
            <tr className="text-[10px]">
              <th className="w-14">សរុប</th>
              <th className="w-12">ស្រី</th>
              <th className="w-10">ព្រឹក</th>
              <th className="w-10">ល្ងាច</th>
            </tr>
          </thead>
          <tbody>
            {/* Group 1: 04 - 15 */}
            {group1.map((teacher, idx) => (
              <tr key={teacher.id} className="text-center">
                <td className="font-medium">{teacher.no}</td>
                <td className="text-left font-semibold">
                  <input
                    type="text"
                    value={teacher.name}
                    onChange={(e) => updateTeacher(idx, 'name', e.target.value)}
                    className="editable-cell editable-cell-left w-full"
                  />
                </td>
                <td>
                  <select
                    value={teacher.gender}
                    onChange={(e) => updateTeacher(idx, 'gender', e.target.value)}
                    className="bg-transparent border-none text-center font-medium"
                  >
                    <option value="ស">ស</option>
                    <option value="ប">ប</option>
                  </select>
                </td>
                <td>{teacher.framework}</td>
                <td>
                  <select
                    value={teacher.education}
                    onChange={(e) => updateTeacher(idx, 'education', e.target.value)}
                    className="bg-transparent border border-slate-200 rounded text-xs px-1"
                  >
                    <option value="ស.ទុតិយភូមិ">ស.ទុតិយភូមិ</option>
                    <option value="បរិញ្ញាបត្រ">បរិញ្ញាបត្រ</option>
                    <option value="ស.បឋមភូមិ">ស.បឋមភូមិ</option>
                    <option value="ថ្នាក់ទី១២">ថ្នាក់ទី១២</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={teacher.roleOrGrade}
                    onChange={(e) => updateTeacher(idx, 'roleOrGrade', e.target.value)}
                    className="editable-cell w-12 text-center font-semibold text-blue-900"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={teacher.studentsTotal || 0}
                    onChange={(e) => updateTeacher(idx, 'studentsTotal', Number(e.target.value) || 0)}
                    className="editable-cell w-10 text-center font-medium"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={teacher.studentsFemale || 0}
                    onChange={(e) => updateTeacher(idx, 'studentsFemale', Number(e.target.value) || 0)}
                    className="editable-cell w-10 text-center"
                  />
                </td>
                <td className="text-emerald-700 font-bold">
                  <input
                    type="checkbox"
                    checked={!!teacher.shiftMorning}
                    onChange={(e) => updateTeacher(idx, 'shiftMorning', e.target.checked)}
                    className="accent-blue-600 rounded"
                  />
                </td>
                <td className="text-emerald-700 font-bold">
                  <input
                    type="checkbox"
                    checked={!!teacher.shiftAfternoon}
                    onChange={(e) => updateTeacher(idx, 'shiftAfternoon', e.target.checked)}
                    className="accent-blue-600 rounded"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={teacher.phone}
                    onChange={(e) => updateTeacher(idx, 'phone', e.target.value)}
                    className="editable-cell w-full text-center font-mono text-xs"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={teacher.notes}
                    onChange={(e) => updateTeacher(idx, 'notes', e.target.value)}
                    className="editable-cell w-full text-left"
                  />
                </td>
              </tr>
            ))}

            {/* Subtotal Row 1 */}
            <tr className="bg-slate-100 font-bold text-center">
              <td colSpan={6} className="text-center font-bold">សរុប (ជួរទី១)</td>
              <td className="text-blue-900 font-bold">{group1Students}</td>
              <td className="text-blue-900 font-bold">{group1Females}</td>
              <td colSpan={4}></td>
            </tr>

            {/* Group 2: 16, 17 */}
            {group2.map((teacher, idx) => {
              const actualIdx = 12 + idx;
              return (
                <tr key={teacher.id} className="text-center">
                  <td className="font-medium">{teacher.no}</td>
                  <td className="text-left font-semibold">
                    <input
                      type="text"
                      value={teacher.name}
                      onChange={(e) => updateTeacher(actualIdx, 'name', e.target.value)}
                      className="editable-cell editable-cell-left w-full"
                    />
                  </td>
                  <td>
                    <select
                      value={teacher.gender}
                      onChange={(e) => updateTeacher(actualIdx, 'gender', e.target.value)}
                      className="bg-transparent border-none text-center font-medium"
                    >
                      <option value="ស">ស</option>
                      <option value="ប">ប</option>
                    </select>
                  </td>
                  <td>{teacher.framework}</td>
                  <td>
                    <select
                      value={teacher.education}
                      onChange={(e) => updateTeacher(actualIdx, 'education', e.target.value)}
                      className="bg-transparent border border-slate-200 rounded text-xs px-1"
                    >
                      <option value="ស.ទុតិយភូមិ">ស.ទុតិយភូមិ</option>
                      <option value="បរិញ្ញាបត្រ">បរិញ្ញាបត្រ</option>
                      <option value="ស.បឋមភូមិ">ស.បឋមភូមិ</option>
                      <option value="ថ្នាក់ទី១២">ថ្នាក់ទី១២</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={teacher.roleOrGrade}
                      onChange={(e) => updateTeacher(actualIdx, 'roleOrGrade', e.target.value)}
                      className="editable-cell w-12 text-center font-semibold text-blue-900"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={teacher.studentsTotal || 0}
                      onChange={(e) => updateTeacher(actualIdx, 'studentsTotal', Number(e.target.value) || 0)}
                      className="editable-cell w-10 text-center font-medium"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={teacher.studentsFemale || 0}
                      onChange={(e) => updateTeacher(actualIdx, 'studentsFemale', Number(e.target.value) || 0)}
                      className="editable-cell w-10 text-center"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!teacher.shiftMorning}
                      onChange={(e) => updateTeacher(actualIdx, 'shiftMorning', e.target.checked)}
                      className="accent-blue-600 rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!teacher.shiftAfternoon}
                      onChange={(e) => updateTeacher(actualIdx, 'shiftAfternoon', e.target.checked)}
                      className="accent-blue-600 rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={teacher.phone}
                      onChange={(e) => updateTeacher(actualIdx, 'phone', e.target.value)}
                      className="editable-cell w-full text-center font-mono text-xs"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={teacher.notes}
                      onChange={(e) => updateTeacher(actualIdx, 'notes', e.target.value)}
                      className="editable-cell w-full text-left"
                    />
                  </td>
                </tr>
              );
            })}

            {/* Subtotal Row 2 */}
            <tr className="bg-slate-100 font-bold text-center">
              <td colSpan={6} className="text-center font-bold">សរុប (ជួរទី២)</td>
              <td className="text-blue-900 font-bold">{group2Students}</td>
              <td className="text-blue-900 font-bold">{group2Females}</td>
              <td colSpan={4}></td>
            </tr>

            {/* Grand Total Row */}
            <tr className="bg-blue-100 font-bold text-center text-blue-950">
              <td colSpan={6} className="text-center font-bold">សរុបរួម</td>
              <td className="text-blue-900 font-bold">{totalTeacherStudents}</td>
              <td className="text-blue-900 font-bold">{totalTeacherFemales}</td>
              <td colSpan={4}></td>
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
