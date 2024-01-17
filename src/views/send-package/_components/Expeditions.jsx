import React, { useState } from "react";

import { PiArrowsClockwiseBold } from "react-icons/pi";
import { formatPrice } from "../../../lib/format-price";
import ncs from "../../../assets/ncs-logo.png";
import jne from "../../../assets/jne-logo.png";
import { RiErrorWarningFill } from "react-icons/ri";

const ExpeditionsList = [
  {
    id: 1,
    name: "NCS Regular Service",
    proccess: "2 - 3",
    price: 11000,
    priceAfterDiscount: 10450,
    logo: ncs,
  },
  {
    id: 2,
    name: "Jne Regular",
    proccess: "1 - 2",
    price: 12000,
    priceAfterDiscount: 10500,
    lowReturnPotencial: true,
    logo: jne,
  },
];

export const Expeditions = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div>
      <div className="font-weight-bold mb-3">
        Ekpedisi
        <PiArrowsClockwiseBold className="ml-2" />
      </div>
      <div>
        <button type="button" className="btn btn-primary mb-3">
          Regular
        </button>
      </div>

      <div>
        {ExpeditionsList.map((expedition, index) => {
          const selected = isSelected === expedition.id;

          return (
            <div
              style={{ cursor: "pointer" }}
              key={index}
              className={`card p-3 shadow-sm ${
                selected && "border border-primary"
              } `}
              onClick={() => setIsSelected(expedition.id)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="font-weight-bold">{expedition.name}</div>
                  <div className="my-2">{expedition.proccess} Hari</div>
                  <div className="font-weight-bold mb-2 text-success">
                    <span
                      style={{ textDecoration: "line-through" }}
                      className="text-decoration-line-through text-danger mr-1"
                    >
                      {formatPrice(expedition.price)}
                    </span>{" "}
                    <span> {formatPrice(expedition.priceAfterDiscount)}</span>
                  </div>
                </div>

                <div>
                  <img
                    style={{ width: 60 }}
                    src={expedition.logo}
                    alt="ncs-logo"
                  />
                </div>
              </div>
              {expedition.lowReturnPotencial && (
                <div
                  style={{ backgroundColor: "#D7E3FF", gap: 15 }}
                  className="d-flex align-items-center rounded p-2"
                >
                  <div style={{ color: "#2D61AC" }}>
                    <RiErrorWarningFill size={18} />
                  </div>
                  <span>Potensi retur rendah</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
