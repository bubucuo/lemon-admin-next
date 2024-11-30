import http from "../utils/http.js";

const login = (data) => {
  return http.post("/auth/login", data);
};

const getAuthProfile = (data) => {
  return http.get("/auth/profile", data);
};

// 获取用户列表
// pageNo=1&pageSize=10
const getUserList = (data) => {
  return http.get("/user/list", data);
};

const addUser = (data) => {
  return http.post("/user/add", data);
};

// 删除
const delUser = (id) => {
  // return http.del("/user/delete", data);
  return http.post("/user/delete/" + id);
};

// 获取用户信息 id=?
const getUserDetail = (id) => {
  return http.get("/user/" + id);
};

const getUserDetailByName = (name) => {
  return http.get("/user/findOneByName/" + name);
};

const updateUserInfo = (data) => {
  return http.post("/user/update", data);
};

export default {
  login,
  getAuthProfile,
  getUserList,
  addUser,
  delUser,
  getUserDetail,
  getUserDetailByName,
  updateUserInfo,
};
