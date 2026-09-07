'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Printer,
  FileSpreadsheet,
  FileJson,
  Cloud,
  Upload,
  RotateCcw,
  Eye,
  Users,
  MoreVertical,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  School,
  FileText,
  CalendarCheck2
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { ReportState } from '@/lib/report-data';
import { YearEndReportState, calculateYearEndPercentages } from '@/lib/year-end-data';

interface ReportToolbarProps {
  reportType: 'yearend' | 'sem1' | 'teachers';
  setReportType: (type: 'yearend' | 'sem1' | 'teachers') => void;
  yearEndData: YearEndReportState;
  onUpdateYearEnd: (data: YearEndReportState) => void;
  sem1Data: ReportState;
  onUpdateSem1: (data: ReportState) => void;
  onReset: () => void;
  activeYearEndTab: 'all' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6';
  setActiveYearEndTab: (tab: 'all' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6') => void;
  activeSem1Tab: 'all' | 'page1' | 'page2' | 'page3';
  setActiveSem1Tab: (tab: 'all' | 'page1' | 'page2' | 'page3') => void;
  statusMsg: { text: string; isOk: boolean } | null;
  onSaveCloud: () => void;
  zoomLevel?: number;
  setZoomLevel?: (zoom: number) => void;
}

export const ReportToolbar: React.FC<ReportToolbarProps> = ({
  reportType,
  setReportType,
  yearEndData,
  onUpdateYearEnd,
  sem1Data,
  onUpdateSem1,
  onReset,
  activeYearEndTab,
  setActiveYearEndTab,
  activeSem1Tab,
  setActiveSem1Tab,
  statusMsg,
  onSaveCloud,
  zoomLevel = 1,
  setZoomLevel,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showZoomMenu, setShowZoomMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowActionsMenu(false);
      }
      if (zoomRef.current && !zoomRef.current.contains(e.target as Node)) {
        setShowZoomMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrint = () => {
    setShowActionsMenu(false);
    if (reportType === 'yearend') {
      const prev = activeYearEndTab;
      setActiveYearEndTab('all');
      setTimeout(() => {
        window.print();
        if (prev !== 'all') setActiveYearEndTab(prev);
      }, 250);
    } else if (reportType === 'sem1') {
      const prev = activeSem1Tab;
      setActiveSem1Tab('all');
      setTimeout(() => {
        window.print();
        if (prev !== 'all') setActiveSem1Tab(prev);
      }, 250);
    } else {
      window.print();
    }
  };

  const handleExportJson = () => {
    setShowActionsMenu(false);
    const dataToExport = reportType === 'yearend' ? yearEndData : sem1Data;
    const jsonStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report_${reportType}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportXlsx = () => {
    setShowActionsMenu(false);
    const wb = XLSX.utils.book_new();

    if (reportType === 'yearend') {
      // Sheet 1: Year-End Results Table
      const resultsHeader = [
        ['ព្រះរាជាណាចក្រកម្ពុជា ជាតិ សាសនា ព្រះមហាក្សត្រ'],
        ['របាយការណ៍ស្ដីពី លទ្ធផលសិក្សារបស់សិស្សនៅ ដំណាច់ឆ្នាំសិក្សា២០២៥-២០២៦'],
        [yearEndData.schoolName + ' - ' + yearEndData.district + ' ' + yearEndData.province],
        [],
        ['១. លទ្ធផលសិក្សារបស់សិស្សចាប់ពីថ្នាក់ទី១ ដល់៦'],
        [
          'ថ្នាក់',
          'សរុបដំណាច់ឆ្នាំ',
          'ស្រី',
          'សរុបចុងឆ្នាំ',
          'ស្រី',
          'សរុបជាប់មធ្យមភាគ',
          'ស្រី',
          'សរុបធ្វើតេស្តជាប់',
          'ស្រី',
          'សរុបធ្វើតេស្តធ្លាក់',
          'ស្រី',
          'សរុបបោះបង់',
          'ស្រី'
        ]
      ];

      const resultsRows = yearEndData.resultsList.map((r) => [
        r.grade,
        r.semEndTotal,
        r.semEndFemale,
        r.yearEndTotal,
        r.yearEndFemale,
        r.averagePassTotal,
        r.averagePassFemale,
        r.testPassTotal,
        r.testPassFemale,
        r.testFailTotal,
        r.testFailFemale,
        r.dropoutTotal,
        r.dropoutFemale,
      ]);

      const ws1 = XLSX.utils.aoa_to_sheet([...resultsHeader, ...resultsRows]);
      XLSX.utils.book_append_sheet(wb, ws1, 'លទ្ធផលសិក្សា');

      // Sheet 2: Percentages Table
      const pctList = calculateYearEndPercentages(yearEndData.resultsList);
      const pctHeader = [
        ['២. លទ្ធផលសិក្សាដំណាច់ឆ្នាំគិតជាភាគរយ'],
        [
          'ថ្នាក់',
          'សរុប%',
          '%ស្រី',
          'សរុប%',
          '%ស្រី',
          'ជាប់មធ្យមភាគ%',
          '%ស្រី',
          'តេស្តជាប់%',
          '%ស្រី',
          'តេស្តធ្លាក់%',
          '%ស្រី',
          'បោះបង់%',
          '%ស្រី'
        ]
      ];
      const pctRows = pctList.map((p) => [
        p.grade,
        `${p.semEndTotalPercent}%`,
        `${p.semEndFemalePercent}%`,
        `${p.yearEndTotalPercent}%`,
        `${p.yearEndFemalePercent}%`,
        `${p.averagePassTotalPercent}%`,
        `${p.averagePassFemalePercent}%`,
        `${p.testPassTotalPercent}%`,
        `${p.testPassFemalePercent}%`,
        `${p.testFailTotalPercent}%`,
        `${p.testFailFemalePercent}%`,
        `${p.dropoutTotalPercent}%`,
        `${p.dropoutFemalePercent}%`,
      ]);
      const ws2 = XLSX.utils.aoa_to_sheet([...pctHeader, ...pctRows]);
      XLSX.utils.book_append_sheet(wb, ws2, 'ភាគរយលទ្ធផល');

      // Sheet 3: Finance Table
      const financeHeader = [
        ['៥. ហិរញ្ញប្បទាន ចាប់ពីខែកក្កដា ដល់កញ្ញា'],
        ['បរិយាយ', 'បរិមាណ', 'ទឹកប្រាក់សរុប', 'ប្រភពថវិកា', 'កង្វះថវិកា']
      ];
      const finRows = yearEndData.financeList.map((f) => [
        f.description,
        f.quantity,
        f.totalCost,
        f.sources.replace(/\n/g, ', '),
        f.deficit
      ]);
      const ws3 = XLSX.utils.aoa_to_sheet([...financeHeader, ...finRows]);
      XLSX.utils.book_append_sheet(wb, ws3, 'ហិរញ្ញប្បទាន');

      XLSX.writeFile(wb, `YearEnd_Report_Rok_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } else {
      // Semester 1 export
      const page1Data: (string | number)[][] = [
        ['ព្រះរាជាណាចក្រកម្ពុជា ជាតិ សាសនា ព្រះមហាក្សត្រ'],
        ['របាយការណ៍បូកសរុបលទ្ធផលការងារអប់រំ ផ្នែកបឋមសិក្សា (ឆមាសទី១ ២០២៥-២០២៦)'],
        ['សាលាបឋមសិក្សា រោគ - កម្រងស្ពានស្រែង'],
        [],
        ['ថ្នាក់', 'សរុបឆមាស១', 'ស្រី', 'បវេសនកាល', 'ស្រី', 'ឡើងថ្មី', 'ស្រី', 'ជាប់', 'ស្រី', 'ធ្លាក់', 'ស្រី', 'បោះបង់', 'ស្រី', 'ផ្សេងៗ']
      ];

      sem1Data.results.forEach((row) => {
        page1Data.push([
          `ថ្នាក់ទី ${row.grade}`,
          row.s1Total,
          row.s1Female,
          row.bvesTotal,
          row.bvesFemale,
          row.newTotal,
          row.newFemale,
          row.passTotal,
          row.passFemale,
          row.failTotal,
          row.failFemale,
          row.dropTotal,
          row.dropFemale,
          row.notes
        ]);
      });

      const ws = XLSX.utils.aoa_to_sheet(page1Data);
      XLSX.utils.book_append_sheet(wb, ws, 'ឆមាសទី១');
      XLSX.writeFile(wb, `Semester1_Report_Rok_${new Date().toISOString().slice(0, 10)}.xlsx`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target?.result as string);
        if (reportType === 'yearend' && (json.studentsByGrade || json.resultsList)) {
          onUpdateYearEnd(json as YearEndReportState);
        } else if (reportType === 'sem1' && json.gradeComparisons) {
          onUpdateSem1(json as ReportState);
        }
      } catch {
        alert('ឯកសារ JSON មិនត្រឹមត្រូវ!');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowActionsMenu(false);
  };

  const zoomOptions = [
    { label: '១២០% (ធំ)', value: 1.2 },
    { label: '១១០%', value: 1.1 },
    { label: '១០០% (ធម្មតា)', value: 1.0 },
    { label: '៩០%', value: 0.9 },
    { label: '៨០% (តូច)', value: 0.8 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs print:hidden">
      {/* Tier 1: Main Header and Mode Switcher */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Branding & App Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white shadow-2xs">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight font-serif">
              របាយការណ៍បូកសរុបលទ្ធផលការងារអប់រំ
            </h1>
            <p className="text-[10px] text-slate-500 font-sans">
              សាលាបឋមសិក្សា រោល • ស្រុកភ្នំស្រុក
            </p>
          </div>
        </div>

        {/* Middle: Primary Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setReportType('yearend')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
              reportType === 'yearend'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarCheck2 className="w-4 h-4 text-amber-300" />
            <span>របាយការណ៍ដំណាច់ឆ្នាំ</span>
            <span className="text-[10px] bg-amber-400 text-slate-900 px-1 rounded font-bold">ថ្មី</span>
          </button>

          <button
            type="button"
            onClick={() => setReportType('sem1')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
              reportType === 'sem1'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>របាយការណ៍ឆមាសទី១</span>
          </button>

          <button
            type="button"
            onClick={() => setReportType('teachers')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
              reportType === 'teachers'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>ទិន្នន័យគ្រូ</span>
          </button>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Status Message Notification */}
          {statusMsg && (
            <div
              className={`hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                statusMsg.isOk ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="truncate max-w-[180px]">{statusMsg.text}</span>
            </div>
          )}

          {/* Zoom Controller */}
          {setZoomLevel && (
            <div className="relative" ref={zoomRef}>
              <button
                type="button"
                onClick={() => setShowZoomMenu((prev) => !prev)}
                className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition"
                title="ពង្រីក/បង្រួមទំហំឯកសារ (Zoom)"
              >
                <Maximize2 className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-[11px] font-semibold">{Math.round(zoomLevel * 100)}%</span>
              </button>

              {showZoomMenu && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 text-xs">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    ទំហំបង្ហាញ (Zoom)
                  </div>
                  {zoomOptions.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => {
                        setZoomLevel(opt.value);
                        setShowZoomMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 transition flex items-center justify-between ${
                        Math.abs(zoomLevel - opt.value) < 0.05
                          ? 'font-bold text-blue-700 bg-blue-50/70'
                          : 'text-slate-700'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {Math.abs(zoomLevel - opt.value) < 0.05 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      )}
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1 flex items-center justify-around px-2">
                    <button
                      type="button"
                      onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                      className="p-1 text-slate-600 hover:text-blue-700"
                      title="បង្រួម"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(1)}
                      className="px-1.5 py-0.5 text-[10px] text-slate-600 hover:text-blue-700 rounded bg-slate-100"
                    >
                      ១០០%
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))}
                      className="p-1 text-slate-600 hover:text-blue-700"
                      title="ពង្រីក"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition shadow-2xs"
            title="បោះពុម្ព ឬរក្សាទុកជា PDF (Print)"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">បោះពុម្ព (Print)</span>
          </button>

          {/* Quick Cloud Save Button */}
          <button
            type="button"
            onClick={onSaveCloud}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 active:scale-95 transition"
            title="រក្សាទុកទិន្នន័យក្នុង Cloud Firestore"
          >
            <Cloud className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Save Cloud</span>
          </button>

          {/* Actions Dropdown Button */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setShowActionsMenu((prev) => !prev)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition border border-slate-200"
              title="សកម្មភាពផ្សេងៗ"
            >
              <MoreVertical className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-semibold">សកម្មភាព</span>
            </button>

            {showActionsMenu && (
              <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  នាំចេញ & នាំចូលទិន្នន័យ
                </div>

                <button
                  type="button"
                  onClick={handleExportXlsx}
                  className="w-full text-left px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>ទាញយកជា Excel (.xlsx)</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportJson}
                  className="w-full text-left px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition flex items-center gap-2"
                >
                  <FileJson className="w-4 h-4 text-amber-600" />
                  <span>ទាញយកទិន្នន័យ JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowActionsMenu(false);
                    onSaveCloud();
                  }}
                  className="w-full text-left px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition flex items-center gap-2"
                >
                  <Cloud className="w-4 h-4 text-blue-600" />
                  <span>រក្សាទុកក្នុង Cloud Firestore</span>
                </button>

                <label
                  htmlFor="file-importer-menu"
                  className="w-full text-left px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-purple-600" />
                  <span>បញ្ចូលឯកសារ JSON (Import)</span>
                  <input
                    id="file-importer-menu"
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>

                <div className="border-t border-slate-100 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setShowActionsMenu(false);
                    onReset();
                  }}
                  className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 transition flex items-center gap-2 font-medium"
                >
                  <RotateCcw className="w-4 h-4 text-rose-500" />
                  <span>កំណត់ទិន្នន័យដើមឡើងវិញ</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tier 2: Horizontal Scrollable Sub-Tabs */}
      {reportType === 'yearend' && (
        <div className="border-t border-slate-200/80 bg-slate-50/90 px-2 sm:px-4 py-1.5">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth text-xs">
            <button
              type="button"
              onClick={() => setActiveYearEndTab('all')}
              className={`shrink-0 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeYearEndTab === 'all'
                  ? 'bg-blue-700 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>ទំព័រទាំងអស់ (1 ដល់ 6)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveYearEndTab('p1')}
              className={`shrink-0 px-3 py-1.5 rounded-lg transition ${
                activeYearEndTab === 'p1'
                  ? 'bg-blue-700 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              ទំព័រ ១ (សាលា & សិស្ស)
            </button>

            <button
              type="button"
              onClick={() => setActiveYearEndTab('p2')}
              className={`shrink-0 px-3 py-1.5 rounded-lg transition ${
                activeYearEndTab === 'p2'
                  ? 'bg-blue-700 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              ទំព័រ ២ (ហិរញ្ញវត្ថុ & បណ្ណាល័យ)
            </button>

            <button
              type="button"
              onClick={() => setActiveYearEndTab('p3')}
              className={`shrink-0 px-3 py-1.5 rounded-lg transition ${
                activeYearEndTab === 'p3'
                  ? 'bg-blue-700 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              ទំព័រ ៣ (លទ្ធផល & ភាគរយ)
            </button>

            <button
              type="button"
              onClick={() => setActiveYearEndTab('p4')}
              className={`shrink-0 px-3 py-1.5 rounded-lg transition ${
                activeYearEndTab === 'p4'
                  ? 'bg-blue-700 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              ទំព័រ ៤ (កម្មវិធីសិក្សា & ទីប្រឹក្សាកុមារី)
            </button>

            <button
              type="button"
              onClick={() => setActiveYearEndTab('p5')}
              className={`shrink-0 px-3 py-1.5 rounded-lg transition ${
                activeYearEndTab === 'p5'
                  ? 'bg-blue-700 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              ទំព័រ ៥ (បំណិនជីវិត & ព្រូន)
            </button>

            <button
              type="button"
              onClick={() => setActiveYearEndTab('p6')}
              className={`shrink-0 px-3 py-1.5 rounded-lg transition ${
                activeYearEndTab === 'p6'
                  ? 'bg-blue-700 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              ទំព័រ ៦ (ទឹកស្អាត, អាហារ & សន្និដ្ឋាន)
            </button>
          </div>
        </div>
      )}

      {reportType === 'sem1' && (
        <div className="border-t border-slate-200/80 bg-slate-50/90 px-2 sm:px-4 py-1.5">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth text-xs">
            <button
              type="button"
              onClick={() => setActiveSem1Tab('all')}
              className={`shrink-0 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeSem1Tab === 'all'
                  ? 'bg-blue-700 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>ទំព័រទាំងអស់ (Print)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSem1Tab('page1')}
              className={`shrink-0 px-3 py-1.5 rounded-lg transition ${
                activeSem1Tab === 'page1'
                  ? 'bg-blue-700 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              ទំព័រ ១ (បូកសរុប)
            </button>

            <button
              type="button"
              onClick={() => setActiveSem1Tab('page2')}
              className={`shrink-0 px-3 py-1.5 rounded-lg transition ${
                activeSem1Tab === 'page2'
                  ? 'bg-blue-700 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              ទំព័រ ២ (តារាងស្ថិតិ)
            </button>

            <button
              type="button"
              onClick={() => setActiveSem1Tab('page3')}
              className={`shrink-0 px-3 py-1.5 rounded-lg transition ${
                activeSem1Tab === 'page3'
                  ? 'bg-blue-700 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              ទំព័រ ៣ (បុគ្គលិក)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
