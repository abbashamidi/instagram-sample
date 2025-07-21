import React from "react";

export default function UsernameInput({ label, placeholder, register, name, errors, type = "text", autoComplete = "off" }) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, { required: `${label} is required` })}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
