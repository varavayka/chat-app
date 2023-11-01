import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./components/loginForm/Login";
import Messenger from "./components/messenger/Messenger";
function App() {
  const [inputData, setInputData] = useState({})
  const [requestPath, setRequestPath] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      if((inputData.email || inputData.password) || inputData.username) {
        const dataRequest = {body: JSON.stringify(inputData), headers: {'Content-Type': 'application/json; charset=UTF-8'}, method:'POST'}
        const response = await (await  fetch(`http://localhost:9090/${!requestPath ? 'authentication' : 'registration' }`,dataRequest)).json()
        if(!requestPath) {
          if(!response.userSearch) {
            console.log('пароль или почта не верны')
            return 
          }
          if(response.userSearch) {
            navigate('messenger')
            return  localStorage.setItem('jwt', JSON.stringify(response))

          }
        }
        return 
      }
      
    })()
    
    
  }, [inputData, requestPath, navigate])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setInputData={setInputData} setSwitchPath={setRequestPath}/>} />
         <Route path="messenger" element={<Messenger/>} /> 
      </Routes>
    </div>
  );
}

export default App;
