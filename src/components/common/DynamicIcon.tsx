// components/common/DynamicIcon.tsx - Fully dynamic with Material Icons font (no import/package needed)
import React from "react";

const DynamicIcon: React.FC<{
  iconName: string;
  className?: string;
  size?: number;
}> = ({
  iconName,
  className = "text-gray-500 dark:text-gray-400",
  size = 24,
}) => {
  return (
    <i
      className={`material-icons ${className}`}
      style={{ fontSize: `${size}px` }}
      title={iconName} // Tooltip fallback
    >
      {iconName}
    </i>
  );
};

export default DynamicIcon;
