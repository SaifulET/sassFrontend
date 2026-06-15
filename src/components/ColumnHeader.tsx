import React from 'react';

interface ColumnHeaderProps {
  title: string;
  count: number;
  onHide?: () => void;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ title, count, onHide }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-t-[12px] p-4 border border-slate-200">
      <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold bg-[#EFF2F8] text-[#635BFF]">
          {count}
        </span>
        <button
          type="button"
          onClick={onHide}
          className="p-1 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Hide column"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
