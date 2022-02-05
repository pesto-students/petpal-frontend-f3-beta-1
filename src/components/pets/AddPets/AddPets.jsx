import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PetCategory from "../../mock-constant/pet-category-constant.json";
import petList from "../../mock-constant/pet-category/pet-list-constant.json";
import { createPetDetails } from "../../../store/slices/AddPetSlice";
import petgender from "../../mock-constant/pet-gender-constant.json";
import petsize from "../../mock-constant/pet-size-contant.json";
import DropDownField from "../../common/DropDownField/DropDownField";
// eslint-disable-next-line
import { Navigate, useNavigate } from "react-router-dom";
import { loggedInUser } from "../../../store/slices/LoggedInUserDataSlice";

export default function AddPets() {
  const state = useSelector(state => state.loggedInUserDetails)
  const initialAddPetState = {
    userId: state._id,
    petname: "",
    petcategory: "Dogs",
    petimage: [],
    selectedPet: "",
    gender: "Male",
    age: "",
    size: "Large",
    about: "",
    adoptionFee: "",
    adoptedBy: "ttt",
  };
  const [addPet, setAddPet] = useState(initialAddPetState);
  const [displayImageName, setDisplayImageName] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate =useNavigate();

  const checkUser = async () => {
    dispatch(loggedInUser())
    .then((data) => {
      if(data.payload===""){
        window.alert("Please, login first.")
        navigate("/home")
      }
    })
    .catch(() =>navigate("/home"))
  };

  async function postImage({ image, petId }) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("petId", petId);
    await axios.post("/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  //  image upload to state  function
  const handleImageChange = async (event) => {
    event.preventDefault();
    const fl = event.target.files[0]; // get the file
    setFiles([...files, fl]); // set the file

  };
  const handleImageUpload = async (petId) => {
    for (let i = 0; i < files.length; i++) {
      await postImage({ image: files[i], petId: petId });
    }
  };
  const removeImage = (imageName) => {
    const items = files.filter((image) => image.name !== imageName);
    setFiles(items);
  };
  useEffect(() => {
    checkUser();
    let imageThumbnailName = files.map((image, index) => {
      return (
        <div tabIndex={0} key={image.name} style={{  border: "1px solid black", display: "flex" }}>
          <li
            style={{ margin: "10px" }}
            key={image.name}
          >
            {image.name}
          </li>
          <button onClick={() => removeImage(image.name)}>❌</button>
        </div>
      );
    });
    setDisplayImageName(imageThumbnailName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files || displayImageName]);
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddPet({ ...addPet, [name]: value });
  };
  const savePetDetail = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    dispatch(createPetDetails(addPet))
    .then(data =>{
      handleImageUpload(data.payload.data._id)
      .then(data =>{
        // navigate('/about')
        console.log(initialAddPetState,addPet);
        setAddPet(initialAddPetState)
        setFiles([])
      })
    })
    setSubmitted(false);
  };
  return (
    <div>
    <Form style={{ width: "60%", margin: "20px 20%" }}>
      <h2 style={{ textAlign: "center" }}>Add Pet Details</h2>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formName">
          <Form.Label>Enter Pet Name</Form.Label>
          <Form.Control
            type="text"
            name="petname"
            value={addPet.petname}
            placeholder="Enter Pet Name"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <DropDownField
          as={Col}
          category={PetCategory}
          type="Pet Category"
          name="petcategory"
          value={addPet.petcategory}
          onChange={handleInputChange}
        />
      </Row>
      <Form.Group className="mb-3" controlId="upload image">
        <Form.Label>Upload Pet Image</Form.Label>
        <Form.Control
          type="file"
          name="petimage"
          value={addPet.petimage}
          placeholder="Enter Pet Name"
          accept="image/*"
          onChange={handleImageChange}
          required
          multiple
        />
      </Form.Group>
      <div>{displayImageName}</div>
      <Row className="mb-3">
        <DropDownField
          as={Col}
          category={petList}
          type={addPet.petcategory}
          name="selectedPet"
          value={addPet.selectedPet}
          onChange={handleInputChange}
          required
        />
        <DropDownField
          as={Col}
          category={petgender}
          type="Gender"
          name="gender"
          value={addPet.gender}
          onChange={handleInputChange}
        />
        <Form.Group as={Col} controlId="form age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            type="number"
            name="age"
            placeholder="Age"
            required
            value={addPet.age}
            min={0}
            max={20}
          />
        </Form.Group>
        <DropDownField
          as={Col}
          category={petsize}
          type="Size"
          name="size"
          value={addPet.size}
          onChange={handleInputChange}
        />
      </Row>
      <Form.Group className="mb-3" controlId="form about">
        <Form.Label>About</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="about"
          value={addPet.about}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Row className="mb-4">
        <Form.Group as={Col} controlId="adoptionFee">
          <Form.Label>Adoption Fee</Form.Label>
          <Form.Control
            name="adoptionFee"
            type="number"
            placeholder="Adoption Fee"
            onChange={handleInputChange}
            required
            value={addPet.adoptionFee}
            min={0}
            max={2000}
          />
        </Form.Group>
        <Form.Group style={{marginTop: "2rem",textAlign: "center"}} controlId="adoptionFee">
          <Button variant="primary" disabled={submitted} onClick={savePetDetail}>
            Submit
          </Button>
        </Form.Group>
      </Row>
    </Form>
    </div>
  );
}