import React from "react";

type PopalertProps = {
  text: string;
  width: number | string;
  positiondata: string | null;
  count: string | null;
};

export function Popalert() {
//   console.log("data from pop over", positiondata);
  return (
    <>
      <div className="" data-container="body" data-toggle="popover" 
      data-placement="top" 
      data-content="content">
      {/* <button type="button" className="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on top
</button> */}
     content
      </div>
    </>
  );
}
