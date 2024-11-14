import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import zxcvbn from "zxcvbn";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email!!" }),
    password: z
      .string()
      .min(8, { message: "Password must more than 8 character" })
      .max(20, { message: "Password must less than 20 character" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password is not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [passwordScore, setPasswordScore] = useState(0);

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score;
    // if (passwordScore < 2) {
    //   toast.warning("Password not strong");
    //   return;
    // }
    // console.log("OK");
    try {
      const res = await axios.post(`https://ecom-project-backend-coral.vercel.app/api/register`, data);
      toast.success(res.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full bg-white shadow-md p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Register</h1>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <input
                {...register("email")}
                className={`border focus:outline-none focus:ring-2 focus:ring-blue-500 w-full px-3 py-2 rounded-md focus:border-transparent ${
                  errors.email && "border-red-500"
                }
              `}
                placeholder="Your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <input
                {...register("password")}
                className={`border focus:outline-none focus:ring-2 focus:ring-blue-500 w-full px-3 py-2 rounded-md focus:border-transparent ${
                  errors.password && "border-red-500"
                }
            `}
                placeholder="Your password"
                type="password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              {watch().password?.length > 0 && (
                <div className="flex mt-2">
                  {Array.from(Array(5).keys()).map((item, index) => (
                    <span key={index} className="w-1/5 px-1">
                      <div
                        className={`h-2 rounded-lg ${
                          passwordScore <= 2
                            ? "bg-red-500"
                            : passwordScore < 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <input
                {...register("confirmPassword")}
                className={`border focus:outline-none focus:ring-2 focus:ring-blue-500 w-full px-3 py-2 rounded-md focus:border-transparent ${
                  errors.confirmPassword && "border-red-500"
                }
          `}
                placeholder="Confirm password"
                type="password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button className="bg-blue-500 rounded-md w-full text-white font-bold py-2 shadow hover:bg-blue-700">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
