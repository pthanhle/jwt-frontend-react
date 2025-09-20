import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { deleteRoles, fetchAllRoles } from '../../services/roleService'
import { toast } from "react-toastify"

const TableRole = forwardRef((props, ref) => {

    const [listRoles, setListRoles] = useState([])

    const handleDeleteRole = async (role) => {
        let res = await deleteRoles(role)
        if (res && +res.EC === 0) {
            toast.success(res.EM)
            await getAllRoles();
        }
    }

    const getAllRoles = async () => {
        let res = await fetchAllRoles()
        if (res && +res.EC === 0) {
            setListRoles(res.DT)
        }
    }

    useEffect(() => {
        getAllRoles()
    }, [])

    useImperativeHandle(ref, () => ({
        async fetchListRolesAgain() {
            await getAllRoles();
        }
    }));

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">URL</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ?
                        <>
                            {listRoles.map((item, index) => {
                                return (
                                    <tr key={`row-${index}`}>
                                        <th>{item.id}</th>
                                        <td>{item.url}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <button
                                                title='Delete'
                                                className='btn btn-outline-danger delete'
                                                onClick={() => handleDeleteRole(item)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                        :
                        <>
                            <tr>
                                <td colSpan={4}>  Not found roles</td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
        </>
    )
})

export default TableRole