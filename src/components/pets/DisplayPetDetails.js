import React,{ useEffect, useState } from "react";
import { fetchPetDetails } from "../../store/slices/MyPetsSlice";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import DisplayPetCard from "../../components/common/DisplayPetCard/DisplayPetCard"
import { useSelector } from 'react-redux';

function DisplayPetDetails() {
  const navigate = useNavigate();
  const [pets,setPets] = useState([])
  const dispatch = useDispatch();
  const state = useSelector(state=>state.loggedInUserDetails);

  const callPetDetailPage = async () => {   
    await dispatch(fetchPetDetails(state._id))
    .then(data=>{
      setPets(data.payload);
    })
    .catch(err=>{console.log(err);
      navigate('/home')})   
  }

  useEffect(() =>{
    callPetDetailPage();
    // eslint-disable-next-line
  },[]);

  return (
    <>
      {pets.length ? pets.map(pet => <DisplayPetCard {...pet}  />) : <div style={{textAlign:"center", marginTop:"5rem"}}><h1>No Pets to display</h1></div>}  
    </>
  );
}

export default DisplayPetDetails;
