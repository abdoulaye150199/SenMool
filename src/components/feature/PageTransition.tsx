import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'in' | 'out'>('in');
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current === location.pathname) return;

    setDirection('out');
    setIsAnimating(true);

    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setDirection('in');
      prevPathRef.current = location.pathname;

      const endTimeout = setTimeout(() => {
        setIsAnimating(false);
      }, 450);

      return () => clearTimeout(endTimeout);
    }, 350);

    return () => clearTimeout(timeout);
  }, [location.pathname, children]);

  useEffect(() => {
    if (prevPathRef.current === location.pathname) {
      setDisplayChildren(children);
    }
  }, [children, location.pathname]);

  return (
    <div
      className={`transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        direction === 'out'
          ? 'opacity-0 translate-y-4 scale-[0.98]'
          : direction === 'in' && isAnimating
          ? 'opacity-100 translate-y-0 scale-100'
          : ''
      }`}
    >
      {displayChildren}
    </div>
  );
}
