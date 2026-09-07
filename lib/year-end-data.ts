export interface GradeStudentCount {
  gradeId: string;
  gradeLabel: string;
  total: number;
  female: number;
  change: number; // កើន/ថយ (+ / -)
  reason: string;
  dropoutCount: number;
  migratedCount: number;
  transferInCount: number;
}

export interface FinanceRow {
  id: string;
  description: string;
  quantity: string;
  totalCost: string;
  sources: string; // e.g. "SOF, HCC, សហគមន៍"
  deficit: string;
}

export interface StudentResultRow {
  grade: string; // "ទី១", "ទី២", etc.
  semEndTotal: number; // សរុបដំណាច់ឆ្នាំ
  semEndFemale: number;
  yearEndTotal: number; // សរុបចុងឆ្នាំ
  yearEndFemale: number;
  averagePassTotal: number; // សរុបជាប់មធ្យមភាគ
  averagePassFemale: number;
  testPassTotal: number; // សរុបធ្វើតេស្តជាប់
  testPassFemale: number;
  testFailTotal: number; // សរុបធ្វើតេស្តធ្លាក់
  testFailFemale: number;
  dropoutTotal: number; // សរុបបោះបង់
  dropoutFemale: number;
}

export interface StudentResultPercentageRow {
  grade: string;
  semEndTotalPercent: number;
  semEndFemalePercent: number;
  yearEndTotalPercent: number;
  yearEndFemalePercent: number;
  averagePassTotalPercent: number;
  averagePassFemalePercent: number;
  testPassTotalPercent: number;
  testPassFemalePercent: number;
  testFailTotalPercent: number;
  testFailFemalePercent: number;
  dropoutTotalPercent: number;
  dropoutFemalePercent: number;
}

export interface CurriculumImplementationRow {
  grade: string;
  teachersGoodTotal: number;
  teachersGoodFemale: number;
  teachersMidTotal: number;
  teachersMidFemale: number;
  planAllLessonsTotal: number;
  planAllLessonsFemale: number;
  planUnder65Total: number;
  planUnder65Female: number;
  khmerPercent: number;
  mathPercent: number;
  sciencePercent: number;
  socialPercent: number;
  englishPercent: number;
}

export interface GirlCounselingData {
  g4Target: number;
  g4TargetPercent: number;
  g5Target: number;
  g5TargetPercent: number;
  g6Target: number;
  g6TargetPercent: number;
  otherTarget: string;
  
  g4Problem: number;
  g4ProblemPercent: number;
  g5Problem: number;
  g5ProblemPercent: number;
  g6Problem: number;
  g6ProblemPercent: number;
  otherProblem: string;

  g4Helped: number;
  g4HelpedPercent: number;
  g5Helped: number;
  g5HelpedPercent: number;
  g6Helped: number;
  g6HelpedPercent: number;
  otherHelped: string;

  activities: string;
  challenges: string;
  requests: string;
}

export interface LifeSkillsRow {
  id: string;
  description: string;
  schoolsCount: number;
  schoolsPercent: number;
  studentsCount: number;
  studentsPercent: number;
  femaleCount: number;
  femalePercent: number;
  others: string;
}

export interface DewormingRow {
  round: string; // "លើកទី១", "លើកទី២"
  studentsCount: number;
  percentage: number;
  others: string;
}

export interface SanitationWaterRow {
  id: string;
  category: string; // "បង្គន់", "អណ្ដូងទឹក", "ទឹកស្រះ", "ធុងចម្រោះ"
  totalSources: number;
  totalPercent: number;
  usableCount: number;
  usablePercent: number;
  brokenCount: number;
  brokenPercent: number;
  others: string;
}

export interface BreakfastFeedingRow {
  id: string;
  category: string; // "របបស្បៀង", "អាហារពេលព្រឹក"
  studentsCount: number;
  percentage: number;
  others: string;
}

export interface YearEndReportState {
  // General Header Info
  province: string;
  district: string;
  schoolName: string;
  academicYear: string;
  reportTitle: string;
  reportDate: string;
  directorName: string;
  reporterName: string;

