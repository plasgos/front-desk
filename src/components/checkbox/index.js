import React, { useState } from 'react';

import { IoCheckbox, IoSquareOutline } from "react-icons/io5";

const CheckBox = ({onClick, checked, style, size, label, labelStyle, disabled}) => {
  const [hover, setHover] = useState(false);
  if(disabled){
    return (
      <div className="d-flex justify-content-left align-items-center mr-2" onClick={() => {}}>
        <IoSquareOutline style={style} className="text-dark mr-2" size={size}/>
        {
          label && label.length > 0 && (
            <div style={labelStyle} className="ml-2 text-secondary">{label}</div>
          )
        }
      </div>
    )
  }
  if(checked){
    return (
      <div className="d-flex justify-content-left align-items-center mr-2" onClick={onClick} style={{cursor:'pointer'}}>
        <IoCheckbox style={style} className="text-primary mr-2" size={size} />
        {
          label && label.length > 0 && (
            <div style={labelStyle} className="ml-2">{label}</div>
          )
        }
      </div>
    )
  }
  return (
    <div className="d-flex justify-content-left align-items-center mr-2" onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{cursor:'pointer'}}>
      <IoSquareOutline style={style} className={hover ? "text-primary mr-2" : "mr-2 text-dark"} size={size}/>
      {
        label && label.length > 0 && (
          <div style={labelStyle} className="ml-2">{label}</div>
        )
      }
    </div>
  )
}

export default CheckBox;
