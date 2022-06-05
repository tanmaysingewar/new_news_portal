const { API } = require("../backend");

export const authincate = (data)=> {

    if (JSON.stringify(data.error)) {
        return ''
    }
    if (typeof window !== 'undefined') {
        localStorage.setItem('login_user',JSON.stringify({token : data.token, user : data.user}))
    }
}


export const isAuthincated =()=> {
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('login_user')) {
        return JSON.parse(localStorage.getItem('login_user'))
    }else{
        return false
    }
}


export const createUser = (user) => {
    return fetch(`${API}/create`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}

export const loginUser = (user) => {
    return fetch(`${API}/login`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}   

export const postComment = (data) => {
    return fetch(`${API}/post/comment?p_id=${data.id}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}

export const deletPost = (id) => {
    return fetch(`${API}/post/delete?up_id=${id}`,{
        method: "DELETE",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}

export const deleteUser = (id) => {
    return fetch(`${API}/user/delete?_id=${id}`,{
        method: "DELETE",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err))
}
