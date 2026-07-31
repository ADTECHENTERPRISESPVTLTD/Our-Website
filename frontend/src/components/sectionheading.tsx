import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  eyebrow?: string;
  description?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = false,
  eyebrow,
  description,
}) => {
  return (
    <div className={`mb-10 ${centered ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <p className="section-eyebrow mb-4">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-brand-primary-text tracking-tight mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-brand-secondary-text text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="mx-auto mt-5 max-w-3xl text-lg text-brand-secondary-text">
          {description}
        </p>
      )}
    </div>
  );
};
