import React, { forwardRef } from "react";

import { Autoplay, EffectCoverflow, EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { useBackgroundStyles } from "../../../../../hooks/useBackgroundStyles";
import { useHandleClickTarget } from "../../../../../hooks/useHandleClickTarget";

const ViewSliderImage = forwardRef(
  (
    {
      containerRef,
      isDragging,
      isResizing,
      content,
      isFocused,
      width: widthProps,
    },
    ref
  ) => {
    const stylesBg = useBackgroundStyles(content);
    const variant = content?.variant?.value;
    const variantStyle = variant !== "page-slider" ? "tw-p-0" : "tw-px-3";

    const { transition, autoScroll, aspectRatio, width } =
      content?.variant?.style;
    const delay = autoScroll * 1000;

    const navigationOption =
      transition === "fade" || transition === "slide-button" ? true : false;

    const effectOption = transition === "fade" ? "fade" : "slide";
    const paddingTop = content.background?.paddingTop
      ? `calc(0px + ${content.background.paddingTop}px)`
      : content.background?.paddingY
      ? `calc(0px + ${content.background.paddingY}px)`
      : "0px";

    const paddingBottom = content.background?.paddingBottom
      ? `calc(0px + ${content.background.paddingBottom}px)`
      : content.background?.paddingY
      ? `calc(0px + ${content.background.paddingY}px)`
      : "0px";

    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
          paddingTop: variant === "full-slider" ? 0 : paddingTop,
          paddingBottom: variant === "full-slider" ? 0 : paddingBottom,
          backgroundColor: content.background.bgColor || "",
          position: "relative",
          zIndex: 1,
        }}
        className={`tw-flex tw-flex-row tw-justify-center tw-items-center tw-flex-wrap  tw-gap-y-3 ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
        }  ${variantStyle} `}
      >
        {content?.background?.bgImage ? (
          <div style={stylesBg.backgroundImgStyle}></div>
        ) : content?.background?.bgType === "gradient" ? (
          <div style={stylesBg.gradientStyle}></div>
        ) : content?.background?.bgType === "pattern" ? (
          <div style={stylesBg.backgroundPatternStyle}></div>
        ) : null}

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

        {(variant === "page-slider" || variant === "full-slider") && (
          <div
            style={{
              width: variant === "full-slider" ? "100%" : width,

              maxWidth: "100%",
              margin: "0 auto",
            }}
          >
            <Swiper
              style={{
                ...(widthProps < 420 && { "--swiper-navigation-size": "20px" }),
              }}
              key={`swiper-${delay}-${effectOption}`}
              modules={[Autoplay, EffectFade, Navigation]}
              effect={effectOption}
              fadeEffect={{ crossFade: true }}
              autoplay={
                delay && !isNaN(delay)
                  ? {
                      delay: delay,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              speed={1000} // Durasi transisi dalam milidetik (1 detik)
              navigation={navigationOption}
              loop={true}
              slidesPerView={1}
            >
              {content.content.map((section) => (
                <SwiperSlide key={section.id}>
                  <img
                    onClick={() =>
                      useHandleClickTarget(section.target, containerRef)
                    }
                    src={section?.content?.image}
                    alt="slider-img"
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio,
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {variant === "perspective-card" && (
          <div
            style={{
              width: "100%",
              maxWidth:
                variant === "full-slider" || variant === "showcase"
                  ? "100%"
                  : width,
              margin: "0 auto",
              padding: "10px 0px",
            }}
          >
            <Swiper
              key={`swiper-${delay}-${effectOption}`}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1.7}
              spaceBetween={10}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={
                delay && !isNaN(delay)
                  ? {
                      delay: delay,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              speed={1000}
              loop={true}
              modules={[EffectCoverflow, Autoplay]}
            >
              {content.content.map((section) => (
                <SwiperSlide
                  style={{ display: "flex", justifyContent: "center" }}
                  key={section.id}
                >
                  <img
                    onClick={() =>
                      useHandleClickTarget(section.target, containerRef)
                    }
                    src={section?.content?.image}
                    alt="slider-img"
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio,
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {variant === "sliding-card" && (
          <div
            style={{
              width: "100%",
              maxWidth:
                variant === "full-slider" || variant === "showcase"
                  ? "100%"
                  : width,
              margin: "0 auto",
              padding: "10px 0px",
            }}
          >
            <Swiper
              key={`swiper-${delay}-${effectOption}`}
              slidesPerView={1.5}
              spaceBetween={10}
              fadeEffect={{ crossFade: true }}
              modules={[Autoplay]}
              autoplay={
                delay && !isNaN(delay)
                  ? {
                      delay: delay,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              speed={1000}
              loop={true}
            >
              {content.content.map((section) => (
                <SwiperSlide
                  style={{ display: "flex", justifyContent: "center" }}
                  key={section.id}
                >
                  <img
                    onClick={() =>
                      useHandleClickTarget(section.target, containerRef)
                    }
                    src={section?.content?.image}
                    alt="slider-img"
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio,
                      objectFit: "cover",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    );
  }
);

export default ViewSliderImage;
