// src/utils/auth.js
export function getStoredUser() {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token || !userData) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 > Date.now()) {
      return JSON.parse(userData);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    }
  } catch (e) {
    console.error("Invalid token:", e);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }
}
