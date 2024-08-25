import { useMemo } from "react";

export const useBackgroundStyles = (content) => {
  return useMemo(() => {
    const paddingTop = content.background?.paddingTop
      ? `calc(16px + ${content.background.paddingTop}px)`
      : content.background?.paddingY
      ? `calc(16px + ${content.background.paddingY}px)`
      : "16px";

    const paddingBottom = content.background?.paddingBottom
      ? `calc(16px + ${content.background.paddingBottom}px)`
      : content.background?.paddingY
      ? `calc(16px + ${content.background.paddingY}px)`
      : "16px";

    const backgroundImgStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: content.background?.bgImage
        ? `url(${content.background.bgImage})`
        : "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: `blur(${content.background?.blur}px)`,
      zIndex: -1,
      overflow: "hidden",
    };

    const calculateOpacity = content.background?.opacity / 100;

    return {
      paddingTop,
      paddingBottom,
      backgroundImgStyle,
      calculateOpacity,
    };
  }, [content]);
};
