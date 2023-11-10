
async function authentication(url, {body,headers,method}, navigate, navigateUrl) {
    try {
        const {jwt, userAuthenticated} = await (await fetch(url,{body,headers,method} )).json()
        
        if(userAuthenticated) {
            localStorage.setItem('jwt', jwt)
            navigate(navigateUrl)
            return {userAuthenticated, message: 'Пользователь аутентифицирован'}
        }
        return {userAuthenticated, message: 'Пользователь не аутентифицирован'}

    } catch(e) {
        console.log(e)
    }
}

export default authentication