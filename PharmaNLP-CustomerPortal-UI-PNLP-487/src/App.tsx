import "./css/index.css";
import "./css/NavBar.css";
import "./css/AdvanceSearch.css";
import "./css/SideMenu.css";
import "./css/Login.css";
import "./css/ArticlesViewSection.css"
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/Hooks";
import { storageGet } from "./localStorageHelpers/localStorageActions";
import { loggedInOrNot } from "./redux/reducers/UserSlice";
import { AppRouteComponent } from "./routes/AppRouteComponent";
import AlertModal from "./commonComponents/AlertModal";


function App() {
  const userDetailsState = useAppSelector((state) => state.userDetails);  
  const dispatch = useAppDispatch();

  let isLoggedIn = storageGet("isLoggedIn");
  const hasAuth = isLoggedIn && userDetailsState["isLoggedIn"] ? true : false;
  const [routesReady, setroutesReady] = useState(false)

  useEffect(() => {
    // console.log("1)  ******************** app.js useefecc running.....******************")
    if (!hasAuth) { // if the isLoggedIn status is stored in local storage this checks the stored token is valid by sent it to the backend.                        
      // console.log("1)  %%%%%%%%%%%%%%%%%%%%%% app.js api call runningg %%%%%%%%%%%%%%%%%%%%%%");
      dispatch(
        loggedInOrNot({
          isLoggedIn: true,
        })
      );
    }
    setroutesReady(true)
  }, [dispatch, hasAuth]);  

  return (
    <div className="gray-background position-relative">
      {routesReady &&
        <AppRouteComponent hasAuth={hasAuth} />
      }
      <AlertModal />
    </div>
  );
}

export default App;
