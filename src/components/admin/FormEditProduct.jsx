import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, readProduct, listProduct, updateProduct } from "../../APIs/product";
import { toast } from "react-toastify";
import { AwardIcon, Settings2, Trash2 } from "lucide-react";
import UploadFile from "./UploadFile";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "Smart pen",
  description: "desc",
  price: 5000,
  quantity: 20,
  categoryId: "",
  images: [],
};

export default function FormEditProduct() {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id) => {
    try {
      const res = await readProduct(token, id);
      setForm(res.data);
    } catch (error) {
      console.log("Error fetch data", error);
    }
  };

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`Add "${res.data.title}" Successful`);
      navigate("/admin/product");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form action="" onSubmit={handleSubmit}>
        <h1>Edit Product detail</h1>
        <input
          className="border"
          type="text"
          name="title"
          value={form.title}
          onChange={handleOnChange}
          placeholder="Title"
        />
        <input
          className="border"
          type="text"
          name="description"
          value={form.description}
          onChange={handleOnChange}
          placeholder="Description"
        />
        <input
          className="border"
          type="number"
          name="price"
          value={form.price}
          onChange={handleOnChange}
          placeholder="Price"
        />
        <input
          className="border"
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="Quantity"
        />
        <select
          className="border"
          name="categoryId"
          id=""
          value={form.categoryId}
          onChange={handleOnChange}
          required
        >
          <option value="" disabled>
            Please select category
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <hr />

        <UploadFile form={form} setForm={setForm} />

        <button className="bg-blue-500">Edit Product</button>
      </form>

      <hr />
      <br />
    </div>
  );
}
