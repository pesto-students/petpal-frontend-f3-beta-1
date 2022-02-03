import http from "./api";

const signUpUser = (body) => {
  return http.post("/signup",body);
};

const loginCheck = () => {
  return http.get("/dashboard");
};

const updatePassword = (body) => {
  return http.post("/updatepassword",body);
};

const updateLocation = (body) => {
  return http.post("/updatelocation",body);
};

const login = (body) => {
  return http.post("/signin",body);
};

const getAll = (userId) => {
  return http.get("/fetchpet",userId);
};

const getAllPets = (userId) => {
  return http.get("/fetchallpet",userId);
};

const sendRequest = (body) => {
  return http.post("/sendrequest",body);
};

const sendRespond = (body) => {
  return http.post("/sendrespond",body);
};

const handleLike = (body) => {
  return http.post("/like",body);
};

const handleUnLike = (body) => {
  return http.post("/unlike",body);
};

const petInDetail = (_id) => {
  return http.get(`/petindetail/${_id}`);
};

const get = (id) => {
  return http.get(`/pets/${id}`);
};

const create = (data) => {
  return http.post("/createpet", data);
};

const update = (id, data) => {
  return http.put(`/pets/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/pets/${id}`);
};

const removeAll = () => {
  return http.delete(`/pets`);
};

const findByTitle = (title) => {
  return http.get(`/pets?title=${title}`);
};

const petDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  signUpUser,
  loginCheck,
  getAllPets,
  sendRequest,
  petInDetail,
  handleLike,
  login,
  handleUnLike,
  sendRespond,
  updatePassword,
  updateLocation,
};

export default petDataService;
