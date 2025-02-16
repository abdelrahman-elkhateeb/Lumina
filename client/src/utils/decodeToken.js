import { jwtDecode } from 'jwt-decode';

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.userId; // Ensure this matches the key in your token payload
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}


export default getUserIdFromToken;