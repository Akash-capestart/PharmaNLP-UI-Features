import React, { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../redux/Hooks";
import { useDetectClickOutside } from "react-detect-click-outside";


type DropDownProps = {
  activeDropDownVal: string;
  changeValHandler: Function;
  dropdownValues: string[];
  width: number;
  dropDownHeight: number | string;
  boxHeight: number | string;
  hasBorder: boolean;
  backGroundColor: string;
  datePicker: boolean;
  isrecentlyadded:boolean;
  setisrecentlyadded:any
  
};

type FromToDateProps = {
  from: string;
  to: string;
};

export function DropDown({
  activeDropDownVal,
  changeValHandler,
  dropdownValues,
  width,
  dropDownHeight,
  boxHeight,
  hasBorder,
  backGroundColor,
  datePicker,
  isrecentlyadded,
  setisrecentlyadded
}: DropDownProps) {
  const { lowFont } = useAppSelector((state) => state.globalFontResizer);
  const [showDropDown, setshowDropDown] = useState<boolean>(false);
  const [datePickerShow, setdatePickerShow] = useState<boolean>(false);
  const [fromToDate, setfromToDate] = useState<FromToDateProps>({
    from: "",
    to: "",
  });

  const dropDownShowHandler = () => {
    setshowDropDown((prevVal) => !prevVal);
    setdatePickerShow(false);
  };


  const setSelectedValueHandler = (dropdownVal: string) => {
    if (dropdownVal === "Custom") {
      // console.log("in custom")
      setfromToDate({
        from: "",
        to: "",
      });
      changeValHandler("Custom");
      setdatePickerShow(true);
    }
    else if(dropdownVal=="Recently Added")
  {
    setisrecentlyadded(true)
    changeValHandler(dropdownVal);
  }
    
    else {
      changeValHandler(dropdownVal);
      setshowDropDown(false);
    }
  };

// console.log("datapicker",datePicker)
  const dateChangeHandler = (date: string, key: string) =>
    setfromToDate({
      ...fromToDate,
      [key]: date,
    });

  const dateSetHandler = () => {
    if (fromToDate["from"] === "") alert("Please give the Start Date");
    else if (fromToDate["to"] === "") alert("Please give the End Date");
    else {
      changeValHandler(fromToDate["from"] + " to " + fromToDate["to"]);
      setshowDropDown(false);
      setdatePickerShow(false);
    }
  };

  const customDateSelectCloseHandler = () => {
    setfromToDate({
      from: "",
      to: "",
    });
    setshowDropDown(false);
    setdatePickerShow(false);
    changeValHandler(dropdownValues[0]);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {

  if(activeDropDownVal !=="Custom")
  {
    // console.log("in useeffect not custom")
    let handler = (event: any) => {
      if (!ref.current?.contains(event.target)) {
        setshowDropDown(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }
  },
  [activeDropDownVal]
  );

  return (
    <div style={{ width: width }}  className="position-relative"     
    >
      <div
        ref={ref}
        onClick={() => dropDownShowHandler()}
        style={{
          border: hasBorder ? "solid 1px #EEEEEE" : "",
          backgroundColor: backGroundColor && backGroundColor,
          height: boxHeight !== "auto" ? boxHeight : "auto",
        }}
        className="cursor-pointer d-flex align-items-center justify-content-between drop-down-box"
      >
        <p
          className="no-margin font-change-animation"
          style={{ fontSize: lowFont }}
        >
          {activeDropDownVal}
        </p>
        <img
          src="/images/gray-drop-down-image.png"
          className={showDropDown ? "drop-down-rotated" : "drop-down-icon"}
          alt="Drop Down..."
        />
      </div>
      {showDropDown && (
        <div className="drop-down-content-box" style={{ width: width }}>
          <div
            className="drop-down-content-scroll-box"
            id={dropDownHeight !== "auto" ? "custom-scrollbar" : ""}
            style={{ height: dropDownHeight }}
          >
            {!datePickerShow ? (
              dropdownValues.map((dropdownVal, idx) => {
                return (
                  <p
                    key={idx}
                    className="drop-down-content no-margin font-change-animation"
                    style={{ fontSize: lowFont }}
                    onClick={() => setSelectedValueHandler(dropdownVal)}
                  >
                    {dropdownVal}
                  </p>
                );
              })
            ) : (
              <div className="position-relative">
                <img
                  src="/images/cross-image.png"
                  className="position-absolute w-15 custom-date-close-icon cursor-pointer"
                  alt="Close..."
                  onClick={() => customDateSelectCloseHandler()}
                />
                <p className="text-center no-margin">Choose Date</p>
                <input
                  type={"date"}
                  className="mar-b-10 w-100 filtering-input"
                  onChange={(e) => dateChangeHandler(e.target.value, "from")}
                />
                <p className="text-center no-margin">To</p>
                <input
                  type={"date"}
                  className="mar-b-10 w-100 filtering-input"
                  onChange={(e) => dateChangeHandler(e.target.value, "to")}
                />
                <div className="text-end">
                  <button
                    className="btn-std btn-active has-border-radius-5"
                    onClick={() => dateSetHandler()}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
