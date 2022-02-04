import React, { useEffect }from "react";
// import { useDispatch } from "react-redux";
// import { loggedInUser } from "../../store/slices/LoggedInUserDataSlice";
import { useSelector } from "react-redux";
import DisplayPetRequestCard from "../common/DisplayPetRequestCard/DisplayPetRequestCard"
import { useNavigate } from "react-router-dom";


function MyRequests() {
    // const dispatch = useDispatch();
    const state = useSelector(state=>state.loggedInUserDetails)
    const navigate = useNavigate();

    // const checkUser = async () => {
    //     dispatch(loggedInUser())
    //     .then((data) => console.log(data))
    // };

    useEffect(() => {
        console.log(state);
        if(state._id){
            window.alert("Please, login first.")
            navigate("/home")
        }
    // eslint-disable-next-line
    },[])

    function DisplayRequestCards(){
        return (<div>
            {state ? state.myrequests.map(item => (
                <DisplayPetRequestCard
                    userId={state._id}
                    petId={item.petId}
                />
            )) : null}
        </div>)
    }

    // useEffect(() => {
    //     checkUser();
    //     // eslint-disable-next-line
    // }, []);
    return (<div style={{minHeight: "80vh"}}>
        <DisplayRequestCards />
    </div>);
}

export default MyRequests;
