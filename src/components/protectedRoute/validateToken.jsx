import customAxios from '@/utils/customAxios';

async function validateToken(token) {
  try {
    const response = await customAxios.post("/token/validate", { token });
    return response.data.isValid;
  } catch (error) {
    console.error("Failed to validate token:", error);
    return false;
  }
}

export default validateToken;