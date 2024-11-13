import React from "react";
import ViewSideBar from "../list-add-content/navbar/view/ViewSideBar";

const ViewNavbar = ({
  previewNavbar,
  setPreviewNavbar,
  focusedIndex,
  setRef,
  renderViewNavbar,
  widthContainer,
}) => {
  const { shadow, widthNavbar, position, shape, background } =
    previewNavbar[0]?.variant?.style || {};

  const gradientStyle = {
    backgroundImage: `linear-gradient(${background?.direction}, ${
      background?.isRevert ? background?.toColor : background?.fromColor
    }, ${background?.isRevert ? background?.fromColor : background?.toColor})`,
  };

  const selectedBgColorStyle =
    background.type === "solid"
      ? {
          backgroundColor: background?.solidColor,
        }
      : gradientStyle;

  const positionStyle =
    position === "absolute"
      ? {
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 99,
        }
      : {};

  return (
    <>
      {previewNavbar[0].isShowNavbar ? (
        <>
          {previewNavbar.map(
            (section) =>
              section.isShowNavbar && (
                <nav
                  ref={(el) => setRef(el, section.id)}
                  key={section?.id}
                  style={{
                    ...selectedBgColorStyle,
                    ...(focusedIndex === section.id && {
                      border: "2px solid green",
                    }),
                    minHeight: 70,
                    ...positionStyle,
                  }}
                  className={`
  
   tw-w-full  ${shadow}  ${
                    focusedIndex === section.id &&
                    "animate__animated  animate__headShake animate__fast tw-bg-green-300/20"
                  }   `}
                >
                  <div
                    className=" tw-flex 
   tw-items-center tw-justify-between tw-px-2"
                    style={{
                      maxWidth: widthNavbar,
                      margin: "0px auto",
                      width: "100%",
                    }}
                  >
                    <div
                      className="tw-mx-4"
                      style={{
                        width: section?.logo?.width,
                        height: "100%",
                      }}
                    >
                      <img
                        src={section?.logo?.image}
                        alt="logo-nav"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <div
                      className={`tw-flex-1 tw-px-3 tw-h-full ${
                        widthContainer <= 725 ? "tw-hidden" : "tw-block"
                      } `}
                    >
                      <div className="tw-flex tw-gap-x-6 tw-items-center ">
                        {section.content.map((content) => (
                          <div key={content?.id}>
                            {renderViewNavbar(section, content)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {widthContainer <= 725 && (
                      <div className="tw-ml-auto tw-pr-3">
                        <ViewSideBar
                          sidebar={section?.sidebar}
                          setPreviewNavbar={setPreviewNavbar}
                        />
                      </div>
                    )}
                  </div>
                </nav>
              )
          )}
        </>
      ) : null}
    </>
  );
};

export default ViewNavbar;
