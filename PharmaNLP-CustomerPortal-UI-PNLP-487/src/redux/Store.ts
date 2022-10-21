import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ArticlesSlice from "./reducers/RelevantArticlesSlice";
import GlobalAlertSlice from "./reducers/GlobalAlertSlice";
import GlobalFontResizingSlice from "./reducers/GlobalFontResizingSlice";
import UserSlice from "./reducers/UserSlice";
import NavBarCollapseSlice from "./reducers/NavBarCollapseSlice";
import FilterAndAdvanceSearchTogglerSlice from "./reducers/FilterAndAdvanceSearchTogglerSlice";
import IrrelevantArticlesSlice from "./reducers/IrrelevantArticlesSlice";

const reducer = combineReducers({
  globalFontResizer: GlobalFontResizingSlice,
  userDetails : UserSlice,
  globalAlert : GlobalAlertSlice,
  relevantArticlesDetails : ArticlesSlice,
  navBarPinnedDetails : NavBarCollapseSlice,
  filerAndAdvanceSearchTogglerDetails : FilterAndAdvanceSearchTogglerSlice,  
  irRelevantArticlesDetails : IrrelevantArticlesSlice
})

export const store = configureStore({
  reducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
