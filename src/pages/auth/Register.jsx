import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Confirm password is not match");
    }
    // Send to back
    try {
      const res = await axios.post(`http://localhost:5001/api/register`, form);

      toast.success(res.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      Register
      <form action="" onSubmit={handleSubmit}>
        Email
        <input className="border" name="email" type="email" onChange={handleOnChange} />
        Password
        <input className="border" name="password" type="text" onChange={handleOnChange} />
        Confirm Password
        <input className="border" name="confirmPassword" type="text" onChange={handleOnChange} />
        <button className="bg-blue-500 rounded-md">Register</button>
      </form>
    </div>
  );
};

export default Register;
