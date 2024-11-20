import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { formatPrice } from "../../../../../lib/format-price";

const DelayPopup = ({ ref, content, setPreviewFloatingSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { shownOnWhen, isPopupShown, hidden, nextAfter, isRandomList } =
    content;
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
    productColor,
    priceColor,
    timeColor,
  } = content?.variant?.style;

  const [contentList, setContentList] = useState(
    content?.content.map((item, index) => ({
      ...item,
      isVisible: index === 0,
    })) || []
  );
  useEffect(() => {
    if (content?.content) {
      setContentList(content?.content);
    }
  }, [content.content]);

  const intervalRef = useRef(null);

  const getRandomIndex = (currentIndex) => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * contentList.length);
    } while (nextIndex === currentIndex); // Pastikan tidak mengulang indeks yang sama
    return nextIndex;
  };

  const rotateVisibility = () => {
    setContentList((prev) => {
      const currentIndex = prev.findIndex((item) => item.isVisible);

      const nextIndex = isRandomList
        ? getRandomIndex(currentIndex) // Jika random, pilih indeks acak
        : (currentIndex + 1) % prev.length;

      // Update isVisible hanya untuk elemen saat ini dan berikutnya
      return prev.map((item, index) => ({
        ...item,
        isVisible: index === nextIndex,
      }));
    });
  };

  useEffect(() => {
    if (contentList.length > 0 && nextAfter) {
      if (shownOnWhen.value === "waitAfter") {
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
      }

      // if (shownOnWhen.value === "immediately") {
      //   rotateVisibility();
      // }

      intervalRef.current = setInterval(rotateVisibility, nextAfter * 1000);
    }

    return () => clearInterval(intervalRef.current); // Bersihkan interval saat unmount

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentList.length, nextAfter, isRandomList]);

  const viewPosition = {
    ...(position === "bottom-right"
      ? { bottom: 15, right: 15 }
      : position === "bottom-left"
      ? { bottom: 15, left: 15 }
      : position === "top-left"
      ? { top: 15, left: 15 }
      : { top: 15, right: 15 }),
  };

  const handleModalCloseNextAfter = (id) => {
    setContentList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isVisible: false } : item
      )
    );

    if (isPopupShown) {
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

    if (shownOnWhen.value === "waitAfter") {
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
    const timer = setTimeout(() => {
      setIsVisible(true);
      setPreviewFloatingSection((prevSections) =>
        prevSections.map((section) =>
          section.id === content.id
            ? {
                ...section,
                // isPopupShown: false,
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
  }, [
    content.id,
    setPreviewFloatingSection,
    shownOnWhen.value,
    shownOnWhen.waitTime,
    shownOnWhen.isShown,
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
    <div>
      {shownOnWhen?.isShown && isVisible && (
        <>
          {nextAfter ? (
            <div>
              {contentList.map((contentItem) =>
                contentItem?.isVisible ? (
                  <div
                    key={contentItem?.id}
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
                          src={contentItem?.image}
                          alt="img"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      <div className="tw-p-3">
                        <div
                          style={{
                            whiteSpace: "pre-wrap",
                            color: titleColor,
                            maxWidth: 270,
                            marginBottom: 10,
                          }}
                        >
                          {contentItem?.showContentCard}
                        </div>

                        <div className="tw-flex tw-flex-col tw-gap-y-2">
                          {isProductNameShown && (
                            <div
                              style={{ color: productColor }}
                              className="tw-font-semibold"
                            >
                              {contentItem?.productName}
                            </div>
                          )}

                          {isProductPriceShown && (
                            <div
                              style={{ color: priceColor }}
                              className="tw-font-semibold"
                            >
                              {formatPrice(contentItem?.price)}
                            </div>
                          )}

                          {isTimeShown && (
                            <div
                              className="tw-text-xs"
                              style={{ color: timeColor }}
                            >
                              {contentItem?.time}
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className="tw-absolute tw-top-1 tw-right-0 tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-black tw-text-gray-500 tw-p-2"
                        onClick={() =>
                          handleModalCloseNextAfter(contentItem?.id)
                        }
                        aria-label="Close modal"
                      >
                        <IoMdClose size={24} />
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <div
              key={contentList[0]?.id}
              style={{
                position: "absolute",
                ...viewPosition,
                zIndex: 999,
              }}
              className="tw-p-1 tw-flex tw-flex-col tw-items-center"
            >
              <div
                style={{ backgroundColor: bgColor, overflow: "hidden" }}
                className={`tw-flex ${rounded} ${shadow} ${animation}`}
              >
                <div style={{ width: imageSize, height: "auto" }}>
                  <img
                    src={contentList[0]?.image}
                    alt="img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="tw-p-3">
                  <div
                    style={{
                      whiteSpace: "pre-wrap",
                      color: titleColor,
                      maxWidth: 270,
                      marginBottom: 10,
                    }}
                  >
                    {contentList[0]?.showContentCard}
                  </div>

                  <div className="tw-flex tw-flex-col tw-gap-y-2">
                    {isProductNameShown && (
                      <div
                        style={{ color: productColor }}
                        className="tw-font-semibold"
                      >
                        {contentList[0].productName}
                      </div>
                    )}

                    {isProductPriceShown && (
                      <div
                        style={{ color: priceColor }}
                        className=" tw-font-semibold"
                      >
                        {formatPrice(contentList[0].price)}
                      </div>
                    )}

                    {isTimeShown && (
                      <div className="tw-text-xs" style={{ color: timeColor }}>
                        {contentList[0].time}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="tw-absolute tw-top-1 tw-right-0 tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-black tw-text-gray-500 tw-p-2"
                  onClick={() => handleModalCloseNextAfter(contentList[0]?.id)}
                  aria-label="Close modal"
                >
                  <IoMdClose size={24} />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DelayPopup;
