import React, { useState } from "react";
import endpoints from "../api/endpoints";
import { LoginORsignup } from "../components/login/Login";

const AuthScreen = () => {
  const [isSignup, setIsSignUp] = useState(false);
  const [loading, setloading] = useState(false);
  const handleOnClick = async () => {
    setIsSignUp(!isSignup);
    setloading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setloading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col lg:mt-10">
      {/* <Navbar  /> */}
      <div className="navbar flex flex-col justify-center items-center">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Detacord</a>
        </div>
      </div>
      {/* <div className={loading?`animate-pulse`:""}> */}
      {isSignup ? (
        <LoginORsignup
          typeOfForm="signup"
          url={endpoints.SIGNUP}
          loading={loading}
        />
      ) : (
        <LoginORsignup
          typeOfForm="login"
          url={endpoints.LOGIN}
          loading={loading}
        />
      )}
      {/* </div> */}
      <div className="">
        <button
          onClick={handleOnClick}
          className="btn btn-link normal-case text-white "
        >
          {isSignup ? "Already a member?" : "Don't have an account yet?"}
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
