import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../APIs/product";
import { toast } from "react-toastify";
import { Settings2, Trash2 } from "lucide-react";
import UploadFile from "./UploadFile";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/formatNumber";
import { formatDate } from "../../utils/formatDate";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

export default function FormProduct() {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProduct(20);
  }, []);

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      toast.success(`Add "${res.data.title}" Successful`);
      setForm(initialState);
      getProduct(20);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you confirm to delete?")) {
        const res = await deleteProduct(token, id);
      }
      getProduct(20);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form action="" onSubmit={handleSubmit}>
        <h1>Add Product detail</h1>
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

        <button className="bg-blue-500 p-2 rounded-md shadow-md hover:scale-105  transition">
          Add Product
        </button>
      </form>

      <hr />
      <br />

      <table className="table w-full border ">
        <thead>
          <tr className="bg-gray-200">
            <th scope="col">No.</th>
            <th scope="col">Image</th>
            <th scope="col">Product title</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Quantity of sold</th>
            <th scope="col">Updated date</th>
            <th scope="col">Manage</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                {item.images.length > 0 ? (
                  <img
                    className="w-auto h-24 rounded-lg shadow-sm "
                    src={item.images[0].url}
                    alt=""
                  />
                ) : (
                  <div className="w-auto h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-sm">
                    No Image
                  </div>
                )}
              </td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{formatNumber(item.price)}</td>
              <td>{formatNumber(item.quantity)}</td>
              <td>{formatNumber(item.sold)}</td>
              <td>{formatDate(item.updatedAt)}</td>
              <td className="flex gap-2">
                <div className="bg-yellow-500 rounded-md p-1 shadow-md flex items-center justify-center hover:scale-105 hover:-translate-y-1 transition">
                  <Link to={`/admin/product/${item.id}`}>
                    <Settings2 />
                    {/* Edit */}
                  </Link>
                </div>
                <div
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 rounded-md p-1 shadow-md flex items-center justify-center cursor-pointer text-white hover:scale-105 hover:-translate-y-1 transition"
                >
                  <Trash2 />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
