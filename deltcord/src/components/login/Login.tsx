import React, { useState } from 'react'

const Login = () => {
    const [newuser, setNewUser] = useState(false)
    return (
        <div className=' flex flex-col justify-center items-center'>

            <h3>{newuser ? "Register" : "Login"}</h3>
            <div className="flex flex-col w-full border-opacity-50">
                <div className="grid h-100 card  rounded-box place-items-center">

                    <form action="" className='grid grid-col-1 gap-6'>
                        <div className="flex  flex-col">
                            <label htmlFor="username"> Username</label>
                            <input type="text" placeholder="Type username  here" className="input w-full max-w-xs" />
                        </div>

                        {newuser ?

                            <div className="flex flex-col">
                                <label htmlFor="email">Email</label>
                                <input type="text" placeholder="Type Password  here" className="input w-full max-w-xs" />
                            </div> : ""}
                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input type="text" placeholder="Type Password  here" className="input w-full max-w-xs" />
                        </div>
                        {newuser ? <div className="flex flex-col">
                            <label htmlFor="confirm_password"> Confirm Password</label>
                            <input type="text" placeholder="confirm Password  here" className="input w-full max-w-xs" />
                        </div>
                            : ''
                        }

                        <div className="flex gap-1 justify-center items-center ">
                            <button className="btn btn-success btn-sm">submit</button>
                        </div>
                        <button className='btn btn-ghost' onClick={(e) => {
                            e.preventDefault()
                            setNewUser(!newuser)
                        }}>{newuser ? "Existing user" : "register"}</button>
                    </form>
                </div>
                <div className="divider">OR</div>
                <div className="grid h-20 card  rounded-box place-items-center">
                    login with
                    <div className="flex gap-1 justify-center items-center ">
                        <p>google</p>
                        <p>github</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Login