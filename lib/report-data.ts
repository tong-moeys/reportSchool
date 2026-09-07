export interface GradeComparison {
  grade: number;
  total: number;
  female: number;
  changeCount: number;
  reason: string;
  causeCount: number;
}

export interface ResultsRow {
  grade: number;
  s1Total: number;
  s1Female: number;
  bvesTotal: number;
  bvesFemale: number;
  newTotal: number;
  newFemale: number;
  passTotal: number;
  passFemale: number;
  failTotal: number;
  failFemale: number;
  dropTotal: number;
  dropFemale: number;
  notes: string;
}

export interface CurriculumRow {
  grade: number;
  goodS: number;
  goodF: number;
  midS: number;
  midF: number;
  weakS: number;
  weakF: number;
  khmer: number;
  math: number;
  social: number;
  science: number;
  english: number;
}

export interface StaffMember {
  id: string;
  no: string;
  name: string;
  gender: string; // 'ប' or 'ស'
  framework: string;
  education: string;
  roleOrGrade: string;
  studentsTotal?: number;
  studentsFemale?: number;
  shiftMorning?: boolean;
  shiftAfternoon?: boolean;
  phone: string;
  notes: string;
}

export interface ReportState {
  schoolCluster: string;
  clusterCount: number;
  urbanCount: number;
  normalCount: number;
  remoteCount: number;
  irregularCount: number;
  closedCount: number;
  closedReason: string;
  completeGradeCount: number;
  incompleteGradeCount: number;
  totalRooms: number;
  teachingRooms: number;
  nonTeachingRooms: number;

  // Grade comparisons
  gradeComparisons: GradeComparison[];

  // Class counts
  classCounts: {
    g1: number;
    g2: number;
    g3: number;
    g4: number;
    g5: number;
    g6: number;
    multi: number;
  };

  // Staff breakdown
  staffStats: {
    total: number;
    female: number;
    dirNonTeach: { total: number; female: number };
    dirTeach: { total: number; female: number };
    teachers: { total: number; female: number };
    teachers2Shift: { total: number; female: number };
    teachersMulti: { total: number; female: number };
    secretary: { total: number; female: number };
    library: { total: number; female: number };
    workshop: { total: number; female: number };
    arts: { total: number; female: number };
    agriculture: { total: number; female: number };
    homeEc: { total: number; female: number };
    sports: { total: number; female: number };
    others: { total: number; female: number };
    kindergarten: { total: number; female: number };
    sick: { total: number; female: number };
    leave: { total: number; female: number };
    retiring: { total: number; female: number };
    suspended: { total: number; female: number };
  };

  // Finance
  finance: {
    newBuildUnits: number;
    newBuildRooms: number;
    newBuildCost: string;
    newBuildSource: string;
    repairUnits: number;
    repairRooms: number;
    repairCost: string;
    repairSource: string;
    furnitureDesc: string;
    furnitureCost: string;
    officeDesc: string;
    officeCost: string;
    totalDesc: string;
    totalCost: string;
  };

  // Library
  library: {
    activeClusterCount: number;
    activeClusterName: string;
    activeDetails: string;
    inactiveNameAndReason: string;
  };

  // Section II Results
  results: ResultsRow[];

  // Section II Curriculum
  curriculum: CurriculumRow[];
  criteriaGood: string;
  criteriaMid: string;
  criteriaWeak: string;

  // Section III Extracurricular
  extraSocialContent: string;
  extraSocialResult: string;
  extraAgriContent: string;
  extraAgriResult: string;
  extraTourContent: string;
  extraTourResult: string;
  extraSportsCount: number;
  extraSportsCluster: number;
  extraSportsDistrict: number;
  extraSportsProvince: number;
  extraSportsContent: string;
  extraSportsResult: string;
  extraArtCount: number;
  extraArtCluster: number;
  extraArtDistrict: number;
  extraArtProvince: number;
  extraArtContent: string;
  extraArtResult: string;
  inspectMinistryTimes: number;
  inspectMinistryClasses: number;
  inspectDeptTimes: number;
  inspectDeptClasses: number;
  inspectDistrictTimes: number;
  inspectDistrictClasses: number;
  inspectClusterTimes: number;
  inspectClusterClasses: number;
  inspectGuidance: string;
  communityClusterName: string;
  communityMeeting: string;
  communityBuild: string;
  communityExperience: string;
  communityResult: string;

