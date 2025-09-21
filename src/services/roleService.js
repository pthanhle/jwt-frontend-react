import axios from "../setup/axios"

const createRoles = (roles) => {
    return axios.post(`/role/create`, [...roles])
}

const fetchAllRoles = () => {
    return axios.get(`/role/read`)
}

const deleteRoles = (role) => {
    return axios.delete(`/role/delete`, { data: { id: role.id } })
}

const fetchRolesByGroup = (groupId) => {
    return axios.get(`/role/by-group/${groupId}`)

}

export {
    createRoles, deleteRoles, fetchAllRoles, fetchRolesByGroup
}