import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const DurationCountdown = ({ content }) => {
  const { hours, minutes, daysColor, hoursColor, minutesColor, secondsColor } =
    content?.content?.duration;

  const { isFinished, text, textAlign, textShadow, fontSize, textColor } =
    content?.finish;

  const startTime = Date.now() / 1000;
  const endTime = startTime + hours * hourSeconds + minutes * minuteSeconds;

  const remainingTime = endTime - startTime;
  console.log("🚀 ~ remainingTime:", remainingTime);
  const daysDuration =
    daySeconds + hours * hourSeconds + minutes * minuteSeconds;

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

  return (
    <>
      <div
        style={{ display: isFinished || remainingTime <= 0 ? "" : "none" }}
        className="tw-flex tw-flex-1 tw-justify-center tw-items-center  tw-font-semibold tw-text-lg"
      >
        <div
          className={`${fontSize} ${textAlign}`}
          style={{
            color: textColor,
            textShadow: textShadow,
            width: "80%",
          }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>

      <div
        style={{ display: isFinished || remainingTime <= 0 ? "none" : "" }}
        className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-3"
      >
        <>
          {hours > 24 && (
            <CountdownCircleTimer
              {...timerProps}
              colors={daysColor}
              duration={daysDuration}
              initialRemainingTime={remainingTime}
            >
              {({ elapsedTime, color }) => (
                <span style={{ color }}>
                  {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
                </span>
              )}
            </CountdownCircleTimer>
          )}
          <CountdownCircleTimer
            key={`hours-${hours}-${minutes}`}
            {...timerProps}
            colors={hoursColor}
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
            key={`minutes-${hours}-${minutes}`}
            {...timerProps}
            colors={minutesColor}
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
            key={`seconds-${hours}-${minutes}`}
            {...timerProps}
            colors={secondsColor}
            duration={minuteSeconds}
            initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={(totalElapsedTime) => ({
              shouldRepeat: remainingTime - totalElapsedTime > 0,
            })}
          >
            {({ elapsedTime, color }) => {
              // Update elapsedSeconds setiap kali timer berjalan

              return (
                <span style={{ color }}>
                  {renderTime("seconds", getTimeSeconds(elapsedTime))}
                </span>
              );
            }}
          </CountdownCircleTimer>
        </>
      </div>
    </>
  );
};

export default DurationCountdown;
