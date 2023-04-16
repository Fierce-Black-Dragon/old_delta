import React, { ChangeEvent } from "react";

interface InputProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e:any)=>void;
  label: string;
  placeholder: string;
  value: string;
  errors:string;
  type: "text" | "number" | "email"| "password"; // specify the input type
  name: string;
  iserror:boolean;
}

export const Input = ({
  handleChange,
  placeholder,
  label,
  value,
  errors,
  iserror,
  type,
  handleBlur,
  name,
}: InputProps) => {
 return(
    <div className="pb-2">
    <label
      htmlFor={name}
      className={`block font-latoBold text-sm pb-2 ${
       iserror
          ? "text-red-400"
          : ""
      } `}
    >
      {iserror
        ? errors
        : label}
    </label>
    <p className="text-sm font-latoBold text-red-400 "></p>
    <input
      className="border-2 bg-white border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500 "
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      onBlur={handleBlur}
    />
  </div>
  );
};
