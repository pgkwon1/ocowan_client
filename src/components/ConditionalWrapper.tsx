import React, { ReactNode } from "react";

interface ConditionalWrapperProps {
  condition: boolean;
  children: ReactNode;
  wrapper: (children: ReactNode) => ReactNode;
}
export default function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) {
  return condition ? wrapper(children) : children;
}
