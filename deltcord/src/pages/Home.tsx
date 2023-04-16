import React from 'react'
import { Link } from 'react-router-dom'
import useDeltaStore from '../store/store'

const Home = () => {

  return (
    <div className=''>
         Welcome to
         <br />
         {/* <button onClick={()=>setUser(nuser)}>sample user</button> */}

         <br />
            <Link to="/auth">login</Link>
    </div>
  )
}

export default Home