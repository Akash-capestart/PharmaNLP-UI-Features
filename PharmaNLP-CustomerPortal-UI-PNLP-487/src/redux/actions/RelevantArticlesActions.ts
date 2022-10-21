import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchGet } from "../../dataFetchingHelpers/fetchActions";

export const fetchAllRelevantArticles = createAsyncThunk(
    'ActiclesAction/fetchAllRelevantArticles',
    async ({endUrl} : {endUrl : string}) =>{
        const response = await FetchGet(endUrl)
        return response
    }
)

export const fetchRelevantArticlesByKeyWords = createAsyncThunk(
    'ActiclesAction/fetchRelevantArticlesByKeyWords',
    async ({endUrl} : {endUrl : string}) =>{
        const response = await FetchGet(endUrl)
        return response
    }
)