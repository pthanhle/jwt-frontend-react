import { useEffect, useState } from 'react'
import './User.scss'
import { useHistory } from 'react-router-dom'
import { getAllUser, deleteUser, fetchGroup } from '../../services/userService'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

const Users = (props) => {

    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(8)
    const [totalPages, setTotalPages] = useState(0)
    const [dataModal, setDataModal] = useState({})

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalUser, setIsShowModalUser] = useState(false)

    const fetchUserData = async (page) => {
        let res = await getAllUser(currentPage, currentLimit)
        if (res && res.data && res.data.EC === 0) {
            setListUsers(res.data.DT.users)
            setTotalPages(res.data.DT.totalPages)
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    };

    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)

    }

    const handleEditUser = () => {
        setIsShowModalUser(true)
    }

    const handleClose = () => {
        setIsShowModalDelete(false)
        setIsShowModalUser(false)
        setDataModal({})
    }

    const confirmDeleteUser = async () => {
        let res = await deleteUser(dataModal)
        if (res && res.data.EC === 0) {
            toast.success(res.data.EM)
            await fetchUserData();
            setIsShowModalDelete(false)
        } else {
            toast.error(res.data.EM)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [currentPage])

    return (
        <>
            <div className='manage-users-container container'>
                <div className='user-header'>
                    <div className='title'>
                        Table Users
                    </div>
                    <div className='action'>
                        <button className='btn btn-outline-primary'>Refresh</button>
                        <button className='btn btn-outline-success'>Add New User</button>
                    </div>
                </div>
                <div className='user-body'>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ?
                                <>
                                    {listUsers.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <th>{index + 1}</th>
                                                <th>{item.id}</th>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                                <td>
                                                    <button
                                                        className='btn btn-outline-warning mx-3'
                                                        onClick={() => handleEditUser()}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className='btn btn-outline-danger'
                                                        onClick={() => handleDeleteUser(item)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    <tr>
                                        <td>  Not found</td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table>
                </div>
                {totalPages > 0 &&
                    <div className='user-footer'>
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={3}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                }
            </div >

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                title="Create"
                show={isShowModalUser}
                handleClose={handleClose}
            />
        </>
    )
}

export default Users