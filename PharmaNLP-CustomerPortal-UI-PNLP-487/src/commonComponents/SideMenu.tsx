import React, { useState } from "react";
import { GetFirstLetter } from "../helpers/GetFirstLetter";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { setsideBarPinned } from "../redux/reducers/NavBarCollapseSlice";
import { SideMenuFolderLists } from "./SideMenuFolderLists";

type SideBarPinnedProps = {
  sideBarPinned: boolean,
  setTooglepin:any,
  tooglepin:boolean
  // setWidthchangecss:number

}

export function SideMenuRelevent({ sideBarPinned,setTooglepin,tooglepin }: SideBarPinnedProps) {

  const dispatch = useAppDispatch()
  const { lowFont } = useAppSelector((state) => state.globalFontResizer);
  const [folderSelector, setfolderSelector] = useState<boolean>(true);

  const folderSelectHandler = (key: string) => {
    if (key === "folder") setfolderSelector(true);
    else setfolderSelector(false);
  };

  let r=document.querySelector(':root');
  // console.log("data for r",r)  

  const pinAction=()=>{
    setTooglepin(!tooglepin)

    let item:any=document.querySelector('div')
    // let data1= item?.style.getPropertyValue("--ispinned")
    // console.log("data defined",data1)

    item.style.setProperty("--ispinned","50px")
  //  setWidthchangecss(data)
  }

  // const pinActionCss=()=>{
  //  let ispinned= r?.getAttribute('--ispinned','true')
  //   console.log("data for pin css",ispinned)
  // }

  const pinActionHandler = () => dispatch(setsideBarPinned(sideBarPinned ? false : true))

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
        {/* <div className="side-menu-pin-arrow pad-5 light-green-background has-border-radius-5 cursor-pointer" onClick={() => pinActionHandler()}> */}
        <div className="side-menu-pin-arrow pad-5 light-green-background has-border-radius-5 cursor-pointer" onClick={() => pinAction()}>

          <img src="/images/green-drop-down-image.png" className={`${tooglepin ? "pin-arrow-right" : "pin-arrow-left"}`} alt="Arrow..." />
        </div>
      </div>
      <div className={`${tooglepin ? "" : "d-flex"}`}>
        <button
          onClick={() => folderSelectHandler("folder")}
          className={`${tooglepin ? "w-100" : "w-50"} text-center d-flex align-items-center justify-content-around no-padding h-36 ${folderSelector ? "btn-active" : "btn-std"
            }`}
        >
          {!tooglepin ?
            <span
              className="font-change-animation"
              style={{ fontSize: lowFont }}
            >
              Folders
            </span> : <img src="images/folder-image.png" className="w-20" alt="Folder..." />
          }
        </button>
        <button
          onClick={() => folderSelectHandler("savedSearch")}
          className={`${tooglepin ? "w-100" : "w-50"} text-center d-flex align-items-center justify-content-around no-padding h-36 ${!folderSelector ? "btn-active" : "btn-std"
            }`}
        >
          {!tooglepin ?
            <span
              className="font-change-animation"
              style={{ fontSize: lowFont }}
            >
              Saved Searches
            </span> : <img src="images/advance-search-image.png" className="w-20" alt="Search..." />
          }
        </button>
      </div>
      {folderSelector ? (
        <div className="mar-t-10">
          <SideMenuFolderLists
            filesData={[
              { color: "#31D0DA", file: "Femoral Neck System", count: 79 },
              { color: "#EB629B", file: "Dynamic Hip Screw", count: 42 },
              { color: "#9031DA", file: "Cannulated Screw", count: 24 },
            ]}
            sideBarPinned={tooglepin}
          />
        </div>
      ) : (
        <div className={`${tooglepin ? "pad-5" : "pad-10"}`}>
          <div className="cursor-pointer nav-save-search-content">
            <span
              className="text-green has-font-weight pad-r-10 font-change-animation"
              style={{ fontSize: lowFont }}
            >
              #1
            </span>
            <span
              className="text-green has-font-weight font-change-animation"
              style={{ fontSize: lowFont }}
            >
              {tooglepin ? GetFirstLetter("Femoral Neck System") : "Femoral Neck System"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
