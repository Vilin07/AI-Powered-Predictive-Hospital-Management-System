const API = "http://localhost:8000/api/auth";

export const login = async (credentials) => {
  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const response = await fetch(`${API}/me`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const logout = async () => {
  const response = await fetch(`${API}/logout`, {
    method: "POST",
    credentials: "include",
  });

  return response.json();
};