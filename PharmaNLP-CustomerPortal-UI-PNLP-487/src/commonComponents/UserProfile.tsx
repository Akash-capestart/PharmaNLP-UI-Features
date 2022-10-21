import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export function UserProfile() {

    const navigate=useNavigate()
    const goBackHandler=()=>{
        navigate(-1)
    }
  return (
    <div className="position-relative p-5">
     
        <div className="d-flex mb-4" >
          <img
        style={{objectFit:"contain" ,paddingRight:"5px"}}
            src="/images/green-drop-down-image.png"
            className="cursor-pointer w-20 rotate-image-left pr-2"
            alt="User..."
            onClick={() => goBackHandler()}
          />
            <h4>Profile</h4>
        </div>

      <div
        style={{
          height: "250px",
          width: "100%",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: "0.5",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
            src="/images/user-image.png"
          />
          <p style={{ fontWeight: "600", color: "#2BB24C" }}>
            Karthika Balasubramoinam
          </p>
        </div>


        <div
          className="d-flex flex-column p-5 justify-content-center align-items-center"
          style={{ flex: 0.3,fontWeight:"600",color:"#2BB24C"}}
        >
          <div className="d-flex m-b-3 ">
            <p>Email</p>
          </div>
          <div className="d-flex m-b-3">
            <p>Role</p>
          </div>
          <div className="d-flex m-b-3">
            <p>Organization</p>
          </div>
        </div>

        <div
          className="d-flex flex-column p-5 justify-content-start"
          style={{ flex: 0.6,fontWeight:"600" }}
        >
          <div className="d-flex m-b-3 ">
            <p>karthikabalasubramoinam@capestart</p>
          </div>
          <div className="d-flex m-b-3">
            <p>Admin</p>
          </div>
          <div className="d-flex m-b-3">
            <p>PharmaNLP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
