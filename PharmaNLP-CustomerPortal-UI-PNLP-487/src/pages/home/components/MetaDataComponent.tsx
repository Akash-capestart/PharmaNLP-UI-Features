import React, { useState } from "react";
import { useAppSelector } from "../../../redux/Hooks";
import { CamelStringToCapsString } from "../../../helpers/CamelStringToCapsString";

type MetaDataSelectBtnUIProps = {
  metaDataSelectorHandler: Function,
  value: string,
  activeMetaData: string
}

const MetaDataSelectBtnUI = ({
  metaDataSelectorHandler,
  value,
  activeMetaData,
}: MetaDataSelectBtnUIProps) => {
  return (
    <li
      className={`mar-r-5 pad-10 cursor-pointer has-font-weight gray-background ${value === activeMetaData && "active"
        }`}
      onClick={() => metaDataSelectorHandler(value)}
    >
      {CamelStringToCapsString(value)}
    </li>
  );
};

const MetaDataFieldsUI = ({ metaDataObj, articleViewHeight }: any) => {

  const { lowFont } = useAppSelector((state) => state.globalFontResizer);
  const metaDataTextWriter = (val: string, key: string) => {

    const unWrapArrayIntoString = (arraySet: any) => {
      let convertToStringArr: string[] = [];
      arraySet.forEach((element: { authorName: string }) => {
        convertToStringArr.push(element.authorName + ", ")
      });
      return convertToStringArr;
    }

    let metaDataVal: any;
    if (key === "authorList") {
      metaDataVal = unWrapArrayIntoString(metaDataObj[0][key])
      return metaDataVal
    } else {
      if (metaDataObj[0][key] === "") metaDataVal = "-"
      else metaDataVal = metaDataObj[0][key]
    }
    return metaDataVal
  }

  return (
    <div className="overflow-auto"
      style={{ maxHeight: articleViewHeight - 55 }}
    >
      {Object.keys(metaDataObj[0]).map((key, idx) => {
        return (
          <div className="no-margin row pad-t-15" key={idx}>
            <div className="col-md-2 no-padding">
              <p
                className="text-light-gray mar-b-10 font-change-animation"
                style={{ fontSize: lowFont }}
              >
                {CamelStringToCapsString(key)}
              </p>
            </div>
            <div className="col-md-10 no-padding">
              <p
                className="text-light-gray no-margin font-change-animation pad-10 has-border-radius-5 has-green-border"
                style={{ fontSize: lowFont }}
                contentEditable
                suppressContentEditableWarning={true}
                onInput={e => console.log('Text inside div', e.currentTarget.innerHTML)}
              >
                {metaDataTextWriter(metaDataObj[0][key], key)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

type MetaDataComponentProps = {
  activeArticle: any,
  articleViewHeight: number,
  metaDataCloseHandler: Function,
  advanceSearchAndFilterShowHandler: Function
}

type MetaDataComponentStateProps = {
  activeMetaDataSelector: string[],
  activeMetaData: string
}

export function MetaDataComponent({
  activeArticle,
  articleViewHeight,
  metaDataCloseHandler,
  advanceSearchAndFilterShowHandler
}: MetaDataComponentProps) {

  const { lowFont } = useAppSelector((state) => state.globalFontResizer);

  const [metaDataComponentState, setmetaDataComponentState] = useState<MetaDataComponentStateProps>({
    activeMetaDataSelector: [],
    activeMetaData: "studyData",
  });

  const metaDataSelectorHandler = (key: string) => {
    advanceSearchAndFilterShowHandler()
    if (metaDataComponentState["activeMetaDataSelector"].includes(key[0])) setmetaDataComponentState({
      ...metaDataComponentState,
      activeMetaDataSelector: [],
      activeMetaData: key,
    });
    else setmetaDataComponentState({
        ...metaDataComponentState,
        activeMetaDataSelector: [key[0]],
        activeMetaData: key,
      });
  };

  return (
    <div
      className="col-md-8"
      style={{ paddingRight: 0 }}
    >
      <ul
        className="d-flex no-padding mar-b-15 meta-data-options-box font-change-animation position-relative align-items-center"
        style={{ fontSize: lowFont }}
      >
        <MetaDataSelectBtnUI
          metaDataSelectorHandler={metaDataSelectorHandler}
          value={"studyData"}
          activeMetaData={metaDataComponentState["activeMetaData"]}
        />
        <MetaDataSelectBtnUI
          metaDataSelectorHandler={metaDataSelectorHandler}
          value={"studyLevelData"}
          activeMetaData={metaDataComponentState["activeMetaData"]}
        />
        <MetaDataSelectBtnUI
          metaDataSelectorHandler={metaDataSelectorHandler}
          value={"patientBaseline"}
          activeMetaData={metaDataComponentState["activeMetaData"]}
        />
        <MetaDataSelectBtnUI
          metaDataSelectorHandler={metaDataSelectorHandler}
          value={"interventions"}
          activeMetaData={metaDataComponentState["activeMetaData"]}
        />
        <MetaDataSelectBtnUI
          metaDataSelectorHandler={metaDataSelectorHandler}
          value={"outcomes"}
          activeMetaData={metaDataComponentState["activeMetaData"]}
        />
        <img
          onClick={() => metaDataCloseHandler(null, 0)}
          style={{ right: 0 }}
          className="cursor-pointer w-20 position-absolute"
          src="/images/cross-image.png"
          alt="Close..."
        />
      </ul>
      <MetaDataFieldsUI
        metaDataObj={activeArticle[metaDataComponentState["activeMetaData"]]}
        articleViewHeight={articleViewHeight}
      />
    </div>
  );
}
