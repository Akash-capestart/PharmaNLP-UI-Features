import React from 'react'
import { IrrelevantArticles } from '../../../IrrelevantArticles';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { addIrRelevantArticlesToSelected } from '../../../redux/reducers/IrrelevantArticlesSlice';

export function IrrelevantArticlesLists({ articlesExpand }: { articlesExpand: boolean }) {

    const { midFont, lowFont } = useAppSelector((state) => state.globalFontResizer);
    const { selectedArticles } = useAppSelector((state) => state.irRelevantArticlesDetails);
    const dispatch = useAppDispatch()

    const articleSelectHandler = (val: string) => { // helps to select the articles by the user    
        if (selectedArticles.includes(val)) {
            const notValArr = selectedArticles.filter(
                (each) => each !== val
            );
            dispatch(addIrRelevantArticlesToSelected(notValArr))
        } else dispatch(addIrRelevantArticlesToSelected([
            ...selectedArticles,
            val
        ]))
    };

    return (
        <>
            {IrrelevantArticles["data"].map((article: any, idx: number) => {
                return (
                    <div
                        key={idx}
                        className="has-green-border-bottom pad-15"
                    >
                        <>
                            <div className='d-flex align-items-center mar-b-15'>
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
                                    className="has-font-weight font-change-animation w-90per no-margin pad-l-15"
                                    style={{ fontSize: midFont }}
                                >
                                    {article.title} irre
                                    
                                </p>
                                <p className='w-10per text-end has-font-weight text-dark-gray no-margin'>{article.publicationYear}</p>
                            </div>
                            <p
                                className="text-dark-gray no-margin article-content-view font-change-animation accordian-height-animation"
                                style={{ fontSize: lowFont }}
                            >
                                <span className="has-font-weight text-black">
                                    Introduction :{" "}
                                </span>
                                {articlesExpand ? article.abstractData : `${article.abstractData.substring(0, 250)}...`}
                            </p>
                            <div className='mar-b-15'>
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
                            </div>
                            <div className="pad-15 pale-green-background has-border-radius-5 mar-l-15 mar-r-15">
                                <p className="text-green no-margin has-font-weight font-change-animation" style={{ fontSize: lowFont }}>REASON FOR EXCLUSION</p>
                                {Object.keys(article["reasonForExclusion"]).map((obj: any, idx: number) => {
                                    return (
                                        <div key={idx}>
                                            <p className="no-margin font-change-animation has-font-weight" style={{ fontSize: lowFont }}>
                                                <span className='text-uppercase'>{obj}</span>
                                                <span>{" : "}{article["reasonForExclusion"][obj]}</span></p>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    </div>
                )
            })}
        </>
    )
}
