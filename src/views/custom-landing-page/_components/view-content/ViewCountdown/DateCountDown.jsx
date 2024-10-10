import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const DateCountDown = ({ content }) => {
  const [isFinished, setIsFinished] = useState(false);

  const days = content.content.days;
  const hours = content.content.hours;
  const minutes = content.content.minutes;

  const startTime = Date.now() / 1000;
  const endTime =
    startTime +
    days * daySeconds +
    hours * hourSeconds +
    minutes * minuteSeconds;

  const remainingTime = endTime - startTime;
  console.log("🚀 ~ remainingTime:", remainingTime);
  const daysDuration =
    days * daySeconds + hours * hourSeconds + minutes * minuteSeconds;

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
    <div>
      {isFinished ? (
        <div className="tw-flex tw-flex-1 tw-justify-center tw-items-center  tw-font-semibold tw-text-lg">
          Sudah Selesai
        </div>
      ) : (
        <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-3">
          {endTime && endTime > 0 && (
            <>
              <CountdownCircleTimer
                {...timerProps}
                colors="#7E2E84"
                duration={daysDuration}
                initialRemainingTime={remainingTime}
              >
                {({ elapsedTime, color }) => (
                  <span style={{ color }}>
                    {renderTime(
                      "days",
                      getTimeDays(daysDuration - elapsedTime)
                    )}
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
                    {renderTime(
                      "hours",
                      getTimeHours(daySeconds - elapsedTime)
                    )}
                  </span>
                )}
              </CountdownCircleTimer>
              <CountdownCircleTimer
                {...timerProps}
                colors="#EF798A"
                duration={hourSeconds}
                initialRemainingTime={remainingTime % hourSeconds}
                onComplete={(totalElapsedTime) => ({
                  shouldRepeat:
                    remainingTime - totalElapsedTime > minuteSeconds,
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DateCountDown;
