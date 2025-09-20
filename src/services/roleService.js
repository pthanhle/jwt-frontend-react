import axios from "../setup/axios"

const createRoles = (roles) => {
    return axios.post(`/role/create`, [...roles])
}

const fetchAllRoles = () => {
    return axios.get(`/role/read`,)
}

const deleteRoles = (role) => {
    return axios.delete(`/role/delete`, { data: { id: role.id } })
}

export {
    createRoles, deleteRoles, fetchAllRoles
}