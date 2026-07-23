import React from "react";

interface DividerProps {
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ className = "" }) => {
  return (
    <hr className={`border-t border-[#374151] my-8 w-full ${className}`} />
  );
};