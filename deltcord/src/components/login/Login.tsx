import React from 'react'

const Login = () => {
    return (
        <div className=' flex flex-col justify-center items-center'>

            <h3>Login</h3>
            <div className="flex flex-col w-full border-opacity-50">
                <div className="grid h-100 card  rounded-box place-items-center">

                    <form action="" className='grid grid-col-1 gap-6'>
                        <div className="flex  flex-col">
                            <label htmlFor="username"> Username</label>
                            <input type="text" placeholder="Type username  here" className="input w-full max-w-xs" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input type="text" placeholder="Type Password  here" className="input w-full max-w-xs" />
                        </div>
                        <div className="flex gap-1 justify-center items-center ">
                            <button className="btn btn-success">submit</button>
                        </div>
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