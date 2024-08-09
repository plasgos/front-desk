import React, { forwardRef } from "react";
import { handleScrollToTop } from "../../../../hooks/useScrollToTop";

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
    return (
      <div
        key={content.id}
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
        }}
        className="tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center tw-p-3 tw-gap-y-3 "
      >
        {content.content.map((section) => {
          return (
            <React.Fragment key={section.id}>
              {section.target && section.target?.url?.url ? (
                <div
                  className={
                    isPreview
                      ? `tw-flex  ${
                          width === "100%" || width >= 640
                            ? `tw-w-[${content?.wrapperStyle?.maxColumn}]`
                            : width > 320 && width < 640
                            ? "tw-w-1/3"
                            : "tw-w-full"
                        }  `
                      : `tw-flex tw-w-full sm:tw-w-1/3 md:tw-w-[${content?.wrapperStyle?.maxColumn}] `
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
                      className={`tw-w-full tw-text-center tw-px-${content?.wrapperStyle?.paddingX}   `}
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
              ) : section.target && section.target?.whatApps?.phoneNumber ? (
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
                    section.target.whatApps.isOpenNewTab
                      ? "noopener noreferrer"
                      : ""
                  }
                  style={{
                    textDecoration: "none",
                  }}
                  className={
                    isPreview
                      ? `tw-flex  ${
                          width === "100%" || width >= 640
                            ? `tw-w-[${content?.wrapperStyle?.maxColumn}]`
                            : width > 320 && width < 640
                            ? "tw-w-1/3"
                            : "tw-w-full"
                        }  `
                      : `tw-flex tw-w-full sm:tw-w-1/3 md:tw-w-[${content?.wrapperStyle?.maxColumn}] `
                  }
                >
                  <div
                    className={`tw-w-full tw-text-center tw-px-${content?.wrapperStyle?.paddingX}  `}
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
              ) : section.target && section.target?.scrollTarget?.value ? (
                <div
                  className={
                    isPreview
                      ? `tw-flex  ${
                          width === "100%" || width >= 640
                            ? `tw-w-[${content?.wrapperStyle?.maxColumn}]`
                            : width > 320 && width < 640
                            ? "tw-w-1/3"
                            : "tw-w-full"
                        }  `
                      : `tw-flex tw-w-full sm:tw-w-1/3 md:tw-w-[${content?.wrapperStyle?.maxColumn}] `
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
                        handleScrollToTop(
                          section.target.scrollTarget.value,
                          containerRef
                        )
                      }
                      className={`tw-w-full tw-text-center tw-px-${
                        content?.wrapperStyle?.paddingX
                      } ${
                        section.target.scrollTarget.value === "back-to-top" &&
                        "tw-cursor-pointer"
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
                      ? `tw-flex  ${
                          width === "100%" || width >= 640
                            ? `tw-w-[${content?.wrapperStyle?.maxColumn}]`
                            : width > 320 && width < 640
                            ? "tw-w-1/3"
                            : "tw-w-full"
                        }  `
                      : `tw-flex tw-w-full sm:tw-w-1/3 md:tw-w-[${content?.wrapperStyle?.maxColumn}] `
                  }
                >
                  <div
                    className={`tw-w-full tw-text-center tw-px-${content?.wrapperStyle?.paddingX}  `}
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
