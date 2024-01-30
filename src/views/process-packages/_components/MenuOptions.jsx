import React from "react";

import { Link, useLocation } from "react-router-dom";

import { TbPackage } from "react-icons/tb";
import { LiaReceiptSolid } from "react-icons/lia";
import { MdPayment } from "react-icons/md";

const statusToIcon = {
  new: <TbPackage size={40} />,
  resi: <LiaReceiptSolid size={40} />,
  pembayaran: <MdPayment size={40} />,
};

const processPackage = [
  { status: "new", value: 1, title: "Baru", url: "/new" },
  { status: "pembayaran", value: 1, title: "Pembayaran", url: "/pembayaran" },
  { status: "resi", value: 2, title: "Resi", url: "/resi" },
];

export const MenuOptions = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div
      style={{ gap: 20 }}
      className="p-3 d-flex flex-wrap justify-content-center"
    >
      {processPackage.map((progress, index) => {
        const isActive = pathname === `/buyer/process-packages${progress.url}`;

        return (
          <Link
            key={index}
            style={{ color: "black", textDecoration: "none", flexGrow: 1 }}
            to={`/buyer/process-packages${progress.url}`}
          >
            <div
              className={` card  shadow-sm card-hover ${
                isActive && "card-selected"
              }`}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <div style={{ fontSize: 24 }} className="font-weight-bold">
                      {progress.value}
                    </div>
                    <div
                      style={{ fontSize: 14 }}
                      className="text-right mt-3 font-weight-normal"
                    >
                      <div>{progress.title}</div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>{statusToIcon[progress.status]}</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
