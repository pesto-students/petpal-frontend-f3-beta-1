import React,{ useEffect, useState } from "react";
import { fetchAllPetDetails } from "../../store/slices/AddPetSlice";
import { useDispatch, useSelector } from "react-redux";
import DisplayPetCard from "../../components/common/DisplayPetCard/DisplayPetCard"
import { useParams, useNavigate } from "react-router-dom"

function DisplayPetDetails() {
  const [pets,setPets] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const state = useSelector(state => state.loggedInUserDetails)
  console.log(params.category);

  const callPetDetailPage = async () => {
    if(state){
      console.log("all pets details")
      await dispatch(fetchAllPetDetails())
      .then(data=>{
        console.log(data.payload)
        setPets(data.payload);
      })
      .catch(err=>console.log(err))
    }
    else{
      window.alert("To see pets information, please Login.")
      navigate("/home")
    }
  }

  useEffect(() =>{
    console.log("About page called");
    callPetDetailPage();
    return () => {};
    // eslint-disable-next-line
  },[]);
  const petCategory = pets.filter(data => data.petcategory === params.category)
  console.log(petCategory);

  return (
    <div style={{minHeight: "80vh"}}>
      {}
      {petCategory.map(pet =>{ return <DisplayPetCard
      key={pet._id}
      {...pet}
      />})}  
    </div>
  );
}

export default DisplayPetDetails;
