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

export function SideMenuIrrRelevent({ sideBarPinned,setTooglepin,tooglepin }: SideBarPinnedProps) {
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
      <div style={{fontSize:"13px"}} className="d-flex align-items-center justify-content-center h-50px has-font-weight w-100 light-green-background pt-3">
        <p>TOTAL IRRELEVENT STUDIES</p>
        </div>
   
      <div className="d-flex align-items-center justify-content-center has-font-weight low-font h-50px w-100 pt-3">
        <p>79</p>
        </div>
 
      <div className="d-flex align-items-center justify-content-center has-font-weight low-font h-50px w-100 light-green-background pt-3">
        <p>SOURCE</p>
        </div>
        <div className="d-flex">
        <div style={{height:"150px",flex:"0.2"}} className="mt-5 pad-horizontal-15 d-flex flex-column">
        {sourcesArr.map((each: any, idx: number) => {
          return (
            <>
              <div
                key={idx}
                className=""
                style={{
                  width: 20,
                  backgroundColor: each.color,
                  height: each.range,
                  
                }}
              >
                <div className="">
                  {
                    <OverlayTrigger
                      placement={"right"}
                      overlay={
                        <Tooltip>
                          <strong>{each.title} {each.range}</strong>.
                        </Tooltip>
                      }
                    >
                      <p style={{color:each.color,fontSize:"100%"}}>*</p>
                    </OverlayTrigger>
                  }
                </div>
              </div>
            </>
          );
        })}
        </div>

        <div style={{display:"flex",flex:"1",alignItems:"center",justifyContent:"start",fontSize:"13px",fontWeight:"600"}}>
            <div style={{flexDirection:"row"}}>
            <div style={{height:"12px",width:"12px",backgroundColor:"#FCD560",margin:"10px"}}>
                <span style={{paddingLeft:"20px"}}>Pumbed</span>
            </div>
            <div style={{height:"12px",width:"12px",backgroundColor:"#A4CC89",margin:"10px"}}>
                <span style={{paddingLeft:"20px"}}>Embase</span>
            </div>
            <div style={{height:"12px",width:"12px",backgroundColor:"#2B32BC",margin:"10px"}}>
                <span style={{paddingLeft:"20px"}}>GoogleScholar</span>
            </div>
            <div style={{height:"12px",width:"12px",backgroundColor:"#8AA4D7",margin:"10px"}}>
                <span style={{paddingLeft:"20px"}}>Cochrane Centeral</span>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}