  // I. ការប្រែប្រួលខាងបរិមាណ
  // 1. សាលារៀន
  schoolTotal: number;
  schoolUrban: number;
  schoolNormal: number;
  schoolRemote: number;
  orgCount: number;
  orgNames: string; // "ឈ្មោះអង្គការទស្សនៈពិភពលោក(WVSI) អង្គការសាលាបៃតង(BS) អង្គការកុមារកម្ពុជារីករាយ(HCC)"
  roomsTotal: number;
  roomsTeaching: number;
  roomsNonTeaching: number;

  // 2. សិស្សប្រៀបធៀបឆមាស១
  studentsByGrade: GradeStudentCount[];
  studentsNote: string;

  // 3. ចំនួនថ្នាក់តាមកម្រិត
  classesKindergarten: number;
  classesG1: number;
  classesG2: number;
  classesG3: number;
  classesG4: number;
  classesG5: number;
  classesG6: number;
  classesMulti: number;

  // 4. ចំនួនមន្ត្រីអប់រំ
  staffTotal: number;
  staffFemale: number;
  staffChange: number;
  staffDropout: number;
  
  teachers1ClassTotal: number;
  teachers1ClassFemale: number;
  teachers1ClassChange: number;
  teachers1ClassDropout: number;

  teachers2ClassTotal: number;
  teachers2ClassFemale: number;
  teachers2ClassChange: number;
  teachers2ClassDropout: number;

  teachersMultiTotal: number;
  teachersMultiFemale: number;
  teachersMultiChange: number;
  teachersMultiDropout: number;

  // 5. ហិរញ្ញប្បទាន ចាប់ពីខែកក្កដា ដល់កញ្ញា
  financeList: FinanceRow[];

  // 6. សកម្មភាពបណ្ណាល័យ
  libraryRegular: number;
  libraryIrregular: number;
  libraryNone: number;

  // II. ការធានាលើគុណភាព
  // 1. លទ្ធផលសិក្សារបស់សិស្ស (Grade 1-6)
  resultsList: StudentResultRow[];
  
  // 2. លទ្ធផលសិក្សាដំណាច់ឆ្នាំគិតជាភាគរយ (Auto-calculated or custom)
  autoCalculatePercentages: boolean;
  percentagesList: StudentResultPercentageRow[];

  // 3. ការបង្រៀន និង ការអនុវត្តកម្មវិធីសិក្សា
  curriculumList: CurriculumImplementationRow[];
  criteriaGood: string;
  criteriaMid: string;

  // 4. ទីប្រឹក្សាកុមារី
  girlCounseling: GirlCounselingData;

  // 5. កម្មវិធីអប់រំបំណិនជីវិត
  lifeSkillsList: LifeSkillsRow[];
  lifeSkillsActivities: string;
  lifeSkillsChallenges: string;
  lifeSkillsRequests: string;

  // 6. គ្រូបង្រៀនល្អ
  goodTeachersNotes: string;

  // 7. សុខភាពសិក្សា
  dewormingList: DewormingRow[];
  dewormingActivities: string;
  dewormingChallenges: string;
  dewormingRequests: string;

  sanitationWaterList: SanitationWaterRow[];
  sanitationActivities: string;
  sanitationChallenges: string;
  sanitationRequests: string;

  breakfastList: BreakfastFeedingRow[];
  breakfastActivities: string;
  breakfastChallenges: string;
  breakfastRequests: string;

  // 8. សកម្មភាពអប់រំក្រៅសាលា ក្រៅថ្នាក់
  extracurricularNotes: string;

  // 9. អធិការកិច្ច
  inspectionNotes: string;

  // 10. ការងារសហគមន៍
  communityWorkNotes: string;

  // III. លក្ខណៈការត្រៀមបវេសនកាលធំ
  newSchoolYearPrepNotes: string;

  // IV. សេចក្ដីសន្និដ្ឋាន
  conclusionNotes: string;
}

