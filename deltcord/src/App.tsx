import Login from "./components/login/Login"
import Navbar from "./components/navbar/Navbar"

function App() {


  return (
    <div className="App h-screen bg-slate-800">
      <div className="bg-red">
        {/* <Navbar  /> */}
        <div className="navbar flex flex-col justify-center items-center">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Detacord</a>
          </div>
        </div>
        <Login />
      </div>
    </div>
  )
}

export default App
