import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import banner from "../../assets/logobanner.png";
import useAxiosQuery from "../../hooks/useAxiosQuery";
import endpoints from "../../api/endpoints";
import { useMutation, useQuery } from "react-query";
import { axiosPrivate } from "../../api/axiosApi";
import useDeltaStore from "../../store/store";
import { useNavigate } from "react-router-dom";
interface propsType {
  typeOfForm: string;
  url: string;
  loading: boolean;
}
export const LoginORsignup = ({ typeOfForm, url, loading }: propsType) => {
  // const [newuser, setNewUser] = useState(false);
  const github = () => {
    window.open("http://localhost:4000/auth/github", "_self");
  };
  const { user, setUser } = useDeltaStore();
  const navigate = useNavigate();
  interface FormValues {
    username: string;
    password: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    confirmpassword?: string;
  }

  let initialValues: FormValues = {
    username: "",
    password: "",
  };

  if (typeOfForm === "signup") {
    initialValues = {
      ...initialValues,
      email: "",
      firstName: "",
      lastName: "",
      confirmpassword: "",
    };
  }

  const loginValidationSchema = Yup.object({
    username: Yup.string()
      .max(20, "Name must be 20 characters or less.")
      .required("Name is required"),
    password: Yup.string().required("Password is required"),
  });

  const signupValidationSchema = Yup.object({
    username: Yup.string()
      .max(20, "Name must be 20 characters or less.")
      .required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmpassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  });

  const validationSchema =
    typeOfForm === "signup" ? signupValidationSchema : loginValidationSchema;
  const handlelog = async (values: FormValues) => {
    let url = typeOfForm === "signup" ? endpoints.SIGNUP : endpoints.LOGIN;
    console.log(url);
    console.log(values);
    const response = await axiosPrivate.post(url, JSON.stringify(values));
    const user = response.data;
    return user;
  };

  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log("form submitted");
      try {
        const { data } = await mutateAsync(values);
        setUser(data.user);

        console.log(data);
        navigate("/chats");
      } catch (error) {
        console.log(error);
      }
    },
  });
  const {
    mutateAsync,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation(
    handlelog
    // { staleTime: 3000 }
  );
  return (
    <div
      className={"mt-14 w-full " + `${loading ? ` blur-sm  animate-flip` : ""}`}
    >
      <main className="  items-center flex justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="flex bg-white rounded-lg  font-latoRegular sm:  m-2   lg: w-1/2 "
          // style={{ background: "#f4f4f6" }}
        >
          <div className="flex-1 text-gray-700  sm: p-3">
            <h1 className="text-3xl pb-2 font-latoBold">
              {/* Let's get started 👋 */}
              {typeOfForm === "signup" ? "Let's get started 👋 " : "Login"}
            </h1>
            <p className="text-lg  text-gray-500"></p>
            <div className="mt-4 ">
              {/* Name input field */}
              <div className="pb-2">
                {/* handleChange, placeholder, label, value, errors, iserror, type,
                handleBlur, name, */}
                <Input
                  handleChange={formik.handleChange}
                  placeholder="Enter your username || Email"
                  type="text"
                  value={formik.values.username}
                  errors={formik.errors.username || ""}
                  name="username"
                  label="Username"
                  handleBlur={formik.handleBlur}
                  iserror={
                    formik.touched.username && formik.errors.username
                      ? true
                      : false
                  }
                />
              </div>
              {typeOfForm === "signup" && (
                <>
                  <div className="pb-2">
                    <Input
                      handleChange={formik.handleChange}
                      placeholder="Enter your first name"
                      type="text"
                      value={formik.values.firstName || ""}
                      errors={formik.errors.firstName || ""}
                      name="firstName"
                      label="First Name"
                      handleBlur={formik.handleBlur}
                      iserror={
                        formik.touched.firstName && formik.errors.firstName
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="pb-2">
                    <Input
                      handleChange={formik.handleChange}
                      placeholder="Enter your last name"
                      type="text"
                      value={formik.values.lastName || ""}
                      errors={formik.errors.lastName || ""}
                      name="lastName"
                      label="Last Name"
                      handleBlur={formik.handleBlur}
                      iserror={
                        formik.touched.lastName && formik.errors.lastName
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="pb-2">
                    <Input
                      handleChange={formik.handleChange}
                      placeholder="Enter your Email"
                      type="email"
                      value={formik.values.email || ""}
                      errors={formik.errors.email || ""}
                      name="email"
                      label="Email"
                      handleBlur={formik.handleBlur}
                      iserror={
                        formik.touched.email && formik.errors.email
                          ? true
                          : false
                      }
                    />
                  </div>
                </>
              )}
              {/* Email input field */}
              <div className="pb-2">
                <Input
                  handleChange={formik.handleChange}
                  placeholder="Enter your password"
                  type="password"
                  value={formik.values.password}
                  errors={formik.errors.password || ""}
                  name="password"
                  label="password"
                  handleBlur={formik.handleBlur}
                  iserror={
                    formik.touched.password && formik.errors.password
                      ? true
                      : false
                  }
                />
              </div>
              {typeOfForm === "signup" && (
                <div className="pb-2">
                  <Input
                    handleChange={formik.handleChange}
                    placeholder="Enter above password"
                    type="password"
                    value={formik.values.confirmpassword || ""}
                    errors={formik.errors.confirmpassword || ""}
                    name="confirmpassword"
                    label="Confirm Password"
                    handleBlur={formik.handleBlur}
                    iserror={
                      formik.touched.confirmpassword &&
                      formik.errors.confirmpassword
                        ? true
                        : false
                    }
                  />
                </div>
              )}

              <button
                type="submit"
                className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-2 rounded-lg w-full"
              >
                {typeOfForm === "signup" ? "Create " : "Login"}
                {/* Login  */}
              </button>
            </div>
          </div>
          <div className="hidden sm:block md:block lg:block w-80">
            <img
              className="object-cover rounded-lg image-full w-80"
              style={{
                height: `${typeOfForm === "signup" ? "45rem" : ""}`,
              }}
              src={banner}
              alt="form-learn"
            />
          </div>
        </form>
      </main>
    </div>
  );
};
