import React from 'react'
import { ArticlesCountDisplayer } from '../../home/components/ArticlesCountDisplayer'
import { IrRelevantArticlesSearchSection } from '../components/IrRelevantArticlesSearchSection'
import { IrrelevantArticlesSection } from '../components/IrrelevantArticlesSection'

export function IrrelevantArticlesContainer({ innerHeight }: { innerHeight: number }) {

  const sourcesArr = [{ title: "Pubmed", range: "30%", color: "#FCD560" }, { title: "Embase", range: "10%", color: "#A4CC89" }, { title: "Embase", range: "5%", color: "#2B32BC" }, { title: "Embase", range: "15%", color: "#A4CC89" }, { title: "GoogleScholar", range: "30%", color: "#8AA4D7" }, { title: "Embase", range: "10%", color: "#A4CC89" }]

  return (
    <>
      <IrRelevantArticlesSearchSection />
      <div className="white-background pad-15 overflow-auto" style={{ height: innerHeight - 135 }}>
        <ArticlesCountDisplayer sourcesArr={sourcesArr} />
        <IrrelevantArticlesSection />
      </div>
    </>
  )
}
