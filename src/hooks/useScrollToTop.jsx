export const handleScrollToTop = (valueTarget, containerRef) => {
  if (valueTarget === "back-to-top" && containerRef.current) {
    containerRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};
