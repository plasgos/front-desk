import { CButton, CCard, CCardBody } from "@coreui/react";
import React, { useRef, useState } from "react";
import {
  HiMagnifyingGlassPlus,
  HiMagnifyingGlassMinus,
  HiOutlinePrinter,
} from "react-icons/hi2";
import {
  IoIosRadioButtonOff,
  IoIosRadioButtonOn,
  IoIosInformationCircleOutline,
} from "react-icons/io";

import { BlobProvider } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import InvoiceDownload from "./InvoiceDownload";

export const invoiceData = [
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

  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
  const [scale, setScale] = useState(1);
  const [isSelectedA4, setisSelecteA4] = useState(false);
  const [isSelectedA6, setisSelecteA6] = useState(true);

  const [isProductInclude, setIsProductInclude] = useState(false);

  const handleSelectA4 = () => {
    setisSelecteA4(true);
    setisSelecteA6(false);
  };

  const handleSelectA6 = () => {
    setisSelecteA6(true);
    setisSelecteA4(false);
  };

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
        <PDFViewer showToolbar={false} height={420} width={"100%"}>
          <InvoiceDownload
            isSelectedA6={isSelectedA6}
            isProductsInclude={isProductInclude}
            // zoom={{
            //   transformOrigin: "top left",
            //   transform: `scale(${scale})`,
            //   transition: "transform 0.5s ease",
            // }}
          />
        </PDFViewer>

        {/* <div
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
        </div> */}
      </div>

      <div className="col-12  col-md-4 ">
        <CCard style={{ borderRadius: 8 }} className="shadow-sm">
          <CCardBody>
            <div>
              <div className="sub-heading mb-2">Ukuran Kertas</div>

              <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                <div className="d-flex align-items-center mr-4">
                  {isSelectedA4 ? (
                    <IoIosRadioButtonOn
                      size={20}
                      style={{ cursor: "pointer" }}
                      className={`ml-auto text-primary`}
                    />
                  ) : (
                    <IoIosRadioButtonOff
                      onClick={handleSelectA4}
                      size={20}
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
                      size={20}
                      style={{ cursor: "pointer" }}
                      className={`ml-auto text-primary`}
                    />
                  ) : (
                    <IoIosRadioButtonOff
                      onClick={handleSelectA6}
                      size={20}
                      style={{ cursor: "pointer" }}
                      className={`ml-auto`}
                    />
                  )}

                  <div className="mx-1">A6</div>

                  <IoIosInformationCircleOutline size={12} color="grey" />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="sub-heading mb-2">Info Tambahan</div>

              <div className="ml-1 d-flex align-items-center">
                <input
                  onChange={() =>
                    setIsProductInclude((prevState) => !prevState)
                  }
                  style={{ cursor: "pointer", transform: "scale(1.2)" }}
                  type="checkbox"
                  checked={isProductInclude}
                />
                <div style={{ cursor: "pointer" }} className="ml-2">
                  Cetak dengan daftar produk
                </div>
              </div>
            </div>

            <BlobProvider
              document={
                <InvoiceDownload
                  isSelectedA6={isSelectedA6}
                  isProductsInclude={isProductInclude}
                />
              }
            >
              {({ url, blob, loading }) => (
                <CButton
                  disabled={loading}
                  className="btn-block"
                  color="primary"
                  style={{ position: "relative" }}
                >
                  <a
                    href={url}
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                    className="stretched-link"
                  >
                    <span>{loading ? "Loading..." : "Cetak Label"} </span>
                  </a>
                </CButton>
              )}
            </BlobProvider>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
};

export default InvoiceLabelSetting;
