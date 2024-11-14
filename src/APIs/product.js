import axios from "axios";

export const createProduct = async (token, form) =>
  await axios.post(`https://ecom-project-backend-coral.vercel.app/api/product`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const listProduct = async (count = 20) =>
  await axios.get(`https://ecom-project-backend-coral.vercel.app/api/products/${count}`);

export const readProduct = async (token, id) =>
  await axios.get(`https://ecom-project-backend-coral.vercel.app/api/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteProduct = async (token, id) =>
  await axios.delete(`https://ecom-project-backend-coral.vercel.app/api/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateProduct = async (token, id, form) =>
  await axios.put(`https://ecom-project-backend-coral.vercel.app/api/product/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const uploadFiles = async (token, form) =>
  await axios.post(
    `https://ecom-project-backend-coral.vercel.app/api/images`,
    { image: form },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const removeFiles = async (token, publicId) =>
  await axios.post(
    `https://ecom-project-backend-coral.vercel.app/api/removeImages`,
    { publicId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const searchFilters = async (arg) =>
  await axios.post(`https://ecom-project-backend-coral.vercel.app/api/search/filters`, arg);

export const listProductBy = async (sort, order, limit) =>
  await axios.post(`https://ecom-project-backend-coral.vercel.app/api/productby`, { sort, order, limit });