  // Section IV & V
  directionSem2: string;
  conclusion: string;

  // Signatures
  reporterName: string;

  // Staff list (Page 3)
  adminStaff: StaffMember[];
  teachingStaff: StaffMember[];
}

export const initialReportData: ReportState = {
  schoolCluster: "ស្ពានស្រែង",
  clusterCount: 1,
  urbanCount: 0,
  normalCount: 0,
  remoteCount: 1,
  irregularCount: 0,
  closedCount: 0,
  closedReason: "..................",
  completeGradeCount: 1,
  incompleteGradeCount: 0,
  totalRooms: 15,
  teachingRooms: 12,
  nonTeachingRooms: 3,

  gradeComparisons: [
    { grade: 1, total: 30, female: 14, changeCount: 0, reason: "----", causeCount: 0 },
    { grade: 2, total: 42, female: 21, changeCount: 0, reason: "----", causeCount: 0 },
    { grade: 3, total: 42, female: 20, changeCount: 0, reason: "----", causeCount: 0 },
    { grade: 4, total: 49, female: 21, changeCount: 0, reason: "----", causeCount: 0 },
    { grade: 5, total: 50, female: 23, changeCount: 0, reason: "----", causeCount: 0 },
    { grade: 6, total: 35, female: 17, changeCount: 0, reason: "----", causeCount: 0 },
  ],

  classCounts: {
    g1: 1,
    g2: 2,
    g3: 2,
    g4: 2,
    g5: 2,
    g6: 1,
    multi: 0,
  },

  staffStats: {
    total: 17,
    female: 13,
    dirNonTeach: { total: 2, female: 1 },
    dirTeach: { total: 0, female: 0 },
    teachers: { total: 10, female: 9 },
    teachers2Shift: { total: 0, female: 0 },
    teachersMulti: { total: 0, female: 0 },
    secretary: { total: 1, female: 0 },
    library: { total: 1, female: 1 },
    workshop: { total: 0, female: 0 },
    arts: { total: 0, female: 0 },
    agriculture: { total: 1, female: 0 },
    homeEc: { total: 0, female: 0 },
    sports: { total: 0, female: 0 },
    others: { total: 0, female: 0 },
    kindergarten: { total: 2, female: 2 },
    sick: { total: 0, female: 0 },
    leave: { total: 0, female: 0 },
    retiring: { total: 0, female: 0 },
    suspended: { total: 0, female: 0 },
  },

  finance: {
    newBuildUnits: 0,
    newBuildRooms: 0,
    newBuildCost: "_ ៛",
    newBuildSource: "សហគមន៍ ,សប្បុរសជន លោកគ្រូអ្នកគ្រូ និងគាំទ្រសម្ភារៈសាងសង់ដោយ អង្គការទស្សនៈពិភពលោក",
    repairUnits: 0,
    repairRooms: 0,
    repairCost: "- ៛",
    repairSource: "ថវិកា (SOF)",
    furnitureDesc: "........................................",
    furnitureCost: "923,100 ៛",
    officeDesc: "…………….................................",
    officeCost: "2,358,400 ៛",
    totalDesc: "……………................................",
    totalCost: "3,281,500 ៛",
  },

  library: {
    activeClusterCount: 1,
    activeClusterName: "ស្ពានស្រែង",
    activeDetails: "សិស្សានុសិស្សចូលបណ្ណាល័យជាប្រចាំ តាមម៉ោងកាលវិភាគ និងម៉ោងសេរី",
    inactiveNameAndReason: ".................................",
  },

  results: [
    { grade: 1, s1Total: 30, s1Female: 14, bvesTotal: 30, bvesFemale: 14, newTotal: 0, newFemale: 0, passTotal: 30, passFemale: 14, failTotal: 0, failFemale: 0, dropTotal: 0, dropFemale: 0, notes: "" },
    { grade: 2, s1Total: 42, s1Female: 21, bvesTotal: 42, bvesFemale: 21, newTotal: 0, newFemale: 0, passTotal: 42, passFemale: 21, failTotal: 0, failFemale: 0, dropTotal: 0, dropFemale: 0, notes: "" },
    { grade: 3, s1Total: 42, s1Female: 20, bvesTotal: 41, bvesFemale: 21, newTotal: 0, newFemale: 0, passTotal: 38, passFemale: 19, failTotal: 3, failFemale: 2, dropTotal: 0, dropFemale: 0, notes: "" },
    { grade: 4, s1Total: 49, s1Female: 21, bvesTotal: 49, bvesFemale: 22, newTotal: 0, newFemale: 0, passTotal: 45, passFemale: 20, failTotal: 4, failFemale: 2, dropTotal: 0, dropFemale: 0, notes: "" },
    { grade: 5, s1Total: 50, s1Female: 23, bvesTotal: 50, bvesFemale: 23, newTotal: 0, newFemale: 0, passTotal: 40, passFemale: 21, failTotal: 10, failFemale: 2, dropTotal: 0, dropFemale: 0, notes: "" },
    { grade: 6, s1Total: 35, s1Female: 17, bvesTotal: 35, bvesFemale: 17, newTotal: 0, newFemale: 0, passTotal: 32, passFemale: 15, failTotal: 3, failFemale: 2, dropTotal: 0, dropFemale: 0, notes: "" },
  ],

  curriculum: [
    { grade: 1, goodS: 1, goodF: 1, midS: 0, midF: 0, weakS: 0, weakF: 0, khmer: 50, math: 55, social: 40, science: 45, english: 0 },
    { grade: 2, goodS: 0, goodF: 0, midS: 1, midF: 1, weakS: 0, weakF: 0, khmer: 50, math: 50, social: 40, science: 40, english: 0 },
    { grade: 3, goodS: 0, goodF: 0, midS: 1, midF: 1, weakS: 0, weakF: 0, khmer: 50, math: 50, social: 40, science: 40, english: 0 },
    { grade: 4, goodS: 0, goodF: 0, midS: 1, midF: 1, weakS: 0, weakF: 0, khmer: 50, math: 50, social: 40, science: 40, english: 0 },
    { grade: 5, goodS: 0, goodF: 0, midS: 1, midF: 1, weakS: 0, weakF: 0, khmer: 50, math: 50, social: 40, science: 40, english: 0 },
    { grade: 6, goodS: 0, goodF: 0, midS: 1, midF: 1, weakS: 0, weakF: 0, khmer: 50, math: 50, social: 40, science: 40, english: 0 },
  ],
  criteriaGood: "មានកិច្ចតែងការ និងសម្ភារបង្រៀន",
  criteriaMid: "............",
  criteriaWeak: ".............",

  extraSocialContent: ".........................................",
  extraSocialResult: ".........................................",
  extraAgriContent: "ដំាដំណាំចម្រុះ ដូចជា ត្រកួន ត្រប់ សណ្ដែក",
  extraAgriResult: "សិស្សានុសិស្ស បានប្រមូលផល",
  extraTourContent: "........................................",
  extraTourResult: ".........................................",
  extraSportsCount: 1,
  extraSportsCluster: 1,
  extraSportsDistrict: 0,
  extraSportsProvince: 0,
  extraSportsContent: "ការប្រកួតកីឡាបាល់ទាត់ផ្នែកបុរស",
  extraSportsResult: "ចំណាត់ថ្នាក់លេខ២ (ចំនួនកីឡាករ និងបទពិសោធន៍)",
  extraArtCount: 1,
  extraArtCluster: 1,
  extraArtDistrict: 0,
  extraArtProvince: 0,
  extraArtContent: "របាំជូនពរ ក្នុងកម្មវិធី.......................",
  extraArtResult: "សម្តែងបានល្អ និងចេះសាមគ្គីគ្នា",
  inspectMinistryTimes: 2,
  inspectMinistryClasses: 10,
  inspectDeptTimes: 2,
  inspectDeptClasses: 10,
  inspectDistrictTimes: 8,
  inspectDistrictClasses: 12,
  inspectClusterTimes: 2,
  inspectClusterClasses: 12,
  inspectGuidance: "សូមឲ្យលោកគ្រូអ្នកគ្រូយកចិត្តទុកដាក់ក្នុងការបង្រៀន ដោយបានទៀងទាត់",
  communityClusterName: "កម្រងស្ពានស្រែង",
  communityMeeting: "ជាមួយសហគមន៍ ប្រចាំខែ",
  communityBuild: "បណ្ណាល័យ ១ខ្នង",
  communityExperience: "........................................",
  communityResult: ".............................................",

  directionSem2: "លើកកម្ពស់អភិបាលកិច្ចសាលារៀនរួមមាន៖ ការងាររដ្ឋបាល ការងារគ្រប់គ្រងបុគ្គលិក អនុវត្តកម្មវិធីសិក្សានិងម៉ោងសិក្សា អនុវត្តវិធីសាស្រ្តបង្រៀនថ្មីៗ វាយតម្លៃការសិក្សា ពង្រីកនិងពង្រឹងការអនុវត្តបណ្ណាល័យ និងការអាន គ្រប់គ្រងហិរញ្ញវត្ថុ វាយតម្លៃនិងពិនិត្យតាមអាន ជំរុញការចូលរួមនិង គាំទ្រពីសហគមន៍។",
  conclusion: "ជាមួយសមិទ្ធផលនៃការអនុវត្តផែនការប្រតិបត្តិប្រចាំឆ្នាំ២០២៥ ក្នុងត្រីឆមាសទី១ សាលាបឋមសិក្សារោគ សម្រេចបាននូវលទ្ធផលសំខាន់ៗរួមមាន៖ ការរៀននិងបង្រៀនកាន់តែល្អប្រសើរ សហគមន៍និងដៃគូអភិវឌ្ឍ ចូលរួមយ៉ាងសកម្មក្នុងការងារអប់រំ មានការងារគ្រប់គ្រងដឹកនាំគ្រប់កម្រិតថ្នាក់ បានពង្រឹងសមត្ថភាពរបស់លោកគ្រូ អ្នកគ្រូ មានការអភិវឌ្ឍជាបណ្តើរៗ។ ទន្ទឹមនឹងសម្រេចបាននូវលទ្ធផលដូចរៀបរាប់ខាងលើ សាលាបឋមសិក្សា រោគជួបប្រទះនឹងបញ្ហាប្រឈមមួយចំនួនដែលត្រូវដោះស្រាយ រួមមាន ខ្វះទឹកប្រើប្រាស់ ខ្វះសម្ភារៈអនាម័យ ខ្វះសម្ភារៈស្រោចដំណាំ និងសម្ភារៈកសិកម្ម ខ្វះសម្ភារៈបណ្ណាល័យ។",

  reporterName: "អ៊ុន ប៊ុនទុង",

  adminStaff: [
    { id: "adm-1", no: "01", name: "សុខ សារើន", gender: "ស", framework: "គ្រូបឋម", education: "ថ្នាក់ទី១២", roleOrGrade: "នាយិកា", phone: "0975405822", notes: "" },
    { id: "adm-2", no: "02", name: "យ៉េន សារី", gender: "ប", framework: "គ្រូបឋម", education: "ថ្នាក់ទី១២", roleOrGrade: "នាយករង", phone: "085246698", notes: "" },
    { id: "adm-3", no: "03", name: "អ៊ុន ប៊ុនទុង", gender: "ប", framework: "គ្រូបឋម", education: "ស.បរិញ្ញាបត្រ", roleOrGrade: "លេខាធិការ", phone: "017407773", notes: "" },
  ],

  teachingStaff: [
    { id: "tch-1", no: "04", name: "រ៉ែម សុភក្ដិ", gender: "ស", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "1", studentsTotal: 30, studentsFemale: 14, shiftMorning: true, shiftAfternoon: false, phone: "0976700999", notes: "" },
    { id: "tch-2", no: "05", name: "ស្វាង មនោរម្យ", gender: "ស", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "2", studentsTotal: 21, studentsFemale: 11, shiftMorning: true, shiftAfternoon: false, phone: "", notes: "" },
    { id: "tch-3", no: "06", name: "ប៉ោង ស្រីពេជ្រ", gender: "ស", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "2", studentsTotal: 21, studentsFemale: 10, shiftMorning: true, shiftAfternoon: false, phone: "0889304103", notes: "" },
    { id: "tch-4", no: "07", name: "លេង ចាន់លាវ", gender: "ស", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "3", studentsTotal: 21, studentsFemale: 10, shiftMorning: true, shiftAfternoon: false, phone: "0976700999", notes: "" },
    { id: "tch-5", no: "08", name: "អេង ផល្លែន", gender: "ស", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "3", studentsTotal: 21, studentsFemale: 10, shiftMorning: true, shiftAfternoon: false, phone: "0976700999", notes: "" },
    { id: "tch-6", no: "09", name: "ប៊ី ពិសី", gender: "ស", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "4", studentsTotal: 24, studentsFemale: 10, shiftMorning: true, shiftAfternoon: false, phone: "0976700999", notes: "" },
    { id: "tch-7", no: "10", name: "អឿន សុខៀប", gender: "ស", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "4", studentsTotal: 25, studentsFemale: 11, shiftMorning: true, shiftAfternoon: false, phone: "0976700999", notes: "" },
    { id: "tch-8", no: "11", name: "ឆេន សាវដា", gender: "ស", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "5", studentsTotal: 25, studentsFemale: 11, shiftMorning: true, shiftAfternoon: false, phone: "0976700999", notes: "" },
    { id: "tch-9", no: "12", name: "រ៉ោម សម្ផស្ស", gender: "ប", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "5", studentsTotal: 25, studentsFemale: 12, shiftMorning: true, shiftAfternoon: false, phone: "", notes: "" },
    { id: "tch-10", no: "13", name: "ឈួត សេរ៉ូម", gender: "ស", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "6", studentsTotal: 35, studentsFemale: 17, shiftMorning: true, shiftAfternoon: false, phone: "0976700999", notes: "" },
    { id: "tch-11", no: "14", name: "កែវ ខន", gender: "ប", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "បណ្ណាល័យ", studentsTotal: 0, studentsFemale: 0, shiftMorning: true, shiftAfternoon: false, phone: "0976700999", notes: "" },
    { id: "tch-12", no: "15", name: "លន់ ចាន់នឹក", gender: "ស", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "មត្តេយ្យ", studentsTotal: 0, studentsFemale: 0, shiftMorning: true, shiftAfternoon: false, phone: "0976700999", notes: "" },
    { id: "tch-13", no: "16", name: "ពាន ណូរ៉ា", gender: "ស", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "មត្តេយ្យ", studentsTotal: 0, studentsFemale: 0, shiftMorning: true, shiftAfternoon: false, phone: "0976700999", notes: "" },
    { id: "tch-14", no: "17", name: "ឡុក ម៉ាក់តី", gender: "ស", framework: "គ្រូបឋម", education: "ស.ទុតិយភូមិ", roleOrGrade: "កសិកម្ម", studentsTotal: 0, studentsFemale: 0, shiftMorning: true, shiftAfternoon: false, phone: "0976700999", notes: "" },
  ],
};

export function toKhmerNumber(num: number | string): string {
  const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  return String(num).replace(/\d/g, (digit) => khmerDigits[parseInt(digit, 10)]);
}

export function getKhmerDateStrings(date: Date = new Date()) {
  const months = [
    "មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា",
    "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"
  ];
  const days = ["អាទិត្យ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"];

  const lunar = `ថ្ងៃ${days[date.getDay()]} ខែផល្គុន ឆ្នាំឆ្លូវ សប្តស័ក ព.ស.២៥៦៩`;
  const solar = `រោគ ថ្ងៃទី${toKhmerNumber(date.getDate())} ខែ${months[date.getMonth()]} ឆ្នាំ${toKhmerNumber(date.getFullYear())}`;

  return { lunar, solar };
}
