import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllRelevantArticles, fetchRelevantArticlesByKeyWords } from "../actions/RelevantArticlesActions"

type InitialStateProps = {
    articles: null | any, 
    activeArticle : null | any,
    activeArticleId : null | any,
    selectedArticles: string[],
    activePage : number,
    searchKeyWord : null | string,
    articleViewContainerLoading : boolean
}

const initialState: InitialStateProps = {
    articles: null,     
    activeArticle : null,
    activeArticleId : null,
    selectedArticles : [],
    activePage : 0,
    searchKeyWord : null,
    articleViewContainerLoading : false
}

const ArticlesSlice = createSlice({
    name: "articlesSlice",
    initialState,
    reducers: {
        removeRelevantArticles: (state) => {
            return {
                ...state,
                articles: null, 
                activePage : 0               
            }
        },
        addRelevantActiveArticle : (state,action : PayloadAction<any>) => {
            return {
                ...state,
                activeArticle : action["payload"]["activeArticle"],
                activeArticleId : action["payload"]["activeArticleId"]
            }
        },

        addSortedArticle : (state,action : PayloadAction<any>) => {     // for sorting the articles indescending order
            console.log("payload",action["payload"])
            return {
                ...state,
                articles : action["payload"],
            }
        },

        addRelevantActivePageNumber : (state,action : PayloadAction<any>) => {
            return {
                ...state,
                activePage : action["payload"]["activePage"]
            }
        },
        addRelevantSearchKeyWord : (state,action : PayloadAction<any>) => {
            return {
                ...state,
                searchKeyWord : action["payload"]["searchKeyWord"],
                activePage : 0
            }
        }, 
        addRelevantArticlesToSelected : (state,action : PayloadAction<any>) => {
            return {
                ...state,
                selectedArticles : action["payload"]
            }
        }
    },
    extraReducers: (builder) => {

        //fetchAllRelevantArticles action!!!

        builder.addCase(fetchAllRelevantArticles.pending, (state, action: PayloadAction<any>) => {            
            state.articleViewContainerLoading = true
        })
        builder.addCase(fetchAllRelevantArticles.fulfilled, (state, action: PayloadAction<any>) => {
            state.articles = action["payload"]
            state.searchKeyWord = null
            state.articleViewContainerLoading = false
        })
        builder.addCase(fetchAllRelevantArticles.rejected, (state) => {
            state.articles = null
        })

        //fetchRelevantArticlesByKeyWords action!!!

        builder.addCase(fetchRelevantArticlesByKeyWords.pending, (state, action: PayloadAction<any>) => {
            state.articleViewContainerLoading = true
        })
        builder.addCase(fetchRelevantArticlesByKeyWords.fulfilled, (state, action: PayloadAction<any>) => {
            state.activeArticleId = null
            state.articles = action["payload"]
            state.articleViewContainerLoading = false
        })
        builder.addCase(fetchRelevantArticlesByKeyWords.rejected, (state) => {
            state.activeArticleId = null
            state.articles = null
        })
    },
})

export const { removeRelevantArticles,addRelevantActiveArticle,addRelevantActivePageNumber,addRelevantSearchKeyWord,addRelevantArticlesToSelected,addSortedArticle } = ArticlesSlice.actions;
export default ArticlesSlice.reducer;