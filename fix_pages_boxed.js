const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');
const filesToFix = [
  "AnalyticsPage.tsx",
  "ARPAPage.tsx",
  "ASPPage.tsx",
  "CashflowPage.tsx",
  "ChurnPage.tsx",
  "CohortsPage.tsx",
  "LTVPage.tsx",
  "LeadsPage.tsx",
  "LeadsPipelinePage.tsx",
  "MapPage.tsx",
  "SubscribersPage.tsx",
  "TrialsPage.tsx"
];

filesToFix.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  console.log(`Processing file: ${file}`);

  // Normalize newlines to \n
  content = content.replace(/\r\n/g, '\n');

  // 1. Remove double container background styling (by only removing the classes on the inner wrapper, keeping the tag)
  content = content.replace(
    /<div className="w-full min-w-0">\s*<div className="flex w-full flex-col gap-6 rounded-\[20px\] bg-\[#F4F7FB\] p-6">/g,
    '<div className="w-full min-w-0">\n      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">'
  );

  // 2. Standardize headers to boxed card style
  if (file === 'LeadsPage.tsx') {
    // Replace LeadsPage header section open
    content = content.replace(
      /\{\/\* Top Header Bar \*\/\}\s*<section className="flex flex-col sm:flex-row w-full sm:items-center justify-between rounded-\[12px\] bg-white px-6 py-4 shadow-\[0px_2px_4px_-1px_rgba\(175,182,201,0.2\)\] sm:h-\[76px\] gap-4 shrink-0">\s*<div className="flex items-center text-\[#29343D\]">\s*<span className="text-\[16px\] font-bold tracking-tight text-\[#29343D\] font-sans">\s*Leads Management\s*<\/span>\s*<\/div>\s*<div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">/g,
      `{/* Header toolbar */}
      <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-sm font-extrabold text-[#1f2937]">Leads Management</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">`
    );
    // Find the first </section> after the header toolbar and change to </div>\n      </div>
    const hIndex = content.indexOf('{/* Header toolbar */}');
    if (hIndex !== -1) {
      const closeSecIndex = content.indexOf('</section>', hIndex);
      if (closeSecIndex !== -1) {
        content = content.substring(0, closeSecIndex) + '</div>\n      </div>' + content.substring(closeSecIndex + '</section>'.length);
      }
    }
  } else if (file === 'LeadsPipelinePage.tsx') {
    // Replace LeadsPipelinePage headers
    content = content.replace(
      /\{\/\* Top Header Bar \*\/\}\s*\{viewingNotificationStage \? \(\s*<section className="flex flex-col sm:flex-row w-full sm:items-center justify-between rounded-\[12px\] bg-white px-6 py-4 shadow-\[0px_2px_4px_-1px_rgba\(175,182,201,0.2\)\] sm:h-\[76px\] gap-4 shrink-0">/g,
      `{/* Header toolbar */}
        {viewingNotificationStage ? (
          <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">`
    );
    
    content = content.replace(
      /<\/section>\s*\) : \(\s*<section className="flex flex-col sm:flex-row w-full sm:items-center justify-between rounded-\[12px\] bg-white px-6 py-4 shadow-\[0px_2px_4px_-1px_rgba\(175,182,201,0.2\)\] sm:h-\[76px\] gap-4 shrink-0">/g,
      `</div>
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">`
    );

    // Replace trailing section closing tag
    content = content.replace(
      /<\/button>\s*<\/div>\s*<\/section>\s*\)/g,
      `</button>
            </div>
          </div>
        </div>)`
    );

    // Standardize title typography
    content = content.replace(
      /<span className="text-\[18px\] font-semibold tracking-tight text-\[#29343D\] font-sans">\s*Edit\/View Notification\s*<\/span>/g,
      `<h1 className="text-sm font-extrabold text-[#1f2937]">Edit/View Notification</h1>`
    );
    content = content.replace(
      /<span className="text-\[16px\] font-bold tracking-tight text-\[#29343D\] font-sans">\s*Leads Management\s*<\/span>/g,
      `<h1 className="text-sm font-extrabold text-[#1f2937]">Leads Management</h1>`
    );

    // Standardize back button styles
    content = content.replace(
      /className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-\[#29343D\] transition-colors"/g,
      'className="w-10 h-10 rounded-2xl bg-white border border-[#eef2f6] flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm"'
    );
  } else {
    // Normal Analytics pages
    content = content.replace(
      /\{\/\* Top Header Bar \*\/\}\s*<section className="flex w-full items-center justify-between rounded-\[12px\] bg-white px-6 py-4 shadow-\[0px_2px_4px_-1px_rgba\(175,182,201,0.2\)\]">/g,
      `{/* Header toolbar */}
      <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">`
    );

    const hIndex = content.indexOf('{/* Header toolbar */}');
    if (hIndex !== -1) {
      const closeSecIndex = content.indexOf('</section>', hIndex);
      if (closeSecIndex !== -1) {
        content = content.substring(0, closeSecIndex) + '</div>\n      </div>' + content.substring(closeSecIndex + '</section>'.length);
      }
    }

    // Standardize back button and header title
    content = content.replace(
      /<button\s*type="button"\s*onClick=\{\(\) => setActiveTab && setActiveTab\("dashboard"\)\}\s*className="flex items-center text-\[#29343D\] hover:opacity-80 transition-opacity"\s*>\s*<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">\s*<path d="m15 18-6-6 6-6" \/>\s*<\/svg>\s*<span className="text-\[(?:16|18)px\] font-bold tracking-tight text-\[#29343D\]">\s*Analytics\s*<\/span>\s*<\/button>/g,
      `<div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab("dashboard")}
            className="w-10 h-10 rounded-2xl bg-white border border-[#eef2f6] flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="text-sm font-extrabold text-[#1f2937]">Analytics</h1>
        </div>`
    );

    // Style the Resync button
    const resyncRegex = /(<button\s*type="button"\s*onClick=\{[^}]+\}\s*className=")(inline-flex h-(?:10|11) items-center gap-2 rounded-\[8px\] bg-\[#635BFF\] hover:bg-\[#4d42eb\] px-4 text-\[14px\] font-semibold text-white shadow-\[0_8px_18px_rgba\(94,83,252,0.22\)\] transition-all duration-150|inline-flex h-11 items-center gap-2 rounded-\[8px\] bg-\[#635BFF\] hover:bg-\[#4d42eb\] px-4 text-\[14px\] font-medium text-white shadow-\[0px_2px_4px_-1px_rgba\(175,182,201,0.2\)\] transition-all duration-150)("\s*>\s*<RefreshIcon \/> Resync\s*<\/button>)/g;
    content = content.replace(
      resyncRegex,
      `<div className="flex items-center gap-3 self-end md:self-auto">
          $1px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold tracking-wide shadow-lg shadow-indigo-150 transition-all flex items-center gap-2$3
        </div>`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Conversion complete!");
