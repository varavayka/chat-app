import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./components/loginForm/Login";
// import Messenger from "./components/messenger/Messenger";
// const navigate = useNavigate()
function App() {
  const [transferInputData ,setTransferInputData] = useState({})
  
  useEffect(() => {
    async function httpRequest() {
      
        const [ jwt, userAuthenticated] = await (await fetch('http://localhost:9090/authentication', {body: JSON.stringify(transferInputData), headers: {'Content-type': 'application/json charset=UTF-8'} ,method:'POST'})).json()
        console.log('ok')
      

    }
    // httpRequest()
   }, [transferInputData])
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login transferInputData={setTransferInputData} />} />
         {/* <Route path="messenger" element={<Messenger />} />  */}
      </Routes>
    </div>
  );
}

export default App;
