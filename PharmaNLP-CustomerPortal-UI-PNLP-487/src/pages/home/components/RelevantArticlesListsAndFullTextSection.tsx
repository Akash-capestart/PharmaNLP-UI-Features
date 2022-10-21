import React, { useState, useEffect, useCallback } from "react";
import { ArticleViewButtonSection } from "./ArticleViewButtonSection";
import { RelevantArticlesListsSection } from "./RelevantArticlesListsSection";
import { FullTextViewSection } from "./FullTextViewSection";
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks";
import { addRelevantActiveArticle, addRelevantArticlesToSelected } from "../../../redux/reducers/RelevantArticlesSlice";
import { setsideBarPinned } from "../../../redux/reducers/NavBarCollapseSlice";
// import { NewArticles } from "../../../NewArticles";
import { SelectAllArticleCircleUI } from "../../../commonComponents/SelectAllArticleCircleUI";
import RelevantArticlesDropDownSection from "./RelevantArticlesDropDownSection";
import { RelevantArticlesSectionLoader } from "./RelevantArticlesSectionLoader";
import { ArticlesCountDisplayer } from "./ArticlesCountDisplayer";

type RelevantArticlesListsAndFullTextSectionSectionProps = {
  articleViewHeight: number,
  advanceSearchAndFilterShowHandler: Function
  scrollToTopHandler: Function
}

