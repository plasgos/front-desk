import React from "react";

import { LuLoader } from "react-icons/lu";
import { TbCash } from "react-icons/tb";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { GrMoney } from "react-icons/gr";
import { IoArchiveOutline } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { LiaUndoAltSolid } from "react-icons/lia";
import { GiTakeMyMoney } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const ListFilteredButton = () => {
  const listFilteredButton = [
    { title: "Semua", icon: <LuLoader size={18} className="mr-2" /> },
    { title: "Cashback", icon: <TbCash size={18} className="mr-2" /> },
    {
      title: "COD",
      icon: <LiaHandHoldingUsdSolid size={18} className="mr-2" />,
    },
    { title: "Klaim", icon: <GrMoney size={18} className="mr-2" /> },
    {
      title: "Penarikan",
      icon: <IoArchiveOutline size={18} className="mr-2" />,
    },
    { title: "Afiliasi", icon: <TbUsers size={18} className="mr-2" /> },
    {
      title: "Penyesuaian Ongkir",
      icon: <FaMoneyBillTransfer size={18} className="mr-2" />,
    },
    { title: "Return", icon: <LiaUndoAltSolid size={18} className="mr-2" /> },
    {
      title: "COD Advance",
      icon: <GiTakeMyMoney size={18} className="mr-2" />,
    },
    { title: "Akuisisi", icon: <TbCash size={18} className="mr-2" /> },
    {
      title: "Tagihan",
      icon: <AiOutlinePlusCircle size={18} className="mr-2" />,
    },
  ];

  return listFilteredButton;
};
