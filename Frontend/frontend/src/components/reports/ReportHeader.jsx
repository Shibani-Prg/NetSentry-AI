import { FileText, Download } from "lucide-react";

function ReportHeader({ loading, reportAvailable, onDownload }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <FileText size={23} className="shrink-0 text-indigo-600 dark:text-indigo-400" />

          <h1 className="theme-text text-xl font-semibold sm:text-2xl">
            Security Reports
          </h1>
        </div>

        <p className="theme-text-secondary mt-2 text-sm leading-relaxed">
          Analyze security events and export reports from NetSentry AI.
        </p>
      </div>

      <button
        type="button"
        onClick={onDownload}
        disabled={!reportAvailable || loading}
        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        <Download size={17} />
        Download CSV
      </button>
    </div>
  );
}

export default ReportHeader;