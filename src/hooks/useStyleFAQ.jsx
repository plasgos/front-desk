import { useState, useMemo } from "react";
import {
  maxColumnFAQOptions,
  shadowOptions,
} from "../views/custom-landing-page/_components/SelectOptions";

const useSectionStyle = (currentSection) => {
  // Define state using useState
  const [colorTitle, setColorTitle] = useState(
    currentSection?.variant?.style?.colorTitle || "#424242"
  );
  const [colorContent, setColorContent] = useState(
    currentSection?.variant?.style?.colorContent || "#424242"
  );
  const [bgColor, setBgColor] = useState(
    currentSection?.variant?.style?.bgColor || "#F5F5F5"
  );
  const [borderColor, setBorderColor] = useState(
    currentSection?.variant?.style?.borderColor || "#757575"
  );
  const [dividerColor, setDividerColor] = useState(
    currentSection?.variant?.style?.dividerColor || "#9E9E9E"
  );
  const [iconColor, setIconColor] = useState(
    currentSection?.variant?.style?.iconColor || "#424242"
  );
  const [bgContent, setBgContent] = useState(
    currentSection?.variant?.style?.bgContent || "#F5F5F5"
  );
  const [shadow, setShadow] = useState(
    shadowOptions?.find(
      (opt) => opt.value === currentSection?.variant?.style?.shadow
    ) || shadowOptions[2]
  );
  const [fontSize, setFontSize] = useState(
    currentSection?.variant?.style?.fontSize || 18
  );
  const [distance, setDistance] = useState(
    currentSection?.variant?.style?.distance || 18
  );
  const [borderWidth, setBorderWidth] = useState(
    currentSection?.variant?.style?.borderWidth || 2
  );
  const [isIconOnRight, setIsIconOnRight] = useState(
    currentSection?.variant?.style?.isIconOnRight || true
  );
  const [iconSize, setIconSize] = useState(
    currentSection?.variant?.style?.iconSize || 18
  );
  const [maxColumn, setMaxColumn] = useState(
    maxColumnFAQOptions?.find(
      (opt) => opt.value === currentSection?.variant?.style?.maxColumn
    ) || maxColumnFAQOptions[1]
  );
  const [rounded, setRounded] = useState(
    currentSection?.variant?.style?.rounded || 12
  );

  // Update state when currentSection changes
  useMemo(() => {
    if (currentSection?.variant?.style) {
      const { style } = currentSection.variant;
      setColorTitle(style.colorTitle || "#424242");
      setColorContent(style.colorContent || "#424242");
      setBgColor(style.bgColor || "#F5F5F5");
      setBorderColor(style.borderColor || "#757575");
      setDividerColor(style.dividerColor || "#9E9E9E");
      setIconColor(style.iconColor || "#424242");
      setBgContent(style.bgContent || "#F5F5F5");
      setShadow(
        shadowOptions.find((opt) => opt.value === style.shadow) ||
          shadowOptions[2]
      );
      setFontSize(style.fontSize || 18);
      setDistance(style.distance || 18);
      setBorderWidth(style.borderWidth || 2);
      setIsIconOnRight(style.isIconOnRight || true);
      setIconSize(style.iconSize || 18);
      setMaxColumn(
        maxColumnFAQOptions.find((opt) => opt.value === style.maxColumn) ||
          maxColumnFAQOptions[1]
      );
      setRounded(style.rounded || 12);
    }
  }, [currentSection]);

  // Memoize the style properties
  const memoizedStyleProps = useMemo(
    () => ({
      colorTitle,
      colorContent,
      bgColor,
      borderColor,
      dividerColor,
      iconColor,
      bgContent,
      shadow,
      fontSize,
      distance,
      borderWidth,
      isIconOnRight,
      iconSize,
      maxColumn,
      rounded,
    }),
    [
      colorTitle,
      colorContent,
      bgColor,
      borderColor,
      dividerColor,
      iconColor,
      bgContent,
      shadow,
      fontSize,
      distance,
      borderWidth,
      isIconOnRight,
      iconSize,
      maxColumn,
      rounded,
    ]
  );

  // Return both style props and setter functions
  return {
    styleProps: memoizedStyleProps,
    setColorTitle,
    setColorContent,
    setBgColor,
    setBorderColor,
    setDividerColor,
    setIconColor,
    setBgContent,
    setShadow,
    setFontSize,
    setDistance,
    setBorderWidth,
    setIsIconOnRight,
    setIconSize,
    setMaxColumn,
    setRounded,
  };
};

export default useSectionStyle;
