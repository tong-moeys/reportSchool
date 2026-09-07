'use client';

import React, { useState, useEffect } from 'react';
import { initialReportData, ReportState } from '@/lib/report-data';
import {
  initialYearEndReportData,
  YearEndReportState,
} from '@/lib/year-end-data';
import { ReportToolbar } from '@/components/ReportToolbar';
import { Page1Report } from '@/components/Page1Report';
import { Page2Stats } from '@/components/Page2Stats';
import { Page3Staff } from '@/components/Page3Staff';
import { TeacherDataManager } from '@/components/TeacherDataManager';
import {
  subscribeSchoolReport,
  saveSchoolReportToFirestore,
  subscribeYearEndReport,
  saveYearEndReportToFirestore,
} from '@/lib/firestore-service';

// Year-End Report Components
import { YearEndHeader } from '@/components/year-end/YearEndHeader';
import { YearEndPage1 } from '@/components/year-end/YearEndPage1';
import { YearEndPage2 } from '@/components/year-end/YearEndPage2';
import { YearEndPage3 } from '@/components/year-end/YearEndPage3';
import { YearEndPage4 } from '@/components/year-end/YearEndPage4';
import { YearEndPage5 } from '@/components/year-end/YearEndPage5';
import { YearEndPage6 } from '@/components/year-end/YearEndPage6';

const STORAGE_KEY_SEM1 = 'school_report_rok_data_v1';
const STORAGE_KEY_YEAREND = 'school_report_rok_yearend_v1';

