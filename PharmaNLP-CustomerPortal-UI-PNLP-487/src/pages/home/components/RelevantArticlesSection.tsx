import React, { useRef, useEffect, useCallback } from "react";
import { fetchAllRelevantArticles } from "../../../redux/actions/RelevantArticlesActions";
import { useAppSelector, useAppDispatch } from "../../../redux/Hooks";
import { setActiveContent, setContentRefHeight, setCurrentTogglerToFilterOrAdvanceSearch } from "../../../redux/reducers/FilterAndAdvanceSearchTogglerSlice";
import { AdvanceSearchComponent } from "./AdvanceSearchComponent";
import { RelevantArticlesListsAndFullTextSection } from "./RelevantArticlesListsAndFullTextSection";
import { FilteringComponent } from "./FilteringComponent";

export function RelevantArticlesSection({ innerHeight }: { innerHeight: number }) {

  const dispatch = useAppDispatch()  
  const { advanceSearchContentHeight, filteringContentHeight, activeContent, howMuchToScrollTop, scrollBehaviour } = useAppSelector((state) => state.filerAndAdvanceSearchTogglerDetails);

  const scrollToTopHandler = useCallback((howMuchScrollTheRefToTop: number, scrollBehaviour: string) => {
    if (scrollBehaviour === "smooth") setTimeout(() => scrollHandler(howMuchScrollTheRefToTop, scrollBehaviour), 400); // this condition is used to delay the scrolling or the scrollToTopRef won't fully scrolled!!
    else scrollHandler(howMuchScrollTheRefToTop, scrollBehaviour);
  }, []);

  const scrollHandler = (howMuchScrollTheRefToTop: number, scrollBehaviour: string) => scrollToTopRef.current.scrollTo({
    top: howMuchScrollTheRefToTop,
    behavior: scrollBehaviour,
  });

  useEffect(() => {
    console.log("2)     **********useeffect running*************")
    dispatch(setContentRefHeight({ filteringContentRefHeight: filteringContentRef.current.scrollHeight, advanceSearchContentRefHeight: advanceSearchContentRef.current.scrollHeight }))
    scrollToTopHandler(howMuchToScrollTop, scrollBehaviour)
    console.log(activeContent)
    if (activeContent === "") { // this condition is used to fetch the getAllArticles on starting only not after every render... 
      console.log("2)     %%%%%%%%%%%%%%% api call happening %%%%%%%%%%%%%%%%%%%%%%%%%", "(" + activeContent + ")")
      dispatch(fetchAllRelevantArticles({ endUrl: "/article/getAllArticles?page=0" }))
      dispatch(setActiveContent({ activeContent: "advanceSearchShow" }))
    }
  }, [dispatch, scrollToTopHandler, howMuchToScrollTop, scrollBehaviour, activeContent, advanceSearchContentHeight, filteringContentHeight])

  const advanceSearchContentRef = useRef<HTMLDivElement>(null!);
  const filteringContentRef = useRef<HTMLDivElement>(null!);
  const scrollToTopRef = useRef<HTMLDivElement | any>(null!);

  const advanceSearchAndFilterShowHandler = ( // used to toggle and collapse the advance search and filter UI!!!
    key: string,
    howMuchScrollTheRefToTop: number,
    scrollBehaviour: string
  ) => {
    if (key === "advanceSearchShow") dispatch(setCurrentTogglerToFilterOrAdvanceSearch({
      activeContent: key,
      advanceSearchContentHeight: 0,
      filteringContentHeight: 0,
      howMuchToScrollTop: howMuchScrollTheRefToTop,
      scrollBehaviour: scrollBehaviour,
    }))
    else if (key === "filteringShow") dispatch(setCurrentTogglerToFilterOrAdvanceSearch({
      activeContent: key,
      advanceSearchContentHeight: 0,
      filteringContentHeight: 0,
      howMuchToScrollTop: howMuchScrollTheRefToTop,
      scrollBehaviour: scrollBehaviour,
    }))
    scrollToTopHandler(howMuchScrollTheRefToTop, scrollBehaviour);
  };

  const collapseHandler = () => { // this function helps to find the which one is toggled? advance search or filter content!!!
    let toCollapse;
    if (advanceSearchContentHeight === 0 && filteringContentHeight === 0) toCollapse = "";
    else toCollapse = advanceSearchContentHeight !== 0 ? "advanceSearchShow" : "filteringShow";
    return toCollapse;
  };  

  return (
    <>
      <div
        className="overflow-auto"
        style={{ height: innerHeight - 135 }}
        ref={scrollToTopRef}
      >
        <div
          ref={advanceSearchContentRef}
          className="smooth-height-animation"
          style={{
            height: advanceSearchContentHeight,
          }}
        >
          <AdvanceSearchComponent
            advanceSearchAndFilterShowHandler={() => advanceSearchAndFilterShowHandler(activeContent, 0, "smooth")}
          />
        </div>
        <div
          ref={filteringContentRef}
          className="smooth-height-animation"
          style={{
            height: filteringContentHeight,
          }}
        >
          <FilteringComponent
            advanceSearchAndFilterShowHandler={() => advanceSearchAndFilterShowHandler(activeContent, 0, "smooth")}
          />
        </div>        
        <div className="pad-15 h-100">
          <RelevantArticlesListsAndFullTextSection
            articleViewHeight={innerHeight - 135}
            advanceSearchAndFilterShowHandler={() => advanceSearchAndFilterShowHandler(collapseHandler(), 110, "smooth")}
            scrollToTopHandler={scrollToTopHandler}
          />
        </div>        
      </div>
    </>
  );
}
