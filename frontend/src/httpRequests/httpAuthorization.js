
async function authorization(url, {headers,method}) {
    try {

        const {authorization, authorized, tokenFound, message} = await (await fetch(url,{headers,method} )).json()
        if(authorization) {
            return true
        }
        if(!authorized || !tokenFound) {
            return false
        }
        
    } catch(e) {
        console.log(e)
    }
}

export default authorization