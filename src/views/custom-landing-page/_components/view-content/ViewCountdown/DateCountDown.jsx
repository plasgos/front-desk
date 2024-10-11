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
  const [isFinished, setIsFinished] = useState(false);

  const daysProps = content.content.days;
  const hoursProps = content.content.hours;
  const minutesProps = content.content.minutes;

  // const startTime = Date.now() / 1000;
  // const endTime =
  //   startTime +
  //   days * daySeconds +
  //   hours * hourSeconds +
  //   minutes * minuteSeconds;

  // const remainingTime = endTime - startTime;
  // console.log("🚀 ~ remainingTime:", remainingTime);
  // const daysDuration = days * daySeconds;
  // const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  // const now = moment();
  // const targetDate = moment()
  //   .add(days, "days")
  //   .add(hours, "hours")
  //   .add(minutes, "minutes");

  // const differenceInSeconds = targetDate.diff(now, "seconds");
  // console.log("🚀 ~ DateCountDown ~ differenceInSeconds:", differenceInSeconds);

  // const endTime = stratTime + differenceInSeconds; // use UNIX timestamp in seconds

  // const remainingTime = endTime - stratTime;
  // const daysCount = Math.ceil(remainingTime / daySeconds);
  // const daysDuration = daysCount * daySeconds;

  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const days = content.content.days?.date; // Dapatkan hari dari props
    const hours = content.content.hours; // Dapatkan jam dari props
    const minutes = content.content.minutes; // Dapatkan menit dari props
    const month = content.content.days?.month; // Dapatkan bulan dari props
    const year = content.content.days?.years; // Dapatkan tahun dari props

    const now = moment(); // Waktu sekarang

    // Membuat target waktu berdasarkan input
    let targetDate = moment().set({
      date: days, // Menetapkan tanggal
      month: month - 1, // Menetapkan bulan (0-indexed)
      year: year, // Menetapkan tahun
      hour: hours, // Menetapkan jam
      minute: minutes, // Menetapkan menit
      second: 0, // Menetapkan detik
    });

    if (targetDate.isBefore(now)) {
      // Menggunakan bulan yang dipilih
      targetDate = moment()
        .add(1, "month")
        .set({
          date: days,
          month: month - 1, // Menetapkan bulan (0-indexed)
          year: year, // Menetapkan tahun
          hour: hours,
          minute: minutes,
          second: 0,
        });
    }

    // Hitung selisih waktu dalam detik
    const differenceInSeconds = targetDate.diff(now, "seconds");

    // Set remaining time, pastikan tidak negatif
    setRemainingTime(differenceInSeconds > 0 ? differenceInSeconds : 0);
  }, [content]);

  // useEffect(() => {
  //   const days = content.content.days; // Ubah sesuai input
  //   const hours = content.content.hours; // Ubah sesuai input
  //   const minutes = content.content.minutes; // Ubah sesuai input

  //   const now = moment(); // Waktu sekarang

  //   // Membuat target waktu berdasarkan input
  //   let targetDate = moment().set({
  //     year: now.year(), // Tahun saat ini
  //     month: now.month(), // Bulan saat ini
  //     date: days, // Menetapkan tanggal
  //     hour: hours, // Menetapkan jam
  //     minute: minutes, // Menetapkan menit
  //     second: 0, // Menetapkan detik
  //   });

  //   // Validasi: Jika target waktu kurang dari waktu sekarang
  //   if (targetDate.isBefore(now)) {
  //     // Jika target waktu sudah lewat, tampilkan countdown selesai
  //     setRemainingTime(0);
  //     return; // Hentikan eksekusi jika sudah lewat
  //   }

  //   // Jika target waktu belum lewat, hitung selisih
  //   const differenceInSeconds = targetDate.diff(now, "seconds");
  //   setRemainingTime(differenceInSeconds > 0 ? differenceInSeconds : 0);
  // }, [content]);

  // Fungsi untuk menghitung waktu
  const formatTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(remainingTime);

  const timerProps = {
    isPlaying: true,
    size: content?.content?.size * 10,
    strokeWidth: 6,
  };

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
        <div style={{ fontSize: 32 }} className="tw-font-semibold">
          {time}
        </div>
        <div>{label}</div>
      </div>
    );
  };
  // Hitung durasi untuk setiap bagian waktu
  const daysDuration = getTimeDays(remainingTime) * daySeconds;
  const hoursDuration = getTimeHours(remainingTime % daySeconds) * hourSeconds;
  const minutesDuration =
    getTimeMinutes(remainingTime % hourSeconds) * minuteSeconds;
  const secondsDuration = remainingTime % minuteSeconds;

  return (
    <div>
      {isFinished ? (
        <div className="tw-flex tw-flex-1 tw-justify-center tw-items-center  tw-font-semibold tw-text-lg">
          Sudah Selesai
        </div>
      ) : (
        <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-3">
          {/* {remainingTime > 0 ? (
            <>
              <CountdownCircleTimer
                {...timerProps}
                colors="#7E2E84"
                duration={daysDuration / daySeconds}
                initialRemainingTime={remainingTime}
              >
                {({ elapsedTime }) =>
                  renderTime("Hari", getTimeDays(daysDuration - elapsedTime))
                }
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
                {({ elapsedTime }) =>
                  renderTime("Jam", getTimeHours(hoursDuration - elapsedTime))
                }
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
                {({ elapsedTime }) =>
                  renderTime(
                    "Menit",
                    getTimeMinutes(minutesDuration - elapsedTime)
                  )
                }
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
                {({ elapsedTime }) =>
                  renderTime("Detik", getTimeSeconds(elapsedTime))
                }
              </CountdownCircleTimer>
            </>
          ) : (
            <div>Countdown Selesai!</div>
          )} */}
          {remainingTime > 0 ? (
            <div>
              <div>
                <span>{days} Hari</span> <br />
                <span>{hours} Jam</span> <br />
                <span>{minutes} Menit</span> <br />
                <span>{seconds} Detik</span>
              </div>
            </div>
          ) : (
            <div>Countdown Selesai!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateCountDown;
