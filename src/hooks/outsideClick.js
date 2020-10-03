import { useEffect } from 'react';

// Hook to detect outside click from a reference
export default function useOutsideClick(ref, handler, show) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target) || !show) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, show]);
}
