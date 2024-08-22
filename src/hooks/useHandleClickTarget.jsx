import { handleScrollToTop } from "./useScrollToTop";

export const useHandleClickTarget = (target, containerRef) => {
  if (target?.url?.url) {
    window.open(
      target.url.url,
      target.url.isOpenNewTab ? "_blank" : "_self",
      target.url.isOpenNewTab ? "noopener noreferrer" : ""
    );
  } else if (target?.whatApps?.phoneNumber) {
    const waLink = `https://wa.me/+62${
      target.whatApps.phoneNumber
    }?text=${encodeURIComponent(target.whatApps.message)}`;
    window.open(
      waLink,
      target.whatApps.isOpenNewTab ? "_blank" : "_self",
      target.whatApps.isOpenNewTab ? "noopener noreferrer" : ""
    );
  } else if (target?.scrollTarget?.value) {
    const targetId = target.scrollTarget.value;

    if (targetId === "back-to-top") {
      handleScrollToTop(targetId, containerRef);
    } else {
      // Update URL and scroll
      window.location.hash = targetId;
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  }
};
