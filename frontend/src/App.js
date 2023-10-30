import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./components/loginForm/Login";
import Messenger from "./components/messenger/Messenger";

function App() {
  const [inputData, setInputData] = useState({})
  const [switchPath, setSwitchPath] = useState('authentication')
  useEffect(() => {
    (async () => {
      if((inputData.email || inputData.password) || inputData.username) {
        const dataRequest = {body: JSON.stringify(inputData), headers: {'Content-Type': 'application/json; charset=UTF-8'}, method:'POST'}
        const response = await (await  fetch(`http://localhost:9090/${switchPath}`,dataRequest)).json()
        localStorage.setItem('jwt', JSON.stringify(response))
        console.log(response)
      }
      
    })()
    console.log(switchPath)
  }, [inputData, switchPath])
 

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setInputData={setInputData} setSwitchPath={setSwitchPath}/>} />
        {/* <Route path="/messenger" element={<Messenger />} /> */}
      </Routes>
    </div>
  );
}

export default App;
