import { useEffect, useRef, useState } from "react";

const useAnimatedVisibility = (
  content,
  observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 }
) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    }, observerOptions);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (elementRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(elementRef.current);
      }
    };
  }, [observerOptions]);

  const duration = content?.animation?.duration || 1;
  const isReplay = content?.animation?.isReplay;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !content?.animation?.type) return;

    // Hapus kelas animasi terlebih dahulu
    element.classList.remove(content.animation.type);

    // Tambahkan kembali setelah delay singkat untuk retrigger animasi
    setTimeout(() => {
      element.classList.add(content.animation.type);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, isReplay]);

  const getClassName = () => {
    return isVisible
      ? `animate__animated ${content?.animation?.type} custom-animation`
      : "";
  };

  return { elementRef, getClassName, duration };
};

export default useAnimatedVisibility;
