export interface TeacherRecord {
  id?: string;
  year?: string;
  schoolCode?: string;
  schoolName?: string;
  position?: string;
  teacherId?: string;
  teacherName: string;
  grade?: string;
  studentTotal?: number;
  female?: number;

  // Semester 1
  s1_students_total?: number;
  s1_students_female?: number;
  s1_enrollment_total?: number;
  s1_enrollment_female?: number;
  s1_change_total?: number;
  s1_change_female?: number;
  s1_passAvg_total?: number;
  s1_passAvg_female?: number;
  s1_fail0to499_total?: number;
  s1_fail0to499_female?: number;
  s1_fail4to499_total?: number;
  s1_fail4to499_female?: number;
  s1_dropout_total?: number;
  s1_dropout_female?: number;
  s1_curriculum_khmer?: number;
  s1_curriculum_math?: number;
  s1_curriculum_science?: number;
  s1_curriculum_social?: number;
  s1_curriculum_foreign?: number;
  s1_lessonPlan_signed?: number;
  s1_lessonPlan_unsigned?: number;
  s1_jan_abc?: number;
  s1_jan_def?: number;
  s1_feb_abc?: number;
  s1_feb_def?: number;
  s1_mar_abc?: number;
  s1_mar_def?: number;
  s1_apr_abc?: number;
  s1_apr_def?: number;

  // Semester 2
  s2_students_total?: number;
  s2_students_female?: number;
  s2_sem1_total?: number;
  s2_sem1_female?: number;
  s2_change_total?: number;
  s2_change_female?: number;
  s2_passAvg_total?: number;
  s2_passAvg_female?: number;
  s2_fail0to499_total?: number;
  s2_fail0to499_female?: number;
  s2_fail4to499_total?: number;
  s2_fail4to499_female?: number;
  s2_dropout_total?: number;
  s2_dropout_female?: number;
  s2_curriculum_khmer?: number;
  s2_curriculum_math?: number;
  s2_curriculum_science?: number;
  s2_curriculum_social?: number;
  s2_curriculum_foreign?: number;
  s2_lessonPlan_signed?: number;
  s2_lessonPlan_unsigned?: number;
  s2_may_abc?: number;
  s2_may_def?: number;
  s2_jun_abc?: number;
  s2_jun_def?: number;
  s2_jul_abc?: number;
  s2_jul_def?: number;
  s2_aug_abc?: number;
  s2_aug_def?: number;
  s2_sep_abc?: number;
  s2_sep_def?: number;
  [key: string]: string | number | undefined;
}

export const TEACHER_KEYS: (keyof TeacherRecord)[] = [
  'year','schoolCode','schoolName','position','teacherId','teacherName','grade','studentTotal','female',
  's1_students_total','s1_students_female',
  's1_enrollment_total','s1_enrollment_female',
  's1_change_total','s1_change_female',
  's1_passAvg_total','s1_passAvg_female',
  's1_fail0to499_total','s1_fail0to499_female',
  's1_fail4to499_total','s1_fail4to499_female',
  's1_dropout_total','s1_dropout_female',
  's1_curriculum_khmer','s1_curriculum_math','s1_curriculum_science','s1_curriculum_social','s1_curriculum_foreign',
  's1_lessonPlan_signed','s1_lessonPlan_unsigned',
  's1_jan_abc','s1_jan_def','s1_feb_abc','s1_feb_def',
  's1_mar_abc','s1_mar_def','s1_apr_abc','s1_apr_def',
  's2_students_total','s2_students_female',
  's2_sem1_total','s2_sem1_female',
  's2_change_total','s2_change_female',
  's2_passAvg_total','s2_passAvg_female',
  's2_fail0to499_total','s2_fail0to499_female',
  's2_fail4to499_total','s2_fail4to499_female',
  's2_dropout_total','s2_dropout_female',
  's2_curriculum_khmer','s2_curriculum_math','s2_curriculum_science','s2_curriculum_social','s2_curriculum_foreign',
  's2_lessonPlan_signed','s2_lessonPlan_unsigned',
  's2_may_abc','s2_may_def','s2_jun_abc','s2_jun_def',
  's2_jul_abc','s2_jul_def','s2_aug_abc','s2_aug_def','s2_sep_abc','s2_sep_def'
];

