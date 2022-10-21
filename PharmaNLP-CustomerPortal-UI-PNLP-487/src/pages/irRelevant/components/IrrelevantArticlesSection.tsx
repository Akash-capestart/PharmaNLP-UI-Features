import React, { useState } from 'react'
import { SelectAllArticleCircleUI } from '../../../commonComponents/SelectAllArticleCircleUI'
import { ArticleViewButtonSection } from '../../home/components/ArticleViewButtonSection'
import { IrrelevantArticlesLists } from './IrrelevantArticlesLists'
import { IrrelevantArticles } from '../../../IrrelevantArticles'
import { useAppDispatch } from '../../../redux/Hooks'
import { addIrRelevantArticlesToSelected } from '../../../redux/reducers/IrrelevantArticlesSlice'
import IrRelevantArticlesDropDownSection from './IrRelevantArticlesDropDownSection'

export function IrrelevantArticlesSection() {

    const [articlesExpand, setarticlesExpand] = useState<boolean>(false);

    const articlesExpandHandler = () => setarticlesExpand(prevVal => !prevVal); // it helps to exand all articles while the user clicks the expand btn!!!
    
    const dispatch = useAppDispatch()

    // select all articles logics

    const selectAllArticlesHandler = (mode: string) => {
        let allArticlesRefIdArr: any[] = []
        IrrelevantArticles["data"].forEach((article: any, idx: number) => {
            allArticlesRefIdArr.push(article.refId)
        })
        if (mode === "selectAll") dispatch(addIrRelevantArticlesToSelected(allArticlesRefIdArr))
        else dispatch(addIrRelevantArticlesToSelected([]))        
    }

    const allArticlesSelectedState = () => false;

    return (
        <>
            <div className='mar-t-15 has-green-border-bottom d-flex align-items-center justify-content-between'>
                <div className="d-flex align-items-center justify-content-start">
                    <SelectAllArticleCircleUI selectAllArticlesHandler={selectAllArticlesHandler} allArticlesSelected={allArticlesSelectedState()} />
                    <ArticleViewButtonSection
                        articlesExpandHandler={articlesExpandHandler}
                        expandBtnShow={false}
                    />
                </div>
                <div className="d-flex align-items-center justify-content-end">
                    <IrRelevantArticlesDropDownSection />
                </div>
            </div>
            <IrrelevantArticlesLists articlesExpand={articlesExpand} />
        </>
    )
}
