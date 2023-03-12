import { Route, Routes } from "react-router-dom";

import RequreAuth from "./components/login/RequreAuth";
import AuthScreen from "./pages/AuthScreen";
import DashboardScreen from "./pages/DashboardScreen";

function App() {
  return (
    <div className="App h-screen bg-slate-800">
     
    <Routes>
      <Route path='/'  element={<>home</>}></Route>
      <Route path="/auth" element={<AuthScreen/>}></Route>
      <Route
          path='/chats'
          element={
          <RequreAuth>
            <DashboardScreen/>
          </RequreAuth>
          }
        />
    </Routes>
    </div>
  );
}

export default App;
