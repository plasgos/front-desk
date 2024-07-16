import { useMemo } from "react";
import moment from "moment";
import "moment/locale/id";

const useFormatChatDate = (date) => {
  const formattedDate = useMemo(() => {
    const now = moment();
    const updatedDate = moment(date);
    const isSameDay = now.isSame(updatedDate, "day");
    const daysDifference = now.diff(updatedDate, "days");

    if (isSameDay) {
      return updatedDate.format("HH:mm"); // Format 24 jam untuk hari ini
    } else if (daysDifference < 3) {
      return updatedDate.format("dddd"); // Menampilkan nama hari (misalnya: Senin, Selasa)
    } else {
      return updatedDate.format("DD/MM/YYYY"); // Menampilkan tanggal lengkap (misalnya: 15 Juni 2024)
    }
  }, [date]);

  return formattedDate;
};

export default useFormatChatDate;
