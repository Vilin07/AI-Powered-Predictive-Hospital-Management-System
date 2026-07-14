import api from "./hospitalApi";

// Get all patients
export const getPatients = async () => {
  const { data } = await api.get("/patients");
  return data;
};