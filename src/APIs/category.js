import axios from "axios";

export const createCategory = async (token, form) =>
  await axios.post(`https://ecom-project-backend-coral.vercel.app/api/category`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const listCategory = async () => await axios.get(`https://ecom-project-backend-coral.vercel.app/api/category`);

export const removeCategory = async (token, id) =>
  await axios.delete(`https://ecom-project-backend-coral.vercel.app/api/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
