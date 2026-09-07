'use client';

import React from 'react';
import { ReportHeader } from './ReportHeader';
import { ReportSignatures } from './ReportSignatures';
import { ReportState } from '@/lib/report-data';

interface Page1ReportProps {
  data: ReportState;
  onChange: (updater: (prev: ReportState) => ReportState) => void;
}

export const Page1Report: React.FC<Page1ReportProps> = ({ data, onChange }) => {
  // Helper for grade student increment/decrement
  const adjustStudentCount = (grade: number, increment: boolean) => {
    onChange((prev) => {
      const updatedGrades = prev.gradeComparisons.map((g) => {
        if (g.grade === grade) {
          const newTotal = increment ? g.total + 1 : Math.max(0, g.total - 1);
          return {
            ...g,
            total: newTotal,
            changeCount: g.changeCount + 1,
          };
        }
        return g;
      });

      // Synchronize into results table semester 1 total
      const updatedResults = prev.results.map((r) => {
        if (r.grade === grade) {
          const matched = updatedGrades.find((g) => g.grade === grade);
          const newTotal = matched?.total ?? r.s1Total;
          const newFemale = matched?.female ?? r.s1Female;
          return {
            ...r,
            bvesTotal: newTotal,
            bvesFemale: newFemale,
            s1Total: newTotal,
            s1Female: newFemale,
          };
        }
        return r;
      });

      return {
        ...prev,
        gradeComparisons: updatedGrades,
        results: updatedResults,
      };
    });
  };

  // Calculations for Summary
  const totalStudents = data.gradeComparisons.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
  const totalFemale = data.gradeComparisons.reduce((acc, curr) => acc + (Number(curr.female) || 0), 0);

  const totalClasses =
    Number(data.classCounts.g1) +
    Number(data.classCounts.g2) +
    Number(data.classCounts.g3) +
    Number(data.classCounts.g4) +
    Number(data.classCounts.g5) +
    Number(data.classCounts.g6) +
    Number(data.classCounts.multi);

  // Results calculations
  const totalS1 = data.results.reduce((acc, r) => acc + (Number(r.s1Total) || 0), 0);
  const totalS1F = data.results.reduce((acc, r) => acc + (Number(r.s1Female) || 0), 0);
  const totalPass = data.results.reduce((acc, r) => acc + (Number(r.passTotal) || 0), 0);
  const totalPassF = data.results.reduce((acc, r) => acc + (Number(r.passFemale) || 0), 0);
  const totalFail = data.results.reduce((acc, r) => acc + (Number(r.failTotal) || 0), 0);
  const totalFailF = data.results.reduce((acc, r) => acc + (Number(r.failFemale) || 0), 0);
  const totalDrop = data.results.reduce((acc, r) => acc + (Number(r.dropTotal) || 0), 0);
  const totalDropF = data.results.reduce((acc, r) => acc + (Number(r.dropFemale) || 0), 0);

  // Curriculum totals & averages
  const sumGoodS = data.curriculum.reduce((acc, c) => acc + (Number(c.goodS) || 0), 0);
  const sumGoodF = data.curriculum.reduce((acc, c) => acc + (Number(c.goodF) || 0), 0);
  const sumMidS = data.curriculum.reduce((acc, c) => acc + (Number(c.midS) || 0), 0);
  const sumMidF = data.curriculum.reduce((acc, c) => acc + (Number(c.midF) || 0), 0);
  const sumWeakS = data.curriculum.reduce((acc, c) => acc + (Number(c.weakS) || 0), 0);
  const sumWeakF = data.curriculum.reduce((acc, c) => acc + (Number(c.weakF) || 0), 0);

  const avgKhmer = Math.round(data.curriculum.reduce((acc, c) => acc + (Number(c.khmer) || 0), 0) / (data.curriculum.length || 1));
  const avgMath = Math.round(data.curriculum.reduce((acc, c) => acc + (Number(c.math) || 0), 0) / (data.curriculum.length || 1));
  const avgSocial = Math.round(data.curriculum.reduce((acc, c) => acc + (Number(c.social) || 0), 0) / (data.curriculum.length || 1));
  const avgSci = Math.round(data.curriculum.reduce((acc, c) => acc + (Number(c.science) || 0), 0) / (data.curriculum.length || 1));
  const avgEng = Math.round(data.curriculum.reduce((acc, c) => acc + (Number(c.english) || 0), 0) / (data.curriculum.length || 1));

  return (
    <article className="page-container bg-white p-3 sm:p-6 rounded-xl shadow-xs border border-slate-200 print:border-none print:shadow-none print:p-0 max-w-5xl mx-auto my-2 sm:my-4 text-xs">
      <ReportHeader />

      {/* SECTION I */}
      <h2 className="bg-blue-700 text-white font-bold px-3 py-1.5 rounded text-xs mb-2 mt-4 tracking-wide">
        I. បម្រែបម្រួលផ្នែកបរិមាណ
      </h2>

      {/* 1. Schools */}
      <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 my-2 text-xs">
        ១. សាលារៀន
      </h3>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
        <tbody>
          <tr>
            <td className="w-36 font-medium">ចំនួនកម្រងសាលារៀន :</td>
            <td className="w-12 text-center">
              <input
                type="number"
                value={data.clusterCount}
                onChange={(e) => onChange((p) => ({ ...p, clusterCount: Number(e.target.value) || 0 }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>កម្រង</td>
            <td>ទីប្រជុំជន</td>
            <td className="text-center">
              <input
                type="number"
                value={data.urbanCount}
                onChange={(e) => onChange((p) => ({ ...p, urbanCount: Number(e.target.value) || 0 }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>ធម្មតា</td>
            <td className="text-center">
              <input
                type="number"
                value={data.normalCount}
                onChange={(e) => onChange((p) => ({ ...p, normalCount: Number(e.target.value) || 0 }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>ដាច់ស្រយាល</td>
            <td className="text-center">
              <input
                type="number"
                value={data.remoteCount}
                onChange={(e) => onChange((p) => ({ ...p, remoteCount: Number(e.target.value) || 0 }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>មិនធម្មតា</td>
            <td className="text-center">
              <input
                type="number"
                value={data.irregularCount}
                onChange={(e) => onChange((p) => ({ ...p, irregularCount: Number(e.target.value) || 0 }))}
                className="editable-cell w-10 text-center"
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium">ចំនួនសាលារៀន បិទទ្វារ :</td>
            <td className="text-center">
              <input
                type="number"
                value={data.closedCount}
                onChange={(e) => onChange((p) => ({ ...p, closedCount: Number(e.target.value) || 0 }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>សាលា</td>
            <td colSpan={2}>មូលហេតុដែលបិទ :</td>
            <td colSpan={6}>
              <input
                type="text"
                value={data.closedReason}
                onChange={(e) => onChange((p) => ({ ...p, closedReason: e.target.value }))}
                className="editable-cell w-full text-left"
              />
            </td>
          </tr>
          <tr>
            <td className="font-medium">ចំនួនសាលារៀន មានគ្រប់កម្រិតថ្នាក់ :</td>
            <td className="text-center">
              <input
                type="number"
                value={data.completeGradeCount}
                onChange={(e) => onChange((p) => ({ ...p, completeGradeCount: Number(e.target.value) || 0 }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td colSpan={2}>សាលា</td>
            <td colSpan={4}>ចំនួនសាលារៀន មិនមានគ្រប់កម្រិតថ្នាក់ :</td>
            <td className="text-center">
              <input
                type="number"
                value={data.incompleteGradeCount}
                onChange={(e) => onChange((p) => ({ ...p, incompleteGradeCount: Number(e.target.value) || 0 }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td colSpan={2}>សាលា</td>
          </tr>
          <tr>
            <td className="font-medium">ចំនួនបន្ទប់ សរុប :</td>
            <td className="text-center font-bold">{data.totalRooms}</td>
            <td>បន្ទប់</td>
            <td colSpan={2}>បន្ទប់បង្រៀន</td>
            <td className="text-center">
              <input
                type="number"
                value={data.teachingRooms}
                onChange={(e) => {
                  const val = Number(e.target.value) || 0;
                  onChange((p) => ({ ...p, teachingRooms: val, totalRooms: val + p.nonTeachingRooms }));
                }}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>បន្ទប់</td>
            <td colSpan={2}>បន្ទប់មិនបង្រៀន</td>
            <td className="text-center">
              <input
                type="number"
                value={data.nonTeachingRooms}
                onChange={(e) => {
                  const val = Number(e.target.value) || 0;
                  onChange((p) => ({ ...p, nonTeachingRooms: val, totalRooms: p.teachingRooms + val }));
                }}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>បន្ទប់</td>
          </tr>
        </tbody>
      </table>
      </div>

      {/* 2. Compare Students */}
      <div className="flex items-center justify-between my-2">
        <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 text-xs">
          ២. ប្រៀបធៀបចំនួនសិស្ស បវេសនកាល
        </h3>
        <span className="sm:hidden text-[10px] text-slate-400">↔ អូសផ្ដេកដើម្បីមើលតារាង</span>
      </div>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
        <tbody>
          <tr className="bg-slate-100 font-bold">
            <td className="w-40 font-bold">ចំនួនសិស្សសរុបរួម :</td>
            <td className="w-14 text-center font-bold text-blue-800">{totalStudents}</td>
            <td className="w-16">នាក់ ស្រី :</td>
            <td className="w-14 text-center font-bold text-blue-800">{totalFemale}</td>
            <td className="w-10">នាក់</td>
            <td colSpan={6} className="text-slate-400"></td>
          </tr>
          {data.gradeComparisons.map((g, idx) => (
            <tr key={g.grade}>
              <td className="font-medium">សិស្សសរុបថ្នាក់ទី{g.grade} :</td>
              <td className="text-center">
                <input
                  type="number"
                  value={g.total}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.gradeComparisons];
                      updated[idx] = { ...updated[idx], total: val };
                      return { ...p, gradeComparisons: updated };
                    });
                  }}
                  className="editable-cell w-12 text-center"
                />
              </td>
              <td>នាក់ ស្រី :</td>
              <td className="text-center">
                <input
                  type="number"
                  value={g.female}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.gradeComparisons];
                      updated[idx] = { ...updated[idx], female: val };
                      return { ...p, gradeComparisons: updated };
                    });
                  }}
                  className="editable-cell w-12 text-center"
                />
              </td>
              <td>នាក់</td>
              <td className="no-print">
                <div className="flex gap-1 justify-center">
                  <button
                    type="button"
                    onClick={() => adjustStudentCount(g.grade, true)}
                    className="px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-200 active:scale-95"
                  >
                    កើន
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustStudentCount(g.grade, false)}
                    className="px-1.5 py-0.5 rounded text-[10px] bg-rose-100 text-rose-700 hover:bg-rose-200 active:scale-95"
                  >
                    ថយ
                  </button>
                </div>
              </td>
              <td className="text-center font-semibold text-slate-700">{g.changeCount}</td>
              <td className="w-24">នាក់ / មូលហេតុ</td>
              <td>
                <select
                  value={g.reason}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange((p) => {
                      const updated = [...p.gradeComparisons];
                      updated[idx] = { ...updated[idx], reason: val };
                      return { ...p, gradeComparisons: updated };
                    });
                  }}
                  className="bg-transparent border border-slate-300 rounded px-1 text-xs"
                >
                  <option value="----">----</option>
                  <option value="ផ្ទេរចូល">ផ្ទេរចូល</option>
                  <option value="ផ្ទេរចេញ">ផ្ទេរចេញ</option>
                  <option value="ប្ដូរទីលំនៅ">ប្ដូរទីលំនៅ</option>
                  <option value="ឈឺ">ឈឺ</option>
                  <option value="ស្លាប់">ស្លាប់</option>
                </select>
              </td>
              <td className="text-center">
                <input
                  type="number"
                  value={g.causeCount}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.gradeComparisons];
                      updated[idx] = { ...updated[idx], causeCount: val };
                      return { ...p, gradeComparisons: updated };
                    });
                  }}
                  className="editable-cell w-10 text-center"
                />
              </td>
              <td>នាក់</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <p className="text-[11px] italic text-slate-500 mb-3">
        <strong>បញ្ជាក់៖</strong> ចំពោះសិស្សទាំងនេះគឺយកសិស្សពិតប្រាកដនៅ ឆមាសទី១ ឆ្នាំសិក្សា ២០២៤-២០២៥។
      </p>

      {/* 3. Class Counts */}
      <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 my-2 text-xs">
        ៣. ចំនួនថ្នាក់តាមកម្រិត ៖ (មិនគិតថ្នាក់គួប)
      </h3>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
        <tbody>
          <tr className="bg-slate-100 font-bold">
            <td className="w-48">ថ្នាក់សរុប :</td>
            <td className="text-center w-16 font-bold text-blue-900">{totalClasses}</td>
            <td>ថ្នាក់</td>
          </tr>
          <tr>
            <td>កម្រិតថ្នាក់ទី១ :</td>
            <td className="text-center">
              <input
                type="number"
                value={data.classCounts.g1}
                onChange={(e) => onChange((p) => ({ ...p, classCounts: { ...p.classCounts, g1: Number(e.target.value) || 0 } }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>ថ្នាក់</td>
          </tr>
          <tr>
            <td>កម្រិតថ្នាក់ទី២ :</td>
            <td className="text-center">
              <input
                type="number"
                value={data.classCounts.g2}
                onChange={(e) => onChange((p) => ({ ...p, classCounts: { ...p.classCounts, g2: Number(e.target.value) || 0 } }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>ថ្នាក់</td>
          </tr>
          <tr>
            <td>កម្រិតថ្នាក់ទី៣ :</td>
            <td className="text-center">
              <input
                type="number"
                value={data.classCounts.g3}
                onChange={(e) => onChange((p) => ({ ...p, classCounts: { ...p.classCounts, g3: Number(e.target.value) || 0 } }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>ថ្នាក់</td>
          </tr>
          <tr>
            <td>កម្រិតថ្នាក់ទី៤ :</td>
            <td className="text-center">
              <input
                type="number"
                value={data.classCounts.g4}
                onChange={(e) => onChange((p) => ({ ...p, classCounts: { ...p.classCounts, g4: Number(e.target.value) || 0 } }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>ថ្នាក់</td>
          </tr>
          <tr>
            <td>កម្រិតថ្នាក់ទី៥ :</td>
            <td className="text-center">
              <input
                type="number"
                value={data.classCounts.g5}
                onChange={(e) => onChange((p) => ({ ...p, classCounts: { ...p.classCounts, g5: Number(e.target.value) || 0 } }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>ថ្នាក់</td>
          </tr>
          <tr>
            <td>កម្រិតថ្នាក់ទី៦ :</td>
            <td className="text-center">
              <input
                type="number"
                value={data.classCounts.g6}
                onChange={(e) => onChange((p) => ({ ...p, classCounts: { ...p.classCounts, g6: Number(e.target.value) || 0 } }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>ថ្នាក់</td>
          </tr>
          <tr>
            <td>ថ្នាក់គួប :</td>
            <td className="text-center">
              <input
                type="number"
                value={data.classCounts.multi}
                onChange={(e) => onChange((p) => ({ ...p, classCounts: { ...p.classCounts, multi: Number(e.target.value) || 0 } }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td>ថ្នាក់</td>
          </tr>
        </tbody>
      </table>
      </div>

      {/* 4. Education Staff Overview */}
      <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 my-2 text-xs">
        ៤. អំពីមន្រ្តីអប់រំ
      </h3>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
        <tbody>
          <tr className="bg-slate-100 font-bold">
            <td colSpan={2}>សរុប មន្រ្តី ថ្នាក់សាលារៀន :</td>
            <td className="text-center w-12 font-bold text-blue-900">
              <input
                type="number"
                value={data.staffStats.total}
                onChange={(e) => onChange((p) => ({ ...p, staffStats: { ...p.staffStats, total: Number(e.target.value) || 0 } }))}
                className="editable-cell w-10 text-center"
              />
            </td>
            <td className="w-16">នាក់ ស្រី</td>
            <td colSpan={2} className="w-20">
              <input
                type="number"
                value={data.staffStats.female}
                onChange={(e) => onChange((p) => ({ ...p, staffStats: { ...p.staffStats, female: Number(e.target.value) || 0 } }))}
                className="editable-cell w-10 text-center"
              />
              <span className="ml-1">នាក់</span>
            </td>
          </tr>
          <tr className="bg-slate-50 font-semibold">
            <td colSpan={6} className="text-left">ក្នុងនោះមាន :</td>
          </tr>
          <tr>
            <td className="w-48">នាយក/រង (មិនបង្រៀន)</td>
            <td className="w-4">:</td>
            <td className="text-center">{data.staffStats.dirNonTeach.total}</td>
            <td>នាក់ ស្រី</td>
            <td colSpan={2}>{data.staffStats.dirNonTeach.female} នាក់</td>
          </tr>
          <tr>
            <td>នាយក/រង (បង្រៀន)</td>
            <td>:</td>
            <td className="text-center">{data.staffStats.dirTeach.total}</td>
            <td>នាក់ ស្រី</td>
            <td colSpan={2}>{data.staffStats.dirTeach.female} នាក់</td>
          </tr>
          <tr>
            <td>សិក្ខាបនធារី សរុប</td>
            <td>:</td>
            <td className="text-center">{data.staffStats.teachers.total}</td>
            <td>នាក់ ស្រី</td>
            <td colSpan={2}>{data.staffStats.teachers.female} នាក់</td>
          </tr>
          <tr>
            <td>សិក្ខាបនធារី បង្រៀន២ពេល</td>
            <td>:</td>
            <td className="text-center">{data.staffStats.teachers2Shift.total}</td>
            <td>នាក់ ស្រី</td>
            <td colSpan={2}>{data.staffStats.teachers2Shift.female} នាក់</td>
          </tr>
          <tr>
            <td>សិក្ខាបនធារី ថ្នាក់គួប</td>
            <td>:</td>
            <td className="text-center">{data.staffStats.teachersMulti.total}</td>
            <td>នាក់ ស្រី</td>
            <td colSpan={2}>{data.staffStats.teachersMulti.female} នាក់</td>
          </tr>
          <tr>
            <td>លេខាធិការ</td>
            <td>:</td>
            <td className="text-center">{data.staffStats.secretary.total}</td>
            <td>នាក់ ស្រី</td>
            <td colSpan={2}>{data.staffStats.secretary.female} នាក់</td>
          </tr>
          <tr>
            <td>កាន់បណ្ណាល័យ</td>
            <td>:</td>
            <td className="text-center">{data.staffStats.library.total}</td>
            <td>នាក់ ស្រី</td>
            <td colSpan={2}>{data.staffStats.library.female} នាក់</td>
          </tr>
          <tr>
            <td>កាន់ កសិកម្ម</td>
            <td>:</td>
            <td className="text-center">{data.staffStats.agriculture.total}</td>
            <td>នាក់ ស្រី</td>
            <td colSpan={2}>{data.staffStats.agriculture.female} នាក់</td>
          </tr>
          <tr>
            <td>បង្រៀន មត្តេយ្យ</td>
            <td>:</td>
            <td className="text-center">{data.staffStats.kindergarten.total}</td>
            <td>នាក់ ស្រី</td>
            <td colSpan={2}>{data.staffStats.kindergarten.female} នាក់</td>
          </tr>
        </tbody>
      </table>
      </div>

      {/* 5. Finance */}
      <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 my-2 text-xs">
        ៥. ហិរញ្ញប្បទាន ៖ (ចាប់​ពី​ មករា ដល់ ខែមិថុនា)
      </h3>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
        <tbody>
          <tr>
            <td colSpan={2} className="font-medium w-36">សំណង់ថ្មី</td>
            <td className="w-4">:</td>
            <td className="w-12 text-center">{data.finance.newBuildUnits}</td>
            <td className="w-12">ខ្នង</td>
            <td className="w-12 text-center">{data.finance.newBuildRooms}</td>
            <td>បន្ទប់ អស់ថវិកា</td>
            <td colSpan={2} className="text-right font-medium">{data.finance.newBuildCost}</td>
          </tr>
          <tr>
            <td colSpan={2} className="font-medium">ប្រភពផ្តល់</td>
            <td>:</td>
            <td colSpan={6} className="text-slate-700">{data.finance.newBuildSource}</td>
          </tr>
          <tr>
            <td colSpan={2} className="font-medium">ជួសជុល</td>
            <td>:</td>
            <td className="text-center">{data.finance.repairUnits}</td>
            <td>ខ្នង</td>
            <td className="text-center">{data.finance.repairRooms}</td>
            <td>បន្ទប់ អស់ថវិកា</td>
            <td colSpan={2} className="text-right font-medium">{data.finance.repairCost}</td>
          </tr>
          <tr>
            <td colSpan={2} className="font-medium">ប្រភពផ្តល់</td>
            <td>:</td>
            <td colSpan={6} className="text-slate-700">{data.finance.repairSource}</td>
          </tr>
          <tr>
            <td colSpan={2} className="font-medium">សង្ហារឹម និងកែលម្អ</td>
            <td>:</td>
            <td colSpan={3} className="text-slate-700">{data.finance.furnitureDesc}</td>
            <td>អស់ថវិកា</td>
            <td colSpan={2} className="text-right font-semibold text-blue-950">{data.finance.furnitureCost}</td>
          </tr>
          <tr>
            <td colSpan={2} className="font-medium">សម្ភារៈ ការិយាល័យ</td>
            <td>:</td>
            <td colSpan={3} className="text-slate-700">{data.finance.officeDesc}</td>
            <td>អស់ថវិកា</td>
            <td colSpan={2} className="text-right font-semibold text-blue-950">{data.finance.officeCost}</td>
          </tr>
          <tr className="bg-slate-100 font-bold">
            <td colSpan={2}>សរុបចំណាយរួម</td>
            <td>:</td>
            <td colSpan={3} className="text-slate-700">{data.finance.totalDesc}</td>
            <td>អស់ថវិកា</td>
            <td colSpan={2} className="text-right text-blue-900 font-bold">{data.finance.totalCost}</td>
          </tr>
        </tbody>
      </table>
      </div>

      {/* 6. Library */}
      <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 my-2 text-xs">
        ៦. ការងារ​បណ្ណាល័យ​ (ក. ផ្នែកកម្រងសាលា)
      </h3>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
          <tbody>
            <tr className="bg-slate-50 font-semibold">
              <td colSpan={9}>កម្រងសាលាដែលមានបណ្ណាល័យហើយមានដំណើរការជាប្រចាំចំនួនប៉ុន្មានកម្រង?</td>
            </tr>
            <tr>
              <td colSpan={2} className="w-48">(សូមបញ្ជាក់ឈ្មោះកម្រង)</td>
              <td className="w-4">:</td>
              <td className="w-20 text-center font-medium">{data.library.activeClusterCount} កម្រង</td>
              <td colSpan={5} className="font-semibold text-blue-900">{data.library.activeClusterName}</td>
            </tr>
            <tr>
              <td colSpan={9} className="text-slate-700 italic pl-4">{data.library.activeDetails}</td>
            </tr>
            <tr className="bg-slate-50 font-semibold">
              <td colSpan={9}>កម្រងសាលាដែលមានបណ្ណាល័យហើយមានដំណើរការមិនសូវបានល្អ :</td>
            </tr>
            <tr>
              <td colSpan={2}>(សូមបញ្ជាក់ឈ្មោះកម្រង និងមូលហេតុ)</td>
              <td>:</td>
              <td colSpan={6} className="text-slate-500">{data.library.inactiveNameAndReason}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SECTION II */}
      <h2 className="bg-blue-700 text-white font-bold px-3 py-1.5 rounded text-xs mb-2 mt-6 tracking-wide">
        II. ការងារ​ធានាគុណភាព
      </h2>

      {/* 1. Results Semester 1 */}
      <div className="flex items-center justify-between my-2">
        <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 text-xs">
          ១. លទ្ធផល​សិក្សា​ឆមាសទី១
        </h3>
        <span className="sm:hidden text-[10px] text-slate-400">↔ អូសផ្ដេកដើម្បីមើលតារាង</span>
      </div>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
          <thead>
            <tr>
              <th rowSpan={4} className="w-12">ថ្នាក់ទី</th>
              <th colSpan={12}>លទ្ធផល​សិក្សារបស់សិស្ស</th>
              <th rowSpan={4} className="w-14">ផ្សេងៗ</th>
            </tr>
            <tr>
              <th colSpan={2}>សិស្សឆមាសទី១</th>
              <th colSpan={2}>សិស្សបវេសនកាល</th>
              <th colSpan={2}>សិស្សចូលថ្មីថែម</th>
              <th colSpan={2}>សិស្សជាប់</th>
              <th colSpan={2}>សិស្សធ្លាក់</th>
              <th colSpan={2}>សិស្ស​បោះបង់</th>
            </tr>
            <tr className="text-[10px]">
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
              <th>សរុប</th><th>ស្រី</th>
            </tr>
            <tr className="text-[9.5px] bg-blue-50 text-blue-900 font-mono">
              <th>១=៣+៥</th><th>២=៤+៦</th>
              <th>៣</th><th>៤</th>
              <th>៥</th><th>៦</th>
              <th>៧</th><th>៨</th>
              <th>៩</th><th>១០</th>
              <th>១១</th><th>១២</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((r, idx) => (
              <tr key={r.grade} className="text-center">
                <td className="font-bold text-center">{r.grade}</td>
                <td className="font-semibold">{r.s1Total}</td>
                <td className="font-semibold">{r.s1Female}</td>
                <td>{r.bvesTotal}</td>
                <td>{r.bvesFemale}</td>
                <td>{r.newTotal}</td>
                <td>{r.newFemale}</td>
                <td className="text-center">
                  <input
                    type="number"
                    value={r.passTotal}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      onChange((p) => {
                        const updated = [...p.results];
                        updated[idx] = { ...updated[idx], passTotal: val };
                        return { ...p, results: updated };
                      });
                    }}
                    className="editable-cell w-10 text-center font-medium"
                  />
                </td>
                <td className="text-center">
                  <input
                    type="number"
                    value={r.passFemale}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      onChange((p) => {
                        const updated = [...p.results];
                        updated[idx] = { ...updated[idx], passFemale: val };
                        return { ...p, results: updated };
                      });
                    }}
                    className="editable-cell w-10 text-center"
                  />
                </td>
                <td className="text-center">
                  <input
                    type="number"
                    value={r.failTotal}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      onChange((p) => {
                        const updated = [...p.results];
                        updated[idx] = { ...updated[idx], failTotal: val };
                        return { ...p, results: updated };
                      });
                    }}
                    className="editable-cell w-10 text-center text-rose-700"
                  />
                </td>
                <td className="text-center">
                  <input
                    type="number"
                    value={r.failFemale}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      onChange((p) => {
                        const updated = [...p.results];
                        updated[idx] = { ...updated[idx], failFemale: val };
                        return { ...p, results: updated };
                      });
                    }}
                    className="editable-cell w-10 text-center text-rose-700"
                  />
                </td>
                <td>{r.dropTotal}</td>
                <td>{r.dropFemale}</td>
                <td>{r.notes}</td>
              </tr>
            ))}
            <tr className="bg-blue-50 font-bold text-center text-blue-900">
              <th>សរុប</th>
              <th>{totalS1}</th>
              <th>{totalS1F}</th>
              <th>{totalS1}</th>
              <th>{totalS1F}</th>
              <th>0</th>
              <th>0</th>
              <th>{totalPass}</th>
              <th>{totalPassF}</th>
              <th>{totalFail}</th>
              <th>{totalFailF}</th>
              <th>{totalDrop}</th>
              <th>{totalDropF}</th>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2. Percentages */}
      <div className="flex items-center justify-between my-2">
        <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 text-xs">
          ២. លទ្ធផលសិក្សាសិស្សឆមាសទី១ គិតជា ភាគរយ ៖
        </h3>
        <span className="sm:hidden text-[10px] text-slate-400">↔ អូសផ្ដេកដើម្បីមើលតារាង</span>
      </div>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
        <thead>
          <tr>
            <th rowSpan={2} className="w-16">ថ្នាក់ទី</th>
            <th colSpan={2}>% ឡើង</th>
            <th colSpan={2}>% ត្រួត</th>
            <th colSpan={2}>% បោះបង់</th>
            <th colSpan={2}>ផ្សេងៗ</th>
          </tr>
          <tr className="text-[10px]">
            <th>សរុប</th><th>ស្រី</th>
            <th>សរុប</th><th>ស្រី</th>
            <th>សរុប</th><th>ស្រី</th>
            <th>សរុប</th><th>ស្រី</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((r) => {
            const upPct = r.s1Total > 0 ? `${Math.round((r.passTotal / r.s1Total) * 100)}%` : '0%';
            const upFPct = r.s1Female > 0 ? `${Math.round((r.passFemale / r.s1Female) * 100)}%` : '0%';
            const failPct = r.s1Total > 0 ? `${((r.failTotal / r.s1Total) * 100).toFixed(2)}%` : '0.00%';
            const failFPct = r.s1Female > 0 ? `${((r.failFemale / r.s1Female) * 100).toFixed(2)}%` : '0.00%';

            return (
              <tr key={r.grade} className="text-center">
                <td className="font-semibold">{r.grade}</td>
                <td className="font-medium text-emerald-800">{upPct}</td>
                <td className="font-medium text-emerald-800">{upFPct}</td>
                <td className="text-rose-700">{failPct}</td>
                <td className="text-rose-700">{failFPct}</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            );
          })}
          <tr className="bg-blue-50 font-bold text-center text-blue-950">
            <th>សរុប</th>
            <th className="text-emerald-900">{totalS1 > 0 ? `${Math.round((totalPass / totalS1) * 100)}%` : '0%'}</th>
            <th className="text-emerald-900">{totalS1F > 0 ? `${Math.round((totalPassF / totalS1F) * 100)}%` : '0%'}</th>
            <th className="text-rose-900">{totalS1 > 0 ? `${((totalFail / totalS1) * 100).toFixed(2)}%` : '0.00%'}</th>
            <th className="text-rose-900">{totalS1F > 0 ? `${((totalFailF / totalS1F) * 100).toFixed(2)}%` : '0.00%'}</th>
            <th>0</th>
            <th>0</th>
            <th>0</th>
            <th>0</th>
          </tr>
        </tbody>
      </table>
      </div>

      {/* 3. Teaching & Curriculum */}
      <div className="flex items-center justify-between my-2">
        <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 text-xs">
          ៣. ការបង្រៀន និងការអនុវត្តកម្មវិធីសិក្សា ៖
        </h3>
        <span className="sm:hidden text-[10px] text-slate-400">↔ អូសផ្ដេកដើម្បីមើលតារាង</span>
      </div>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
        <thead>
          <tr>
            <th rowSpan={3} className="w-12">ថ្នាក់ទី</th>
            <th colSpan={6}>ចំនួនគ្រូបង្រៀន</th>
            <th colSpan={5}>ការអនុវត្តកម្មវិធីសិក្សា (គិតជា %)</th>
          </tr>
          <tr>
            <th colSpan={2}>ល្អ</th>
            <th colSpan={2}>មធ្យម</th>
            <th colSpan={2}>ខ្សោយ</th>
            <th rowSpan={2}>ភាសាខ្មែរ</th>
            <th rowSpan={2}>គណិតវិទ្យា</th>
            <th rowSpan={2}>សិក្សាសង្គម</th>
            <th rowSpan={2}>វិទ្យាសាស្ត្រ</th>
            <th rowSpan={2}>ភាសាអង់គ្លេស</th>
          </tr>
          <tr className="text-[10px]">
            <th>សរុប</th><th>ស្រី</th>
            <th>សរុប</th><th>ស្រី</th>
            <th>សរុប</th><th>ស្រី</th>
          </tr>
        </thead>
        <tbody>
          {data.curriculum.map((c, idx) => (
            <tr key={c.grade} className="text-center">
              <td className="font-semibold">{c.grade}</td>
              <td>
                <input
                  type="number"
                  value={c.goodS}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.curriculum];
                      updated[idx] = { ...updated[idx], goodS: val };
                      return { ...p, curriculum: updated };
                    });
                  }}
                  className="editable-cell w-8 text-center"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={c.goodF}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.curriculum];
                      updated[idx] = { ...updated[idx], goodF: val };
                      return { ...p, curriculum: updated };
                    });
                  }}
                  className="editable-cell w-8 text-center"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={c.midS}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.curriculum];
                      updated[idx] = { ...updated[idx], midS: val };
                      return { ...p, curriculum: updated };
                    });
                  }}
                  className="editable-cell w-8 text-center"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={c.midF}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.curriculum];
                      updated[idx] = { ...updated[idx], midF: val };
                      return { ...p, curriculum: updated };
                    });
                  }}
                  className="editable-cell w-8 text-center"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={c.weakS}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.curriculum];
                      updated[idx] = { ...updated[idx], weakS: val };
                      return { ...p, curriculum: updated };
                    });
                  }}
                  className="editable-cell w-8 text-center"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={c.weakF}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.curriculum];
                      updated[idx] = { ...updated[idx], weakF: val };
                      return { ...p, curriculum: updated };
                    });
                  }}
                  className="editable-cell w-8 text-center"
                />
              </td>
              <td className="text-center font-medium">
                <input
                  type="number"
                  value={c.khmer}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.curriculum];
                      updated[idx] = { ...updated[idx], khmer: val };
                      return { ...p, curriculum: updated };
                    });
                  }}
                  className="editable-cell w-10 text-center"
                />
              </td>
              <td className="text-center font-medium">
                <input
                  type="number"
                  value={c.math}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.curriculum];
                      updated[idx] = { ...updated[idx], math: val };
                      return { ...p, curriculum: updated };
                    });
                  }}
                  className="editable-cell w-10 text-center"
                />
              </td>
              <td className="text-center">
                <input
                  type="number"
                  value={c.social}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.curriculum];
                      updated[idx] = { ...updated[idx], social: val };
                      return { ...p, curriculum: updated };
                    });
                  }}
                  className="editable-cell w-10 text-center"
                />
              </td>
              <td className="text-center">
                <input
                  type="number"
                  value={c.science}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.curriculum];
                      updated[idx] = { ...updated[idx], science: val };
                      return { ...p, curriculum: updated };
                    });
                  }}
                  className="editable-cell w-10 text-center"
                />
              </td>
              <td className="text-center">
                <input
                  type="number"
                  value={c.english}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    onChange((p) => {
                      const updated = [...p.curriculum];
                      updated[idx] = { ...updated[idx], english: val };
                      return { ...p, curriculum: updated };
                    });
                  }}
                  className="editable-cell w-10 text-center"
                />
              </td>
            </tr>
          ))}
          <tr className="bg-slate-100 font-bold text-center text-slate-800">
            <td>សរុប</td>
            <td>{sumGoodS}</td>
            <td>{sumGoodF}</td>
            <td>{sumMidS}</td>
            <td>{sumMidF}</td>
            <td>{sumWeakS}</td>
            <td>{sumWeakF}</td>
            <td>{avgKhmer}%</td>
            <td>{avgMath}%</td>
            <td>{avgSocial}%</td>
            <td>{avgSci}%</td>
            <td>{avgEng}%</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div className="space-y-1 text-xs text-slate-700 mb-4 pl-1">
        <p>
          លក្ខណៈវិនិច្ឆ័យ ល្អ : <span className="font-medium text-slate-900">{data.criteriaGood}</span>
        </p>
        <p>
          លក្ខណៈវិនិច្ឆ័យ មធ្យម : <span>{data.criteriaMid}</span>
        </p>
        <p>
          លក្ខណៈវិនិច្ឆ័យ ខ្សោយ : <span>{data.criteriaWeak}</span>
        </p>
      </div>

      {/* SECTION III */}
      <h2 className="bg-blue-700 text-white font-bold px-3 py-1.5 rounded text-xs mb-2 mt-6 tracking-wide">
        III. សកម្មភាពអប់រំក្រៅសាលា ក្រៅថ្នាក់
      </h2>
      <div className="space-y-2 mb-3">
        <div>
          <h3 className="font-bold text-blue-900 text-xs">១. ការងារសង្គម</h3>
          <p className="pl-2">ខ្លឹមសារ : <span>{data.extraSocialContent}</span></p>
          <p className="pl-2">លទ្ធផល : <span>{data.extraSocialResult}</span></p>
        </div>

        <div>
          <h3 className="font-bold text-blue-900 text-xs">២. ផលិតកម្ម បង្ករបង្កើនផល</h3>
          <p className="pl-2">ខ្លឹមសារ : <span className="font-medium text-slate-900">{data.extraAgriContent}</span></p>
          <p className="pl-2">លទ្ធផល : <span className="font-medium text-slate-900">{data.extraAgriResult}</span></p>
        </div>

        <div>
          <h3 className="font-bold text-blue-900 text-xs">៣. ទស្សនកិច្ចសិក្សា</h3>
          <p className="pl-2">ខ្លឹមសារ : <span>{data.extraTourContent}</span></p>
          <p className="pl-2">លទ្ធផល : <span>{data.extraTourResult}</span></p>
        </div>
      </div>

      {/* 4. Sports */}
      <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 my-2 text-xs">
        ៤. កីឡា
      </h3>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
        <tbody>
          <tr>
            <td className="w-24">-ការប្រកួត :</td>
            <td className="w-10 text-center font-bold">{data.extraSportsCount}</td>
            <td className="w-12">លើក</td>
            <td className="w-24">កម្រិតកម្រង :</td>
            <td className="w-10 text-center">{data.extraSportsCluster}</td>
            <td className="w-12">ដង</td>
            <td className="w-28">កម្រិតថ្នាក់ស្រុក :</td>
            <td className="w-10 text-center">{data.extraSportsDistrict}</td>
            <td className="w-12">ដង</td>
            <td className="w-28">កម្រិតថ្នាក់ខេត្ត :</td>
            <td className="w-10 text-center">{data.extraSportsProvince}</td>
            <td>ដង</td>
          </tr>
          <tr>
            <td>-ខ្លឹមសារ :</td>
            <td colSpan={11} className="font-medium text-slate-900">{data.extraSportsContent}</td>
          </tr>
          <tr>
            <td>-លទ្ធផល :</td>
            <td colSpan={11} className="font-medium text-slate-900">{data.extraSportsResult}</td>
          </tr>
        </tbody>
      </table>
      </div>

      {/* 5. Arts */}
      <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 my-2 text-xs">
        ៥. សិល្បៈ
      </h3>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
        <tbody>
          <tr>
            <td className="w-24">-ការសំដែង :</td>
            <td className="w-10 text-center font-bold">{data.extraArtCount}</td>
            <td className="w-12">លើក</td>
            <td className="w-24">កម្រិតកម្រង :</td>
            <td className="w-10 text-center">{data.extraArtCluster}</td>
            <td className="w-12">ដង</td>
            <td className="w-28">កម្រិតថ្នាក់ស្រុក :</td>
            <td className="w-10 text-center">{data.extraArtDistrict}</td>
            <td className="w-12">ដង</td>
            <td className="w-28">កម្រិតថ្នាក់ខេត្ត :</td>
            <td className="w-10 text-center">{data.extraArtProvince}</td>
            <td>ដង</td>
          </tr>
          <tr>
            <td>-ខ្លឹមសារ :</td>
            <td colSpan={11} className="font-medium text-slate-900">{data.extraArtContent}</td>
          </tr>
          <tr>
            <td>-លទ្ធផល :</td>
            <td colSpan={11} className="font-medium text-slate-900">{data.extraArtResult}</td>
          </tr>
        </tbody>
      </table>
      </div>

      {/* 6. Inspection */}
      <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 my-2 text-xs">
        ៦. អធិការកិច្ច
      </h3>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
        <tbody>
          <tr>
            <td colSpan={2}>-ថ្នាក់ក្រសួងចុះពិនិត្យ :</td>
            <td className="text-center w-12 font-bold">{data.inspectMinistryTimes}</td>
            <td className="w-12">លើក</td>
            <td className="w-16">ស្មើនិង</td>
            <td className="text-center w-12 font-bold">{data.inspectMinistryClasses}</td>
            <td>ថ្នាក់</td>
          </tr>
          <tr>
            <td colSpan={2}>-មន្ទីរអប់រំចុះពិនិត្យ :</td>
            <td className="text-center font-bold">{data.inspectDeptTimes}</td>
            <td>លើក</td>
            <td>ស្មើនិង</td>
            <td className="text-center font-bold">{data.inspectDeptClasses}</td>
            <td>ថ្នាក់</td>
          </tr>
          <tr>
            <td colSpan={2}>-រដ្ឋបាលស្រុកចុះពិនិត្យ :</td>
            <td className="text-center font-bold">{data.inspectDistrictTimes}</td>
            <td>លើក</td>
            <td>ស្មើនិង</td>
            <td className="text-center font-bold">{data.inspectDistrictClasses}</td>
            <td>ថ្នាក់</td>
          </tr>
          <tr>
            <td colSpan={2}>-ថ្នាក់កម្រងចុះពិនិត្យ :</td>
            <td className="text-center font-bold">{data.inspectClusterTimes}</td>
            <td>លើក</td>
            <td>ស្មើនិង</td>
            <td className="text-center font-bold">{data.inspectClusterClasses}</td>
            <td>ថ្នាក់</td>
          </tr>
          <tr>
            <td colSpan={2} className="font-medium">-ខ្លឹមសារជួយណែនាំ :</td>
            <td colSpan={5} className="text-slate-800 italic">{data.inspectGuidance}</td>
          </tr>
        </tbody>
      </table>
      </div>

      {/* 7. Community */}
      <h3 className="font-bold text-blue-900 border-l-3 border-blue-700 pl-2 my-2 text-xs">
        ៧. ការងារសហគមន៍
      </h3>
      <div className="report-table-wrap custom-scrollbar">
        <table className="report-table">
        <tbody>
          <tr>
            <td colSpan={5} className="font-medium">-ឈ្មោះកម្រងសាលាដែលសហគមន៍បានចូលរួម :</td>
            <td colSpan={4} className="font-bold text-blue-900">{data.communityClusterName}</td>
          </tr>
          <tr>
            <td className="font-medium">-ខ្លឹមសារ :</td>
            <td>ប្រជុំ</td>
            <td className="font-medium text-slate-800">{data.communityMeeting}</td>
            <td>សាងសង់</td>
            <td className="font-medium text-slate-800">{data.communityBuild}</td>
            <td>ផ្តល់បទពិសោធន៍</td>
            <td colSpan={3}>{data.communityExperience}</td>
          </tr>
          <tr>
            <td className="font-medium">-លទ្ធផល :</td>
            <td colSpan={8}>{data.communityResult}</td>
          </tr>
        </tbody>
      </table>
      </div>

      {/* SECTION IV */}
      <h2 className="bg-blue-700 text-white font-bold px-3 py-1.5 rounded text-xs mb-2 mt-6 tracking-wide">
        IV. ទិសដៅឆមាសទី ២
      </h2>
      <div className="p-3 bg-slate-50 border border-slate-200 rounded leading-relaxed text-slate-800 mb-4 text-justify">
        {data.directionSem2}
      </div>

      {/* SECTION V */}
      <h2 className="bg-blue-700 text-white font-bold px-3 py-1.5 rounded text-xs mb-2 mt-4 tracking-wide">
        V. សន្និដ្ឋានៈ
      </h2>
      <div className="p-3 bg-slate-50 border border-slate-200 rounded leading-relaxed text-slate-800 mb-6 text-justify">
        {data.conclusion}
      </div>

      {/* Signatures */}
      <ReportSignatures
        reporterName={data.reporterName}
        onReporterChange={(name) => onChange((p) => ({ ...p, reporterName: name }))}
      />
    </article>
  );
};
