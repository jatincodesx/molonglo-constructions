type ReducedMotionFallbackProps = {
  children: React.ReactNode;
  className?: string;
};

export function ReducedMotionFallback({ children, className = "" }: ReducedMotionFallbackProps) {
  return <div className={`reduced-motion-fallback ${className}`}>{children}</div>;
}
