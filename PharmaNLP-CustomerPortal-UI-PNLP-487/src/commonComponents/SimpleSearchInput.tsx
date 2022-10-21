import React,{useEffect} from 'react'

export function SimpleSearchInput({
    simpleSearchHandler,
    fullArticleFetchHandler,
    searchKeyWordChangeHandler,
    searchKeyWord
}: {
    simpleSearchHandler: Function,
    fullArticleFetchHandler: Function,
    searchKeyWordChangeHandler: Function,
    searchKeyWord : string
}) {

    const userEnteredKeyWordHandler = (keyWord: string) => searchKeyWordChangeHandler(keyWord);


    useEffect(()=>{
        const delaytime=setTimeout(()=>{
            if(searchKeyWord!=="")
            {
                simpleSearchHandler()
            }
            else{
                fullArticleFetchHandler()
            }
        },750)
        return()=>{
            clearTimeout(delaytime)
    
        }
    
    },[searchKeyWord])
    return (
        <div className="position-relative">
            <input placeholder="Basic Search" className="search-field basic-search-field mar-l-15 mar-r-15" 
            onChange={(e) => userEnteredKeyWordHandler(e.target.value)} 
            />
            <img
                src="/images/search-image.png"
                className="position-absolute w-20 cursor-pointer"
                style={{ right: 25, top: 12 }}
                alt="Search..."
                onClick={() => simpleSearchHandler()}
            />
        </div>
    )
}
