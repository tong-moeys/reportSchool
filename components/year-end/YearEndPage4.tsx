'use client';

import React from 'react';
import { YearEndReportState, CurriculumImplementationRow, GirlCounselingData } from '@/lib/year-end-data';

interface YearEndPage4Props {
  data: YearEndReportState;
  onChange: (updater: (prev: YearEndReportState) => YearEndReportState) => void;
}

export const YearEndPage4: React.FC<YearEndPage4Props> = ({ data, onChange }) => {
  const updateCurriculumRow = (index: number, field: keyof CurriculumImplementationRow, val: any) => {
    onChange((prev) => {
      const updated = [...prev.curriculumList];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, curriculumList: updated };
    });
  };

  const updateGirlCounseling = (field: keyof GirlCounselingData, val: any) => {
    onChange((prev) => ({
      ...prev,
      girlCounseling: {
        ...prev.girlCounseling,
        [field]: val,
      },
    }));
  };

  // Curriculum sums
  const currTotals = data.curriculumList.reduce(
    (acc, r) => ({
      goodTotal: acc.goodTotal + (Number(r.teachersGoodTotal) || 0),
      goodFemale: acc.goodFemale + (Number(r.teachersGoodFemale) || 0),
      midTotal: acc.midTotal + (Number(r.teachersMidTotal) || 0),
      midFemale: acc.midFemale + (Number(r.teachersMidFemale) || 0),
      allLessonTotal: acc.allLessonTotal + (Number(r.planAllLessonsTotal) || 0),
      allLessonFemale: acc.allLessonFemale + (Number(r.planAllLessonsFemale) || 0),
      under65Total: acc.under65Total + (Number(r.planUnder65Total) || 0),
      under65Female: acc.under65Female + (Number(r.planUnder65Female) || 0),
    }),
    {
      goodTotal: 0,
      goodFemale: 0,
      midTotal: 0,
      midFemale: 0,
      allLessonTotal: 0,
      allLessonFemale: 0,
      under65Total: 0,
      under65Female: 0,
    }
  );

  return (
    <div className="bg-white shadow-sm border border-slate-300 rounded-lg p-6 sm:p-10 mb-8 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none text-slate-800 text-sm leading-relaxed">
      <div className="space-y-6">
        {/* 3. ការបង្រៀន និង ការអនុវត្តកម្មវិធីសិក្សា */}
        <div>
          <h3 className="font-bold text-base text-slate-900 mb-2">
            3. ការបង្រៀន និង ការអនុវត្តកម្មវិធីសិក្សា
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-900 text-xs text-center">
              <thead>
                <tr className="bg-slate-50 font-bold">
                  <th rowSpan={3} className="border border-slate-900 p-1 w-[8%]">ថ្នាក់</th>
                  <th colSpan={4} className="border border-slate-900 p-1 bg-slate-100">ចំនួនគ្រូបង្រៀន</th>
                  <th colSpan={4} className="border border-slate-900 p-1 bg-slate-100">
                    <div>ចំនួនគ្រូមានផែនការបង្រៀន</div>
                    <div className="text-[10px] font-normal text-slate-600">(នាយកបានចុះហត្ថលេខា)</div>
                  </th>
                  <th colSpan={5} className="border border-slate-900 p-1 bg-slate-100">
                    ការអនុវត្តកម្មវិធីសិក្សា (១ឆ្នាំ) ជា%
                  </th>
                </tr>
                <tr className="bg-slate-50 font-semibold text-[11px]">
                  <th colSpan={2} className="border border-slate-900 p-0.5">ល្អ</th>
                  <th colSpan={2} className="border border-slate-900 p-0.5">មធ្យម</th>
                  <th colSpan={2} className="border border-slate-900 p-0.5">គ្រប់មេរៀន</th>
                  <th colSpan={2} className="border border-slate-900 p-0.5">តិចជាង ៦៥%</th>
                  <th className="border border-slate-900 p-0.5 font-normal">ភាសាខ្មែរ</th>
                  <th className="border border-slate-900 p-0.5 font-normal">គណិតវិទ្យា</th>
                  <th className="border border-slate-900 p-0.5 font-normal">វិទ្យាសាស្ត្រ</th>
                  <th className="border border-slate-900 p-0.5 font-normal">សិក្សាសង្គម</th>
                  <th className="border border-slate-900 p-0.5 font-normal">អង់គ្លេស</th>
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
                  <th className="border border-slate-900 p-0.5" colSpan={5}>%</th>
                </tr>
              </thead>
              <tbody>
                {data.curriculumList.map((row, idx) => (
                  <tr key={row.grade} className="hover:bg-slate-50/60">
                    <td className="border border-slate-900 font-bold bg-slate-50 p-1">{row.grade}</td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.teachersGoodTotal}
                        onChange={(e) => updateCurriculumRow(idx, 'teachersGoodTotal', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent font-medium"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.teachersGoodFemale}
                        onChange={(e) => updateCurriculumRow(idx, 'teachersGoodFemale', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent text-purple-700"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.teachersMidTotal}
                        onChange={(e) => updateCurriculumRow(idx, 'teachersMidTotal', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.teachersMidFemale}
                        onChange={(e) => updateCurriculumRow(idx, 'teachersMidFemale', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent text-purple-700"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.planAllLessonsTotal}
                        onChange={(e) => updateCurriculumRow(idx, 'planAllLessonsTotal', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent font-medium"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.planAllLessonsFemale}
                        onChange={(e) => updateCurriculumRow(idx, 'planAllLessonsFemale', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent text-purple-700"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.planUnder65Total}
                        onChange={(e) => updateCurriculumRow(idx, 'planUnder65Total', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.planUnder65Female}
                        onChange={(e) => updateCurriculumRow(idx, 'planUnder65Female', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent text-purple-700"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.khmerPercent}
                        onChange={(e) => updateCurriculumRow(idx, 'khmerPercent', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.mathPercent}
                        onChange={(e) => updateCurriculumRow(idx, 'mathPercent', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.sciencePercent}
                        onChange={(e) => updateCurriculumRow(idx, 'sciencePercent', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.socialPercent}
                        onChange={(e) => updateCurriculumRow(idx, 'socialPercent', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                    <td className="border border-slate-900 p-0.5">
                      <input
                        type="number"
                        value={row.englishPercent}
                        onChange={(e) => updateCurriculumRow(idx, 'englishPercent', Number(e.target.value) || 0)}
                        className="w-full text-center p-0.5 bg-transparent"
                      />
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-amber-50/80 font-bold">
                  <td className="border border-slate-900 p-1">សរុប</td>
                  <td className="border border-slate-900 p-1 text-blue-900">{currTotals.goodTotal}</td>
                  <td className="border border-slate-900 p-1 text-purple-700">{currTotals.goodFemale}</td>
                  <td className="border border-slate-900 p-1">{currTotals.midTotal}</td>
                  <td className="border border-slate-900 p-1 text-purple-700">{currTotals.midFemale}</td>
                  <td className="border border-slate-900 p-1 text-blue-900">{currTotals.allLessonTotal}</td>
                  <td className="border border-slate-900 p-1 text-purple-700">{currTotals.allLessonFemale}</td>
                  <td className="border border-slate-900 p-1">{currTotals.under65Total}</td>
                  <td className="border border-slate-900 p-1 text-purple-700">{currTotals.under65Female}</td>
                  <td className="border border-slate-900 p-1 text-emerald-800">100%</td>
                  <td className="border border-slate-900 p-1 text-emerald-800">100%</td>
                  <td className="border border-slate-900 p-1 text-emerald-800">100%</td>
                  <td className="border border-slate-900 p-1 text-emerald-800">100%</td>
                  <td className="border border-slate-900 p-1 text-emerald-800">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-2 text-xs text-slate-700 space-y-1 pl-1">
            <div className="font-bold text-slate-900">លក្ខណៈវិនិច្ឆ័យ៖</div>
            <div className="flex items-start gap-1">
              <span className="font-semibold text-slate-900 min-w-[50px]">- ល្អ៖</span>
              <textarea
                rows={2}
                value={data.criteriaGood}
                onChange={(e) => onChange((p) => ({ ...p, criteriaGood: e.target.value }))}
                className="w-full text-xs p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white"
              />
            </div>
            <div className="flex items-start gap-1">
              <span className="font-semibold text-slate-900 min-w-[50px]">- មធ្យម ៖</span>
              <textarea
                rows={2}
                value={data.criteriaMid}
                onChange={(e) => onChange((p) => ({ ...p, criteriaMid: e.target.value }))}
                className="w-full text-xs p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* 4. ទីប្រឹក្សាកុមារី */}
        <div className="pt-3 border-t border-slate-200 space-y-2">
          <h3 className="font-bold text-base text-slate-900">4. ទីប្រឹក្សាកុមារី</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-900 text-xs">
              <thead>
                <tr className="bg-slate-100 font-bold text-center">
                  <th className="border border-slate-900 p-1.5 w-[36%]">បរិយាយ</th>
                  <th colSpan={6} className="border border-slate-900 p-1.5">ចំនួនសិស្ស</th>
                  <th className="border border-slate-900 p-1.5 w-[14%]">ផ្សេងៗ</th>
                </tr>
                <tr className="bg-slate-50 text-[11px] font-semibold text-center">
                  <th className="border border-slate-900 p-1"></th>
                  <th className="border border-slate-900 p-1">ទី៤</th>
                  <th className="border border-slate-900 p-1">%</th>
                  <th className="border border-slate-900 p-1">ទី៥</th>
                  <th className="border border-slate-900 p-1">%</th>
                  <th className="border border-slate-900 p-1">ទី៦</th>
                  <th className="border border-slate-900 p-1">%</th>
                  <th className="border border-slate-900 p-1"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-900 p-1.5 font-medium">- ចំនួនកុមារីគោលដៅ</td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g4Target}
                      onChange={(e) => updateGirlCounseling('g4Target', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g4TargetPercent}
                      onChange={(e) => updateGirlCounseling('g4TargetPercent', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g5Target}
                      onChange={(e) => updateGirlCounseling('g5Target', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g5TargetPercent}
                      onChange={(e) => updateGirlCounseling('g5TargetPercent', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g6Target}
                      onChange={(e) => updateGirlCounseling('g6Target', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g6TargetPercent}
                      onChange={(e) => updateGirlCounseling('g6TargetPercent', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="text"
                      value={data.girlCounseling.otherTarget}
                      onChange={(e) => updateGirlCounseling('otherTarget', e.target.value)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-900 p-1.5 font-medium">- ចំនួនកុមារីមានបញ្ហា</td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g4Problem}
                      onChange={(e) => updateGirlCounseling('g4Problem', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g4ProblemPercent}
                      onChange={(e) => updateGirlCounseling('g4ProblemPercent', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g5Problem}
                      onChange={(e) => updateGirlCounseling('g5Problem', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g5ProblemPercent}
                      onChange={(e) => updateGirlCounseling('g5ProblemPercent', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g6Problem}
                      onChange={(e) => updateGirlCounseling('g6Problem', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g6ProblemPercent}
                      onChange={(e) => updateGirlCounseling('g6ProblemPercent', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="text"
                      value={data.girlCounseling.otherProblem}
                      onChange={(e) => updateGirlCounseling('otherProblem', e.target.value)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border border-slate-900 p-1.5 font-medium">- បានជួយកុមារីដែលមានបញ្ហាចំនួន</td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g4Helped}
                      onChange={(e) => updateGirlCounseling('g4Helped', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g4HelpedPercent}
                      onChange={(e) => updateGirlCounseling('g4HelpedPercent', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g5Helped}
                      onChange={(e) => updateGirlCounseling('g5Helped', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g5HelpedPercent}
                      onChange={(e) => updateGirlCounseling('g5HelpedPercent', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g6Helped}
                      onChange={(e) => updateGirlCounseling('g6Helped', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="number"
                      value={data.girlCounseling.g6HelpedPercent}
                      onChange={(e) => updateGirlCounseling('g6HelpedPercent', Number(e.target.value) || 0)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                  <td className="border border-slate-900 p-0.5 text-center">
                    <input
                      type="text"
                      value={data.girlCounseling.otherHelped}
                      onChange={(e) => updateGirlCounseling('otherHelped', e.target.value)}
                      className="w-full text-center p-0.5 bg-transparent"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs space-y-1.5 pl-2 pt-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 min-w-[80px]">- សកម្មភាព :</span>
              <input
                type="text"
                value={data.girlCounseling.activities}
                onChange={(e) => updateGirlCounseling('activities', e.target.value)}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 min-w-[80px]">- បញ្ហាប្រឈម :</span>
              <input
                type="text"
                value={data.girlCounseling.challenges}
                onChange={(e) => updateGirlCounseling('challenges', e.target.value)}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 min-w-[80px]">- សំណូមពរ :</span>
              <input
                type="text"
                value={data.girlCounseling.requests}
                onChange={(e) => updateGirlCounseling('requests', e.target.value)}
                className="w-full p-1 bg-slate-50 border border-slate-200 rounded focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-3 border-t border-slate-200 text-right text-xs text-slate-400">
        ទំព័រទី ៤ (Page 4)
      </div>
    </div>
  );
};
