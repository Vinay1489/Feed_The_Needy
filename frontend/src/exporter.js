export function exportToCSV(filename, rows) {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => sanitizeCSV(r[h])).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename.endsWith(".csv") ? filename : filename + ".csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

function sanitizeCSV(val) {
  if (val == null) return "";
  const s = String(val).replaceAll('"', '""');
  if (/[",\n]/.test(s)) return '"' + s + '"';
  return s;
}

export function printHtml(title, html) {
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(
    `<!doctype html><html><head><title>${title}</title><style>body{font-family:Inter,ui-sans-serif,system-ui; padding:24px} table{border-collapse:collapse;width:100%} th,td{border:1px solid #e5e7eb;padding:8px;text-align:left} h1{margin:0 0 16px 0}</style></head><body><h1>${title}</h1>${html}</body></html>`
  );
  win.document.close();
  win.focus();
  win.print();
}
