import { type FC, type PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<Element>(document.createElement('div'));

  useEffect(() => {
    const el = ref.current;
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return createPortal(children, ref.current);
};
