import React, { useEffect, useRef, useState } from "react";
import { Document, Page, Text, Image, View, Font } from "@react-pdf/renderer";
import { formatPrice } from "../../lib";
import kiriminaja from "../../assets/kirimin-aja-png.png";
import JsBarcode from "jsbarcode";
import jne from "../../assets/jne-logo.png";
import warningIcon from "../../assets/exclamation.png";
// import invoices from "../../assets/invoice.jpg";

import Barcode from "react-barcode";
import { CgDanger } from "react-icons/cg";
import html2canvas from "html2canvas";
import { invoiceData } from "./InvoiceLabelSetting";

const InvoiceDownloadCanvas = ({
  isSelectedA6,
  isProductsInclude,
  key,
  barcode,
  isCod,
  price,
  service,
  qty,
  weight,
  receiver,
  sender,
  products,
}) => {
  const stylePageA4 = {};
  if (isSelectedA6 === false) {
    stylePageA4.flexDirection = "row";
    stylePageA4.flexWrap = "wrap";
    stylePageA4.justifyContent = "space-between";
  }

  //   const [img, setImg] = useState(null);
  //   console.log("🚀 ~ img:", img);

  //   const InvoiceImage = (
  //     <div
  //       id="Invoice"
  //       style={{ width: "105mm", height: "100%", backgroundColor: "white" }}
  //       className="p-2"
  //     >
  //       <div className="border border-dark h-100">
  //         <div className="d-flex justify-content-between border-bottom  align-items-center p-3">
  //           <img
  //             style={{ width: 80, height: "100%" }}
  //             src={kiriminaja}
  //             alt="kirimin-aja"
  //           />

  //           <img
  //             style={{ width: 60, height: "100%" }}
  //             src={jne}
  //             alt="kirimin-aja"
  //           />
  //         </div>
  //         <div className="text-center p-1 border-bottom ">
  //           <Barcode
  //             value={barcode}
  //             textAlign="center"
  //             width={2.5}
  //             height={40}
  //             fontSize={14}
  //           />
  //         </div>
  //         <div className="text-center p-2 border-bottom">
  //           <div
  //             style={{ color: "black", fontSize: 14 }}
  //             className="font-weight-bold"
  //           >
  //             {isCod ? "COD" : "NON COD"} : {formatPrice(price)}
  //           </div>
  //         </div>
  //         <div className="d-flex align-items-center justify-content-between  ">
  //           <div>
  //             <div
  //               style={{ color: "black", fontSize: 14 }}
  //               className="font-weight-bold p-3"
  //             >
  //               Jenis Layanan : {service}
  //             </div>
  //           </div>
  //           <div style={{ fontSize: 12 }} className="">
  //             <div className="flex-column p-2 mr-3">
  //               <div>Asuransi Rp 0,-</div>
  //               <div className="my-2">Berat {weight} gr</div>
  //               <div>Quantity : {qty}Pcs </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div style={{ fontSize: 12 }} className="px-3 py-2">
  //           <div className="border border-dark text-center p-2 rounded">
  //             <div style={{ fontStyle: "italic" }}>
  //               <CgDanger size={18} className="mr-2" />
  //               Penjual tidak perlu bayar apapun ke kurir, sudah di bayarkan
  //               otomatis
  //             </div>
  //           </div>
  //         </div>
  //         <div
  //           style={{ gap: 14, borderBottom: "2px dashed grey", fontSize: 12 }}
  //           className="d-flex p-2 justify-content-between  "
  //         >
  //           <div>
  //             <div className="font-weight-bold">Penerima</div>
  //             <div className="mb-2">{receiver.name}</div>
  //             {receiver.phoneNumber} | {receiver.address}
  //           </div>
  //           <div>
  //             <div className="font-weight-bold">Pengirim</div>
  //             <div className="mb-2">{sender.name}</div>
  //             {sender.phoneNumber} | {sender.address}
  //           </div>
  //         </div>
  //         <div
  //           style={{ fontSize: 12 }}
  //           className="d-flex justify-content-between p-2 border-bottom"
  //         >
  //           <div>
  //             <div className="font-weight-bold">Produk</div>
  //             <div>1. {products.name}</div>
  //             <div>Keterangan : {products.description}</div>
  //           </div>
  //           <div>
  //             <div className="font-weight-bold">Jumlah</div>
  //             <div className="text-right">{products.qty} pcs</div>
  //           </div>
  //         </div>

  //         <div style={{ fontSize: 12 }} className="p-2 ">
  //           <div>Catatan :</div>
  //           <div style={{ fontStyle: "italic" }}>
  //             * Pengirim wajib meminta bukti serah terima paket ke kurir
  //           </div>
  //           <div style={{ fontStyle: "italic" }}>
  //             * Jika paket ini retur, pengirim tetap di kenakan biaya
  //             keberangkatan dan biaya retur sesuai ekspedisi
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );

  //   useEffect(() => {
  //     handleDownloadImage();
  //   }, []);

  //   const handleDownloadImage = async () => {
  //     const element = document.getElementById(`Invoice${key}`),
  //       canvas = await html2canvas(element),
  //       data = canvas.toDataURL("image/jpg");
  //     setImg(data);
  //   };

  const [img, setImg] = useState([]);
  console.log("🚀 ~ img:", img);

  useEffect(() => {
    const handleDownloadImage = async (index) => {
      const element = document.getElementById(`Invoice${index}`);
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/jpg");
      setImg((prevImg) => [...prevImg, data]);
    };

    invoiceData.forEach((_, index) => handleDownloadImage(index));
  }, []);

  return (
    <Document>
      <Page size={isSelectedA6 ? "A6" : "A4"} style={stylePageA4}>
        <View>
          {img.map((imgUrl) => (
            <Image source={imgUrl} />
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDownloadCanvas;
