import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      toast.success("Welcome back");
      roleRedirect(role);
    } catch (error) {
      console.log(error);
      const errorMsg = error.response?.data?.message;
      toast.error(errorMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full bg-white shadow-md p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              className="border focus:outline-none focus:ring-2 focus:ring-blue-500 w-full px-3 py-2 rounded-md focus:border-transparent"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleOnChange}
            />

            <input
              className="border focus:outline-none focus:ring-2 focus:ring-blue-500 w-full px-3 py-2 rounded-md focus:border-transparent"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleOnChange}
            />
            <button className="bg-blue-500 rounded-md w-full text-white font-bold py-2 shadow hover:bg-blue-700">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