export function SchoolReportApp() {
  const [reportType, setReportType] = useState<'yearend' | 'sem1' | 'teachers'>('yearend');

  // Year-End Data State
  const [yearEndData, setYearEndData] = useState<YearEndReportState>(() => {
    if (typeof window === 'undefined') return initialYearEndReportData;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_YEAREND);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.resultsList || parsed.studentsByGrade)) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return initialYearEndReportData;
  });

  // Semester 1 Data State
  const [sem1Data, setSem1Data] = useState<ReportState>(() => {
    if (typeof window === 'undefined') return initialReportData;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SEM1);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.gradeComparisons) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return initialReportData;
  });

  // Sub-tabs
  const [activeYearEndTab, setActiveYearEndTab] = useState<'all' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6'>('all');
  const [activeSem1Tab, setActiveSem1Tab] = useState<'all' | 'page1' | 'page2' | 'page3'>('all');

  const [statusMsg, setStatusMsg] = useState<{ text: string; isOk: boolean } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Subscribe to real-time Firestore sync for Year-End Report
  useEffect(() => {
    const unsub = subscribeYearEndReport(
      (cloudData) => {
        if (cloudData && (cloudData.resultsList || cloudData.studentsByGrade)) {
          setYearEndData(cloudData);
        }
      },
      (err) => {
        console.warn('Firestore Year-End report subscription warning:', err);
      }
    );
    return () => unsub();
  }, []);

  // Subscribe to real-time Firestore sync for Semester 1 Report
  useEffect(() => {
    const unsub = subscribeSchoolReport(
      (cloudData) => {
        if (cloudData && cloudData.gradeComparisons) {
          setSem1Data(cloudData);
        }
      },
      (err) => {
        console.warn('Firestore Sem1 report subscription warning:', err);
      }
    );
    return () => unsub();
  }, []);

  // Autosave Year-End to local storage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_YEAREND, JSON.stringify(yearEndData));
    } catch {
      // Storage full
    }
  }, [yearEndData]);

  // Autosave Sem1 to local storage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_SEM1, JSON.stringify(sem1Data));
    } catch {
      // Storage full
    }
  }, [sem1Data]);

  const showStatus = (text: string, isOk: boolean) => {
    setStatusMsg({ text, isOk });
    setTimeout(() => {
      setStatusMsg(null);
    }, 4000);
  };

  const handleReset = () => {
    if (
      typeof window !== 'undefined' &&
      window.confirm('តើអ្នកពិតជាចង់កំណត់ទិន្នន័យនៃរបាយការណ៍នេះឡើងវិញមែនទេ?')
    ) {
      if (reportType === 'yearend') {
        setYearEndData(initialYearEndReportData);
        try {
          localStorage.removeItem(STORAGE_KEY_YEAREND);
        } catch {}
        saveYearEndReportToFirestore(initialYearEndReportData).catch(console.warn);
      } else {
        setSem1Data(initialReportData);
        try {
          localStorage.removeItem(STORAGE_KEY_SEM1);
        } catch {}
        saveSchoolReportToFirestore(initialReportData).catch(console.warn);
      }
      showStatus('បានកំណត់ទិន្នន័យដើមឡើងវិញ', true);
    }
  };

  const handleSaveCloud = async () => {
    try {
      showStatus('កំពុងរក្សាទុកក្នុង Cloud Firestore...', true);
      if (reportType === 'yearend') {
        await saveYearEndReportToFirestore(yearEndData);
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY_YEAREND, JSON.stringify(yearEndData));
        }
      } else {
        await saveSchoolReportToFirestore(sem1Data);
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY_SEM1, JSON.stringify(sem1Data));
        }
      }
      showStatus('✔ បានរក្សាទុកក្នុង Firestore ជោគជ័យ!', true);
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : 'Error';
      showStatus(`បរាជ័យក្នុងការរក្សាទុក: ${err}`, false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100/80 pb-16 print:bg-white print:pb-0 font-sans">
      {/* Top Application Toolbar */}
      <ReportToolbar
        reportType={reportType}
        setReportType={setReportType}
        yearEndData={yearEndData}
        onUpdateYearEnd={(newData) => {
          setYearEndData(newData);
          saveYearEndReportToFirestore(newData).catch(console.warn);
          showStatus('បានផ្ទុកទិន្នន័យដំណាច់ឆ្នាំជោគជ័យ!', true);
        }}
        sem1Data={sem1Data}
        onUpdateSem1={(newData) => {
          setSem1Data(newData);
          saveSchoolReportToFirestore(newData).catch(console.warn);
          showStatus('បានផ្ទុកទិន្នន័យឆមាសទី១ជោគជ័យ!', true);
        }}
        onReset={handleReset}
        activeYearEndTab={activeYearEndTab}
        setActiveYearEndTab={setActiveYearEndTab}
        activeSem1Tab={activeSem1Tab}
        setActiveSem1Tab={setActiveSem1Tab}
        statusMsg={statusMsg}
        onSaveCloud={handleSaveCloud}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
      />

      {/* Main Content Area */}
      <div
        className={
          reportType === 'teachers'
            ? 'w-full px-2 sm:px-6 py-4'
            : 'max-w-5xl mx-auto px-2 sm:px-4 py-4 print:p-0 print:m-0 print:max-w-none'
        }
        style={zoomLevel !== 1 && reportType !== 'teachers' ? { zoom: zoomLevel } : undefined}
      >
        {/* VIEW 1: Teacher Data Management */}
        {reportType === 'teachers' && <TeacherDataManager />}

        {/* VIEW 2: Year-End Education Report (របាយការណ៍ដំណាច់ឆ្នាំ) */}
        {reportType === 'yearend' && (
          <div className="space-y-6 print:space-y-0">
            {/* Page 1 */}
            {(activeYearEndTab === 'all' || activeYearEndTab === 'p1') && (
              <div className="page-break-after">
                <YearEndPage1 data={yearEndData} onChange={setYearEndData} />
              </div>
            )}

            {/* Page 2 */}
            {(activeYearEndTab === 'all' || activeYearEndTab === 'p2') && (
              <div className="page-break-after">
                <YearEndPage2 data={yearEndData} onChange={setYearEndData} />
              </div>
            )}

            {/* Page 3 */}
            {(activeYearEndTab === 'all' || activeYearEndTab === 'p3') && (
              <div className="page-break-after">
                <YearEndPage3 data={yearEndData} onChange={setYearEndData} />
              </div>
            )}

            {/* Page 4 */}
            {(activeYearEndTab === 'all' || activeYearEndTab === 'p4') && (
              <div className="page-break-after">
                <YearEndPage4 data={yearEndData} onChange={setYearEndData} />
              </div>
            )}

            {/* Page 5 */}
            {(activeYearEndTab === 'all' || activeYearEndTab === 'p5') && (
              <div className="page-break-after">
                <YearEndPage5 data={yearEndData} onChange={setYearEndData} />
              </div>
            )}

            {/* Page 6 */}
            {(activeYearEndTab === 'all' || activeYearEndTab === 'p6') && (
              <div>
                <YearEndPage6 data={yearEndData} onChange={setYearEndData} />
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: Semester 1 Report (របាយការណ៍ឆមាសទី១) */}
        {reportType === 'sem1' && (
          <div className="space-y-6 print:space-y-0">
            {/* Page 1 */}
            {(activeSem1Tab === 'all' || activeSem1Tab === 'page1') && (
              <div className="page-break-after">
                <Page1Report data={sem1Data} onChange={setSem1Data} />
              </div>
            )}

            {/* Page 2 */}
            {(activeSem1Tab === 'all' || activeSem1Tab === 'page2') && (
              <div className="page-break-after">
                <Page2Stats data={sem1Data} onChange={setSem1Data} />
              </div>
            )}

            {/* Page 3 */}
            {(activeSem1Tab === 'all' || activeSem1Tab === 'page3') && (
              <div>
                <Page3Staff data={sem1Data} onChange={setSem1Data} />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
