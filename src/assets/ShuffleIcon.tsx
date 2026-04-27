import type { SVGProps } from "react";

const ShuffleIcon = ({
  width = 24,
  height = 24,
  color = "currentColor",
  strokeWidth = 2,
  ...props
}: SVGProps<SVGSVGElement> & {
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Arrow 1 */}
      <path d="M16 3h5v5" />
      <path d="M4 20l17-17" />

      {/* Arrow 2 */}
      <path d="M21 16v5h-5" />
      <path d="M15 15l6 6" />

      {/* Middle path */}
      <path d="M4 4l6 6" />
    </svg>
  );
};

export default ShuffleIcon;
