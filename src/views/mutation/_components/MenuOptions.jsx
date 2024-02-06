import React from "react";

import { Link, useLocation } from "react-router-dom";

import { LuCircleDollarSign } from "react-icons/lu";
import { LuDollarSign } from "react-icons/lu";

const statusToIcon = {
  saldoEstimasi: <LuCircleDollarSign size={40} />,
  saldoAktif: <LuDollarSign size={40} />,
};

const mutation = [
  {
    status: "saldoEstimasi",
    value: 0,
    title: "Saldo Estimasi",
    url: "/estimate-balance",
  },
  {
    status: "saldoAktif",
    value: 0,
    title: "Saldo Aktif",
    url: "/active-balance",
  },
];

export const MenuOptions = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div
      style={{ gap: 20 }}
      className="d-flex flex-wrap justify-content-center"
    >
      {mutation.map((progress, index) => {
        const isActive = pathname === `/mutation${progress.url}`;

        return (
          <Link
            key={index}
            style={{ color: "black", textDecoration: "none", flexGrow: 1 }}
            to={`/mutation${progress.url}`}
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
