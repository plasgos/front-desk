import React, { forwardRef, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";

import { useDispatch, useSelector } from "react-redux";
import { setClosePopup } from "../../../../redux/modules/custom-landing-page/reducer";
import { ViewMultipleContent } from "./ViewMultipleContent";

const ViewPopUp = forwardRef(
  (
    {
      containerRef,
      width,
      content,
      isPreview,
      setSectionContentRef = null,
      focusedIndexSectionContent = null,
      setPreviewFloatingSection,
      setPreviewSection,
      setColumnRef,
      focusedIndexColumn,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const { popup } = useSelector((state) => state.customLandingPage);

    const dispatch = useDispatch();

    const stylesBg = useBackgroundStyles(content);

    const { shownOnWhen, isPopupShown } = content;

    const handelModalClose = (popup) => {
      if (shownOnWhen.value === "clickButton") {
        if (popup) {
          dispatch(setClosePopup(popup));
        }
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
      } else if (shownOnWhen.value === "immediately") {
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

    return (
      <>
        {shownOnWhen?.value === "immediately" && shownOnWhen?.isShown ? (
          <div
            ref={ref}
            className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-50"
          >
            <div
              style={{
                width: width < 420 ? "80%" : content?.width,
                overflow: "hidden",
                paddingTop: stylesBg.paddingTop,
                paddingBottom: stylesBg.paddingBottom,
                backgroundColor: content.background.bgColor || "",
                position: "relative",
                zIndex: 1,
              }}
              className={`tw-bg-white ${content?.rounded} tw-shadow-lg  sm:tw-w-3/4 lg:tw-w-1/2 tw-py-6 tw-px-2 tw-relative animate__animated animate__zoomIn`}
            >
              {content.background?.opacity ? (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor:
                      content.background?.opacity < 0 ? "black" : "white",
                    opacity: Math.abs(stylesBg.calculateOpacity),
                  }}
                ></div>
              ) : null}

              {content?.background?.bgImage ? (
                <div style={stylesBg.backgroundImgStyle}></div>
              ) : content?.background?.bgType === "gradient" ? (
                <div style={stylesBg.gradientStyle}></div>
              ) : content?.background?.bgType === "pattern" ? (
                <div style={stylesBg.backgroundPatternStyle}></div>
              ) : null}
              <div
                className="tw-absolute tw-top-2 tw-right-2 tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-black tw-text-gray-500 tw-p-2"
                onClick={() => handelModalClose()}
                aria-label="Close modal"
              >
                <IoMdClose size={24} />
              </div>

              <div
                className="tw-scrollbar-hide"
                style={{
                  maxHeight: 350,
                  overflowY: "auto",
                  marginTop: 20,
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE/Edge
                }}
              >
                {content.content.map((section) => (
                  <ViewMultipleContent
                    content={section}
                    focusedIndexColumn={focusedIndexColumn}
                    setSectionContentRef={setSectionContentRef}
                    containerRef={containerRef}
                    focusedIndexSectionContent={focusedIndexSectionContent}
                    isPreview={isPreview}
                    setColumnRef={setColumnRef}
                    setPreviewSection={setPreviewSection}
                    width={content?.width}
                    key={content.id}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : isPopupShown ? (
          <div
            ref={ref}
            className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-50 "
          >
            <div
              style={{
                width: width < 420 ? "80%" : content?.width,
                overflow: "hidden",
                paddingTop: stylesBg.paddingTop,
                paddingBottom: stylesBg.paddingBottom,
                backgroundColor: content.background.bgColor || "",
                position: "relative",
                zIndex: 1,
              }}
              className={`tw-bg-white ${content?.rounded} tw-shadow-lg  sm:tw-w-3/4 lg:tw-w-1/2 tw-py-6 tw-px-2 tw-relative animate__animated animate__zoomIn`}
            >
              {content.background?.opacity ? (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor:
                      content.background?.opacity < 0 ? "black" : "white",
                    opacity: Math.abs(stylesBg.calculateOpacity),
                  }}
                ></div>
              ) : null}

              {content?.background?.bgImage ? (
                <div style={stylesBg.backgroundImgStyle}></div>
              ) : content?.background?.bgType === "gradient" ? (
                <div style={stylesBg.gradientStyle}></div>
              ) : content?.background?.bgType === "pattern" ? (
                <div style={stylesBg.backgroundPatternStyle}></div>
              ) : null}
              <div
                className="tw-absolute tw-top-2 tw-right-2 tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-black tw-text-gray-500 tw-p-2"
                onClick={() => handelModalClose()}
                aria-label="Close modal"
              >
                <IoMdClose size={24} />
              </div>

              <div
                className="tw-scrollbar-hide"
                style={{
                  maxHeight: 350,
                  overflowY: "auto",
                  marginTop: 20,
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE/Edge
                }}
              >
                {content.content.map((section) => (
                  <ViewMultipleContent
                    content={section}
                    focusedIndexColumn={focusedIndexColumn}
                    setSectionContentRef={setSectionContentRef}
                    containerRef={containerRef}
                    focusedIndexSectionContent={focusedIndexSectionContent}
                    isPreview={isPreview}
                    setColumnRef={setColumnRef}
                    setPreviewSection={setPreviewSection}
                    width={content?.width}
                    key={content.id}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {shownOnWhen?.value === "clickButton" ? (
          <div>
            {popup.map((popup) => (
              <div key={popup.id}>
                {popup.id === content?.id && popup.isShowPopup ? (
                  <div
                    ref={ref}
                    className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-50 "
                  >
                    <div
                      style={{
                        width: width < 420 ? "80%" : content?.width,
                        overflow: "hidden",
                        paddingTop: stylesBg.paddingTop,
                        paddingBottom: stylesBg.paddingBottom,
                        backgroundColor: content.background.bgColor || "",
                        position: "relative",
                        zIndex: 1,
                      }}
                      className={`tw-bg-white ${content?.rounded} tw-shadow-lg  sm:tw-w-3/4 lg:tw-w-1/2 tw-py-6 tw-px-2 tw-relative animate__animated animate__zoomIn`}
                    >
                      {content.background?.opacity ? (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor:
                              content.background?.opacity < 0
                                ? "black"
                                : "white",
                            opacity: Math.abs(stylesBg.calculateOpacity),
                          }}
                        ></div>
                      ) : null}

                      {content?.background?.bgImage ? (
                        <div style={stylesBg.backgroundImgStyle}></div>
                      ) : content?.background?.bgType === "gradient" ? (
                        <div style={stylesBg.gradientStyle}></div>
                      ) : content?.background?.bgType === "pattern" ? (
                        <div style={stylesBg.backgroundPatternStyle}></div>
                      ) : null}
                      <div
                        className="tw-absolute tw-top-2 tw-right-2 tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-black tw-text-gray-500 tw-p-2"
                        onClick={() => handelModalClose(popup)}
                        aria-label="Close modal"
                      >
                        <IoMdClose size={24} />
                      </div>

                      <div
                        className="tw-scrollbar-hide"
                        style={{
                          maxHeight: 350,
                          overflowY: "auto",
                          marginTop: 20,
                          scrollbarWidth: "none", // Firefox
                          msOverflowStyle: "none", // IE/Edge
                        }}
                      >
                        {content.content.map((section) => (
                          <ViewMultipleContent
                            content={section}
                            focusedIndexColumn={focusedIndexColumn}
                            setSectionContentRef={setSectionContentRef}
                            containerRef={containerRef}
                            focusedIndexSectionContent={
                              focusedIndexSectionContent
                            }
                            isPreview={isPreview}
                            setColumnRef={setColumnRef}
                            setPreviewSection={setPreviewSection}
                            width={content?.width}
                            key={content.id}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : isPopupShown ? (
          <div>
            {popup.map((popup) => (
              <div key={popup.id}>
                {popup.id === content?.id &&
                (popup.isShowPopup || shownOnWhen?.isShown) ? (
                  <div
                    ref={ref}
                    className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-50 "
                  >
                    <div
                      style={{
                        width: width < 420 ? "80%" : content?.width,
                        overflow: "hidden",
                        paddingTop: stylesBg.paddingTop,
                        paddingBottom: stylesBg.paddingBottom,
                        backgroundColor: content.background.bgColor || "",
                        position: "relative",
                        zIndex: 1,
                      }}
                      className={`tw-bg-white ${content?.rounded} tw-shadow-lg  sm:tw-w-3/4 lg:tw-w-1/2 tw-py-6 tw-px-2 tw-relative animate__animated animate__zoomIn`}
                    >
                      {content.background?.opacity ? (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor:
                              content.background?.opacity < 0
                                ? "black"
                                : "white",
                            opacity: Math.abs(stylesBg.calculateOpacity),
                          }}
                        ></div>
                      ) : null}

                      {content?.background?.bgImage ? (
                        <div style={stylesBg.backgroundImgStyle}></div>
                      ) : content?.background?.bgType === "gradient" ? (
                        <div style={stylesBg.gradientStyle}></div>
                      ) : content?.background?.bgType === "pattern" ? (
                        <div style={stylesBg.backgroundPatternStyle}></div>
                      ) : null}
                      <div
                        className="tw-absolute tw-top-2 tw-right-2 tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-black tw-text-gray-500 tw-p-2"
                        onClick={() => handelModalClose(popup)}
                        aria-label="Close modal"
                      >
                        <IoMdClose size={24} />
                      </div>

                      <div
                        className="tw-scrollbar-hide"
                        style={{
                          maxHeight: 350,
                          overflowY: "auto",
                          marginTop: 20,
                          scrollbarWidth: "none", // Firefox
                          msOverflowStyle: "none", // IE/Edge
                        }}
                      >
                        {content.content.map((section) => (
                          <ViewMultipleContent
                            content={section}
                            focusedIndexColumn={focusedIndexColumn}
                            setSectionContentRef={setSectionContentRef}
                            containerRef={containerRef}
                            focusedIndexSectionContent={
                              focusedIndexSectionContent
                            }
                            isPreview={isPreview}
                            setColumnRef={setColumnRef}
                            setPreviewSection={setPreviewSection}
                            width={content?.width}
                            key={content.id}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        {shownOnWhen?.value === "waitAfter" &&
        isVisible &&
        shownOnWhen?.isShown ? (
          <div
            ref={ref}
            className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-50 "
          >
            <div
              style={{
                width: width < 420 ? "80%" : content?.width,
                overflow: "hidden",
                paddingTop: stylesBg.paddingTop,
                paddingBottom: stylesBg.paddingBottom,
                backgroundColor: content.background.bgColor || "",
                position: "relative",
                zIndex: 1,
              }}
              className={`tw-bg-white ${content?.rounded} tw-shadow-lg  sm:tw-w-3/4 lg:tw-w-1/2 tw-py-6 tw-px-2 tw-relative animate__animated animate__zoomIn`}
            >
              {content.background?.opacity ? (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor:
                      content.background?.opacity < 0 ? "black" : "white",
                    opacity: Math.abs(stylesBg.calculateOpacity),
                  }}
                ></div>
              ) : null}

              {content?.background?.bgImage ? (
                <div style={stylesBg.backgroundImgStyle}></div>
              ) : content?.background?.bgType === "gradient" ? (
                <div style={stylesBg.gradientStyle}></div>
              ) : content?.background?.bgType === "pattern" ? (
                <div style={stylesBg.backgroundPatternStyle}></div>
              ) : null}
              <div
                className="tw-absolute tw-top-2 tw-right-2 tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-black tw-text-gray-500 tw-p-2"
                onClick={() => handelModalClose()}
                aria-label="Close modal"
              >
                <IoMdClose size={24} />
              </div>

              <div
                className="tw-scrollbar-hide"
                style={{
                  maxHeight: 350,
                  overflowY: "auto",
                  marginTop: 20,
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE/Edge
                }}
              >
                {content.content.map((section) => (
                  <ViewMultipleContent
                    content={section}
                    focusedIndexColumn={focusedIndexColumn}
                    setSectionContentRef={setSectionContentRef}
                    containerRef={containerRef}
                    focusedIndexSectionContent={focusedIndexSectionContent}
                    isPreview={isPreview}
                    setColumnRef={setColumnRef}
                    setPreviewSection={setPreviewSection}
                    width={content?.width}
                    key={content.id}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : isPopupShown ? (
          <div
            ref={ref}
            className="tw-absolute tw-inset-0 tw-bg-black/50 tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-50 "
          >
            <div
              style={{
                width: width < 420 ? "80%" : content?.width,
                overflow: "hidden",
                paddingTop: stylesBg.paddingTop,
                paddingBottom: stylesBg.paddingBottom,
                backgroundColor: content.background.bgColor || "",
                position: "relative",
                zIndex: 1,
              }}
              className={`tw-bg-white ${content?.rounded} tw-shadow-lg  sm:tw-w-3/4 lg:tw-w-1/2 tw-py-6 tw-px-2 tw-relative animate__animated animate__zoomIn`}
            >
              {content.background?.opacity ? (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor:
                      content.background?.opacity < 0 ? "black" : "white",
                    opacity: Math.abs(stylesBg.calculateOpacity),
                  }}
                ></div>
              ) : null}

              {content?.background?.bgImage ? (
                <div style={stylesBg.backgroundImgStyle}></div>
              ) : content?.background?.bgType === "gradient" ? (
                <div style={stylesBg.gradientStyle}></div>
              ) : content?.background?.bgType === "pattern" ? (
                <div style={stylesBg.backgroundPatternStyle}></div>
              ) : null}
              <div
                className="tw-absolute tw-top-2 tw-right-2 tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-black tw-text-gray-500 tw-p-2"
                onClick={() => handelModalClose()}
                aria-label="Close modal"
              >
                <IoMdClose size={24} />
              </div>

              <div
                className="tw-scrollbar-hide"
                style={{
                  maxHeight: 350,
                  overflowY: "auto",
                  marginTop: 20,
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE/Edge
                }}
              >
                {content.content.map((section) => (
                  <ViewMultipleContent
                    content={section}
                    focusedIndexColumn={focusedIndexColumn}
                    setSectionContentRef={setSectionContentRef}
                    containerRef={containerRef}
                    focusedIndexSectionContent={focusedIndexSectionContent}
                    isPreview={isPreview}
                    setColumnRef={setColumnRef}
                    setPreviewSection={setPreviewSection}
                    width={content?.width}
                    key={content.id}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
);

export default ViewPopUp;
