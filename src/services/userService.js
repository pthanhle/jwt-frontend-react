import axios from "../setup/axios"

const registerNewUser = (email, phone, username, password) => {
    return axios.post('/register', {
        email, phone, username, password
    })
}

const loginUser = (valueLogin, password) => {
    return axios.post('/login', {
        valueLogin, password
    })
}
const getAllUser = (page, limit) => {
    return axios.get(`/user/read?page=${page}&limit=${limit}`)
}

const deleteUser = (user) => {
    return axios.delete('/user/delete', { data: { id: user.id } })
}

const fetchGroup = () => {
    return axios.get(`/group/read`)
}

const createNewUser = (userData) => {
    return axios.post(`/user/create`, { ...userData })
}

const updateCurrentUser = (userData) => {
    return axios.put(`/user/update`, { ...userData })
}

export { registerNewUser, loginUser, getAllUser, deleteUser, fetchGroup, createNewUser, updateCurrentUser };