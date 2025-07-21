import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import FormFooter from "./FormFooter";
import Modal from "../Modal/Modal";
import { useAuthDispatch } from "../../AuthContext/AuthContext";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (response.ok) {
        dispatch({ type: "LOGIN", payload: { username: data.username } });

        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/dashboard");
        }, 2000);
      } else {
        const errorText = await response.text();

        if (errorText.toLowerCase().includes("username")) {
          setError("username", {
            type: "manual",
            message: "username not found",
          });
        } else if (errorText.toLowerCase().includes("password")) {
          setError("password", {
            type: "manual",
            message: "incorrect password",
          });
        } else {
          setError("username", {
            type: "manual",
            message: errorText || "unknown error",
          });
        }
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("username", {
        type: "manual",
        message: "network error",
      });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50 space-y-6 relative">
      {showModal && (
        <Modal
          message="✅ Logged in successfully"
          subMessage="Transporting to dashboard..."
        />
      )}

      <img
        src="./src/assets/Pictures/InstagramLogo.png"
        alt="Instagram Logo"
        className="w-36 h-28 sm:w-40 sm:h-32 md:w-52 md:h-36 lg:w-60 lg:h-40 object-contain"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-white p-8 rounded-xl shadow-lg w-[350px] min-h-[420px] space-y-5"
      >
        <UsernameInput
          placeholder="Enter Username"
          register={register}
          name="username"
          errors={errors} // 👈 به جای error فقط اینو بده
          autoComplete="off"
        />

        <PasswordInput
          register={register}
          name="password"
          error={errors.password}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Log In
        </button>

        <FormFooter />
      </form>
    </div>
  );
}
