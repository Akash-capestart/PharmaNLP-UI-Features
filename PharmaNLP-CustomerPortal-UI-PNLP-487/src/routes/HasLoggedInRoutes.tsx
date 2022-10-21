import React, { useCallback, useState } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../redux/Hooks";
import { NavBar } from '../commonComponents/NavBar'
import { SideMenuRelevent } from '../commonComponents/SideMenu'
import { SideMenuIrrRelevent } from '../commonComponents/SideMenuIrrelevent';
import { RelevantArticlesContainer } from '../pages/home/container/RelevantArticlesContainer';
import { IrrelevantArticlesContainer } from '../pages/irRelevant/container/IrRelevantArticlesContainer';
import { NoMatchPath } from '../pages/noMatchPath/container/NoMatchPath';
import { useLocation } from 'react-router-dom';
import { UserProfile } from '../commonComponents/UserProfile';
import { SideMenuProfile } from '../commonComponents/SideMenuProfile';


export function HasLoggedInRoutes() {
    const location = useLocation();
    console.log("location from route",location.pathname);

    console.log("rerenders. ahppenin0000000000000");
    const { innerWidth } = window
    const { innerHeight } = window;
    console.log("width,height",innerWidth,innerHeight)
    const { sideBarPinned } = useAppSelector(state => state.navBarPinnedDetails)
    const [windowSize, setwindowSize] = useState<{ width: number, height: number }>({
        width: innerWidth,
        height: innerHeight
    })        
    const [reRender, setreRender] = useState<boolean>(true) // used to avoid multiple render while the window.addEventListener function works
    // const [widthchangecss,setWidthchangecss]=useState()
    const [tooglepin,setTooglepin]=useState<boolean>(false)
    const windowResizeHandler = useCallback(() => {
        setreRender(false)
        if (reRender) {
            setwindowSize({
                ...windowSize,
                width: innerWidth,
                height: innerHeight
            })
        }
    }, [reRender,windowSize,innerWidth,innerHeight])

    window.addEventListener("resize", windowResizeHandler)

    console.log("toogledata",tooglepin)
    
    return (
        <div className="h-100vh d-flex">
            <div className="w-100 d-flex">
                {/* <div className="h-100vh position-relative width-animation side-menu" style={{ width: !sideBarPinned ? "25%" : 50 }}> */}
                
                {/* <div className="h-100vh position-relative width-animation side-menu rootwidthchange" > */}
                <div className={`h-100vh position-relative width-animation side-menu ${tooglepin ? "rootwidthchange" : ""}`} >
                
                {/* {
                    location.pathname=="/"? <SideMenuRelevent 
                    sideBarPinned={sideBarPinned}
                    setTooglepin={setTooglepin}
                    tooglepin={tooglepin}
                    // setWidthchangecss={setWidthchangecss} 
                    />: <SideMenuIrrRelevent sideBarPinned={sideBarPinned}
                    setTooglepin={setTooglepin}
                    tooglepin={tooglepin}/>
                } */}



 {
                    location.pathname=="/"? <SideMenuRelevent 
                    sideBarPinned={sideBarPinned}
                    setTooglepin={setTooglepin}
                    tooglepin={tooglepin}
                    // setWidthchangecss={setWidthchangecss} 
                    />: location.pathname=="/irrelevant"?
                    <SideMenuIrrRelevent sideBarPinned={sideBarPinned}
                    setTooglepin={setTooglepin}
                    tooglepin={tooglepin}/>:<SideMenuProfile  sideBarPinned={sideBarPinned}
                    setTooglepin={setTooglepin}
                    tooglepin={tooglepin} />
                } 
 
                </div>
                <div className="h-100vh width-animation" style={{ width: !sideBarPinned ? "95%" : (innerWidth - 50) }}>
                    <NavBar />
                    <Routes>
                        <Route path="/login" element={<Navigate to={"/"} />} />
                        <Route path='/forgot_password' element={<Navigate to={"/"} />} />
                        <Route path='/reset_password/:secret_key' element={<Navigate to={"/"} />} />
                        <Route path="/" element={<RelevantArticlesContainer innerHeight={innerHeight} />} />
                        <Route path="/irrelevant" element={<IrrelevantArticlesContainer innerHeight={innerHeight} />} />
                        <Route path='/user' element={<UserProfile/>} />
                        <Route path='*' element={<NoMatchPath innerHeight={innerHeight - 50}/>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
