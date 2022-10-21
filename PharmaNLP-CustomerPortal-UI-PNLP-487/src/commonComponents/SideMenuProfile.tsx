import React, { useState } from "react";
import { GetFirstLetter } from "../helpers/GetFirstLetter";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

type SideBarPinnedProps = {
  sideBarPinned: boolean,
  setTooglepin:any,
  tooglepin:boolean
}

export function SideMenuProfile({ sideBarPinned,setTooglepin,tooglepin }: SideBarPinnedProps) {
  const { lowFont } = useAppSelector((state) => state.globalFontResizer);
  let r=document.querySelector(':root');

  const sourcesArr = [{ title: "Pubmed", range: "50%", color: "#FCD560" }, 
  { title: "Embase", range: "10%", color: "#A4CC89"}, 
  { title: "Embase", range: "5%", color: "#2B32BC" },
   { title: "Embase", range: "15%", color: "#A4CC89", },
    { title: "GoogleScholar", range: "30%", color: "#8AA4D7", },
     { title: "Embase", range: "10%", color: "#A4CC89",}]

  return (
    <div className="overflow-hidden ">
      <div className="d-flex align-items-center h-50px light-green-background">
        <img
          src="/images/pnlp-logo.png"
          className="h-50px"
          alt="PNLP Logo..."
        />
        <div className="w-100 text-center">
          <img
            className="h-30"
            src="/images/capestart-logo.png"
            alt="CapeStart Logo..."
          />
        </div>
      </div>
      <div className="h-50px d-flex align-items-center justify-content-end mar-15">
      </div>
        <div className="d-flex">
        <div style={{height:"150px",flex:"0.2"}} className="mt-5 pad-horizontal-15 d-flex flex-column">
        </div>
        </div>
    </div>
  );
}
