import React, { useState } from "react";
import { fetchAllRelevantArticles, fetchRelevantArticlesByKeyWords } from "../../../redux/actions/RelevantArticlesActions";
import { useAppDispatch } from "../../../redux/Hooks";
import { addRelevantSearchKeyWord } from "../../../redux/reducers/RelevantArticlesSlice";
import { SearchSectionWithYearSelectComponent } from "../../../commonComponents/SearchSectionWithYearSelectComponent";
import { addRelevantArticlesToSelected } from "../../../redux/reducers/RelevantArticlesSlice";

export function RelevantArticlesSearchSection() {

  const dispatch = useAppDispatch()  

  //simple search logics

  const [simpleSearchKey, setsimpleSearchKey] = useState<string>("");

  const searchKeyWordChangeHandler = (keyWord: string) => setsimpleSearchKey(keyWord);

  const simpleSearchHandler = async () => {
    dispatch(addRelevantArticlesToSelected([]))
    dispatch(addRelevantSearchKeyWord({ searchKeyWord: simpleSearchKey }))
    dispatch(fetchRelevantArticlesByKeyWords({ endUrl: `/article/getArticlesByVal?value=${simpleSearchKey}&page=0` }))
  }

  const fullArticleFetchHandler = async () => {
    dispatch(addRelevantArticlesToSelected([]))
    dispatch(addRelevantSearchKeyWord({ searchKeyWord: null }))
    dispatch(fetchAllRelevantArticles({ endUrl: "/article/getAllArticles?page=0" }))
  }

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
