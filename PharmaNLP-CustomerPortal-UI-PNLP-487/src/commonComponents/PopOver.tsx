import React from "react";

type PopOverProps = {
  text : string,
  width : number | string,
  positiondata:string |null,
  count : string | null,
  
}

export function PopOver({ text,width,count,positiondata } : PopOverProps) {
  console.log("data from pop over",positiondata)
  return (
    <>
      <div className="position-relative">
        <p className="no-margin min-font text-center white-background popover-text has-font-weight" style={{width}}>
          {text}
          {count && <span className="pad-l-5">{count}</span>}
        </p>
        <div className="down-arrow"></div>
      </div>
    </>
  );
}
