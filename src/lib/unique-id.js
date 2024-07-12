export const createUniqueID = (existingIds) => {
  const newId = () => Math.random().toString(36).substr(2, 9); // Membuat id acak

  // Mengambil semua id yang sudah ada di dalam array existingIds
  const existingIdSet = new Set(existingIds.map((item) => item.id));

  // Fungsi untuk memeriksa apakah id sudah ada di dalam array
  const isIdUnique = (id) => !existingIdSet.has(id);
  let uniqueId = newId(); // Menghasilkan id pertama

  // Mengecek apakah id sudah ada di dalam array. Jika iya, menghasilkan id baru hingga id unik ditemukan
  while (!isIdUnique(uniqueId)) {
    uniqueId = newId();
  }

  return uniqueId;
};