export const TEACHER_LABELS: Record<string, string> = {
  year: 'ឆ្នាំសិក្សា (Year)',
  schoolCode: 'លេខកូដសាលា (School Code)',
  schoolName: 'ឈ្មោះសាលារៀន (School Name)',
  position: 'មុខតំណែង (Position)',
  teacherId: 'អត្តលេខ (Teacher ID)',
  teacherName: 'គោត្តនាម-នាម (Name)',
  grade: 'ថ្នាក់បង្រៀន (Grade)',
  studentTotal: 'សិស្សសរុប (Students)',
  female: 'សិស្សស្រី (Female)',
  s1_students_total: 'សិស្សដើមឆមាស១ សរុប',
  s1_students_female: 'សិស្សដើមឆមាស១ ស្រី',
  s1_enrollment_total: 'បវេសនកាល សរុប',
  s1_enrollment_female: 'បវេសនកាល ស្រី',
  s1_change_total: 'ប្រែប្រួល សរុប',
  s1_change_female: 'ប្រែប្រួល ស្រី',
  s1_passAvg_total: 'ជាប់មធ្យមភាគ សរុប',
  s1_passAvg_female: 'ជាប់មធ្យមភាគ ស្រី',
  s1_fail0to499_total: 'ធ្លាក់ (0-4.99) សរុប',
  s1_fail0to499_female: 'ធ្លាក់ (0-4.99) ស្រី',
  s1_fail4to499_total: 'ធ្លាក់ (4-4.99) សរុប',
  s1_fail4to499_female: 'ធ្លាក់ (4-4.99) ស្រី',
  s1_dropout_total: 'បោះបង់ សរុប',
  s1_dropout_female: 'បោះបង់ ស្រី',
  s1_curriculum_khmer: '%ភាសាខ្មែរ',
  s1_curriculum_math: '%គណិតវិទ្យា',
  s1_curriculum_science: '%វិទ្យាសាស្ត្រ',
  s1_curriculum_social: '%សិក្សាសង្គម',
  s1_curriculum_foreign: '%ភាសាបរទេស',
  s1_lessonPlan_signed: 'កិច្ចតែងការ ចុះហត្ថលេខា',
  s1_lessonPlan_unsigned: 'កិច្ចតែងការ មិនទាន់ចុះ',
  s1_jan_abc: 'មករា ABC',
  s1_jan_def: 'មករា DEF',
  s1_feb_abc: 'កុម្ភៈ ABC',
  s1_feb_def: 'កុម្ភៈ DEF',
  s1_mar_abc: 'មីនា ABC',
  s1_mar_def: 'មីនា DEF',
  s1_apr_abc: 'មេសា ABC',
  s1_apr_def: 'មេសា DEF',
  s2_students_total: 'សិស្សដើមឆមាស២ សរុប',
  s2_students_female: 'សិស្សដើមឆមាស២ ស្រី',
  s2_sem1_total: 'សង្ខេបឆមាស១ សរុប',
  s2_sem1_female: 'សង្ខេបឆមាស១ ស្រី',
  s2_change_total: 'ប្រែប្រួល សរុប',
  s2_change_female: 'ប្រែប្រួល ស្រី',
  s2_passAvg_total: 'ជាប់មធ្យមភាគ សរុប',
  s2_passAvg_female: 'ជាប់មធ្យមភាគ ស្រី',
  s2_fail0to499_total: 'ធ្លាក់ (0-4.99) សរុប',
  s2_fail0to499_female: 'ធ្លាក់ (0-4.99) ស្រី',
  s2_fail4to499_total: 'ធ្លាក់ (4-4.99) សរុប',
  s2_fail4to499_female: 'ធ្លាក់ (4-4.99) ស្រី',
  s2_dropout_total: 'បោះបង់ សរុប',
  s2_dropout_female: 'បោះបង់ ស្រី',
  s2_curriculum_khmer: '%ភាសាខ្មែរ',
  s2_curriculum_math: '%គណិតវិទ្យា',
  s2_curriculum_science: '%វិទ្យាសាស្ត្រ',
  s2_curriculum_social: '%សិក្សាសង្គម',
  s2_curriculum_foreign: '%ភាសាបរទេស',
  s2_lessonPlan_signed: 'កិច្ចតែងការ ចុះហត្ថលេខា',
  s2_lessonPlan_unsigned: 'កិច្ចតែងការ មិនទាន់ចុះ',
  s2_may_abc: 'ឧសភា ABC',
  s2_may_def: 'ឧសភា DEF',
  s2_jun_abc: 'មិថុនា ABC',
  s2_jun_def: 'មិថុនា DEF',
  s2_jul_abc: 'កក្កដា ABC',
  s2_jul_def: 'កក្កដា DEF',
  s2_aug_abc: 'សីហា ABC',
  s2_aug_def: 'សីហា DEF',
  s2_sep_abc: 'កញ្ញា ABC',
  s2_sep_def: 'កញ្ញា DEF'
};

export const TEXT_FIELD_SET = new Set<string>([
  'year',
  'schoolCode',
  'schoolName',
  'position',
  'teacherId',
  'teacherName',
  'grade'
]);

import initialTeachersJson from './initial-teachers.json';

export const INITIAL_TEACHERS_SEED: TeacherRecord[] = initialTeachersJson as unknown as TeacherRecord[];
