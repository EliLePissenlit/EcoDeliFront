import { useState, useEffect } from 'react';

export function useScrollYProgress() {
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollYProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollYProgress;
}
