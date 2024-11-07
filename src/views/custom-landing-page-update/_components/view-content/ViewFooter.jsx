import React from "react";

import plgLogo from "../../../../assets/new_plg_logo_256.png";

const ViewFooter = ({
  previewFooter,
  focusedIndex,
  setRef,
  renderViewFooter,
}) => {
  const footerCopyright = previewFooter[0]?.copyright;

  const cleanContent = footerCopyright?.customText
    .replace(/<p>/g, "<div>")
    .replace(/<\/p>/g, "</div>");

  return (
    <>
      {previewFooter[0].isShowFooter ? (
        <>
          {previewFooter.map(
            (section) =>
              section.isShowFooter && (
                <div
                  key={section?.id}
                  style={{
                    flex: "1 0 auto",
                    borderTop: `1px solid ${previewFooter[0]?.variant?.style?.outline}`,
                    backgroundColor: previewFooter[0]?.variant?.style?.bgColor,
                    ...(focusedIndex === section.id && {
                      border: "2px solid green",
                    }),
                  }}
                  className={`
   tw-flex  tw-bg-black 
   tw-items-center tw-justify-center 
   tw-w-full tw-py-4  ${
     focusedIndex === section.id &&
     "animate__animated  animate__headShake animate__fast tw-bg-green-300/20"
   }   `}
                >
                  <div
                    style={{
                      maxWidth: "100%",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      className={` tw-p-3   `}
                      ref={(el) => setRef(el, section.id)}
                      style={{
                        display: "flex",
                        width: previewFooter[0].variant?.style?.widthFooter,
                        flexWrap: "wrap",
                        gap: 20,
                      }}
                      key={section.id}
                    >
                      {section.content.map((content) => (
                        <div key={content.id}>
                          {renderViewFooter(section, content)}
                        </div>
                      ))}
                    </div>

                    <div className="tw-my-3" style={{ textAlign: "center" }}>
                      <div>
                        <div className=" tw-text-white tw-text-center tw-text-xs">
                          Dibuat dengan
                        </div>

                        <img
                          src={plgLogo}
                          alt="logo"
                          style={{
                            width: "80px",
                            objectFit: "contain",
                            marginTop: -10,
                          }}
                        />
                      </div>

                      {footerCopyright?.isCustom ? (
                        <div
                          className={` tw-px-3 ${footerCopyright?.textAlign} ${footerCopyright?.fontSize}`}
                          style={{
                            color: footerCopyright?.color,
                          }}
                          dangerouslySetInnerHTML={{
                            __html: cleanContent,
                          }}
                        />
                      ) : (
                        <div style={{ color: "#757575" }}>
                          {footerCopyright?.default}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
          )}
        </>
      ) : (
        <div
          style={{ flex: "1 0 auto" }}
          className="
    tw-flex  tw-bg-black 
    tw-items-center tw-justify-center 
    tw-w-full tw-py-4"
        >
          <div>
            <div className=" tw-text-white tw-text-center tw-text-xs">
              Dibuat dengan
            </div>

            <img
              src={plgLogo}
              alt="logo"
              style={{
                width: "80px",
                objectFit: "contain",
                marginTop: -10,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewFooter;