export const initialYearEndReportData: YearEndReportState = {
  province: "ខេត្តបន្ទាយមានជ័យ",
  district: "ស្រុកភ្នំស្រុក",
  schoolName: "សាលាបឋមសិក្សា រោល",
  academicYear: "២០២៥-២០២៦",
  reportTitle: "របាយការណ៍\nស្ដីពី\nលទ្ធផលសិក្សារបស់សិស្សនៅ ដំណាច់ឆ្នាំសិក្សា២០២៥-២០២៦",
  reportDate: "ថ្ងៃទី..... ខែ..... ឆ្នាំ២០២៦",
  directorName: "លឹម គឹមសួរ",
  reporterName: "ទង់ ម៉េងហុង",

  // 1. សាលារៀន
  schoolTotal: 1,
  schoolUrban: 0,
  schoolNormal: 0,
  schoolRemote: 1,
  orgCount: 3,
  orgNames: "ឈ្មោះអង្គការទស្សនៈពិភពលោក(WVSI) អង្គការសាលាបៃតង(BS)\nអង្គការកុមារកម្ពុជារីករាយ(HCC)",
  roomsTotal: 15,
  roomsTeaching: 12,
  roomsNonTeaching: 3,

  // 2. សិស្សប្រៀបធៀបឆមាស១
  studentsByGrade: [
    { gradeId: "k_low", gradeLabel: "មត្តេយ្យទាប", total: 0, female: 0, change: 0, reason: "", dropoutCount: 0, migratedCount: 0, transferInCount: 0 },
    { gradeId: "k_mid", gradeLabel: "មត្តេយ្យមធ្យម", total: 40, female: 25, change: 0, reason: "", dropoutCount: 0, migratedCount: 0, transferInCount: 0 },
    { gradeId: "k_high", gradeLabel: "មត្តេយ្យខ្ពស់", total: 35, female: 20, change: 0, reason: "", dropoutCount: 0, migratedCount: 0, transferInCount: 0 },
    { gradeId: "g1", gradeLabel: "ថ្នាក់ទី១", total: 31, female: 15, change: 0, reason: "០", dropoutCount: 0, migratedCount: 0, transferInCount: 0 },
    { gradeId: "g2", gradeLabel: "ថ្នាក់ទី២", total: 47, female: 24, change: 0, reason: "០", dropoutCount: 0, migratedCount: 0, transferInCount: 0 },
    { gradeId: "g3", gradeLabel: "ថ្នាក់ទី៣", total: 48, female: 23, change: 0, reason: "០", dropoutCount: 0, migratedCount: 0, transferInCount: 0 },
    { gradeId: "g4", gradeLabel: "ថ្នាក់ទី៤", total: 20, female: 18, change: 0, reason: "០", dropoutCount: 0, migratedCount: 0, transferInCount: 0 },
    { gradeId: "g5", gradeLabel: "ថ្នាក់ទី៥", total: 34, female: 10, change: 0, reason: "០", dropoutCount: 0, migratedCount: 0, transferInCount: 0 },
    { gradeId: "g6", gradeLabel: "ថ្នាក់ទី៦", total: 41, female: 16, change: 0, reason: "០", dropoutCount: 0, migratedCount: 0, transferInCount: 0 },
  ],
  studentsNote: "(បញ្ជាក់ ៖ ចំពោះសិស្សទាំងនេះគឺយកសិស្សពិតប្រាកដនៅ ឆមាសទី២ ឆ្នាំសិក្សា២០២៥-២០២៦)",

  // 3. ចំនួនថ្នាក់តាមកម្រិត
  classesKindergarten: 2,
  classesG1: 1,
  classesG2: 2,
  classesG3: 2,
  classesG4: 2,
  classesG5: 2,
  classesG6: 1,
  classesMulti: 0,

  // 4. ចំនួនមន្ត្រីអប់រំ
  staffTotal: 17,
  staffFemale: 13,
  staffChange: 0,
  staffDropout: 0,

  teachers1ClassTotal: 12,
  teachers1ClassFemale: 11,
  teachers1ClassChange: 0,
  teachers1ClassDropout: 0,

  teachers2ClassTotal: 0,
  teachers2ClassFemale: 0,
  teachers2ClassChange: 0,
  teachers2ClassDropout: 0,

  teachersMultiTotal: 0,
  teachersMultiFemale: 0,
  teachersMultiChange: 0,
  teachersMultiDropout: 0,

  // 5. ហិរញ្ញប្បទាន ចាប់ពីខែកក្កដា ដល់កញ្ញា
  financeList: [
    { id: "f1", description: "សាងសង់អគារសិក្សាពហុបំណង", quantity: "២ខ្នង ៣បន្ទប់", totalCost: "", sources: "- SOF\n- HCC\n- សហគមន៍", deficit: "" },
    { id: "f2", description: "ជួសជុលអគារ", quantity: "១ខ្នង ២បន្ទប់", totalCost: "", sources: "- SOF\n- HCC", deficit: "" },
    { id: "f3", description: "ធ្វើរបង(តឿ)", quantity: "៤០ម៉ែត្រ", totalCost: "", sources: "- WVSI", deficit: "" },
    { id: "f4", description: "សង្ហារិមនិងកែលម្អសោភ័ណភាពសាលា", quantity: "", totalCost: "", sources: "- WVSI\n- SOF\n- សហគមន៍", deficit: "" },
    { id: "f5", description: "សម្ភារបង្រៀន និងរៀន", quantity: "", totalCost: "", sources: "- SOF", deficit: "" },
    { id: "f6", description: "សម្ភារការិយាល័យ", quantity: "", totalCost: "", sources: "- SOF", deficit: "" },
  ],

  // 6. សកម្មភាពបណ្ណាល័យ
  libraryRegular: 1,
  libraryIrregular: 0,
  libraryNone: 0,

  // II. 1. លទ្ធផលសិក្សារបស់សិស្ស
  resultsList: [
    { grade: "ទី១", semEndTotal: 31, semEndFemale: 15, yearEndTotal: 31, yearEndFemale: 15, averagePassTotal: 30, averagePassFemale: 15, testPassTotal: 30, testPassFemale: 15, testFailTotal: 1, testFailFemale: 0, dropoutTotal: 0, dropoutFemale: 0 },
    { grade: "ទី២", semEndTotal: 47, semEndFemale: 24, yearEndTotal: 47, yearEndFemale: 24, averagePassTotal: 45, averagePassFemale: 23, testPassTotal: 45, testPassFemale: 23, testFailTotal: 2, testFailFemale: 1, dropoutTotal: 0, dropoutFemale: 0 },
    { grade: "ទី៣", semEndTotal: 48, semEndFemale: 23, yearEndTotal: 48, yearEndFemale: 23, averagePassTotal: 46, averagePassFemale: 22, testPassTotal: 46, testPassFemale: 22, testFailTotal: 2, testFailFemale: 1, dropoutTotal: 0, dropoutFemale: 0 },
    { grade: "ទី៤", semEndTotal: 20, semEndFemale: 18, yearEndTotal: 20, yearEndFemale: 18, averagePassTotal: 19, averagePassFemale: 17, testPassTotal: 19, testPassFemale: 17, testFailTotal: 1, testFailFemale: 1, dropoutTotal: 0, dropoutFemale: 0 },
    { grade: "ទី៥", semEndTotal: 34, semEndFemale: 10, yearEndTotal: 34, yearEndFemale: 10, averagePassTotal: 32, averagePassFemale: 10, testPassTotal: 32, testPassFemale: 10, testFailTotal: 2, testFailFemale: 0, dropoutTotal: 0, dropoutFemale: 0 },
    { grade: "ទី៦", semEndTotal: 41, semEndFemale: 16, yearEndTotal: 41, yearEndFemale: 16, averagePassTotal: 40, averagePassFemale: 16, testPassTotal: 40, testPassFemale: 16, testFailTotal: 1, testFailFemale: 0, dropoutTotal: 0, dropoutFemale: 0 },
  ],

  autoCalculatePercentages: true,
  percentagesList: [],

  // 3. ការបង្រៀន និង ការអនុវត្តកម្មវិធីសិក្សា
  curriculumList: [
    { grade: "ទី១", teachersGoodTotal: 1, teachersGoodFemale: 1, teachersMidTotal: 0, teachersMidFemale: 0, planAllLessonsTotal: 1, planAllLessonsFemale: 1, planUnder65Total: 0, planUnder65Female: 0, khmerPercent: 100, mathPercent: 100, sciencePercent: 100, socialPercent: 100, englishPercent: 100 },
    { grade: "ទី២", teachersGoodTotal: 2, teachersGoodFemale: 2, teachersMidTotal: 0, teachersMidFemale: 0, planAllLessonsTotal: 2, planAllLessonsFemale: 2, planUnder65Total: 0, planUnder65Female: 0, khmerPercent: 100, mathPercent: 100, sciencePercent: 100, socialPercent: 100, englishPercent: 100 },
    { grade: "ទី៣", teachersGoodTotal: 2, teachersGoodFemale: 2, teachersMidTotal: 0, teachersMidFemale: 0, planAllLessonsTotal: 2, planAllLessonsFemale: 2, planUnder65Total: 0, planUnder65Female: 0, khmerPercent: 100, mathPercent: 100, sciencePercent: 100, socialPercent: 100, englishPercent: 100 },
    { grade: "ទី៤", teachersGoodTotal: 2, teachersGoodFemale: 2, teachersMidTotal: 0, teachersMidFemale: 0, planAllLessonsTotal: 2, planAllLessonsFemale: 2, planUnder65Total: 0, planUnder65Female: 0, khmerPercent: 100, mathPercent: 100, sciencePercent: 100, socialPercent: 100, englishPercent: 100 },
    { grade: "ទី៥", teachersGoodTotal: 2, teachersGoodFemale: 2, teachersMidTotal: 0, teachersMidFemale: 0, planAllLessonsTotal: 2, planAllLessonsFemale: 2, planUnder65Total: 0, planUnder65Female: 0, khmerPercent: 100, mathPercent: 100, sciencePercent: 100, socialPercent: 100, englishPercent: 100 },
    { grade: "ទី៦", teachersGoodTotal: 1, teachersGoodFemale: 1, teachersMidTotal: 0, teachersMidFemale: 0, planAllLessonsTotal: 1, planAllLessonsFemale: 1, planUnder65Total: 0, planUnder65Female: 0, khmerPercent: 100, mathPercent: 100, sciencePercent: 100, socialPercent: 100, englishPercent: 100 },
  ],
  criteriaGood: "ល្អ៖ គោរពវិន័យការងារ មានផែនការ(កិច្ចតែងការបង្រៀន)ទៀងទាត់ និងត្រឹមត្រូវ មានចុះហត្ថលេខាដោយនាយកសាលា ឬប្រធានក្រុមបច្ចេកទេស ព្រមទាំងអនុវត្តវិធីសាស្ត្របង្រៀនថ្មីៗ។",
  criteriaMid: "មធ្យម ៖ កិច្ចតែងការបង្រៀនមិនទៀងទាត់ និងត្រឹមត្រូវអនុវត្តគោលវិធីគ្រូមជ្ឈមណ្ឌល… ។",

  // 4. ទីប្រឹក្សាកុមារី
  girlCounseling: {
    g4Target: 18, g4TargetPercent: 100, g5Target: 10, g5TargetPercent: 100, g6Target: 16, g6TargetPercent: 100, otherTarget: "",
    g4Problem: 0, g4ProblemPercent: 0, g5Problem: 0, g5ProblemPercent: 0, g6Problem: 0, g6ProblemPercent: 0, otherProblem: "",
    g4Helped: 0, g4HelpedPercent: 0, g5Helped: 0, g5HelpedPercent: 0, g6Helped: 0, g6HelpedPercent: 0, otherHelped: "",
    activities: "បានរៀបចំទីប្រឹក្សាកុមារី ផ្តល់ការប្រឹក្សាអំពីការថែទាំសុខភាព ការសិក្សា និងការលើកទឹកចិត្តឱ្យកុមារីចូលរៀនបានទៀងទាត់។",
    challenges: "កុមារីខ្លះនៅមានការអៀនប្រៀនមិនហ៊ានបញ្ចេញមតិ ឬស្នើសុំជំនួយ។",
    requests: "សូមបន្តគាំទ្រសម្ភារៈអនាម័យសម្រាប់កុមារី និងវគ្គបណ្តុះបណ្តាលបន្ថែម។"
  },

  // 5. កម្មវិធីអប់រំបំណិនជីវិត
  lifeSkillsList: [
    { id: "ls1", description: "អប់រំបង្ការជម្ងឺអេដស៏និងបញ្ហាពាក់ព័ន្ធ", schoolsCount: 1, schoolsPercent: 100, studentsCount: 221, studentsPercent: 100, femaleCount: 106, femalePercent: 100, others: "" },
    { id: "ls2", description: "អប់រំអំពីបញ្ហាគ្រឿងញៀន", schoolsCount: 1, schoolsPercent: 100, studentsCount: 221, studentsPercent: 100, femaleCount: 106, femalePercent: 100, others: "" },
    { id: "ls3", description: "អប់រំបង្ការជម្ងឺឆ្លងនានា(គ្រុនចាញ់/ឈាមនិងផ្ដាសាយថ្មី)", schoolsCount: 1, schoolsPercent: 100, studentsCount: 221, studentsPercent: 100, femaleCount: 106, femalePercent: 100, others: "" },
    { id: "ls4", description: "អប់រំអំពីអនាម័យមាត់ធ្មេញ", schoolsCount: 1, schoolsPercent: 100, studentsCount: 221, studentsPercent: 100, femaleCount: 106, femalePercent: 100, others: "" },
    { id: "ls5", description: "អប់រំអនាម័យរាងកាយនិងសុខភាព", schoolsCount: 1, schoolsPercent: 100, studentsCount: 221, studentsPercent: 100, femaleCount: 106, femalePercent: 100, others: "" },
    { id: "ls6", description: "អប់រំការសង្គ្រោះបឋម", schoolsCount: 1, schoolsPercent: 100, studentsCount: 221, studentsPercent: 100, femaleCount: 106, femalePercent: 100, others: "" },
    { id: "ls7", description: "អប់រំពីកង្វះជាតិអ៊ីយ៉ូត", schoolsCount: 1, schoolsPercent: 100, studentsCount: 221, studentsPercent: 100, femaleCount: 106, femalePercent: 100, others: "" },
  ],
  lifeSkillsActivities: "ណែនាំពីការសម្អាតមាត់ធ្មេញ ការលាងសម្អាតដៃ ការប្រើប្រាស់បង្គន់ និងការសម្អាតខ្លួនប្រាណរៀងរាល់ថ្ងៃ (សម្អាតដៃ ជើង កាត់ក្រចក កាត់សក់ សម្លៀកបំពាក់ អនាម័យពេលមករដូវ…)",
  lifeSkillsChallenges: "សិស្សមួយចំនួនពុំទាន់អនុវត្តបានត្រឹមត្រូវតាមជំហានឬតាមក្បួនខ្នាត និងខ្វះខាតសម្ភារៈ(កន្ត្រៃកាត់ក្រចក កន្ត្រៃកាត់សក់ ច្រាសដុសធ្មេញ ថ្នាំដុសធ្មេញ សាប៊ូលាងដៃ)",
  lifeSkillsRequests: "គ្រូបន្ទុកថ្នាក់តាមដានសុខភាព-អនាម័យសិស្សជាប្រចាំ និងបន្ថែមសម្ភារៈអនាម័យឱ្យបានគ្រប់គ្រាន់",

  // 6. គ្រូបង្រៀនល្អ
  goodTeachersNotes: "គ្រូបង្រៀនទាំងអស់បានខិតខំប្រឹងប្រែងបង្រៀនតាមវិធីសាស្ត្រថ្មី និងយកចិត្តទុកដាក់ខ្ពស់ចំពោះការរៀនសូត្ររបស់សិស្ស។",

  // 7. សុខភាពសិក្សា
  dewormingList: [
    { round: "លើកទី១", studentsCount: 221, percentage: 100, others: "" },
    { round: "លើកទី២", studentsCount: 221, percentage: 100, others: "" },
  ],
  dewormingActivities: "លោកគ្រូអ្នកគ្រូបានទទួលថ្នាំទម្លាក់ព្រូនពីប្រធានកម្រង និងបានផ្ដល់ឲ្យសិស្សលេបនៅសាលារៀនជាក់ស្ដែង។",
  dewormingChallenges: "សិស្សមួយចំនួនមិនទាន់យល់របៀបប្រើប្រាស់ និងសម្អាតបង្គន់អនាម័យ",
  dewormingRequests: "សូមឲ្យគ្រូបន្ទុកថ្នាក់ណែនាំសិស្សពីរបៀបប្រើប្រាស់ និងសម្អាតបង្គន់អនាម័យឲ្យបានត្រឹមត្រូវ",

  sanitationWaterList: [
    { id: "sw1", category: "បង្គន់", totalSources: 4, totalPercent: 100, usableCount: 4, usablePercent: 100, brokenCount: 0, brokenPercent: 0, others: "" },
    { id: "sw2", category: "អណ្ដូងទឹក", totalSources: 1, totalPercent: 100, usableCount: 1, usablePercent: 100, brokenCount: 0, brokenPercent: 0, others: "" },
    { id: "sw3", category: "ទឹកស្រះ", totalSources: 1, totalPercent: 100, usableCount: 1, usablePercent: 100, brokenCount: 0, brokenPercent: 0, others: "" },
    { id: "sw4", category: "ធុងចម្រោះ", totalSources: 3, totalPercent: 100, usableCount: 3, usablePercent: 100, brokenCount: 0, brokenPercent: 0, others: "" },
  ],
  sanitationActivities: "មានការសម្អាតបង្គន់ និងថែទាំប្រភពទឹកស្អាតជាប្រចាំសប្តាហ៍។",
  sanitationChallenges: "ខែប្រាំងខ្វះខាតទឹកប្រើប្រាស់មួយចំនួន។",
  sanitationRequests: "ស្នើសុំការឧបត្ថម្ភអាងស្តុកទឹកភ្លៀងបន្ថែម។",

  breakfastList: [
    { id: "bf1", category: "របបស្បៀង", studentsCount: 221, percentage: 100, others: "WFP / ក្រសួងអប់រំ" },
    { id: "bf2", category: "អាហារពេលព្រឹក", studentsCount: 221, percentage: 100, others: "ដំណើរការរៀងរាល់ព្រឹក" },
  ],
  breakfastActivities: "ចុងភៅបានចម្អិនអាហារពេលព្រឹកដែលមានជីវជាតិ និងអនាម័យសម្រាប់សិស្សានុសិស្សមុនចូលរៀន។",
  breakfastChallenges: "តម្លៃទំនិញនៅលើទីផ្សារមានការឡើងថ្លៃ។",
  breakfastRequests: "សូមបន្តកម្មវិធីផ្តល់អាហារពេលព្រឹកសម្រាប់ឆ្នាំសិក្សាបន្ទាប់។",

  // 8. សកម្មភាពអប់រំក្រៅសាលា ក្រៅថ្នាក់
  extracurricularNotes: "- បានរៀបចំការដាំផ្កា ដំណាំបន្លែសួនសាលា និងការងារអនាម័យបរិស្ថានជុំវិញសាលា។\n- រៀបចំការប្រកួតកីឡាបាល់ទាត់ បាល់ទះ និងល្បែងប្រជាប្រិយខ្មែរ។",

  // 9. អធិការកិច្ច
  inspectionNotes: "- ក្រុមអធិការកិច្ចថ្នាក់ស្រុក និងប្រធានកម្រងបានចុះមកជួយគាំទ្របច្ចេកទេស និងវាយតម្លៃការបង្រៀនចំនួន ២លើក។\n- ការណែនាំបច្ចេកទេសត្រូវបានលោកគ្រូអ្នកគ្រូយកទៅកែលម្អការបង្រៀនបានល្អប្រសើរ។",

  // 10. ការងារសហគមន៍
  communityWorkNotes: "- គណៈកម្មការទ្រទ្រង់សាលារៀន និងអាណាព្យាបាលសិស្សបានចូលរួមប្រជុំ ៤ដង/ឆ្នាំ។\n- សហគមន៍បានចូលរួមបរិច្ចាគថវិកា និងកម្លាំងពលកម្មក្នុងការជួសជុលរបង និងថែទាំសាលារៀន។",

  // III. លក្ខណៈការត្រៀមបវេសនកាលធំ
  newSchoolYearPrepNotes: "១. ការចុះឈ្មោះកុមារអាយុ ៦ឆ្នាំឱ្យចូលរៀនថ្នាក់ទី១ ឱ្យបានគ្រប់ចំនួន ១០០%។\n២. ជួសជុលតុ កៅអី ក្តារខៀន និងអគារសិក្សាឱ្យបានស្អាតមុនថ្ងៃបើកបវេសនកាល។\n៣. បោសសម្អាតបរិស្ថានសាលារៀន និងកែលម្អសោភ័ណភាពសាលាឱ្យស្រស់បំព្រង។\n៤. បែងចែកគ្រូបង្រៀន និងរៀបចំកាលវិភាគបង្រៀនឱ្យបានរួចរាល់។",

  // IV. សេចក្ដីសន្និដ្ឋាន
  conclusionNotes: "ឆ្លងកាត់ការអនុវត្តការងារអប់រំពេញមួយឆ្នាំសិក្សា២០២៥-២០២៦ សាលាបឋមសិក្សា រោល សម្រេចបានលទ្ធផលគួរជាទីមោទនៈ ទាំងបរិមាណ និងគុណភាព។ គណៈគ្រប់គ្រង លោកគ្រូ-អ្នកគ្រូ សិស្សានុសិស្ស និងសហគមន៍បានសហការគ្នាយ៉ាងល្អប្រសើរ។ យើងខ្ញុំប្តេជ្ញាចិត្តនឹងបន្តពង្រឹងគុណភាពអប់រំឱ្យកាន់តែប្រសើរឡើងថែមទៀតនៅឆ្នាំសិក្សាខាងមុខ។"
};

