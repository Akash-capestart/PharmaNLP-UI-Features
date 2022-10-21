import React from "react";
import { useAppSelector } from "../../../redux/Hooks";
// import { PopOver } from "../../../commonComponents/PopOver";
import { Popalert } from "../../../commonComponents/Popalert";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export function ArticlesCountDisplayer({ sourcesArr }: any) {
  const { midFont } = useAppSelector((state) => state.globalFontResizer);

  return (
    <div className="row no-margin pad-b-15 pad-t-15 light-green-background align-items-center article-count-displayer-height">
      <div className="col-md-3 pad-l-15 pad-r-0">
        <div className="d-flex align-items-center justify-content-between pale-green-background pad-10">
          <p
            className="has-font-weight font-change-animation no-margin"
            style={{ fontSize: midFont }}
          >
            TOTAL RELEVANT STUDIES
          </p>
          <h3 className="no-margin">145</h3>
        </div>
      </div>
      <div className="col-md-2 pad-l-15 pad-r-0">
        <div className="d-flex align-items-center justify-content-between pale-green-background pad-10">
          <p
            className="no-margin has-font-weight font-change-animation"
            style={{ fontSize: midFont }}
          >
            ADVERSE EVENTS
          </p>
          <h3 className="no-margin">19</h3>
        </div>
      </div>
      <div className="col-md-4 pad-l-15 pad-r-0">
        <div className="d-flex align-items-center justify-content-between pale-green-background pad-10">
          <div className="w-50 d-flex align-items-center justify-content-evenly has-gray-border-right">
            <p
              className="has-font-weight font-change-animation no-margin"
              style={{ fontSize: midFont }}
            >
              FREE FULL-TEXT
            </p>
            <h3 className="no-margin">118</h3>
          </div>
          <div className="pad-l-15 d-flex w-50 align-items-center justify-content-evenly">
            <p
              className="has-font-weight font-change-animation no-margin"
              style={{ fontSize: midFont }}
            >
              PAID
            </p>
            <h3 className="no-margin">118</h3>
          </div>
        </div>
      </div>
      <div className="col-md-3 pad-horizontal-15 d-flex align-items-center">
        {sourcesArr.map((each: any, idx: number) => {
          return (
            <>
              <div
                key={idx}
                className=""
                style={{
                  width: each.range,
                  backgroundColor: each.color,
                  height: 20,
                }}
              >
                <div className="">
                  {/* <Popalert/> */}
                  {
                    <OverlayTrigger
                      placement={"left"}
                      overlay={
                        <Tooltip>
                          <strong>{each.title} {each.range}</strong>.
                        </Tooltip>
                      }
                    >
                      <p style={{color:each.color}}>hai</p>
                      {/* <Button variant="success">Tooltip on </Button> */}
                    </OverlayTrigger>
                  }
                </div>
              </div>
            </>
          );

          // return (
          //   <>
          //        <button type="button" className="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
          // Popover on top
          // </button>

          //   <div key={idx} className="" style={{ width: each.range, backgroundColor: each.color, height: 20 }}>
          //     <div className=""
          //      >
          //       {/* <Popalert/> */}

          //       {/* <PopOver text={each.title} count={each.range} width={"auto"} positiondata={"left"}/> */}
          //     </div>
          //   </div>
          //   </>
          // )

          //           return (
          //             <div key={idx} className="cursor-pointer position-relative source-show-trigger" style={{ width: each.range, backgroundColor: each.color, height: 20 }}>
          //               <div className="position-absolute popover-position source-popover-show"
          //                >
          //                 {/* <Popalert/> */}
          //                 <button type="button" className="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
          //   Popover on top
          // </button>
          //                 {/* <PopOver text={each.title} count={each.range} width={"auto"} positiondata={"left"}/> */}
          //               </div>
          //             </div>
          //           )
        })}
      </div>
    </div>
  );
}
