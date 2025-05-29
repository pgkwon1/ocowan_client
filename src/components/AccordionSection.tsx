// components/AccordionSection.tsx
import React, { useRef, useState } from "react";

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none hover:bg-gray-50 transition-colors"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span className="text-xl font-semibold text-gray-900">{title}</span>
        <svg
          className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        ref={contentRef}
        style={
          open
            ? { maxHeight: contentRef.current?.scrollHeight }
            : { maxHeight: 0 }
        }
        className={`transition-all duration-500 ease-in-out overflow-hidden bg-white`}
      >
        <div className="px-6 pb-6 pt-1">{children}</div>
      </div>
    </div>
  );
}
