import React from "react";

import { Link, useLocation } from "react-router-dom";

import {
  MdCheckCircle,
  MdPendingActions,
  MdOutlineCancel,
} from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbTruckReturn } from "react-icons/tb";

const statusToIcon = {
  waiting: <MdPendingActions size={36} />,
  shipping: <LiaShippingFastSolid size={36} />,
  done: <MdCheckCircle size={36} />,
  return: <TbTruckReturn size={36} />,
  cancel: <MdOutlineCancel size={36} />,
};

const progressPackage = [
  { status: "waiting", value: 5, title: "Belum Di Expedisi", url: "/waiting" },
  { status: "shipping", value: 5, title: "Pengiriman", url: "/shipping" },
  { status: "done", value: 5, title: "Selesai", url: "/done" },
  { status: "return", value: 5, title: "Return", url: "/return" },
  { status: "cancel", value: 5, title: "Dibatalkan", url: "/cancel" },
];

export const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div
      style={{ gap: 20 }}
      className="p-3 d-flex flex-wrap justify-content-center"
    >
      {progressPackage.map((progress, index) => {
        const isActive = pathname === `/buyer/package-history${progress.url}`;

        return (
          <Link
            key={index}
            style={{ color: "black", textDecoration: "none", flexGrow: 1 }}
            to={`/buyer/package-history${progress.url}`}
          >
            <div
              // style={{ width: 180 }}
              className={` card  shadow-sm card-hover ${
                isActive && "card-selected"
              }`}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>{statusToIcon[progress.status]}</div>
                  <div style={{ fontSize: 24 }} className="font-weight-bold">
                    {progress.value}
                  </div>
                </div>
                <div
                  style={{ fontSize: 14 }}
                  className="text-right mt-3 font-weight-normal"
                >
                  <div>{progress.title}</div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
