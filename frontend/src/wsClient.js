function wsClinet(setMessages, message, messages,allowSend, setAllowSend) {
  try {
        const ws = new WebSocket("ws://localhost:8081");
        
        ws.onopen = (socket) => {
            
            if(allowSend) {
              ws.send(JSON.stringify(message));
              setAllowSend(false)
            }
          };
          ws.onmessage = ({ data }) => {
            
            // const {userId} = JSON.parse(data)
            // messagesHandler([...messages, JSON.parse(data)]);
            setMessages([...messages, JSON.parse(data)])
          };

        
        
    } catch(e) {
        console.log(e)
    }
  }
// wsClinet()