import moment from "moment";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const DateCountDown = ({ content }) => {
  const { group } = content?.variant;
  const {
    daysColor,
    hoursColor,
    minutesColor,
    secondsColor,
    size,
    dividerColor,
  } = content?.variant?.style || {};

  const { isFinished, text, textShadow, fontSize, textColor } = content?.finish;

  const { date, month, years, hours, minutes } = content?.content?.datePicked;

  const [remainingTime, setRemainingTime] = useState(0);
  console.log("🚀 ~ DateCountDown ~ remainingTime:", remainingTime);

  useEffect(() => {
    const now = moment(); // Waktu sekarang

    // Membuat target waktu berdasarkan input
    let targetDate = moment().set({
      date: date, // Menetapkan tanggal
      month: month - 1, // Menetapkan bulan (0-indexed)
      year: years, // Menetapkan tahun
      hour: hours, // Menetapkan jam
      minute: minutes, // Menetapkan menit
      second: 0, // Menetapkan detik
    });

    if (targetDate.isBefore(now)) {
      // Menggunakan bulan yang dipilih
      targetDate = moment()
        .add(1, "month")
        .set({
          date: date,
          month: month - 1, // Menetapkan bulan (0-indexed)
          year: years, // Menetapkan tahun
          hour: hours,
          minute: minutes,
          second: 0,
        });
    }

    // Hitung selisih waktu dalam detik
    const differenceInSeconds = targetDate.diff(now, "seconds");

    // Set remaining time, pastikan tidak negatif
    setRemainingTime(differenceInSeconds > 0 ? differenceInSeconds : 0);

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup interval ketika komponen di-unmount
    return () => clearInterval(interval);
  }, [content, date, hours, minutes, month, years]);

  const daysDuration =
    daySeconds + hours * hourSeconds + minutes * minuteSeconds;
  console.log("🚀 ~ DateCountDown ~ daysDuration:", daysDuration);

  // Fungsi untuk menghitung waktu
  const formatTime = (totalSeconds) => {
    const daysView = Math.floor(totalSeconds / (24 * 3600));
    const hoursView = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutesView = Math.floor((totalSeconds % 3600) / 60);
    const secondsView = totalSeconds % 60;

    return { daysView, hoursView, minutesView, secondsView };
  };

  const { daysView, hoursView, minutesView, secondsView } =
    formatTime(remainingTime);

  const initialSize = 20; // size awal
  const initialFontSize = 32; // fontSize awal

  const timerProps = {
    isPlaying: true,
    size: size * 5,
    strokeWidth: 6,
  };

  const dynamicFontSize = (size / initialSize) * initialFontSize * 0.6;

  const renderTime = (dimension, time) => {
    let label;
    switch (dimension) {
      case "days":
        label = "Hari";
        break;
      case "hours":
        label = "Jam";
        break;
      case "minutes":
        label = "Menit";
        break;
      case "seconds":
        label = "Detik";
        break;
      default:
        label = dimension; // Jika dimension tidak dikenal, tampilkan nama aslinya
        break;
    }
    return (
      <div className="tw-flex tw-flex-col tw-items-center">
        <div style={{ fontSize: dynamicFontSize }} className="tw-font-semibold">
          {time}
        </div>
        <div style={{ fontSize: dynamicFontSize }}>{label}</div>
      </div>
    );
  };

  return (
    <div>
      {group === "Full Text" && (
        <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-3">
          {remainingTime > 0 && !isFinished ? (
            <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-3">
              <div
                style={{
                  fontSize: size,
                  color: dividerColor,
                }}
                className="tw-flex tw-items-center tw-gap-2"
              >
                {daysView > 0 && (
                  <div>
                    <span
                      style={{
                        fontSize: size,
                        color: daysColor,
                      }}
                      className={`tw-font-bold `}
                    >
                      {daysView} Hari
                    </span>{" "}
                    - <br />
                  </div>
                )}
                {hoursView > 0 && (
                  <div>
                    <span
                      style={{
                        fontSize: size,
                        color: hoursColor,
                      }}
                      className={`tw-font-bold `}
                    >
                      {hoursView} Jam
                    </span>{" "}
                    - <br />
                  </div>
                )}
                <span
                  style={{
                    fontSize: size,
                    color: minutesColor,
                  }}
                  className={`tw-font-bold `}
                >
                  {minutesView} Menit
                </span>{" "}
                - <br />
                <span
                  style={{
                    fontSize: size,
                    color: secondsColor,
                  }}
                  className={`tw-font-bold `}
                >
                  {secondsView} Detik
                </span>
              </div>
            </div>
          ) : (
            <div
              className={`tw-w-full tw-flex tw-items-center  tw-font-semibold tw-text-lg`}
            >
              <div
                className={`${fontSize} `}
                style={{
                  color: textColor,
                  textShadow: textShadow,
                }}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
          )}
        </div>
      )}

      {group === "Circle" && (
        <div>
          {remainingTime > 0 && !isFinished ? (
            <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-3">
              <>
                {remainingTime >= daySeconds && (
                  <CountdownCircleTimer
                    key={`days-${hours}-${minutes}-${remainingTime}`}
                    {...timerProps}
                    colors={daysColor}
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
                )}

                {remainingTime >= hourSeconds && (
                  <CountdownCircleTimer
                    key={`hours-${hours}-${minutes}-${remainingTime}`}
                    {...timerProps}
                    colors={hoursColor}
                    duration={daySeconds}
                    initialRemainingTime={remainingTime % daySeconds}
                    onComplete={(totalElapsedTime) => {
                      const finish =
                        remainingTime - totalElapsedTime <= hourSeconds;

                      return { shouldRepeat: !finish }; // Jangan ulang jika sudah selesai
                    }}
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
                )}
                <CountdownCircleTimer
                  key={`minutes-${hours}-${minutes}-${remainingTime}`}
                  {...timerProps}
                  colors={minutesColor}
                  duration={hourSeconds}
                  initialRemainingTime={remainingTime % hourSeconds}
                  onComplete={(totalElapsedTime) => {
                    const finish =
                      remainingTime - totalElapsedTime <= minuteSeconds;

                    return { shouldRepeat: !finish }; // Jangan ulang jika sudah selesai
                  }}
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
                  key={`seconds-${hours}-${minutes}-${remainingTime}`}
                  {...timerProps}
                  colors={secondsColor}
                  duration={minuteSeconds}
                  initialRemainingTime={remainingTime % minuteSeconds}
                  onComplete={(totalElapsedTime) => {
                    const finish = remainingTime - totalElapsedTime <= 0; // Cek apakah waktu sudah habis

                    return { shouldRepeat: !finish }; // Jangan ulang jika sudah selesai
                  }}
                >
                  {({ elapsedTime, color }) => {
                    return (
                      <span style={{ color }}>
                        {renderTime("seconds", getTimeSeconds(elapsedTime))}
                      </span>
                    );
                  }}
                </CountdownCircleTimer>
              </>
            </div>
          ) : (
            <div
              className={`tw-w-full tw-flex tw-items-center  tw-font-semibold tw-text-lg`}
            >
              <div
                className={`${fontSize} `}
                style={{
                  color: textColor,
                  textShadow: textShadow,
                }}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateCountDown;
