export const getUser = () => {
    const userStr = sessionStorage.getItem("user");
    if(userStr){
        return JSON.parse(userStr);
    }else{
        return null;
    }
}

export const getToken = () =>{
    const token = sessionStorage.getItem('token');
    //console.log(token);
    if(token){
        return token;
    }else{
        return null;
    }
}

export const removeUserFromSession = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('pcache');
    sessionStorage.removeItem('admin');
}

export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
}

export const setPermission = (permission) => {
    sessionStorage.setItem('pcache', JSON.stringify(permission));
}
export const getPermission = () => {
    const permission = sessionStorage.getItem('pcache');
    if(permission){
        return JSON.stringify(permission);  
    }else{
        return null;
    }
}

