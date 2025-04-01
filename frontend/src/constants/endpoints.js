// import process from "process";

export const API_BASE_URL = "/api";
// export const API_HEADERS_BASE = {
//   "x-api-key": process.env(),
// };

export const API_CONFIGURATION_TOUR = {
  GET_TOUR: "",
  POST_TOUR: "",
  PATCH_TOUR: "",
  DELETE_TOUR: "",
};

export const API_TERRANOVA = {
  REGISTER_USER: "usuarios/registrar",
  LOGIN_USER: "auth/login",
  CHANGE_ROLE: (id) => `usuarios/cambiarRol/${id}`,
};
