import { useRef, useEffect } from "react";

export default function useInfiniteScroll(callback) {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback();
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback]);

  return ref;
}
