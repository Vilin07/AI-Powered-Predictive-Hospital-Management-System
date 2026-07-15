import api from "./hospitalApi";

// Get all patients
export const getPatients = async () => {
  const { data } = await api.get("/patients");
  return data;
};

// Create a new patient
export const createPatient = async (patient) => {
  const { data } = await api.post("/patients", patient);
  return data;
};

export const updatePatientAIData = async (id, aiData) => {
  const { data } = await api.put(
    `/patients/${id}/ai-data`,
    aiData
  );

  return data;
};

export const updatePatientStatus = async (id) => {
  const { data } = await api.put(`/patients/${id}/status`);
  return data.patient;
};