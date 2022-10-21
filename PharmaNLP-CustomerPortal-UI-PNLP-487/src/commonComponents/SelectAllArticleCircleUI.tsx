import React from 'react'

export function SelectAllArticleCircleUI({ selectAllArticlesHandler, allArticlesSelected }: { selectAllArticlesHandler: Function, allArticlesSelected: boolean }) {

    const selectAllArticlesClickHandler = (mode: string) => selectAllArticlesHandler(mode);

    return (
        <>
            {!allArticlesSelected ? (
                <>
                    <img
                        className="w-20 cursor-pointer"
                        src="/images/selectable-image.png"
                        onClick={() => selectAllArticlesClickHandler("selectAll")}
                        alt="Selectable..."
                    /><span className="low-font has-font-weight text-dark-gray pad-l-5">All</span>
                </>

            ) : (
                <>
                    <img
                        className="w-20 cursor-pointer"
                        src="/images/circle-selected-image.png"
                        onClick={() => selectAllArticlesClickHandler("deSelectAll")}
                        alt="Selectable..."
                    /><span className="low-font has-font-weight text-dark-gray pad-l-5">All</span>
                </>
            )}
        </>
    )
}
