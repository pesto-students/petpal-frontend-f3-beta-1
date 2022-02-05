import React, { useEffect } from "react";
import DisplayPetDetails from "./pets/DisplayPetDetails"
// import CorouselPics from "./shared/CarouselPics"
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "../store/slices/LoggedInUserDataSlice"
import { useNavigate } from "react-router-dom"

function About() {
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const state = useSelector(state => state.loggedInUserDetails)

  const checkUser = async () => {
    if(state){
      dispatch(loggedInUser())
      .then((data) =>{
        if(data.payload===""){
          window.alert("Please, login first.")
          navigate("/home")
        }
      })
    }
    else{
      window.alert("Please, login first.")
      navigate("/home")      
    }
  }
  useEffect(() => {
    checkUser();
  // eslint-disable-next-line
  },[])

  return (<div style={{minHeight: "80vh"}}>
    {/* <CorouselPics /> */}
    <DisplayPetDetails />    
    </div>
  );
}

export default About;
