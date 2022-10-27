import React, { useState, useEffect } from "react";
import { fetchAllRelevantArticles, fetchRelevantArticlesByKeyWords } from "../../../redux/actions/RelevantArticlesActions";
import { useAppSelector, useAppDispatch } from "../../../redux/Hooks";
import { addRelevantActivePageNumber,addSortedArticle } from "../../../redux/reducers/RelevantArticlesSlice";
import { Pagination } from "../../../commonComponents/Pagination";

import { Collapse } from '@mui/material';

type RelevantArticlesListsSectionProps = {
  articles: any,
  selectedArticles: string[],
  articlesExpand: boolean,
  articleSelectHandler: Function,
  singleArticleClickHandler: Function,
  scrollToTopHandler: Function,
  isrecentlyadded:boolean
}

export function RelevantArticlesListsSection({
  articles,
  selectedArticles,
  articlesExpand,
  articleSelectHandler,
  singleArticleClickHandler,
  scrollToTopHandler,
  isrecentlyadded
}: RelevantArticlesListsSectionProps) {

  const dispatch = useAppDispatch()
  const { midFont, lowFont } = useAppSelector((state) => state.globalFontResizer);
  const [tags, settags] = useState(["Adverse Events", "D1,A1,P1,R1", "Relevant", "Irrelevant", "No Match", "Adverse Events", "D1,A1,P1,R1", "Relevant", "Irrelevant", "No Match"])  
  
  useEffect(() => {
    const objReModHandler = () => {
      let initObj: any = []
      articles.forEach((element: any) => {
        let newObj = { ...element };
        newObj["tags"] = tags
        initObj.push(newObj)
      });
      setnewObj(initObj)
    }
    objReModHandler()
    
  }, [tags, articles])
  const [newObj, setnewObj] = useState<any>(null)
  const [activeIdToAddTag, setactiveIdToAddTag] = useState<number | null>(null)
  const [enteredInputTag, setenteredInputTag] = useState<string>("")

  const tagShowHandler = (refId: number) => setactiveIdToAddTag(refId);

  const enterKeyPressHandler = (userPressedKey: React.KeyboardEvent<HTMLElement>, refId: number) => {
    if (userPressedKey.key === "Enter") tagSetHandler(refId);
  }

  const tagSetHandler = (refId: number) => {
    if (enteredInputTag !== "") {
      const newArr = [...newObj]
      newArr.forEach((each, idx) => {
        if (each.refId === refId) {
          const newTags = [enteredInputTag, ...each.tags]
          newArr[idx].tags = newTags
        }
      })
      setnewObj(newArr)
      setenteredInputTag("")
      setactiveIdToAddTag(null)
    } else alert("Tag Field is empty!.")  
  }

  const tagInputChangeHandler = (tagName: string) => setenteredInputTag(tagName);

  const tagInputHideHandler = () => setactiveIdToAddTag(null);

  // pagination logics starts here this is kept in pagination's parent component because by this the pagination componenet can be reused on any other components

  const { activePage, searchKeyWord } = useAppSelector((state) => state.relevantArticlesDetails)
  const totalArticlesCount = 200

  const pageChangeArticlesFetchHandler = async (pageNo: number) => {
    if (pageNo === activePage) scrollToTopHandler(110, "smooth");
    else {
      scrollToTopHandler(0, "auto");
      dispatch(addRelevantActivePageNumber({ activePage: pageNo }));
      if (searchKeyWord) dispatch(fetchRelevantArticlesByKeyWords({ endUrl: `/article/getArticlesByVal?value=${searchKeyWord}&page=${pageNo}` }));
      else dispatch(fetchAllRelevantArticles({ endUrl: `/article/getAllArticles?page=${pageNo}` }));
    }
  }

  return (
    <>
      {newObj && newObj 
      .map((article: any, idx: number) => {      
        return (
          <div
            key={idx}
            className="row no-margin has-green-border-bottom pad-15"
          >
            <div style={{display:"flex",marginBottom:"15px"}} >
            <div style={{height:"8px",width:"15px",backgroundColor:"purple"}}>    </div>
            <div style={{height:"8px",width:"15px",backgroundColor:"green"}}>    </div>
            <div style={{height:"8px",width:"15px",backgroundColor:"yellow"}}>    </div>
            </div>
            <div className="col-md-10 no-padding">
              <div className="d-flex align-items-center">
                <div className="cursor-pointer">
                  {selectedArticles.includes(article.refId) ? (
                    <img
                      className="w-20"
                      src="/images/circle-selected-image.png"
                      onClick={() => articleSelectHandler(article.refId)}
                      alt="Selectable..."
                    />
                  ) : (
                    <img
                      className="w-20"
                      src="/images/selectable-image.png"
                      onClick={() => articleSelectHandler(article.refId)}
                      alt="Selectable..."
                    />
                  )}
                </div>
                <p
                  className="no-margin has-font-weight cursor-pointer pad-horizontal-15 font-change-animation"
                  style={{ fontSize: midFont }}
                  onClick={() =>
                    singleArticleClickHandler(article.refId)
                  }
                >
                  {article.title}
                </p>
              </div>
              <div 
              >
                <p
                  className="no-margin text-dark-gray article-content-view font-change-animation"
                  style={{ fontSize: lowFont }}
                >
                  <span className="has-font-weight text-black">
                    Introduction :{" "}
                  </span>
                  {
                    articlesExpand?
                    <Collapse in={articlesExpand}>
                    {/* {articlesExpand ? article.abstractData : `${article.abstractData.substring(0, 250)}...`} */}
                    {article.abstractData}
                    </Collapse>:
                   `${article.abstractData.substring(0, 350)}...`
                  }
                  <Collapse in={articlesExpand}>
                  {/* {articlesExpand ? article.abstractData : `${article.abstractData.substring(0, 250)}...`} */}
                  {article.abstractData}
                  </Collapse>
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <a href={article.fullTextUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <span
                    className="text-green has-font-weight cursor-pointer font-change-animation"
                    style={{
                      fontSize: lowFont,
                      paddingLeft: 50,
                    }}
                  >
                    View Source...
                  </span>
                </a>
                <span
                  className="text-dark-gray font-change-animation"
                  style={{ fontSize: midFont }}
                >
                  {article["publicationYear"]}
                </span>
              </div>
            </div>
            <div className="col-md-2 no-padding">
              <div className="d-flex align-items-center justify-content-center mar-b-15 h-30">
                {activeIdToAddTag === article.refId ?
                  <>
                    <div className="position-relative pad-r-10 btn-width-animation">
                      <input placeholder="Add Tag" className="tag-add-input-active w-100" onChange={(e) => tagInputChangeHandler(e.target.value)} onKeyDown={(e) => enterKeyPressHandler(e, article.refId)} />
                      {activeIdToAddTag === article.refId &&
                        <img src="images/cross-image.png" alt="Cancel..." className="w-15 position-absolute add-tag-close-icon cursor-pointer" onClick={() => tagInputHideHandler()} />
                      }
                    </div>
                    <img
                      className="w-15 cursor-pointer"
                      src="/images/plus-image.png"
                      alt="Cloud..."
                      onClick={() => tagSetHandler(article.refId)}
                    />
                  </> :
                  <>
                    <img
                      className="w-15 cursor-pointer"
                      src="/images/plus-image.png"
                      alt="Cloud..."
                      onClick={() => tagShowHandler(article.refId)}
                    /><span
                      className="text-dark-gray font-change-animation pad-l-10 cursor-pointer"
                      style={{ fontSize: midFont }}
                      onClick={() => tagShowHandler(article.refId)}
                    >
                      Add Tag
                    </span>
                  </>
                }
              </div>
              <div
                className="overflow-auto "
                style={{
                  maxHeight: articlesExpand
                    ? ""
                    : 85
                }}
              >
                {article.tags
                .map((each: any, idx: number) => {                
                  return (
                    <div key={idx}>
                      <p
                        className="w-75 text-center m-auto text-dark-gray adverse-article-status has-font-weight font-change-animation"
                        style={{ fontSize: lowFont }}
                      >
                        {each}
                      </p>
                      <div className="h-15"></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        );
      })}
      <Pagination 
        activePage={activePage}
        totalArticlesCount={totalArticlesCount}         
        pageChangeArticlesFetchHandlerFromProp={pageChangeArticlesFetchHandler}
      />
    </>
  );
}
