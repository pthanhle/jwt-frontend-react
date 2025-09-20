import axios from "../setup/axios"

const createRoles = (roles) => {
    return axios.post(`/role/create`, [...roles])
}

export {
    createRoles
}