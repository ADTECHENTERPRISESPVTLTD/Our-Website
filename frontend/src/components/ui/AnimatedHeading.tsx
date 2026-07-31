"use client";

import SplitText from "./SplitText";
import type { ComponentProps } from "react";

type AnimatedHeadingProps = {
  text: string;
  className?: string;
  compactGrid?: boolean;
  tag?: any;
} & Omit<ComponentProps<typeof SplitText>, "text" | "tag">;

export default function AnimatedHeading({
  text,
  className = "",
  compactGrid = false,
  tag = "h1",
  ...rest
}: AnimatedHeadingProps) {
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

