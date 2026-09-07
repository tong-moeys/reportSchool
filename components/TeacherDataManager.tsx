'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  FileSpreadsheet,
  FileCode,
  Printer,
  FileText,
  Cloud,
  RefreshCw,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  Upload,
  Database,
  Sparkles
} from 'lucide-react';
import {
  TeacherRecord,
  TEACHER_KEYS,
  TEACHER_LABELS,
  TEXT_FIELD_SET
} from '@/lib/teacher-data';
import {
  subscribeTeachers,
  saveTeacherToFirestore,
  deleteTeacherFromFirestore,
  resetTeachersInFirestore
} from '@/lib/firestore-service';

export const TeacherDataManager: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<0 | 1 | 2>(0);
  const [editingRecord, setEditingRecord] = useState<TeacherRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = React.useCallback((msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // Subscribe to real-time Firestore updates
  useEffect(() => {
    const unsub = subscribeTeachers(
      (data) => {
        setTeachers(data);
        setLoading(false);
      },
      (err) => {
        console.error('Teacher sync error:', err);
        setLoading(false);
        showToast('បរាជ័យក្នុងការតភ្ជាប់ Firestore: ' + err.message, 'err');
      }
    );
    return () => unsub();
  }, [showToast]);

  // Filter teachers by search query
  const filteredTeachers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return teachers;
    return teachers.filter((t) => {
      const basicSearch = [
        t.teacherName,
        t.teacherId,
        t.schoolName,
        t.schoolCode,
        t.position,
        t.grade,
        t.year
      ].filter(Boolean).join(' ').toLowerCase();
      return basicSearch.includes(q);
    });
  }, [teachers, searchQuery]);

  // Pagination calculation
  const totalRecords = filteredTeachers.length;
  const pageSize = perPage >= 99999 ? Math.max(totalRecords, 1) : perPage;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const pageStart = (currentPage - 1) * pageSize;
  const currentTeachers = filteredTeachers.slice(pageStart, pageStart + pageSize);

  const openAddModal = () => {
    const newTeacher: TeacherRecord = {
      id: `t_${Date.now()}`,
      year: '2024-2025',
      schoolCode: '01030401017',
      schoolName: 'បឋមសិក្សារោក',
      position: 'គ្រូបង្រៀន',
      teacherId: `T${String(teachers.length + 1).padStart(3, '0')}`,
      teacherName: '',
      grade: '១',
      studentTotal: 0,
      female: 0
    };
    setEditingRecord(newTeacher);
    setModalTab(0);
    setIsEditModalOpen(true);
  };

  const openEditModal = (teacher: TeacherRecord) => {
    setEditingRecord({ ...teacher });
    setModalTab(0);
    setIsEditModalOpen(true);
  };

  const handleFieldChange = (key: keyof TeacherRecord, value: string) => {
    if (!editingRecord) return;
    const isText = TEXT_FIELD_SET.has(key as string);
    const parsedVal = isText ? value : (value === '' ? 0 : parseFloat(value) || 0);
    setEditingRecord({
      ...editingRecord,
      [key]: parsedVal
    });
  };

  const handleSaveTeacher = async () => {
    if (!editingRecord) return;
    if (!editingRecord.teacherName?.trim()) {
      showToast('សូមបញ្ចូលឈ្មោះគ្រូបង្រៀន!', 'err');
      return;
    }
    setIsSaving(true);
    try {
      await saveTeacherToFirestore(editingRecord);
      setIsEditModalOpen(false);
      showToast('✔ បានរក្សាទុកក្នុង Firestore ជោគជ័យ!', 'ok');
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : 'Error saving';
      showToast(`បរាជ័យក្នុងការរក្សាទុក: ${err}`, 'err');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTeacher = async (id?: string, name?: string) => {
    if (!id) return;
    if (!window.confirm(`តើអ្នកពិតជាចង់លុបទិន្នន័យលោកគ្រូ/អ្នកគ្រូ "${name || id}" មែនទេ?`)) {
      return;
    }
    try {
      await deleteTeacherFromFirestore(id);
      showToast('✔ បានលុបទិន្នន័យពី Firestore', 'ok');
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : 'Delete error';
      showToast(`បរាជ័យក្នុងការលុប: ${err}`, 'err');
    }
  };

  const handleSyncOfficialData = async () => {
    try {
      setLoading(true);
      await resetTeachersInFirestore();
      showToast('✔ បានធ្វើសមកាលកម្មទិន្នន័យផ្លូវការ ២២ នាក់ទៅ Firestore ជោគជ័យ!', 'ok');
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : 'Sync error';
      showToast(`បរាជ័យក្នុងការតភ្ជាប់៖ ${err}`, 'err');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith('.html') || fileName.endsWith('.htm')) {
        const text = await file.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const rows = doc.querySelectorAll('table tbody tr');
        if (!rows.length) {
          throw new Error('មិនឃើញជួរដេកទិន្នន័យក្នុងតារាង HTML ទេ');
        }

        const imported: TeacherRecord[] = [];
        rows.forEach((tr, idx) => {
          const tds = tr.querySelectorAll('td');
          if (tds.length < 5) return;
          const rec: Record<string, string | number> = {};
          TEACHER_KEYS.forEach((key, colIdx) => {
            const td = tds[colIdx];
            if (!td) return;
            const val = td.textContent?.trim() || '';
            if (TEXT_FIELD_SET.has(key as string)) {
              rec[key] = val;
            } else {
              rec[key] = Number(val) || 0;
            }
          });
          if (rec.teacherName) {
            rec.id = String(rec.teacherId || `teacher_${idx + 1}`);
            imported.push(rec as TeacherRecord);
          }
        });

        if (!imported.length) {
          throw new Error('ពុំមានទិន្នន័យគ្រូដែលមានឈ្មោះឡើយ');
        }

        for (const t of imported) {
          await saveTeacherToFirestore(t);
        }
        showToast(`✔ បានបញ្ចូលទិន្នន័យគ្រូ ${imported.length} នាក់ពី HTML ជោគជ័យ!`, 'ok');
      } else if (fileName.endsWith('.json')) {
        const text = await file.text();
        const data = JSON.parse(text);
        const list: TeacherRecord[] = Array.isArray(data) ? data : [data];
        for (const t of list) {
          if (t.teacherName) {
            await saveTeacherToFirestore(t);
          }
        }
        showToast(`✔ បានបញ្ចូលទិន្នន័យ ${list.length} នាក់ពី JSON ជោគជ័យ!`, 'ok');
      } else {
        // Excel XLSX
        const buffer = await file.arrayBuffer();
        const wb = XLSX.read(buffer, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const json: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);
        for (const row of json) {
          const rec: Record<string, string | number> = {};
          TEACHER_KEYS.forEach((k) => {
            const khmerLabel = TEACHER_LABELS[k];
            const val = row[khmerLabel] ?? row[k];
            if (val !== undefined) {
              rec[k] = TEXT_FIELD_SET.has(k as string) ? String(val) : Number(val) || 0;
            }
          });
          if (rec.teacherName) {
            await saveTeacherToFirestore(rec as TeacherRecord);
          }
        }
        showToast(`✔ បានបញ្ចូលទិន្នន័យពី Excel ជោគជ័យ!`, 'ok');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Import failed';
      showToast(`បរាជ័យក្នុងការបញ្ចូល៖ ${msg}`, 'err');
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleResetData = async () => {
    if (window.confirm('តើអ្នកពិតជាចង់កំណត់ទិន្នន័យដើមនៃគ្រូបង្រៀនឡើងវិញក្នុង Firestore មែនទេ?')) {
      try {
        setLoading(true);
        await resetTeachersInFirestore();
        showToast('✔ បានកំណត់ទិន្នន័យដើមឡើងវិញ', 'ok');
      } catch (e: unknown) {
        const err = e instanceof Error ? e.message : 'Reset error';
        showToast(`បរាជ័យ: ${err}`, 'err');
      } finally {
        setLoading(false);
      }
    }
  };

  // Export handlers
  const exportXlsx = () => {
    if (!teachers.length) {
      showToast('គ្មានទិន្នន័យសម្រាប់ទាញយកទេ', 'err');
      return;
    }
    const headers = TEACHER_KEYS.map((k) => TEACHER_LABELS[k] || (k as string));
    const rows = filteredTeachers.map((t) =>
      TEACHER_KEYS.map((k) => (t[k] !== undefined && t[k] !== null ? t[k] : ''))
    );
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'TeacherData');
    XLSX.writeFile(wb, `Teacher_Data_Rok_${new Date().toISOString().slice(0, 10)}.xlsx`);
    showToast('✔ បានទាញយកជាឯកសារ Excel (XLSX)', 'ok');
  };

  const exportJson = () => {
    if (!teachers.length) return;
    const blob = new Blob([JSON.stringify(teachers, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Teacher_Data_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('✔ បានទាញយកជាឯកសារ JSON', 'ok');
  };

  const exportHtml = () => {
    if (!teachers.length) return;
    const ths = TEACHER_KEYS.map(
      (k) => `<th style="background:#1e3a8a;color:white;padding:6px 8px;font-size:11px;">${TEACHER_LABELS[k] || k}</th>`
    ).join('');
    const trs = filteredTeachers
      .map((t, idx) => {
        const bg = idx % 2 === 0 ? '#ffffff' : '#f8faff';
        const tds = TEACHER_KEYS.map(
          (k) => `<td style="border:1px solid #e2e8f0;padding:4px 6px;text-align:center;font-size:11px;">${t[k] ?? '-'}</td>`
        ).join('');
        return `<tr style="background:${bg}">${tds}</tr>`;
      })
      .join('');

    const htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Teacher Data</title><style>body{font-family:sans-serif;padding:16px;}table{border-collapse:collapse;width:100%;}</style></head><body><h2>តារាងទិន្នន័យគ្រូបង្រៀន - សាលាបឋមសិក្សារោគ</h2><p>កាលបរិច្ឆេទ៖ ${new Date().toLocaleDateString('km-KH')} | ចំនួន៖ ${filteredTeachers.length} នាក់</p><div style="overflow-x:auto"><table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div></body></html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Teacher_Data_${new Date().toISOString().slice(0, 10)}.html`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('✔ បានទាញយកជាឯកសារ HTML', 'ok');
  };

  // Slices for sections in the edit modal
  const basicKeys: (keyof TeacherRecord)[] = TEACHER_KEYS.slice(0, 9);
  const s1Keys: (keyof TeacherRecord)[] = TEACHER_KEYS.slice(9, 38);
  const s2Keys: (keyof TeacherRecord)[] = TEACHER_KEYS.slice(38);

  const s1Sections = [
    { title: '🎓 ចំនួនសិស្ស ឆមាសទី១ (Semester 1 Students)', keys: s1Keys.slice(0, 14) },
    { title: '📚 ការអនុវត្តកម្មវិធីសិក្សា (Curriculum Progress)', keys: s1Keys.slice(14, 19) },
    { title: '📋 កិច្ចតែងការបង្រៀន (Lesson Plans)', keys: s1Keys.slice(19, 21) },
    { title: '📅 លទ្ធផលប្រចាំខែ (មករា–មេសា / Jan–Apr)', keys: s1Keys.slice(21) }
  ];

  const s2Sections = [
    { title: '🎓 ចំនួនសិស្ស ឆមាសទី២ (Semester 2 Students)', keys: s2Keys.slice(0, 14) },
    { title: '📚 ការអនុវត្តកម្មវិធីសិក្សា (Curriculum Progress)', keys: s2Keys.slice(14, 19) },
    { title: '📋 កិច្ចតែងការបង្រៀន (Lesson Plans)', keys: s2Keys.slice(19, 21) },
    { title: '📅 លទ្ធផលប្រចាំខែ (ឧសភា–កញ្ញា / May–Sep)', keys: s2Keys.slice(21) }
  ];

  return (
    <div className="w-full">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium text-xs sm:text-sm shadow-xl transition-all duration-300 ${
            toast.type === 'ok' ? 'bg-emerald-600' : 'bg-rose-600'
          }`}
        >
          {toast.type === 'ok' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white rounded-t-xl p-4 sm:p-5 shadow-sm border-b border-blue-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5" />
                Google Cloud Firestore (Single DB)
              </span>
              <span className="text-xs text-blue-200">· គម្រោង៖ gen-lang-client-0840118576</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mt-1 text-white flex items-center gap-2">
              គ្រប់គ្រងទិន្នន័យគ្រូបង្រៀន (Teacher Data Management)
            </h1>
            <p className="text-xs sm:text-sm text-blue-200/90 mt-0.5">
              សាលាបឋមសិក្សារោគ · ផ្ទុកនិងតភ្ជាប់ទិន្នន័យរួមគ្នាក្នុង Firebase Firestore តែមួយ
            </p>
          </div>

          {/* Export & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".html,.htm,.json,.xlsx,.xls"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white text-xs font-medium transition shadow-sm"
              title="បញ្ចូលឯកសារ HTML, JSON ឬ Excel ផ្ទាល់ចូល Firestore"
            >
              <Upload className="w-4 h-4" />
              <span>Upload (HTML/Excel)</span>
            </button>
            <button
              onClick={handleSyncOfficialData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition shadow-sm ring-1 ring-white/20"
              title="ធ្វើសមកាលកម្មទិន្នន័យគ្រូបង្រៀនផ្លូវការ ២២ នាក់ចូល Cloud Firestore"
            >
              <Database className="w-4 h-4 text-indigo-200" />
              <span>Sync ២២ នាក់ផ្លូវការ</span>
            </button>
            <button
              onClick={exportXlsx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium transition shadow-sm"
              title="ទាញយកជា Microsoft Excel"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>XLSX</span>
            </button>
            <button
              onClick={exportJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-medium transition shadow-sm"
              title="ទាញយកទិន្នន័យ JSON"
            >
              <FileCode className="w-4 h-4" />
              <span>JSON</span>
            </button>
            <button
              onClick={exportHtml}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-medium transition shadow-sm"
              title="ទាញយកជា HTML"
            >
              <FileText className="w-4 h-4" />
              <span>HTML</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-xs font-medium transition shadow-sm"
              title="បោះពុម្ពតារាង"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>បន្ថែមគ្រូ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="bg-white px-4 py-3 border-x border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <label className="font-medium">បង្ហាញក្នុង១ទំព័រ៖</label>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-slate-300 rounded px-2 py-1 bg-white text-xs font-medium focus:ring-1 focus:ring-blue-500 outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={99999}>ទាំងអស់ (All)</option>
            </select>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {filteredTeachers.length} កំណត់ត្រា (Records)
          </span>

          <button
            onClick={handleResetData}
            className="text-xs text-slate-500 hover:text-rose-600 inline-flex items-center gap-1 transition"
            title="កំណត់ទិន្នន័យគំរូឡើងវិញក្នុង Firestore"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ស្វែងរកតាមឈ្មោះ, អត្តលេខ, ថ្នាក់..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          />
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border-x border-b border-slate-200 overflow-x-auto max-h-[68vh] shadow-xs">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-600">កំពុងទាញយកទិន្នន័យពី Cloud Firestore...</p>
          </div>
        ) : (
          <table className="w-full text-left text-[11px] border-collapse min-w-max">
            {/* Header Row 1 */}
            <thead>
              <tr className="bg-slate-900 text-white font-semibold text-center border-b border-slate-800">
                <th
                  rowSpan={2}
                  className="sticky left-0 z-30 bg-slate-900 px-3 py-2 border-r border-slate-800 min-w-[90px]"
                >
                  សកម្មភាព
                </th>
                <th rowSpan={2} className="px-2 py-2 border-r border-slate-800 min-w-[70px]">ឆ្នាំសិក្សា</th>
                <th rowSpan={2} className="px-2 py-2 border-r border-slate-800 min-w-[90px]">កូដសាលា</th>
                <th rowSpan={2} className="px-3 py-2 border-r border-slate-800 min-w-[130px]">ឈ្មោះសាលា</th>
                <th rowSpan={2} className="px-2 py-2 border-r border-slate-800 min-w-[90px]">មុខតំណែង</th>
                <th rowSpan={2} className="px-2 py-2 border-r border-slate-800 min-w-[90px]">អត្តលេខ</th>
                <th rowSpan={2} className="px-3 py-2 border-r border-slate-800 min-w-[130px]">គោត្តនាម-នាម</th>
                <th rowSpan={2} className="px-2 py-2 border-r border-slate-800 min-w-[65px]">ថ្នាក់</th>
                <th rowSpan={2} className="px-2 py-2 border-r border-slate-800 min-w-[65px]">សិស្សសរុប</th>
                <th rowSpan={2} className="px-2 py-2 border-r border-slate-800 min-w-[60px]">ស្រី</th>

                {/* S1 Group Headers */}
                <th colSpan={2} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">សិស្សឆមាស១</th>
                <th colSpan={2} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">បវេសនកាល</th>
                <th colSpan={2} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">ប្រែប្រួល</th>
                <th colSpan={2} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">ជាប់មធ្យមភាគ</th>
                <th colSpan={2} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">ធ្លាក់ (0–4.99)</th>
                <th colSpan={2} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">ធ្លាក់ (4–4.99)</th>
                <th colSpan={2} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">បោះបង់</th>
                <th colSpan={5} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">ការអនុវត្តកម្មវិធី</th>
                <th colSpan={2} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">កិច្ចតែងការ</th>
                <th colSpan={2} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">មករា</th>
                <th colSpan={2} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">កុម្ភៈ</th>
                <th colSpan={2} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">មីនា</th>
                <th colSpan={2} className="bg-blue-900 border-r border-blue-800 px-2 py-1 text-[11px]">មេសា</th>

                {/* S2 Group Headers */}
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">សិស្សឆមាស២</th>
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">សង្ខេបឆមាស១</th>
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">ប្រែប្រួល</th>
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">ជាប់មធ្យមភាគ</th>
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">ធ្លាក់ (0–4.99)</th>
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">ធ្លាក់ (4–4.99)</th>
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">បោះបង់</th>
                <th colSpan={5} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">ការអនុវត្តកម្មវិធី</th>
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">កិច្ចតែងការ</th>
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">ឧសភា</th>
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">មិថុនា</th>
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">កក្កដា</th>
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">សីហា</th>
                <th colSpan={2} className="bg-emerald-900 border-r border-emerald-800 px-2 py-1 text-[11px]">កញ្ញា</th>
              </tr>

              {/* Header Row 2: Sub-headers */}
              <tr className="bg-slate-800 text-slate-200 text-center text-[10px] font-medium border-b border-slate-700">
                {/* S1 Sub-headers */}
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>

                {/* S1 Curriculum */}
                <th className="px-1 py-1 border-r border-slate-700">%KH</th>
                <th className="px-1 py-1 border-r border-slate-700">%Math</th>
                <th className="px-1 py-1 border-r border-slate-700">%Sci</th>
                <th className="px-1 py-1 border-r border-slate-700">%Soc</th>
                <th className="px-1 py-1 border-r border-slate-700">%Lang</th>

                {/* S1 Plans */}
                <th className="px-1 py-1 border-r border-slate-700">ចុះ</th>
                <th className="px-1 py-1 border-r border-slate-700">មិនចុះ</th>

                {/* S1 Months */}
                <th className="px-1 py-1 border-r border-slate-700">ABC</th>
                <th className="px-1 py-1 border-r border-slate-700">DEF</th>
                <th className="px-1 py-1 border-r border-slate-700">ABC</th>
                <th className="px-1 py-1 border-r border-slate-700">DEF</th>
                <th className="px-1 py-1 border-r border-slate-700">ABC</th>
                <th className="px-1 py-1 border-r border-slate-700">DEF</th>
                <th className="px-1 py-1 border-r border-slate-700">ABC</th>
                <th className="px-1 py-1 border-r border-slate-700">DEF</th>

                {/* S2 Sub-headers */}
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>
                <th className="px-1.5 py-1 border-r border-slate-700">សរុប</th>
                <th className="px-1.5 py-1 border-r border-slate-700">ស្រី</th>

                {/* S2 Curriculum */}
                <th className="px-1 py-1 border-r border-slate-700">%KH</th>
                <th className="px-1 py-1 border-r border-slate-700">%Math</th>
                <th className="px-1 py-1 border-r border-slate-700">%Sci</th>
                <th className="px-1 py-1 border-r border-slate-700">%Soc</th>
                <th className="px-1 py-1 border-r border-slate-700">%Lang</th>

                {/* S2 Plans */}
                <th className="px-1 py-1 border-r border-slate-700">ចុះ</th>
                <th className="px-1 py-1 border-r border-slate-700">មិនចុះ</th>

                {/* S2 Months */}
                <th className="px-1 py-1 border-r border-slate-700">ABC</th>
                <th className="px-1 py-1 border-r border-slate-700">DEF</th>
                <th className="px-1 py-1 border-r border-slate-700">ABC</th>
                <th className="px-1 py-1 border-r border-slate-700">DEF</th>
                <th className="px-1 py-1 border-r border-slate-700">ABC</th>
                <th className="px-1 py-1 border-r border-slate-700">DEF</th>
                <th className="px-1 py-1 border-r border-slate-700">ABC</th>
                <th className="px-1 py-1 border-r border-slate-700">DEF</th>
                <th className="px-1 py-1 border-r border-slate-700">ABC</th>
                <th className="px-1 py-1 border-r border-slate-700">DEF</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {currentTeachers.length === 0 ? (
                <tr>
                  <td colSpan={TEACHER_KEYS.length + 1} className="py-8 text-center text-slate-500 text-xs">
                    គ្មានទិន្នន័យគ្រូបង្រៀនត្រូវបង្ហាញទេ
                  </td>
                </tr>
              ) : (
                currentTeachers.map((t, idx) => (
                  <tr
                    key={t.id || idx}
                    className={`border-b border-slate-200 hover:bg-blue-50/60 transition ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                    }`}
                  >
                    {/* Sticky Action Column */}
                    <td className="sticky left-0 z-20 bg-white border-r border-slate-200 px-2 py-1.5 text-center shadow-xs">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openEditModal(t)}
                          className="p-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                          title="កែសម្រួល (Edit)"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(t.id, t.teacherName)}
                          className="p-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition"
                          title="លុប (Delete)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Data Cells */}
                    {TEACHER_KEYS.map((k) => {
                      const val = t[k];
                      const isBold = k === 'teacherName';
                      const isHighlight = k === 'grade' || k === 'position';
                      return (
                        <td
                          key={k as string}
                          className={`px-2 py-1.5 border-r border-slate-200 text-center whitespace-nowrap ${
                            isBold
                              ? 'font-semibold text-slate-900 text-left'
                              : isHighlight
                              ? 'font-medium text-blue-900'
                              : 'text-slate-700'
                          }`}
                        >
                          {val !== undefined && val !== null && val !== '' ? val : '-'}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="bg-slate-50 px-4 py-3 rounded-b-xl border-x border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-slate-500 font-medium">
          {totalRecords > 0
            ? `បង្ហាញពី ${pageStart + 1} ដល់ ${Math.min(pageStart + pageSize, totalRecords)} នៃសរុប ${totalRecords} នាក់`
            : 'គ្មានទិន្នន័យ'}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1 text-xs border border-slate-300 rounded bg-white font-medium hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ‹ ថយ
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
            .map((p, idx, arr) => {
              const prev = arr[idx - 1];
              const showEllipsis = prev && p - prev > 1;
              return (
                <React.Fragment key={p}>
                  {showEllipsis && <span className="px-1 text-xs text-slate-400">...</span>}
                  <button
                    onClick={() => setCurrentPage(p)}
                    className={`px-2.5 py-1 text-xs border rounded font-semibold transition ${
                      currentPage === p
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </button>
                </React.Fragment>
              );
            })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-2.5 py-1 text-xs border border-slate-300 rounded bg-white font-medium hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            បន្ទាប់ ›
          </button>
        </div>
      </div>

      {/* ── Teacher Edit / Add Modal ── */}
      {isEditModalOpen && editingRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white px-5 py-3.5 flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold flex items-center gap-2">
                  <Edit2 className="w-4 h-4 text-blue-400" />
                  <span>កែសម្រួលទិន្នន័យ៖ {editingRecord.teacherName || 'គ្រូបង្រៀនថ្មី'}</span>
                </h2>
                <p className="text-[11px] text-blue-200">
                  តភ្ជាប់ Firestore: <code className="bg-blue-900/50 px-1 rounded font-mono">{editingRecord.id}</code>
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2">
              <button
                onClick={() => setModalTab(0)}
                className={`px-4 py-2 text-xs font-semibold border-b-2 transition -mb-px flex items-center gap-1.5 ${
                  modalTab === 0
                    ? 'border-blue-600 text-blue-700 bg-white rounded-t'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>ព័ត៌មានទូទៅ (Basic Info)</span>
              </button>
              <button
                onClick={() => setModalTab(1)}
                className={`px-4 py-2 text-xs font-semibold border-b-2 transition -mb-px flex items-center gap-1.5 ${
                  modalTab === 1
                    ? 'border-blue-600 text-blue-700 bg-white rounded-t'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>ឆមាសទី១ (Semester 1)</span>
              </button>
              <button
                onClick={() => setModalTab(2)}
                className={`px-4 py-2 text-xs font-semibold border-b-2 transition -mb-px flex items-center gap-1.5 ${
                  modalTab === 2
                    ? 'border-blue-600 text-blue-700 bg-white rounded-t'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>ឆមាសទី២ (Semester 2)</span>
              </button>
            </div>

            {/* Modal Body with Form Fields */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Tab 0: Basic Info */}
              {modalTab === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {basicKeys.map((key) => {
                    const isText = TEXT_FIELD_SET.has(key as string);
                    return (
                      <div key={key as string} className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700 block">
                          {TEACHER_LABELS[key] || (key as string)}
                        </label>
                        <input
                          type={isText ? 'text' : 'number'}
                          value={editingRecord[key] ?? ''}
                          onChange={(e) => handleFieldChange(key, e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab 1: Semester 1 */}
              {modalTab === 1 && (
                <div className="space-y-6">
                  {s1Sections.map((sec) => (
                    <div key={sec.title} className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200">
                      <h3 className="text-xs font-bold text-blue-900 mb-3 pb-1 border-b border-slate-200">
                        {sec.title}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {sec.keys.map((key) => (
                          <div key={key as string} className="space-y-1">
                            <label className="text-[10px] font-medium text-slate-600 block truncate" title={TEACHER_LABELS[key]}>
                              {TEACHER_LABELS[key] || (key as string)}
                            </label>
                            <input
                              type="number"
                              value={editingRecord[key] ?? ''}
                              onChange={(e) => handleFieldChange(key, e.target.value)}
                              className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded bg-white text-center focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Semester 2 */}
              {modalTab === 2 && (
                <div className="space-y-6">
                  {s2Sections.map((sec) => (
                    <div key={sec.title} className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200">
                      <h3 className="text-xs font-bold text-emerald-900 mb-3 pb-1 border-b border-slate-200">
                        {sec.title}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {sec.keys.map((key) => (
                          <div key={key as string} className="space-y-1">
                            <label className="text-[10px] font-medium text-slate-600 block truncate" title={TEACHER_LABELS[key]}>
                              {TEACHER_LABELS[key] || (key as string)}
                            </label>
                            <input
                              type="number"
                              value={editingRecord[key] ?? ''}
                              onChange={(e) => handleFieldChange(key, e.target.value)}
                              className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded bg-white text-center focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-600 hover:bg-white transition"
              >
                បោះបង់ (Cancel)
              </button>
              <button
                onClick={handleSaveTeacher}
                disabled={isSaving}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'កំពុងរក្សាទុក...' : 'រក្សាទុកក្នុង Firestore (Save)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
