import { CButton, CCard, CCardBody } from "@coreui/react";
import React, { useRef, useState } from "react";
import { HiMagnifyingGlassPlus, HiMagnifyingGlassMinus } from "react-icons/hi2";
import {
  IoIosRadioButtonOff,
  IoIosRadioButtonOn,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { Invoice } from "./Invoice";
import { useReactToPrint } from "react-to-print";

const invoiceData = [
  {
    id: 1,
    barcode: "JO7128534127",
    isCod: true,
    price: 10000,
    service: "REG",
    qty: 1,
    weight: 500,
    receiver: {
      name: "John Doe",
      phoneNumber: "089721231",
      address: "Jl. Blotan Permai No.23 RT 03/40 Jakarta Tmimur",
    },
    sender: {
      name: "John Kenedy",
      phoneNumber: "087562721",
      address: "Jl. Blotan Permai No.23 RT 03/40 Jakarta Tmimur",
    },
    products: {
      name: "Label stiker barcode thermal 50x20",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, impedit",
      qty: 1,
    },
  },

  {
    id: 2,
    barcode: "JO7128534127",
    isCod: true,
    price: 10000,
    service: "REG",
    qty: 1,
    weight: 500,
    receiver: {
      name: "John Doe",
      phoneNumber: "089721231",
      address: "Jl. Blotan Permai No.23 RT 03/40 Jakarta Tmimur",
    },
    sender: {
      name: "John Kenedy",
      phoneNumber: "087562721",
      address: "Jl. Blotan Permai No.23 RT 03/40 Jakarta Tmimur",
    },
    products: {
      name: "Label stiker barcode thermal 50x20",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, impedit",
      qty: 1,
    },
  },
];

const InvoiceLabelSetting = () => {
  const [scale, setScale] = useState(1); // State untuk zoom

  const [isSelectedA4, setisSelecteA4] = useState(false);
  const [isSelectedA6, setisSelecteA6] = useState(true);

  const handleSelectA4 = () => {
    setisSelecteA4(true);
    setisSelecteA6(false);
  };

  const handleSelectA6 = () => {
    setisSelecteA6(true);
    setisSelecteA4(false);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    removeAfterPrint: false,
  });

  const handleZoomIn = () => {
    const newScale = scale + 0.1;
    if (newScale <= 3) {
      // Batasan zoom
      setScale(newScale);
    }
  };

  const handleZoomOut = () => {
    const newScale = scale - 0.1;
    if (newScale >= 0.1) {
      // Batasan zoom
      setScale(newScale);
    }
  };

  return (
    <div className="row">
      <div className="col-12 col-md-8">
        <div
          className="component-preview "
          style={{
            position: "relative", // Atur posisi relatif untuk mengatur tombol floating
            // width: "400px",
            height: "400px",
            overflow: "auto",

            backgroundColor: "gray",
            padding: 20,
          }}
        >
          <div
            className="preview-content mx-auto"
            style={{
              transformOrigin: "top left", // Atur titik asal transformasi
              transform: `scale(${scale})`, // Atur skala konten
              transition: "transform 0.5s ease", // Animasi transisi saat zoom
              width: isSelectedA6 ? "105mm" : "210mm",
              // height: isSelectedA6 ? "149mm" : "297mm",
              height: "auto",

              backgroundColor: "white",
              padding: 10,
            }}
          >
            <div
              ref={componentRef}
              style={isSelectedA6 ? { rowGap: 10 } : { gap: 10 }}
              className={`d-flex ${
                isSelectedA6 ? "flex-column" : "flex-row"
              }  align-items-center`}
            >
              {invoiceData.map((invoice, index) => {
                return (
                  <div
                    key={invoice.id}
                    className={`invoice-container ${
                      index !== 0 ? "page-break" : ""
                    }`}
                  >
                    <Invoice
                      // ref={componentRef}
                      barcode={invoice.barcode}
                      isCod={invoice.isCod}
                      price={invoice.price}
                      service={invoice.service}
                      qty={invoice.qty}
                      weight={invoice.weight}
                      receiver={invoice.receiver}
                      sender={invoice.sender}
                      products={invoice.products}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "40px",
            zIndex: 100,
          }}
        >
          <div
            style={{ backgroundColor: "white" }}
            className="shadow-sm rounded-lg mb-2"
          >
            <CButton onClick={handleZoomOut}>
              <HiMagnifyingGlassMinus size={18} />
            </CButton>
          </div>

          <div
            style={{ backgroundColor: "white" }}
            className="shadow-sm rounded-lg"
          >
            <CButton onClick={handleZoomIn}>
              <HiMagnifyingGlassPlus size={18} />
            </CButton>{" "}
          </div>
        </div>
      </div>

      <div className="col-12  col-md-4">
        <CCard style={{ borderRadius: 8 }} className="shadow-sm">
          <CCardBody>
            <div>
              <p className="sub-heading">Ukuran Kertas</p>
            </div>

            <div className="d-flex align-items-center border-bottom pb-3 mb-3">
              <div className="d-flex align-items-center mr-4">
                {isSelectedA4 ? (
                  <IoIosRadioButtonOn
                    size={24}
                    style={{ cursor: "pointer" }}
                    className={`ml-auto text-primary`}
                  />
                ) : (
                  <IoIosRadioButtonOff
                    onClick={handleSelectA4}
                    size={24}
                    style={{ cursor: "pointer" }}
                    className={`ml-auto`}
                  />
                )}

                <div className="mx-1">A4</div>

                <IoIosInformationCircleOutline size={12} color="grey" />
              </div>

              <div className="d-flex align-items-center">
                {isSelectedA6 ? (
                  <IoIosRadioButtonOn
                    size={24}
                    style={{ cursor: "pointer" }}
                    className={`ml-auto text-primary`}
                  />
                ) : (
                  <IoIosRadioButtonOff
                    onClick={handleSelectA6}
                    size={24}
                    style={{ cursor: "pointer" }}
                    className={`ml-auto`}
                  />
                )}

                <div className="mx-1">A6</div>

                <IoIosInformationCircleOutline size={12} color="grey" />
              </div>
            </div>

            <CButton
              onClick={handlePrint}
              className="btn-block"
              color="primary"
            >
              Cetak Label
            </CButton>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
};

export default InvoiceLabelSetting;
