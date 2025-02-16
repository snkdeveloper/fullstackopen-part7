import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
let token = null;
console.log(token);

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

console.log(token);
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);

  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
const delete2 = (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    // headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config);

  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken, delete2 };
