"use client";

import SplitText from "./SplitText";

export default function AnimatedHeading({
  text,
  className = "",
  tag = "h1",
  ...rest
}: {
  text: string;
  className?: string;
  compactGrid?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}) {
  return (
    <SplitText
      text={text}
      className={`heading-base ${className}`}
      splitType="chars"
      delay={40}
      duration={1}
      ease="power3.out"
      from={{ opacity: 0, y: 30 }}
      to={{ opacity: 1, y: 0 }}
      tag={tag}
      {...rest}
    />
  );
}
