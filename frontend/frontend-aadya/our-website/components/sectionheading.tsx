import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`mb-10 ${centered ? "text-center" : "text-left"}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-brand-primary-text tracking-tight mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-brand-secondary-text text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};