import { useScrollReveal } from "../hooks/useScrollReveal.js";

export function AnimatedSection({ children, className = "", staggerDelay = 0 }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`${className} opacity-0 will-change-transform-opacity transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "translate-y-12"
      }`}
      style={{ transitionDelay: `${staggerDelay}ms` }}
    >
      {children}
    </div>
  );
}
