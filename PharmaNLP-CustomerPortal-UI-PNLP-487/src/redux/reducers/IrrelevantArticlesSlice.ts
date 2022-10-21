import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
    selectedArticles: string[]
}

const initialState: InitialStateProps = {
    selectedArticles : []   
}

const IrrelevantArticlesSlice = createSlice({
    name: "articlesSlice",
    initialState,
    reducers: {    
        addIrRelevantArticlesToSelected : (state,action : PayloadAction<any>) => {
            return {
                ...state,
                selectedArticles : action["payload"]
            }
        }
    }    
})

export const { addIrRelevantArticlesToSelected } = IrrelevantArticlesSlice.actions;
export default IrrelevantArticlesSlice.reducer;