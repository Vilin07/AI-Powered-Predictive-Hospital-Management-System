import api from "./hospitalApi";

// Login
export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};


// Register
export const register = async (staffData) => {
  const { data } = await api.post("/auth/register", staffData);
  return data;
};


// Get logged-in user
export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};


// Logout
export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const changePassword = async (passwordData)=>{

  const {data} = await api.patch(
    "/auth/change-password",
    passwordData
  );

  return data;

};