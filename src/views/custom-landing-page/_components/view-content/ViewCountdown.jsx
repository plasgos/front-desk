import { CountdownCircleTimer } from "react-countdown-circle-timer";

import React, { forwardRef, useEffect, useState } from "react";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";

const ViewCountDown = forwardRef(
  ({ containerRef, isDragging, isResizing, content, isFocused }, ref) => {
    const stylesBg = useBackgroundStyles(content);

    const endDate = content.content.days;
    const hours = content.content.hours;
    console.log("🚀 ~ hours:", hours);
    const minutes = content.content.minutes;
    console.log("🚀 ~ minutes:", minutes);

    const [isFinished, setIsFinished] = useState(false);

    const minuteSeconds = 60;
    const hourSeconds = 3600;
    const daySeconds = 86400;

    const timerProps = {
      isPlaying: true,
      size: content?.content?.size * 10,
      strokeWidth: 6,
    };

    const renderTime = (dimension, time) => {
      return (
        <div className="tw-flex tw-flex-col tw-items-center">
          <div style={{ fontSize: 32 }} className="tw-font-semibold">
            {time}
          </div>
          <div>{dimension}</div>
        </div>
      );
    };

    const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
    const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
    const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
    const getTimeDays = (time) => (time / daySeconds) | 0;

    const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
    // const endTime = startTime + endDate; // use UNIX timestamp in seconds
    const totalDurationInSeconds = endDate + hours + minutes;
    const endTime = startTime + totalDurationInSeconds;

    const remainingTime = endTime - startTime;
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;

    useEffect(() => {
      const interval = setInterval(() => {
        const currentTime = Date.now() / 1000; // Update waktu saat ini
        const timeLeft = endTime - currentTime;

        if (timeLeft <= 0) {
          setIsFinished(true); // Jika waktu habis, set status selesai
        } else if (isFinished && endTime > currentTime) {
          // Jika kondisi selesai, tapi waktu di endDate masih lebih besar dari now
          setIsFinished(false); // Reset isFinished untuk melanjutkan countdown
        }
      }, 1000); // Memperbarui setiap detik

      return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
    }, [endTime, isFinished]);

    return (
      <div
        key={content.id}
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
          paddingTop: stylesBg.paddingTop,
          paddingBottom: stylesBg.paddingBottom,
          backgroundColor: content.background.bgColor || "",
          position: "relative",
          zIndex: 1,
        }}
        className={` tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
        }  `}
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

        {isFinished ? (
          <div className="tw-flex tw-flex-1 tw-justify-center tw-items-center  tw-font-semibold tw-text-lg">
            Sudah Selesai
          </div>
        ) : (
          <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-3">
            <CountdownCircleTimer
              {...timerProps}
              colors="#7E2E84"
              duration={daysDuration}
              initialRemainingTime={remainingTime}
            >
              {({ elapsedTime, color }) => (
                <span style={{ color }}>
                  {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
                </span>
              )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
              {...timerProps}
              colors="#D14081"
              duration={daySeconds}
              initialRemainingTime={remainingTime % daySeconds}
              onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
              })}
            >
              {({ elapsedTime, color }) => (
                <span style={{ color }}>
                  {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
                </span>
              )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
              {...timerProps}
              colors="#EF798A"
              duration={hourSeconds}
              initialRemainingTime={remainingTime % hourSeconds}
              onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
              })}
            >
              {({ elapsedTime, color }) => (
                <span style={{ color }}>
                  {renderTime(
                    "minutes",
                    getTimeMinutes(hourSeconds - elapsedTime)
                  )}
                </span>
              )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
              {...timerProps}
              colors="#218380"
              duration={minuteSeconds}
              initialRemainingTime={remainingTime % minuteSeconds}
              onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > 0,
              })}
            >
              {({ elapsedTime, color }) => (
                <span style={{ color }}>
                  {renderTime("seconds", getTimeSeconds(elapsedTime))}
                </span>
              )}
            </CountdownCircleTimer>
          </div>
        )}
      </div>
    );
  }
);

export default ViewCountDown;
