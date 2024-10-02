export const shadowOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: "tw-shadow-sm", label: "Lebih Tipis" },
  { value: "tw-shadow", label: "Tipis" },
  { value: "tw-shadow-md", label: "Sedang" },
  { value: "tw-shadow-lg", label: "Besar" },
  { value: "tw-shadow-xl", label: "Extra Besar" },
  { value: "tw-shadow-2xl", label: "Blur" },
];

export const fontSizeOptions = [
  { value: "tw-text-xs", label: "Lebih Kecil" },
  { value: "tw-text-sm", label: "Kecil" },
  { value: "tw-text-base", label: "Sedang" },
  { value: "tw-text-lg", label: "Besar" },
  { value: "tw-text-xl", label: "Lebih Besar" },
  { value: "tw-text-2xl", label: "Extra Besar" },
];

export const textAlignOptions = [
  { value: "tw-text-left", label: "Kiri" },
  { value: "tw-text-center", label: "Tengah" },
  { value: "tw-text-right", label: "Kanan" },
  { value: "tw-text-justify", label: "Justify" },
];

export const alignOptions = [
  {
    value: "tw-justify-start",
    label: "Kiri",
  },
  {
    value: "tw-justify-center",
    label: "Tengah",
  },
  {
    value: "tw-justify-end",
    label: "Kanan",
  },
];

export const columnTestimonyOptions = [
  {
    value: "tw-w-full",
    label: "1",
  },
  {
    value: "tw-w-1/2",
    label: "2",
  },
  { value: "tw-w-1/3", label: "3" },
  { value: "tw-w-1/4", label: "4" },
];

export const fontStyleOptions = [
  { value: "tw-font-normal", label: "Normal" },
  { value: "tw-font-semibold", label: "Semi Bold" },
  { value: "tw-font-bold", label: "Bold" },
  { value: "tw-italic", label: "Italic" },
  { value: "tw-font-semibold tw-italic", label: "Bold Italic" },
  { value: "tw-underline", label: "Underline" },
  { value: "tw-line-through", label: "Line Through" },
];

export const PaddingYOptions = [
  { value: "equal", label: "Sama" },
  { value: "different", label: "Berbeda" },
];

export const backgroundType = [
  { value: undefined, label: "Tidak Ada" },
  { value: "color", label: "Warna" },
  { value: "image", label: "Gambar" },
];

export const widthPageOptions = [
  {
    label: "Kecil",
    options: [
      { value: "400px", label: "400px" },
      { value: "520px", label: "520px" },
      { value: "640px", label: "640px" },
    ],
  },
  {
    label: "Sedang",
    options: [
      { value: "800px", label: "800px" },
      { value: "900px", label: "900px" },
      { value: "1024px", label: "1024px" },
      { value: "1280px", label: "1280px" },
    ],
  },
  {
    label: "Lebar",
    options: [
      { value: "1360px", label: "1360px" },
      { value: "1440px", label: "1440px" },
      { value: "1600px", label: "1600px" },
      { value: "1920px", label: "1920px" },
    ],
  },
];

export const distanceOptions = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

export const maxColumnOptions = [
  {
    value: "tw-w-1/2",
    label: "2",
  },
  { value: "tw-w-1/3", label: "3" },
  { value: "tw-w-1/4", label: "4" },
  { value: "tw-w-1/5", label: "5" },
  { value: "tw-w-1/6", label: "6" },
];

export const maxColumnFAQOptions = [
  {
    value: "tw-w-full",
    label: "1",
  },
  {
    value: "tw-w-1/2",
    label: "2",
  },
  { value: "tw-w-1/3", label: "3" },
  { value: "tw-w-1/4", label: "4" },
  { value: "tw-w-1/5", label: "5" },
];

export const aspectRatioOptions = [
  {
    label: "Kotak",
    options: [{ value: 1 / 1, label: "1:1" }],
  },
  {
    label: "Melebar",
    options: [
      { value: 5 / 4, label: "5:4" },
      { value: 4 / 3, label: "4:3" },
      { value: 5 / 3, label: "5:3" },
      { value: 2 / 1, label: "2:1" },
    ],
  },
  {
    label: "Potret",
    options: [
      { value: 4 / 5, label: "4:5" },
      { value: 3 / 4, label: "3:4" },
      { value: 3 / 5, label: "3:5" },
      { value: 1 / 2, label: "1:2" },
    ],
  },
];

// export const aspectRatioVideoOptions = [
//   {
//     label: "Kotak",
//     options: [{ value: "100%", label: "1:1" }], // 1:1
//   },
//   {
//     label: "Melebar",
//     options: [
//       { value: "75%", label: "4:3" }, // 4:3
//       { value: "56.25%", label: "16:9" }, // 16:9
//     ],
//   },
//   {
//     label: "Potret",
//     options: [
//       { value: "80%", label: "4:5" }, // 4:5
//       { value: "150%", label: "2:3" }, // 2:3
//       { value: "177.78%", label: "9:16" }, // 9:16
//     ],
//   },
// ];

export const aspectRatioVideoOptions = [
  {
    label: "Kotak",
    options: [{ value: 1 / 1, label: "1:1" }], // 1:1
  },
  {
    label: "Melebar",
    options: [
      { value: 4 / 3, label: "4:3" }, // 4:3
      { value: 16 / 9, label: "16:9" }, // 16:9
    ],
  },
  {
    label: "Potret",
    options: [
      { value: 4 / 5, label: "4:5" }, // 4:5
      { value: 2 / 3, label: "2:3" }, // 2:3
      { value: 9 / 16, label: "9:16" }, // 9:16
    ],
  },
];
