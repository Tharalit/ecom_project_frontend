import React, { useEffect, useState } from "react";
import { createCategory, listCategory, removeCategory } from "../../APIs/category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

export default function FormCategory() {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  // const [categories, setCategories] = useState([]);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        return toast.warning("Please fill Category name!!");
      }
      const res = await createCategory(token, { name });
      toast.success(`Add category "${res.data.name}" success!!`);
      getCategory(token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      toast.success(`Deleted "${res.data.name}" success`);
      getCategory(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Category management</h1>

      <form className="my-4" action="" onSubmit={handleSubmit}>
        <input className="border" type="text" onChange={(e) => setName(e.target.value)} />
        <button className="bg-blue-500">Add Category</button>
      </form>

      <hr />

      <ul className="list-none">
        {categories.map((item, index) => (
          <li className="flex justify-between my-2" key={index}>
            <span>{item.name}</span>{" "}
<center></center>
          </li>
        ))}
      </ul>
    </div>
  );
}
