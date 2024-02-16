import { useEffect, useState } from 'react';
import { breakpoints } from 'app/theme';

export const useWindowSize = () => {
  const [{ width, height }, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    height,
    xs: width < breakpoints.xs,
    sm: width >= breakpoints.xs && width < breakpoints.md,
    md: width >= breakpoints.sm && width < breakpoints.lg,
    lg: width >= breakpoints.md && width < breakpoints.xl,
    xl: width >= breakpoints.lg && width < breakpoints.xxl,
    xxl: width >= breakpoints.xxl,
    lgUp: width >= breakpoints.md,
    lgDown: width < breakpoints.lg,
    xlUp: width >= breakpoints.lg,
    xlDown: width < breakpoints.xl,
    smUp: width >= breakpoints.xs,
    smDown: width < breakpoints.sm,
    mdUp: width >= breakpoints.sm,
    mdDown: width < breakpoints.md,
  };
};
