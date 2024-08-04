import React, { forwardRef } from "react";

const ViewListImages = forwardRef(
  (
    {
      containerRef,
      isDragging,
      width,
      isResizing,
      content,
      isFocused,
      isPreview,
    },
    ref
  ) => {
    const scrollToTop = () => {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    const handleScrollToTop = (valueTarget) => {
      if (valueTarget === "back-to-top") {
        scrollToTop();
      }
    };

    return (
      <div
        key={content.id}
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
        }}
        className="flex flex-row flex-wrap justify-center items-center p-3 gap-y-3 "
      >
        {content.content.map((section) => {
          return (
            <React.Fragment key={section.id}>
              {section.target?.url?.url ? (
                <div
                  className={
                    isPreview
                      ? `flex  ${
                          width === "100%" || width >= 640
                            ? `w-[${content?.wrapperStyle?.maxColumn}]`
                            : width > 320 && width < 640
                            ? "w-1/3"
                            : "w-full"
                        }  `
                      : `flex w-full sm:w-1/3 md:w-[${content?.wrapperStyle?.maxColumn}] `
                  }
                >
                  <a
                    target={
                      section.target?.url?.isOpenNewTab ? "_blank" : "_self"
                    }
                    href={section.target.url.url}
                    rel={
                      section.target?.url?.isOpenNewTab
                        ? "noopener noreferrer"
                        : ""
                    }
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div
                      className={`w-full text-center px-${content?.wrapperStyle?.paddingX}   `}
                    >
                      <img
                        src={section.content?.image}
                        alt={section.content?.alt ? section.content.alt : ""}
                        style={{
                          width: "100%",
                          marginTop: 14,
                          marginBottom: 14,
                          aspectRatio: content?.wrapperStyle?.aspectRatio,
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </a>
                </div>
              ) : section.target.whatApps.phoneNumber ? (
                <a
                  target={
                    section.target.whatApps.isOpenNewTab ? "_blank" : "_self"
                  }
                  href={`https://wa.me/+62${
                    section.target.whatApps.phoneNumber
                  }?text=${encodeURIComponent(
                    section.target.whatApps.message
                  )}`}
                  rel={
                    section.target.url.isOpenNewTab ? "noopener noreferrer" : ""
                  }
                  style={{
                    textDecoration: "none",
                  }}
                  className={
                    isPreview
                      ? `flex  ${
                          width === "100%" || width >= 640
                            ? `w-[${content?.wrapperStyle?.maxColumn}]`
                            : width > 320 && width < 640
                            ? "w-1/3"
                            : "w-full"
                        }  `
                      : `flex w-full sm:w-1/3 md:w-[${content?.wrapperStyle?.maxColumn}] `
                  }
                >
                  <div
                    className={`w-full text-center px-${content?.wrapperStyle?.paddingX}  `}
                  >
                    <img
                      src={section.content?.image}
                      alt={section.content?.alt ? section.content.alt : ""}
                      style={{
                        width: "100%",
                        marginTop: 14,
                        marginBottom: 14,
                        aspectRatio: content?.wrapperStyle?.aspectRatio,
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </a>
              ) : section.target.scrollTarget.value ? (
                <div
                  className={
                    isPreview
                      ? `flex  ${
                          width === "100%" || width >= 640
                            ? `w-[${content?.wrapperStyle?.maxColumn}]`
                            : width > 320 && width < 640
                            ? "w-1/3"
                            : "w-full"
                        }  `
                      : `flex w-full sm:w-1/3 md:w-[${content?.wrapperStyle?.maxColumn}] `
                  }
                >
                  <a
                    href={
                      section.target.scrollTarget.value !== "back-to-top"
                        ? `#${section.target.scrollTarget.value}`
                        : undefined
                    }
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div
                      onClick={() =>
                        handleScrollToTop(section.target.scrollTarget.value)
                      }
                      className={`w-full text-center px-${
                        content?.wrapperStyle?.paddingX
                      } ${
                        section.target.scrollTarget.value === "back-to-top" &&
                        "cursor-pointer"
                      }   `}
                    >
                      <img
                        src={section.content?.image}
                        alt={section.content?.alt ? section.content.alt : ""}
                        style={{
                          width: "100%",
                          marginTop: 14,
                          marginBottom: 14,
                          aspectRatio: content?.wrapperStyle?.aspectRatio,
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </a>
                </div>
              ) : (
                <div
                  className={
                    isPreview
                      ? `flex  ${
                          width === "100%" || width >= 640
                            ? `w-[${content?.wrapperStyle?.maxColumn}]`
                            : width > 320 && width < 640
                            ? "w-1/3"
                            : "w-full"
                        }  `
                      : `flex w-full sm:w-1/3 md:w-[${content?.wrapperStyle?.maxColumn}] `
                  }
                >
                  <div
                    className={`w-full text-center px-${content?.wrapperStyle?.paddingX}  `}
                  >
                    <img
                      src={section.content?.image}
                      alt={section.content?.alt ? section.content.alt : ""}
                      style={{
                        width: "100%",
                        marginTop: 14,
                        marginBottom: 14,
                        aspectRatio: content?.wrapperStyle?.aspectRatio,
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

export default ViewListImages;
