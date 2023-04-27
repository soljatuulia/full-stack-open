import axios from "axios";
import storageService from "../services/storage";
const baseUrl = "/api/blogs";

const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (object) => {
  const request = await axios.post(baseUrl, object, { headers });
  return request.data;
};

const update = async (object) => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object, {
    headers,
  });
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getAll, 
  create, 
  update, 
  remove 
};
