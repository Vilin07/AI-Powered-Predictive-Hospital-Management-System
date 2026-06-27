import api from "./hospitalApi";

export const getDashboardAnalytics = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};

export const getLiveVitals = async () => {
  const res = await api.get("/live-vitals");
  return res.data;
};

export const getAlerts = async () => {
  const res = await api.get("/alerts");
  return res.data;
};