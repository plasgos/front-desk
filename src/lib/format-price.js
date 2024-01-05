export function formatPrice(price) {
  // Menggunakan metode toLocaleString dengan opsional 'id-ID' untuk Rupiah
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
