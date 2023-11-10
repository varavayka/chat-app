

async function registration(url, {body,headers,method}) {
    try {
        const {registrationStatus, resultFind} = await (await fetch(url,{body,headers,method} )).json()
        if(registrationStatus) {
            return {registrationStatus, message: 'Пользователь зарегистрирован'}
        }
    
        if(!registrationStatus) {
    
            if(resultFind) {
                return {registrationStatus, resultFind, message: 'Пользователь существует'}
            }
            return {resultFind, registrationStatus }
        }
        return

    }catch(e) {
        console.log(e)
    }
}

export default registration