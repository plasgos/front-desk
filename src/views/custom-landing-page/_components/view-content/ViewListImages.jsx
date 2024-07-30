import React, { forwardRef } from "react";

const ViewListImages = forwardRef(
  ({ isDragging, width, isResizing, content, isFocused }, ref) => {
    console.log("🚀 ~ content:", content);
    const commonStyles = {
      padding: 0,
      display: "flex",
      // width:
      //   width === "100%" || width >= 600
      //     ? "32%"
      //     : width > 320 && width < 600
      //     ? "45%"
      //     : "100%",
      width: content.wrapperStyle?.maxColumn,
      textAlign: "center",
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
        className="flex flex-row justify-center items-center flex-wrap p-4 gap-y-3"
      >
        {content.content.map((section) => {
          return (
            <React.Fragment key={section.id}>
              {section.target?.url?.url ? (
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
                    ...commonStyles,
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={section.content?.image}
                      alt={section.content?.alt ? section.content.alt : ""}
                      style={{
                        width: "100%",
                        marginTop: 14,
                        marginBottom: 14,
                      }}
                    />
                  </div>
                </a>
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
                    ...commonStyles,
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={section.content?.image}
                      alt={section.content?.alt ? section.content.alt : ""}
                      style={{
                        width: "100%",
                        marginTop: 14,
                        marginBottom: 14,
                      }}
                    />
                  </div>
                </a>
              ) : (
                <div style={commonStyles}>
                  <div
                    className={`px-${content?.wrapperStyle?.paddingX}`}
                    style={{
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={section.content?.image}
                      alt={section.content?.alt ? section.content.alt : ""}
                      style={{
                        width: "100%",
                        marginTop: 14,
                        marginBottom: 14,
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
