import React, { useState } from "react";
import { SearchSectionWithYearSelectComponent } from "../../../commonComponents/SearchSectionWithYearSelectComponent";

export function IrRelevantArticlesSearchSection() {

  //simple search logics

  const [simpleSearchKey, setsimpleSearchKey] = useState<string>("");

  const searchKeyWordChangeHandler = (keyWord: string) => setsimpleSearchKey(keyWord);

  const simpleSearchHandler = async () => console.log("search by keyword api call comes here...");

  const fullArticleFetchHandler = async () => console.log("all articles api call comes here...");

  return (
    <div className="search-box align-items-center h-50px">
      <div className="d-flex align-items-center justify-content-start">
        <SearchSectionWithYearSelectComponent
          simpleSearchHandler={simpleSearchHandler}
          fullArticleFetchHandler={fullArticleFetchHandler}
          searchKeyWordChangeHandler={searchKeyWordChangeHandler}
          searchKeyWord={simpleSearchKey}
        />        
      </div>
    </div>
  );
}
