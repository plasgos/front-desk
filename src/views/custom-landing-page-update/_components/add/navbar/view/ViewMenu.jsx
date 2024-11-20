import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useEffect, useState } from "react";
import { useFontAwesomeIconPack } from "../../../../../../hooks/useFontAwesomePack";
import { useHandleClickTarget } from "../../../../../../hooks/useHandleClickTarget";

const ViewMenu = forwardRef(
  (
    {
      isDragging,
      isResizing,
      section,
      content,
      focusedIndexSectionContent,
      setSectionContentRef,
      containerRef,
      mobileView,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isShowMenu, setIsShowMenu] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const { titleColor, contentColor, hoverTitleColor } =
      section?.variant?.style || {};

    const {
      title,
      shownOnWhen,
      column,
      bgColor,
      bgHoverColor,
      textColor,
      textColorHover,
      isPreviewContent,
    } = content?.wrapperStyle || {};

    const iconPack = useFontAwesomeIconPack();
    const [icon, setIcon] = useState(null);

    const getIconForSection = (icon) => {
      if (iconPack) {
        const iconToSet = icon || "";
        if (iconToSet.iconName) {
          const iconExists = iconPack.some(
            (iconItem) => iconItem.iconName === iconToSet?.iconName
          );
          return iconExists ? iconToSet : null;
        }
      }
      return null;
    };

    useEffect(() => {
      if (iconPack && iconPack.length > 0) {
        const iconToSet = isShowMenu
          ? {
              prefix: "fas",
              iconName: "chevron-up",
            }
          : {
              prefix: "fas",
              iconName: "chevron-down",
            };

        if (iconToSet && Object.keys(iconToSet).length > 0) {
          const iconExists = iconPack.some(
            (icon) => icon.iconName === iconToSet.iconName
          );

          setIcon(iconExists ? iconToSet : {});
        }
      }
    }, [iconPack, isShowMenu]);

    return (
      <>
        {mobileView?.value ? (
          <div
            ref={(el) => {
              if (setSectionContentRef) {
                setSectionContentRef(el, content.id);
              }
            }}
            style={{
              ...(focusedIndexSectionContent === content.id && {
                border: "2px solid green",
              }),
              ...(isResizing ? { cursor: "not-allowed" } : {}),
              ...(isDragging ? { border: "2px solid green" } : {}),
              width: "100%",
            }}
            key={content.id}
            className={`${
              focusedIndexSectionContent === content.id
                ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
                : ""
            }`}
          >
            <div
              onClick={() => setIsShowMenu((prev) => !prev)}
              className="tw-cursor-pointer navbarHeaderTextColor tw-mb-3"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "--text-color-header": mobileView?.value
                  ? mobileView?.textColor
                  : titleColor,
                "--text-color-hover-header": hoverTitleColor,
                fontSize: mobileView?.value ? 18 : 15,
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  marginRight: 8,
                }}
              >
                {title}
              </div>

              {icon && (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <FontAwesomeIcon
                    icon={[`${icon.prefix}`, icon.iconName]}
                    style={{ fontSize: content.wrapperStyle?.iconSize }}
                  />
                </div>
              )}
            </div>

            {isShowMenu && (
              <div>
                {content?.content?.map((contentItem) => {
                  const iconContent = getIconForSection(contentItem?.icon);

                  return (
                    <div
                      key={contentItem?.id}
                      style={{
                        ...(Object.keys(contentItem.target).length > 0
                          ? { cursor: "pointer" }
                          : {}),
                        width: "100%",
                      }}
                      onClick={() =>
                        useHandleClickTarget(contentItem.target, containerRef)
                      }
                    >
                      <div
                        style={{
                          "--bg-hover-color": bgHoverColor,
                          "--text-hover-color": textColorHover,
                          "--text-color": textColor,
                        }}
                        className="tw-flex tw-text-center tw-items-center tw-w-full tw-p-3 navbarMenuPopOver"
                      >
                        <div>
                          {iconContent &&
                            iconContent.prefix &&
                            iconContent.iconName && (
                              <div
                                style={{
                                  marginRight: 8,
                                }}
                              >
                                <FontAwesomeIcon
                                  style={{
                                    fontSize: contentItem?.iconSize,
                                  }}
                                  icon={[
                                    `${iconContent.prefix}`,
                                    iconContent.iconName,
                                  ]}
                                />
                              </div>
                            )}

                          {contentItem?.image && (
                            <div
                              style={{
                                width: contentItem?.imageSize,
                                marginRight: 8,
                              }}
                            >
                              <img
                                src={contentItem?.image}
                                alt="icon"
                                style={{
                                  width: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          )}
                        </div>

                        <div>{contentItem?.text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div>
            {isPreviewContent ? (
              <div
                ref={(el) => {
                  if (setSectionContentRef) {
                    setSectionContentRef(el, content.id);
                  }
                }}
                style={{
                  ...(focusedIndexSectionContent === content.id && {
                    border: "2px solid green",
                  }),
                  ...(isResizing ? { cursor: "not-allowed" } : {}),
                  ...(isDragging ? { border: "2px solid green" } : {}),
                }}
                key={content.id}
                className={`${
                  focusedIndexSectionContent === content.id
                    ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
                    : ""
                }`}
              >
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    "--text-color-header": mobileView?.value
                      ? mobileView?.textColor
                      : titleColor,
                    "--text-color-hover-header": hoverTitleColor,
                    fontSize: mobileView?.value ? 18 : 15,
                  }}
                >
                  <div className="tw-flex tw-items-center tw-cursor-pointer navbarHeaderTextColor">
                    <div
                      style={{
                        marginRight: 8,
                      }}
                    >
                      {title}
                    </div>

                    {icon && (
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={[`${icon.prefix}`, icon.iconName]}
                          style={{ fontSize: content.wrapperStyle?.iconSize }}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 0,
                      backgroundColor: bgColor,
                      zIndex: 9999,
                      overflow: "hidden",
                      width: "auto",
                      whiteSpace: "nowrap",
                      display: "grid",
                      gridTemplateColumns: `repeat(${column}, auto)`,
                      gap: "8px",
                    }}
                    className=" tw-shadow tw-rounded "
                  >
                    {content?.content?.map((contentItem) => {
                      const iconContent = getIconForSection(contentItem?.icon);

                      return (
                        <div
                          key={contentItem?.id}
                          style={{
                            ...(Object.keys(contentItem.target).length > 0
                              ? { cursor: "pointer" }
                              : {}),
                            width: "100%",
                          }}
                          onClick={() =>
                            useHandleClickTarget(
                              contentItem.target,
                              containerRef
                            )
                          }
                        >
                          <div
                            style={{
                              "--bg-hover-color": bgHoverColor,
                              "--text-hover-color": textColorHover,
                              "--text-color": textColor,
                              justifyContent: "center",
                            }}
                            className="tw-flex tw-text-center tw-items-center tw-w-full tw-p-3 navbarMenuPopOver"
                          >
                            <div>
                              {iconContent &&
                                iconContent.prefix &&
                                iconContent.iconName && (
                                  <div
                                    style={{
                                      marginRight: 8,
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      style={{
                                        fontSize: contentItem?.iconSize,
                                      }}
                                      icon={[
                                        `${iconContent.prefix}`,
                                        iconContent.iconName,
                                      ]}
                                    />
                                  </div>
                                )}

                              {contentItem?.image && (
                                <div
                                  style={{
                                    width: contentItem?.imageSize,
                                    marginRight: 8,
                                  }}
                                >
                                  <img
                                    src={contentItem?.image}
                                    alt="icon"
                                    style={{
                                      width: "100%",
                                      objectFit: "contain",
                                    }}
                                  />
                                </div>
                              )}
                            </div>

                            <div>{contentItem?.text}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={(el) => {
                  if (setSectionContentRef) {
                    setSectionContentRef(el, content.id);
                  }
                }}
                style={{
                  ...(focusedIndexSectionContent === content.id && {
                    border: "2px solid green",
                  }),
                  ...(isResizing ? { cursor: "not-allowed" } : {}),
                  ...(isDragging ? { border: "2px solid green" } : {}),
                  width: content?.wrapperStyle?.maxWidth,
                  padding: 10,
                }}
                key={content.id}
                className={`${
                  focusedIndexSectionContent === content.id
                    ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
                    : ""
                }`}
              >
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    "--text-color-header": mobileView?.value
                      ? mobileView?.textColor
                      : titleColor,
                    "--text-color-hover-header": hoverTitleColor,
                    fontSize: mobileView?.value ? 18 : 15,
                  }}
                >
                  <div className="tw-flex tw-items-center tw-cursor-pointer navbarHeaderTextColor">
                    <div
                      style={{
                        marginRight: 8,
                      }}
                    >
                      {title}
                    </div>

                    {icon && (
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={[`${icon.prefix}`, icon.iconName]}
                          style={{ fontSize: content.wrapperStyle?.iconSize }}
                        />
                      </div>
                    )}
                  </div>

                  {isHovered && (
                    <div
                      style={{
                        position: "absolute",
                        top: 20,
                        right: 0,
                        backgroundColor: bgColor,
                        zIndex: 9999,
                        overflow: "hidden",
                        width: "auto",
                        whiteSpace: "nowrap",
                        display: "grid",
                        gridTemplateColumns: `repeat(${column}, auto)`,
                        gap: "8px",
                      }}
                      className=" tw-shadow tw-rounded "
                    >
                      {content?.content?.map((contentItem) => {
                        const iconContent = getIconForSection(
                          contentItem?.icon
                        );

                        return (
                          <div
                            key={contentItem?.id}
                            style={{
                              ...(Object.keys(contentItem.target).length > 0
                                ? { cursor: "pointer" }
                                : {}),
                              width: "100%",
                            }}
                            onClick={() =>
                              useHandleClickTarget(
                                contentItem.target,
                                containerRef
                              )
                            }
                          >
                            <div
                              style={{
                                "--bg-hover-color": bgHoverColor,
                                "--text-hover-color": textColorHover,
                                "--text-color": textColor,
                                justifyContent: "center",
                              }}
                              className="tw-flex tw-text-center tw-items-center tw-w-full tw-p-3 navbarMenuPopOver"
                            >
                              <div>
                                {iconContent &&
                                  iconContent.prefix &&
                                  iconContent.iconName && (
                                    <div
                                      style={{
                                        marginRight: 8,
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        style={{
                                          fontSize: contentItem?.iconSize,
                                        }}
                                        icon={[
                                          `${iconContent.prefix}`,
                                          iconContent.iconName,
                                        ]}
                                      />
                                    </div>
                                  )}

                                {contentItem?.image && (
                                  <div
                                    style={{
                                      width: contentItem?.imageSize,
                                      marginRight: 8,
                                    }}
                                  >
                                    <img
                                      src={contentItem?.image}
                                      alt="icon"
                                      style={{
                                        width: "100%",
                                        objectFit: "contain",
                                      }}
                                    />
                                  </div>
                                )}
                              </div>

                              <div>{contentItem?.text}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
);

export default ViewMenu;
