import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import FormFooter from "./FormFooter";
import Modal from "../Modal/Modal";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
        credentials: "include",
      });

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/");
        }, 2000);
      } else {
        const errorMessage = await response.text();
        setError("username", {
          type: "server",
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error("❌ Network or unexpected error:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50 space-y-6 relative">
      {showModal && (
        <Modal
          message="✅ Signed up successfully!"
          subMessage="Redirecting to login page..."
        />
      )}

      <img
        src="./src/assets/Pictures/InstagramLogo.png"
        alt="Instagram Logo"
        className="w-36 h-28 sm:w-40 sm:h-32 md:w-52 md:h-36 lg:w-60 lg:h-40 object-contain"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-white p-8 rounded-xl shadow-lg w-[350px] min-h-[480px] space-y-5"
      >
        <UsernameInput
          placeholder="Username"
          name="username"
          label="Username"
          register={register}
          errors={errors}
          validationRules={{
            required: "Username is required",
            minLength: {
              value: 4,
              message: "Username must be at least 4 characters",
            },
          }}
        />

        <PasswordInput
          placeholder="Password"
          name="password"
          register={register}
          errors={errors}
          validationRules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />

        <PasswordInput
          placeholder="Confirm Password"
          name="confirmPassword"
          register={register}
          errors={errors}
          validationRules={{
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          }}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <FormFooter
          question="Already have an account?"
          linkText="Log in."
          linkTo="/"
        />
      </form>
    </div>
  );
}
