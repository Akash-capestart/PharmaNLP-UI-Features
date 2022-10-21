import React, { useState } from "react";
import { useAppSelector } from "../../../redux/Hooks";
import { MoveToFolderModal } from "./MoveToFolderModal";
import { Button } from "../../../commonComponents/Button";

type ArticleViewButtonSectionProps = {
  articlesExpandHandler: (event: React.MouseEvent<HTMLDivElement>) => void,    
  expandBtnShow: boolean,  
}

export function ArticleViewButtonSection({
  articlesExpandHandler,    
  expandBtnShow,  
}: ArticleViewButtonSectionProps) {

  const { lowFont } = useAppSelector((state) => state.globalFontResizer);

  const [moveToFolderModalShow, setmoveToFolderModalShow] = useState<boolean>(false);

  const moveToFolderModalShowHandler = () => setmoveToFolderModalShow(prevVal => !prevVal);

  return (
    <div className="d-flex align-items-center justify-content-between pad-b-5 article-view-head-height">
      <div className="d-flex align-items-center position-relative">
        <Button
          hasExtraPad={false}
          text={"Move To Folder"}
          upperCaseText={false}
          btnHasRadius={true}
          btnHasImg={true}
          btnClickHandler={moveToFolderModalShowHandler}
          fontSize={lowFont}
          imgUrl={"./images/folder-image.png"}
          loadingCase={false}
          isLoading={false}
          hasMarginLeft={true}
          textCenter={false}
        />
        {moveToFolderModalShow && (
          <MoveToFolderModal closeModalHandler={moveToFolderModalShowHandler} />
        )}
        {!expandBtnShow && (
          <Button
            hasExtraPad={false}
            text={"Expand All"}
            upperCaseText={false}
            btnHasRadius={true}
            btnHasImg={true}
            btnClickHandler={articlesExpandHandler}
            fontSize={lowFont}
            imgUrl={"./images/expand-image.png"}
            loadingCase={false}
            isLoading={false}
            hasMarginLeft={true}
            textCenter={false}
          />
        )}
        <Button
          hasExtraPad={false}
          text={"Export"}
          upperCaseText={false}
          btnHasRadius={true}
          btnHasImg={true}
          btnClickHandler={articlesExpandHandler}
          fontSize={lowFont}
          imgUrl={"./images/export-image.png"}
          loadingCase={false}
          isLoading={false}
          hasMarginLeft={true}
          textCenter={false}
        />
      </div>      
    </div>
  );
}
