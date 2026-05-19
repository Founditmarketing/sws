import type { CapabilityIcon as IconKey } from "@/lib/content/capabilities";

const paths: Record<IconKey, React.ReactNode> = {
  excavation: (
    <>
      <path d="M2 22 H22" />
      <path d="M5 22 V12 L11 8" />
      <path d="M11 8 L17 13 L22 11" />
      <circle cx="6.5" cy="22" r="1.2" />
      <circle cx="9.5" cy="22" r="1.2" />
    </>
  ),
  grading: (
    <>
      <path d="M2 18 H22" />
      <path d="M4 18 V13 H8 L10 11 H18 L20 13 V18" />
      <circle cx="6.5" cy="20" r="1.2" />
      <circle cx="17.5" cy="20" r="1.2" />
    </>
  ),
  clearing: (
    <>
      <path d="M3 21 H21" />
      <path d="M7 21 V13 L11 9 L15 12 V21" />
      <path d="M16 21 V15 L19 12" />
      <path d="M5 17 L9 13" />
    </>
  ),
  padsite: (
    <>
      <path d="M3 18 H21" />
      <path d="M3 18 L7 12 H17 L21 18" />
      <path d="M9 12 V8 H15 V12" />
    </>
  ),
  erosion: (
    <>
      <path d="M3 8 H21" />
      <path d="M3 13 H21" />
      <path d="M3 18 H21" />
      <path d="M7 6 V20" />
      <path d="M12 6 V20" />
      <path d="M17 6 V20" />
    </>
  ),
  retaining: (
    <>
      <path d="M3 20 H21" />
      <path d="M5 20 V14 H19 V20" />
      <path d="M5 14 H19" />
      <path d="M7 14 V20" />
      <path d="M11 14 V20" />
      <path d="M15 14 V20" />
    </>
  ),
  concrete: (
    <>
      <rect x="3" y="11" width="18" height="9" />
      <path d="M3 14 H21" />
      <path d="M9 11 V20" />
      <path d="M15 11 V20" />
    </>
  ),
  road: (
    <>
      <path d="M5 21 L9 3" />
      <path d="M19 21 L15 3" />
      <path d="M11 6 V8" />
      <path d="M11 12 V14" />
      <path d="M11 18 V20" />
    </>
  ),
  culvert: (
    <>
      <path d="M3 12 H21" />
      <path d="M5 12 C5 9 19 9 19 12" />
      <path d="M5 12 C5 15 19 15 19 12" />
      <path d="M3 18 H21" />
    </>
  ),
  ponds: (
    <>
      <path d="M3 14 C7 12 9 16 12 14 C15 12 17 16 21 14" />
      <path d="M3 18 C7 16 9 20 12 18 C15 16 17 20 21 18" />
      <path d="M5 8 H19 L17 12 H7 Z" />
    </>
  ),
  dozer: (
    <>
      <path d="M2 19 H20" />
      <path d="M4 19 V14 H10 L13 11 H18 V19" />
      <circle cx="6" cy="20" r="1.2" />
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="15" cy="20" r="1.2" />
    </>
  ),
  leveling: (
    <>
      <path d="M3 12 H21" />
      <path d="M3 16 H21" />
      <path d="M5 8 H19" />
      <path d="M12 4 L15 8 H9 Z" />
    </>
  ),
};

export function CapabilityIcon({
  name,
  className,
}: {
  name: IconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
