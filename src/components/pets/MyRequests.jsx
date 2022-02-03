import React from "react";
// import { useDispatch } from "react-redux";
// import { loggedInUser } from "../../store/slices/LoggedInUserDataSlice";
import { useSelector } from "react-redux";
import DisplayPetRequestCard from "../common/DisplayPetRequestCard/DisplayPetRequestCard"

function MyRequests() {
    // const dispatch = useDispatch();
    const state = useSelector(state=>state.loggedInUserDetails)
    // const checkUser = async () => {
    //     dispatch(loggedInUser())
    //     .then((data) => console.log(data))
    // };

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
