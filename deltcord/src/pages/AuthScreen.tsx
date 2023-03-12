import React from 'react'
import Login from '../components/login/Login'

const AuthScreen = () => {
  return (
    <div> <div className="bg-red">
    {/* <Navbar  /> */}
    <div className="navbar flex flex-col justify-center items-center">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Detacord</a>
      </div>
    </div>

    <Login />
  </div></div>
  )
}

export default AuthScreen