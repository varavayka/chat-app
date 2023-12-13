

const buttonHandler  = (setState,state,  toggleMode, newState=null, debuggCb) => {
    // forward=null, forwardData, data, debuggCb
    if(toggleMode ) {
        return (e) =>  !state ? setState(!state) : setState(!state)
    }
    return (e) => {
        setState(newState)
        // if(forward)
        // forward(newState)
        // forwardData(data) 
        debuggCb()
    }
}
export default buttonHandler