import Login from "./components/login/Login"
import Navbar from "./components/navbar/Navbar"

function App() {


  return (
    <div className="App h-screen bg-slate-800">
      <div className="bg-red">
        <Navbar />
        <Login />
      </div>
    </div>
  )
}

export default App
