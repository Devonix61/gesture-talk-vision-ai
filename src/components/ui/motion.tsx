
import React, { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Animation types
type AnimationType = 
  'fade-in' | 
  'slide-up' | 
  'slide-down' | 
  'slide-left' | 
  'slide-right' | 
  'zoom-in' | 
  'bounce' | 
  'rotate' |
  'none';

interface MotionProps {
  children: ReactNode;
  type: AnimationType;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

// Initial and final states for each animation
const animationStates: Record<AnimationType, { initial: string, animate: string }> = {
  'fade-in': {
    initial: 'opacity-0',
    animate: 'opacity-100',
  },
  'slide-up': {
    initial: 'opacity-0 translate-y-10',
    animate: 'opacity-100 translate-y-0',
  },
  'slide-down': {
    initial: 'opacity-0 -translate-y-10',
    animate: 'opacity-100 translate-y-0',
  },
  'slide-left': {
    initial: 'opacity-0 translate-x-10',
    animate: 'opacity-100 translate-x-0',
  },
  'slide-right': {
    initial: 'opacity-0 -translate-x-10',
    animate: 'opacity-100 translate-x-0',
  },
  'zoom-in': {
    initial: 'opacity-0 scale-95',
    animate: 'opacity-100 scale-100',
  },
  'bounce': {
    initial: 'opacity-0 translate-y-4',
    animate: 'opacity-100 translate-y-0 animate-bounce',
  },
  'rotate': {
    initial: 'opacity-0 rotate-90',
    animate: 'opacity-100 rotate-0',
  },
  'none': {
    initial: '',
    animate: '',
  },
};

export const motion = ({ 
  children, 
  type = 'fade-in', 
  duration = 500, 
  delay = 0, 
  threshold = 0.1,
  className = '',
  once = true,
}: MotionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when component enters or leaves viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { 
        threshold, 
        rootMargin: '0px 0px -100px 0px' // Start animation slightly before element enters viewport 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, once]);

  const animationState = animationStates[type];
  const animationStyle = {
    transitionProperty: 'all',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        isVisible ? animationState.animate : animationState.initial,
        className
      )}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

export default motion;
