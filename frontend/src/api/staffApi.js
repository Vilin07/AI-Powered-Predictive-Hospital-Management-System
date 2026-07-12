import axios from "axios";
import api from "./hospitalApi";


// Get All Staff
export const getAllStaff = async () => {
  const { data } = await api.get("/staff");
  return data;
};

export const updateStaff = async (id, staffData) => {
  const { data } = await api.put(
    `/staff/${id}`,
    staffData
  );

  return data;
 
};

export const updateStaffStatus = async (id) => {

  const response = await axios.patch(
    `${API_URL}/${id}/status`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;

};