export function RelevantArticlesListsAndFullTextSection({
  articleViewHeight,
  advanceSearchAndFilterShowHandler,
  scrollToTopHandler
}: RelevantArticlesListsAndFullTextSectionSectionProps) {

  const dispatch = useAppDispatch()
  const { articles, articleViewContainerLoading, activeArticle, activeArticleId, selectedArticles } = useAppSelector((state) => state.relevantArticlesDetails)
  const { lowFont } = useAppSelector((state) => state.globalFontResizer)
  const { sideBarPinned } = useAppSelector((state) => state.navBarPinnedDetails)

  const [currentPageArticlesRefIdArr, setcurrentPageArticlesRefIdArr] = useState<string[]>([])
  const [fullTextShow, setfullTextShow] = useState<boolean>(true);
  const [articlesExpand, setarticlesExpand] = useState<boolean>(false);
  const [isrecentlyadded,setisrecentlyadded]=useState<boolean>(false)

  const refIdTakeOfThisPageArticlesHandler = useCallback(async () => { // this functions articlesRefIdArr is used for the select all and deselect articles option
    let articlesRefIdArr: any = []
    articles.forEach((article: any) => {
      articlesRefIdArr.push(article.refId)
    });
    // NewArticles["data"].forEach((article: any) => {
    //   articlesRefIdArr.push(article.refId)
    // });
    setcurrentPageArticlesRefIdArr(articlesRefIdArr)
  }, [articles])

  useEffect(() => {
    refIdTakeOfThisPageArticlesHandler()
  }, [refIdTakeOfThisPageArticlesHandler])

  const metaDataClickHandler = () => setfullTextShow(prevVal => !prevVal); // helps to toggle between full text and meta data view

  const articleSelectHandler = (val: string) => { // helps to select the articles by the user    
    if (selectedArticles.includes(val)) {
      const notValArr = selectedArticles.filter(
        (each) => each !== val
      );
      dispatch(addRelevantArticlesToSelected(notValArr))
    } else dispatch(addRelevantArticlesToSelected([
      ...selectedArticles,
      val
    ]))
  };

  const articlesExpandHandler = () => setarticlesExpand(prevVal => !prevVal) // it helps to exand all articles while the user clicks the expand btn!!!

  const singleArticleClickHandler = (id: number | null) => { // executed while the user clicks the article title and in full text view, also this function will executed while clicking close article icon!!!
    if (!sideBarPinned) dispatch(setsideBarPinned(true))
    advanceSearchAndFilterShowHandler()                      // this will collapse advance search or filter component if it is opened and soll the scrollToTopRef in the ArticleViewContainer    
    dispatch(addRelevantActiveArticle({ activeArticle: id ? articles["data"].filter((each: any) => each.refId === id) : null, activeArticleId: id }))
    // dispatch(addRelevantActiveArticle({ activeArticle: id ? NewArticles["data"].filter((each: any) => each.refId === id) : null, activeArticleId: id }))
  };

  //select all articles logics

  const requiredRefIdArrMakeHandler = () => {
    let refIdArr: string[] = []
    selectedArticles.forEach((refId: string) => {
      let refIdIndex = currentPageArticlesRefIdArr.indexOf(refId)
      if (refIdIndex === -1) refIdArr.push(refId);
    })
    return refIdArr
  }

  const selectAllArticlesHandler = (mode: string) => {
    if (mode === "selectAll") {
      const refIdArr = requiredRefIdArrMakeHandler()
      dispatch(addRelevantArticlesToSelected(refIdArr.concat(currentPageArticlesRefIdArr)))
    }
    else {
      const refIdArr = requiredRefIdArrMakeHandler()
      dispatch(addRelevantArticlesToSelected(refIdArr))
    }
  }

  const allArticlesSelectedStatus = () => {  //to give true or false to the allArticlesSelected prop 
    let matchRefIdCount: number = 0
    selectedArticles.forEach((refId: any) => {
      let refIdIndex = currentPageArticlesRefIdArr.indexOf(refId)
      if (refIdIndex > -1) matchRefIdCount++
    });
    if ((currentPageArticlesRefIdArr.length > 0) && (matchRefIdCount === currentPageArticlesRefIdArr.length)) return true
    else return false
  }

  // console.log("isrecentlyadded",isrecentlyadded)

  const sourcesArr = [{ title: "Pubmed", range: "50%", color: "#FCD560" }, 
  { title: "Embase", range: "10%", color: "#A4CC89"}, 
  { title: "Embase", range: "5%", color: "#2B32BC" },
   { title: "Embase", range: "15%", color: "#A4CC89", },
    { title: "GoogleScholar", range: "30%", color: "#8AA4D7", },
     { title: "Embase", range: "10%", color: "#A4CC89",}]

  return (
    <>
      {articles && !articleViewContainerLoading ?
        <>
          {articles["data"].length > 0 ?
            <>
              <ArticlesCountDisplayer sourcesArr={sourcesArr} />
              <div className="d-flex justify-content-between has-green-border-bottom align-items-center mar-t-15">
                <div className="d-flex align-items-center justify-content-start">
                  <SelectAllArticleCircleUI selectAllArticlesHandler={selectAllArticlesHandler} allArticlesSelected={allArticlesSelectedStatus()} />
                  <ArticleViewButtonSection
                    articlesExpandHandler={articlesExpandHandler}
                    expandBtnShow={activeArticleId ? true : false}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-end">
                  <RelevantArticlesDropDownSection isrecentlyadded={isrecentlyadded} setisrecentlyadded={setisrecentlyadded}/>
                  {activeArticleId && (
                    <div className="mar-l-15">
                      <ul
                        className="meta-data-selector cursor-pointer d-flex has-font-weight font-change-animation"
                        style={{ fontSize: lowFont }}
                        onClick={() => metaDataClickHandler()}
                      >
                        <li className={!fullTextShow ? "active" : ""}>Meta Data</li>
                        <li className={fullTextShow ? "active" : ""}>Full Text</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {!activeArticleId ? (
                <RelevantArticlesListsSection                  
                  articles={articles["data"]}
                  articlesExpand={articlesExpand}
                  selectedArticles={selectedArticles}
                  articleSelectHandler={articleSelectHandler}
                  singleArticleClickHandler={singleArticleClickHandler}
                  scrollToTopHandler={scrollToTopHandler}
                  isrecentlyadded={isrecentlyadded}
                />
              ) : (
                <FullTextViewSection
                  articleViewHeight={articleViewHeight}                  
                  articles={articles["data"]}
                  activeArticleId={activeArticleId}
                  activeArticle={activeArticle[0]}
                  selectedArticles={selectedArticles}
                  fullTextShow={fullTextShow}
                  articleSelectHandler={articleSelectHandler}
                  singleArticleClickHandler={singleArticleClickHandler}
                  advanceSearchAndFilterShowHandler={advanceSearchAndFilterShowHandler} // this function is drilled as prop to metaDataComponent for the following one, 
                />                                                                        // this will collapse advance search or filter component if it is opened while clicking meta data selectors and soll the scrollToTopRef in the ArticleViewContainer 
              )}
            </> :
            <div className="d-flex align-items-center justify-content-center h-100">
              <img src="images/no-result-found-image.png" alt="No Result..." /><p className="no-margin pad-l-15">No Result!!!</p>
            </div>}
        </> :
        <div className="w-100">
          <RelevantArticlesSectionLoader />
        </div>
      }
    </>
  );
}
