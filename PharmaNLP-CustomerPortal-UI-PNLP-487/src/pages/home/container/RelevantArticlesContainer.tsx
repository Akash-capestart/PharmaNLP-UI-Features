import React from "react";
import { RelevantArticlesSearchSection } from "../components/RelevantArticlesSearchSection";
import { AdvanceSearchAndFilterBtnSection } from "../components/AdvanceSearchAndFilterBtnSection";
import { RelevantArticlesSection } from "../components/RelevantArticlesSection";
import { RelevantArticlesModalBtnSection } from "../components/RelevantArticlesModalBtnSection";

export function RelevantArticlesContainer({ innerHeight }: { innerHeight: number }) { 

  return (
    <>
      <div className="row no-margin align-items-center">
        <div className="col-md-6 no-padding">
          <RelevantArticlesSearchSection />
        </div>
        <div className="col-md-6 no-padding">
          <div className="d-flex justify-content-end">
            <AdvanceSearchAndFilterBtnSection />
            <RelevantArticlesModalBtnSection />
          </div>
        </div>
      </div>
      <div className="white-background">
        <RelevantArticlesSection innerHeight={innerHeight} />
      </div>
    </>
  );
}
