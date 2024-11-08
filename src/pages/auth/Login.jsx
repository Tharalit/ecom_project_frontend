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
    <div>
      Login
      <form action="" onSubmit={handleSubmit}>
        Email
        <input className="border" name="email" type="email" onChange={handleOnChange} />
        Password
        <input className="border" name="password" type="text" onChange={handleOnChange} />
        <button className="bg-blue-500 rounded-md">Login</button>
      </form>
    </div>
  );
};

export default Login;
