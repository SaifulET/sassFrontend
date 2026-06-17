const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (!file.endsWith('.tsx')) return;
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('bg-[#F4F7FB]')) return;

  console.log(`Processing file: ${file}`);

  // Normalize newlines to \n
  content = content.replace(/\r\n/g, '\n');

  // 1. Remove double container at the beginning of the return statement
  content = content.replace(
    /<div className="w-full min-w-0">\s*<div className="flex w-full flex-col gap-6 rounded-\[20px\] bg-\[#F4F7FB\] p-6">/g,
    '<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">'
  );

  // 2. Remove the very last closing </div> in the file (guaranteed to belong to the main page container)
  const lastDivIndex = content.lastIndexOf('</div>');
  if (lastDivIndex !== -1) {
    content = content.substring(0, lastDivIndex) + content.substring(lastDivIndex + '</div>'.length);
  } else {
    console.log(`WARNING: Could not find last </div> in ${file}`);
  }

  // 3. Replace the header section
  if (file === 'LeadsPage.tsx') {
    content = content.replace(
      /{\/\* Top Header Bar \*\/}\s*<section className="flex flex-col sm:flex-row w-full sm:items-center justify-between rounded-\[12px\] bg-white px-6 py-4 shadow-\[0px_2px_4px_-1px_rgba\(175,182,201,0.2\)\] sm:h-\[76px\] gap-4 shrink-0">\s*<div className="flex items-center text-\[#29343D\]">\s*<span className="text-\[16px\] font-bold tracking-tight text-\[#29343D\] font-sans">\s*Leads Management\s*<\/span>\s*<\/div>\s*<div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">/g,
      `{/* Header toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Leads Management</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">`
    );
    // Replace the first closing </section> after the header toolbar
    const headerIndex = content.indexOf('{/* Header toolbar */}');
    if (headerIndex !== -1) {
      const closeSecIndex = content.indexOf('</section>', headerIndex);
      if (closeSecIndex !== -1) {
        content = content.substring(0, closeSecIndex) + '</div>\n      </div>' + content.substring(closeSecIndex + '</section>'.length);
      }
    }
  } else if (file === 'LeadsPipelinePage.tsx') {
    content = content.replace(
      /{\/\* Top Header Bar \*\/}\s*\{viewingNotificationStage \? \(\s*<section className="flex flex-col sm:flex-row w-full sm:items-center justify-between rounded-\[12px\] bg-white px-6 py-4 shadow-\[0px_2px_4px_-1px_rgba\(175,182,201,0.2\)\] sm:h-\[76px\] gap-4 shrink-0">/g,
      `{/* Header toolbar */}
        {viewingNotificationStage ? (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">`
    );
    content = content.replace(
      /<\/section>\s*\) : \(\s*<section className="flex flex-col sm:flex-row w-full sm:items-center justify-between rounded-\[12px\] bg-white px-6 py-4 shadow-\[0px_2px_4px_-1px_rgba\(175,182,201,0.2\)\] sm:h-\[76px\] gap-4 shrink-0">/g,
      `</div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">`
    );
    content = content.replace(
      /<\/div>\s*<\/section>\s*\)}/g,
      `</div>
        )}`
    );
    content = content.replace(
      /<span className="text-\[18px\] font-semibold tracking-tight text-\[#29343D\] font-sans">\s*Edit\/View Notification\s*<\/span>/g,
      `<h1 className="text-2xl font-bold tracking-tight text-slate-800">Edit/View Notification</h1>`
    );
    content = content.replace(
      /<span className="text-\[16px\] font-bold tracking-tight text-\[#29343D\] font-sans">\s*Leads Management\s*<\/span>/g,
      `<h1 className="text-2xl font-bold tracking-tight text-slate-800">Leads Management</h1>`
    );
    content = content.replace(
      /className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-\[#29343D\] transition-colors"/g,
      'className="w-10 h-10 rounded-2xl bg-white border border-[#eef2f6] flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm"'
    );
  } else {
    // Normal Analytics subpages
    // Replace opening tag of header bar
    content = content.replace(
      /{\/\* Top Header Bar \*\/}\s*<section className="flex w-full items-center justify-between rounded-\[12px\] bg-white px-6 py-4 shadow-\[0px_2px_4px_-1px_rgba\(175,182,201,0.2\)\]">/g,
      `{/* Header toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">`
    );

    // Replace closing section of header bar
    const headerIndex = content.indexOf('{/* Header toolbar */}');
    if (headerIndex !== -1) {
      const closeSecIndex = content.indexOf('</section>', headerIndex);
      if (closeSecIndex !== -1) {
        content = content.substring(0, closeSecIndex) + '</div>' + content.substring(closeSecIndex + '</section>'.length);
      }
    }

    // Replace the button block to matching h1 + back button
    content = content.replace(
      /<button\s*type="button"\s*onClick=\{\(\) => setActiveTab && setActiveTab\("dashboard"\)\}\s*className="flex items-center text-\[#29343D\] hover:opacity-80 transition-opacity"\s*>\s*<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">\s*<path d="m15 18-6-6 6-6" \/>\s*<\/svg>\s*<span className="text-\[18px\] font-bold tracking-tight text-\[#29343D\]">\s*Analytics\s*<\/span>\s*<\/button>/g,
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
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Analytics</h1>
        </div>`
    );

    // Style the Resync button dynamically and wrap it
    const resyncRegex = /(<button\s*type="button"\s*onClick=\{[^}]+\}\s*className=")(inline-flex h-10 items-center gap-2 rounded-\[8px\] bg-\[#635BFF\] hover:bg-\[#4d42eb\] px-4 text-\[14px\] font-semibold text-white shadow-\[0_8px_18px_rgba\(94,83,252,0.22\)\] transition-all duration-150)("\s*>\s*<RefreshIcon \/> Resync\s*<\/button>)/g;
    
    content = content.replace(
      resyncRegex,
      `<div className="flex items-center gap-3 self-end md:self-auto">
          $1px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold tracking-wide shadow-lg shadow-indigo-150 transition-all flex items-center gap-2$3
        </div>`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Finished converting all pages successfully!");
