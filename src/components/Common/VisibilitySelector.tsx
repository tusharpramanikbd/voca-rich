import { useState, useRef, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";

export type VisibilityMode = "WORD" | "MEANING" | "BOTH";

type Props = {
  value: VisibilityMode;
  onChange: (mode: VisibilityMode) => void;
};

const OPTIONS: { label: string; value: VisibilityMode }[] = [
  { label: "Word only", value: "WORD" },
  { label: "Meaning only", value: "MEANING" },
  { label: "Word + Meaning", value: "BOTH" },
];

const VisibilitySelector = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* trigger */}
      <button onClick={() => setOpen((prev) => !prev)} className="p-4">
        <EyeIcon className="w-6 h-6 text-white" />
      </button>

      {/* dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition
                ${
                  value === opt.value
                    ? "bg-teal-50 text-teal-600 font-semibold"
                    : "hover:bg-gray-50"
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisibilitySelector;
