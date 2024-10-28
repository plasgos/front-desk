import React, { forwardRef, useEffect, useState } from "react";
import img from "../../../../assets/profile.jpg";
import { IoMdClose } from "react-icons/io";

const ViewSalesNotification = forwardRef(
  ({ content, setPreviewFloatingSection }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const { shownOnWhen, isPopupShown, hidden } = content;

    const {
      bgColor,
      titleColor,
      position,
      imageSize,
      rounded,
      shadow,
      linkTo,
      isProductNameShown,
      isProductPriceShown,
      isTimeShown,
    } = content?.variant?.style;

    const viewPosition = {
      ...(position === "bottom-right"
        ? { bottom: 5, right: 5 }
        : position === "bottom-left"
        ? { bottom: 5, left: 5 }
        : position === "top-left"
        ? { top: 5, left: 5 }
        : { top: 5, right: 5 }),
    };
    const handelModalClose = () => {
      if (shownOnWhen.value === "immediately") {
        setPreviewFloatingSection((prevSections) =>
          prevSections.map((section) =>
            section.id === content.id
              ? {
                  ...section,
                  isPopupShown: false,
                  shownOnWhen: {
                    ...section.shownOnWhen,
                    isShown: false,
                  },
                }
              : section
          )
        );
      } else if (shownOnWhen.value === "waitAfter") {
        setIsVisible(false);
        setPreviewFloatingSection((prevSections) =>
          prevSections.map((section) =>
            section.id === content.id
              ? {
                  ...section,
                  isPopupShown: false,
                  shownOnWhen: {
                    ...section.shownOnWhen,
                    isShown: false,
                  },
                }
              : section
          )
        );
      }
    };

    useEffect(() => {
      if (shownOnWhen.value === "waitAfter") {
        const timer = setTimeout(() => {
          setIsVisible(true);
          setPreviewFloatingSection((prevSections) =>
            prevSections.map((section) =>
              section.id === content.id
                ? {
                    ...section,
                    isPopupShown: false,
                    shownOnWhen: {
                      ...section.shownOnWhen,
                      isShown: true,
                    },
                  }
                : section
            )
          );
        }, shownOnWhen.waitTime * 1000); // Convert detik ke milidetik
        return () => clearTimeout(timer);
      }
    }, [
      content.id,
      setPreviewFloatingSection,
      shownOnWhen.value,
      shownOnWhen.waitTime,
    ]);

    useEffect(() => {
      if (hidden) {
        const timer = setTimeout(() => {
          setPreviewFloatingSection((prevSections) =>
            prevSections.map((section) =>
              section.id === content.id
                ? {
                    ...section,
                    isPopupShown: false,
                    shownOnWhen: {
                      ...section.shownOnWhen,
                      isShown: false,
                    },
                  }
                : section
            )
          );
        }, hidden * 1000); // Convert detik ke milidetik
        return () => clearTimeout(timer);
      }
    }, [
      content.id,
      hidden,
      setPreviewFloatingSection,
      shownOnWhen.value,
      shownOnWhen.waitTime,
    ]);

    const animation = position.includes("bottom")
      ? "animate__animated animate__slideInUp animate__fast"
      : "animate__animated animate__slideInDown animate__fast";

    return (
      <>
        {shownOnWhen?.value === "immediately" && shownOnWhen?.isShown ? (
          <div
            ref={ref}
            style={{
              ...viewPosition,
              position: "absolute",
              zIndex: 999,
            }}
            className={`  tw-p-1 tw-flex tw-flex-col tw-items-center  `}
          >
            <div
              style={{ backgroundColor: bgColor, overflow: "hidden" }}
              className={`tw-flex  ${rounded} ${shadow} ${animation} `}
            >
              <div style={{ width: imageSize, height: "auto" }}>
                <img
                  src={img}
                  alt="img"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    color: titleColor,
                    maxWidth: 270,
                  }}
                  className="tw-p-3"
                >
                  {content?.content?.title}
                </div>
              </div>
              <div
                className="tw-absolute tw-top-1 tw-right-0 tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-black tw-text-gray-500 tw-p-2"
                onClick={() => handelModalClose()}
                aria-label="Close modal"
              >
                <IoMdClose size={24} />
              </div>
            </div>
          </div>
        ) : isPopupShown ? (
          <div
            ref={ref}
            style={{
              ...viewPosition,
              position: "absolute",
              zIndex: 999,
            }}
            className={`  tw-p-1 tw-flex tw-flex-col tw-items-center  `}
          >
            <div
              style={{ backgroundColor: bgColor, overflow: "hidden" }}
              className={`tw-flex  ${rounded} ${shadow} ${animation} `}
            >
              <div style={{ width: imageSize, height: "auto" }}>
                <img
                  src={img}
                  alt="img"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    color: titleColor,
                    maxWidth: 270,
                  }}
                  className="tw-p-3"
                >
                  {content?.content?.title}
                </div>
              </div>
              <div
                className="tw-absolute tw-top-1 tw-right-0 tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-black tw-text-gray-500 tw-p-2"
                onClick={() => handelModalClose()}
                aria-label="Close modal"
              >
                <IoMdClose size={24} />
              </div>
            </div>
          </div>
        ) : null}

        {shownOnWhen?.value === "waitAfter" &&
        isVisible &&
        shownOnWhen?.isShown ? (
          <div
            ref={ref}
            style={{
              ...viewPosition,
              position: "absolute",
              zIndex: 999,
            }}
            className={`  tw-p-1 tw-flex tw-flex-col tw-items-center  `}
          >
            <div
              style={{ backgroundColor: bgColor, overflow: "hidden" }}
              className={`tw-flex  ${rounded} ${shadow} ${animation} `}
            >
              <div style={{ width: imageSize, height: "auto" }}>
                <img
                  src={img}
                  alt="img"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    color: titleColor,
                    maxWidth: 270,
                  }}
                  className="tw-p-3"
                >
                  {content?.content?.title}
                </div>
              </div>
              <div
                className="tw-absolute tw-top-1 tw-right-0 tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-black tw-text-gray-500 tw-p-2"
                onClick={() => handelModalClose()}
                aria-label="Close modal"
              >
                <IoMdClose size={24} />
              </div>
            </div>
          </div>
        ) : isPopupShown ? (
          <div
            ref={ref}
            style={{
              ...viewPosition,
              position: "absolute",
              zIndex: 999,
            }}
            className={`  tw-p-1 tw-flex tw-flex-col tw-items-center  `}
          >
            <div
              style={{ backgroundColor: bgColor, overflow: "hidden" }}
              className={`tw-flex  ${rounded} ${shadow} ${animation} `}
            >
              <div style={{ width: imageSize, height: "auto" }}>
                <img
                  src={img}
                  alt="img"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    color: titleColor,
                    maxWidth: 270,
                  }}
                  className="tw-p-3"
                >
                  {content?.content?.title}
                </div>
              </div>
              <div
                className="tw-absolute tw-top-1 tw-right-0 tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-black tw-text-gray-500 tw-p-2"
                onClick={() => handelModalClose()}
                aria-label="Close modal"
              >
                <IoMdClose size={24} />
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
);

export default ViewSalesNotification;
