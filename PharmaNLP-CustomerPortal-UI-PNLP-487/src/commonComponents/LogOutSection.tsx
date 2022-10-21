import React,{useState} from "react";
import { useAppDispatch } from "../redux/Hooks";
import { storageRemove } from "../localStorageHelpers/localStorageActions";
import { useNavigate } from 'react-router-dom';
import { loggedInOrNot } from "../redux/reducers/UserSlice";
import { removeRelevantArticles } from "../redux/reducers/RelevantArticlesSlice";
import { setActiveContent } from "../redux/reducers/FilterAndAdvanceSearchTogglerSlice";

export function LogOutSection() {

  const [logOutBoxShow, setlogOutBoxShow] = useState<boolean>(false)
  const dispatch = useAppDispatch();  
  const navigate = useNavigate() 

  const logoutClickHandler = () => {
    dispatch(loggedInOrNot({
        isLoggedIn : false
    }))
    dispatch(removeRelevantArticles())
    dispatch(setActiveContent({ activeContent: "" }))
    storageRemove("isLoggedIn");
    storageRemove("token")
    navigate("/login")
  };


  const viewProfileClickHandler=()=>{
    navigate("/user")
    setlogOutBoxShow(false)
    
  }

  return (
    <div className="position-relative">
      <img
        src="/images/user-image.png"
        className="cursor-pointer w-20"
        alt="User..."
        onClick={() => setlogOutBoxShow(prevVal => !prevVal)}
      />
      {logOutBoxShow && (
        <div style={{width:"200px"}}  className="d-flex flex-column">
        {/* <div className="logout-box pad-15 position-absolute d-flex align-items-center justify-content-between cursor-pointer" onClick={()=>logoutClickHandler()}>
            <img src="/images/logout-image.png" alt="Logout..." className="w-20"/>
            <p className="no-margin text-light-gray pad-l-10">View Profile</p>
        </div> */}
        <div className="logout-box pad-10 position-absolute d-flex flex-column align-items-center justify-content-between cursor-pointer" >
            <div className="mb-2" onClick={()=>viewProfileClickHandler()}>
            <p className="no-margin text-light-gray pad-l-10">View Profile</p>
            </div>
            <div className="d-flex" onClick={()=>logoutClickHandler()}>
            <img src="/images/logout-image.png" alt="Logout..." className="w-20"/>
            <p className="no-margin text-light-gray pad-l-10">Logout</p>

            </div>
  

        </div>
        </div>
        
        )
      }
    </div>
  );
}



{/* <div className="logout-box pad-15 position-absolute d-flex align-items-center justify-content-between cursor-pointer" onClick={()=>logoutClickHandler()}>
<img src="/images/logout-image.png" alt="Logout..." className="w-20"/>
<p className="no-margin text-light-gray pad-l-10">Logout</p>
</div> */}