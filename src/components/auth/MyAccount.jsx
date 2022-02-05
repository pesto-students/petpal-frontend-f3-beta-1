import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser, updatePassword, updateLocation } from "../../store/slices/LoggedInUserDataSlice";
import { Form, Button } from "react-bootstrap";
import styles from "./MyAccount.module.css";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import axios from "axios"

function MyAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [userDPFile,setUserDPFile] = useState()
  const state = useSelector((state) => state.loggedInUserDetails);
  const defaultImage ="data:image/png;base64,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";
  const imageKey = state.profileimage
    ? "/images/" + state.profileimage
    : defaultImage;
  const [user, setUser] = useState({
    location: "",
    oldPassword: "",
    newPassword: "",
    cPassword: "",
    profileimage: "",
  });

  const checkUser = async () => {
    dispatch(loggedInUser())
    .then((data) => {
      if(data.payload===""){
        window.alert("Please, login first.")
        navigate("/home")
      }
      else{
        setUser(state);
      }
    });
  };
  useEffect(() => {
    checkUser();
    // eslint-disable-next-line
  }, []);

  const handleImageSeleted = async (event) => {
      event.preventDefault();
      // const fl = event.target.files[0]; // get the file
      // setUserDPFile(fl); // set the file
      // const formData = new FormData();
      // formData.append("image", userDPFile);
      // formData.append("userID", state._id);
      // await axios.post("/userdpupload", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // })
      // .then((data) => {
      //   checkUser();
      // })
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const handleUpdatePassword = () => {
    dispatch(updatePassword({_id: state._id, password: user.oldPassword, newPassword: user.newPassword}))
    .then(() => {
      setUser({
        oldPassword: "",
        newPassword: "",
        cPassword: "",
      });
      window.alert("Password updated successfully!!")
    })
  }

  const handleUpdateLocation = () => {
    dispatch(updateLocation({_id: state._id, location: user.location}))
    .then(() => {
      setUser({
        loation: "",
      });
      window.alert("Location updated successfully!!")
    })
  }

  return (
    <div
      style={{ margin:"5rem 5rem 3rem" }}
    >
      <div className={`container ${styles.style_contianer}`}>
        <div className="row">
          <div className="col-12 col-lg-10 mx-auto">
            <div className="row">
              <div  style={{ textAlign: "center" }} className="col-6 col-lg-3">
                <Form>
                  <Form.Group>
                    <div style={{ marginBottom:"3rem" }} className={styles.card_image}>
                      <img
                        className={styles.card_image}
                        src={imageKey}
                        alt="userDP"
                        loading="lazy"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose DP</Form.Label>
                    <Form.Control 
                      type="file"
                      name="userDP"
                      placeholder="Choose DP"
                      accept="image/*"
                      onChange={handleImageSeleted}

                    />
                  </Form.Group>
                </Form>
              </div>

              <div className="col-6 col-lg-9">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Name: {state.name}</Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email: {state.email}</Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                      name="oldPassword"
                      value={user.oldPassword}
                      onChange={handleChange}
                      type="password"
                      placeholder="Enter password"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      name="newPassword"
                      value={user.newPassword}
                      onChange={handleChange}
                      type="password"
                      placeholder="Enter New password"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      name="cPassword"
                      value={user.cPassword}
                      onChange={handleChange}
                      type="password"
                      placeholder="Confirm password"
                    />
                  </Form.Group>
                  <Button onClick={handleUpdatePassword} variant="primary">Update Password</Button>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      name="phone"
                      value={user.location}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter phone"
                    />
                  </Form.Group>
                  <Button onClick={handleUpdateLocation} variant="primary">Update Location</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default MyAccount;