/**
 * Auto calculate logic helpers for Year-End Report
 */
export function calculateYearEndPercentages(results: StudentResultRow[]): StudentResultPercentageRow[] {
  return results.map((r) => {
    const semEndTotal = r.semEndTotal || 0;
    const yearEndTotal = r.yearEndTotal || 0;
    
    const calcPct = (val: number, base: number) => {
      if (!base || base === 0) return 0;
      return Number(((val / base) * 100).toFixed(1));
    };

    return {
      grade: r.grade,
      semEndTotalPercent: 100,
      semEndFemalePercent: calcPct(r.semEndFemale, semEndTotal),
      yearEndTotalPercent: 100,
      yearEndFemalePercent: calcPct(r.yearEndFemale, yearEndTotal),
      averagePassTotalPercent: calcPct(r.averagePassTotal, yearEndTotal),
      averagePassFemalePercent: calcPct(r.averagePassFemale, r.yearEndFemale),
      testPassTotalPercent: calcPct(r.testPassTotal, yearEndTotal),
      testPassFemalePercent: calcPct(r.testPassFemale, r.yearEndFemale),
      testFailTotalPercent: calcPct(r.testFailTotal, yearEndTotal),
      testFailFemalePercent: calcPct(r.testFailFemale, r.yearEndFemale),
      dropoutTotalPercent: calcPct(r.dropoutTotal, semEndTotal),
      dropoutFemalePercent: calcPct(r.dropoutFemale, r.semEndFemale),
    };
  });
}
