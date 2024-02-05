import React from "react";
import actionFigure from "../../assets/action-figure.jpg";
import { RelatedProducts } from "./RelatedProducts";
import { Options } from "./Options";
import { Discussions } from "./Discussions";

const ProductDetail = () => {
  return (
    <>
      <div style={{ gap: 40 }} className="d-flex">
        <div>
          <div
            style={{
              position: "sticky",
              top: 140,
              //   paddingBottom: 200,
            }}
          >
            <div>
              <div>
                <img
                  className="rounded mb-2"
                  style={{ width: 240 }}
                  src={actionFigure}
                  alt="product"
                />
              </div>
              <div>
                <img
                  className="rounded mb-2"
                  style={{ width: 40 }}
                  src={actionFigure}
                  alt="product"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div>
            <div className="font-lg font-weight-bold mb-2">
              Banpresto - Attack on Titan The Final Season - Levi Special -
              18813
            </div>
            <div className="mb-3">Terjual 3</div>
            <div className="font-2xl font-weight-bold mb-4">Rp340.000</div>
            <div className="mb-3">Detail</div>

            <div style={{ lineHeight: 1.5 }}>
              Kondisi : Baru <br />
              Min : Pemesanan : 1 Buah <br />
              Etalase : Banspersto <br />
              Banpresto - Attack on Titan The Final Season - Levi Special -
              18813 <br />
              Height: 18 cm | 7.1" <br />
              100% Original Product <br />
              For more info and pic...
            </div>

            <div style={{ lineHeight: 1.5 }}>
              Kondisi : Baru <br />
              Min : Pemesanan : 1 Buah <br />
              Etalase : Banspersto <br />
              Banpresto - Attack on Titan The Final Season - Levi Special -
              18813 <br />
              Height: 18 cm | 7.1" <br />
              100% Original Product <br />
              For more info and pic...
            </div>

            <div style={{ lineHeight: 1.5 }}>
              Kondisi : Baru <br />
              Min : Pemesanan : 1 Buah <br />
              Etalase : Banspersto <br />
              Banpresto - Attack on Titan The Final Season - Levi Special -
              18813 <br />
              Height: 18 cm | 7.1" <br />
              100% Original Product <br />
              For more info and pic...
            </div>

            <div style={{ lineHeight: 1.5 }}>
              Kondisi : Baru <br />
              Min : Pemesanan : 1 Buah <br />
              Etalase : Banspersto <br />
              Banpresto - Attack on Titan The Final Season - Levi Special -
              18813 <br />
              Height: 18 cm | 7.1" <br />
              100% Original Product <br />
              For more info and pic...
            </div>

            <div style={{ lineHeight: 1.5 }}>
              Kondisi : Baru <br />
              Min : Pemesanan : 1 Buah <br />
              Etalase : Banspersto <br />
              Banpresto - Attack on Titan The Final Season - Levi Special -
              18813 <br />
              Height: 18 cm | 7.1" <br />
              100% Original Product <br />
              For more info and pic...
            </div>

            <div style={{ lineHeight: 1.5 }}>
              Kondisi : Baru <br />
              Min : Pemesanan : 1 Buah <br />
              Etalase : Banspersto <br />
              Banpresto - Attack on Titan The Final Season - Levi Special -
              18813 <br />
              Height: 18 cm | 7.1" <br />
              100% Original Product <br />
              For more info and pic...
            </div>
          </div>
        </div>
        <Options />
      </div>

      <Discussions />

      <RelatedProducts />
    </>
  );
};

export default ProductDetail;
