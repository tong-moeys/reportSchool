import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4 text-center">
      <div className="bg-white p-8 rounded-xl shadow border border-slate-200 max-w-md w-full">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">រកមិនឃើញទំព័រ (Page Not Found)</h2>
        <p className="text-slate-500 mb-6 text-sm">
          ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមាន ឬត្រូវបានផ្លាស់ប្ដូរទីតាំង។
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          ត្រឡប់ទៅទំព័រដើម
        </Link>
      </div>
    </div>
  );
}
