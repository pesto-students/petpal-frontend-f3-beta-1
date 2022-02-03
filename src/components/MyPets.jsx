import React, { useEffect } from "react";
import DisplayPetDetails from "./pets/DisplayPetDetails"
// import CorouselPics from "./shared/CarouselPics"
import { useDispatch } from "react-redux";
import { loggedInUser } from "../store/slices/LoggedInUserDataSlice"

function About() {
  const dispatch = useDispatch();

  const checkUser = async () => {
    dispatch(loggedInUser())
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
