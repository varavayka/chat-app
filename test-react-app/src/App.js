import {useEffect, useState, useRef, useCallback} from 'react'
import {v4} from 'uuid'
function App() {
  const [dataInput, setDataInput] = useState('')
  const [dataDisplay,setDataDisplay] = useState([])
  const [allowSend, setAllowSend] = useState(false)
  const ws = useRef(null)
  useEffect(() => {
     ws.current = new WebSocket('ws://localhost:7777/')

     return () => ws.current.close()
  },[])


  useEffect(() => {
    ws.current.onmessage = ({data}) => {
      setDataDisplay([...dataDisplay, data])
    }
  }, [dataDisplay])

  // const sendMessage = useCallback((dataInput) => {
  //   if(dataInput)
  //   ws.current.send(JSON.stringify({message:dataInput}))
  // },[])
  
  function sendMessage(dataInput) {
    if(dataInput)
    ws.current.send(JSON.stringify({message:dataInput}))
  }
  return (
    <div className="App">
      
      <input type='text' placeholder='input text' onChange={(({target:{value}}) => setDataInput(value))} value={dataInput}/>
      <button onClick={() => {
        sendMessage(dataInput)
      }
        }>send Message</button>
      {!dataDisplay.length ? 'Сообщений пока нет': dataDisplay.map((message) => <h1 className='display' key={v4()}>{JSON.parse(message).message}</h1>)}
      
    </div>
  );
}

export default App;
