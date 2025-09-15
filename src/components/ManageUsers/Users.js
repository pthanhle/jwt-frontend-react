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
    const [currentLimit, setCurrentLimit] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    const [dataModal, setDataModal] = useState({}) //Modal delete user
    const [actionModalUser, setActionModalUSer] = useState('CREATE')
    const [dataModalUser, setDataModalUser] = useState({}) //Modal update/create user

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

    const handleEditUser = (user) => {
        setDataModalUser(user)
        setIsShowModalUser(true)
        setActionModalUSer('EDIT')
    }

    const handleCreateUser = () => {
        setIsShowModalUser(true)
        setActionModalUSer('CREATE')
    }

    const handleClose = () => {
        setIsShowModalDelete(false)
        setIsShowModalUser(false)
        setDataModal({})
        setDataModalUser({})
    }

    const handleRefresh = async () => {
        await fetchUserData();
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
                    <div className='title mt-3'>
                        <h3>Manage User</h3>
                    </div>
                    <div className='action my-3'>
                        <button
                            className='btn btn-outline-primary refresh'
                            onClick={() => handleRefresh()}
                        >
                            <i className="fa fa-refresh"></i>&nbsp;Refresh
                        </button>
                        <button
                            className='btn btn-outline-success'
                            onClick={() => handleCreateUser()}
                        >
                            <i className="fa fa-plus-circle" ></i>&nbsp;Add New User
                        </button>
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
                                                <th>{(currentPage - 1) * currentLimit + index + 1}</th>
                                                <th>{item.id}</th>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                                <td>
                                                    <button
                                                        title='Edit'
                                                        className='btn btn-outline-warning edit'
                                                        onClick={() => handleEditUser(item)}
                                                    >
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                    <button
                                                        title='Delete'
                                                        className='btn btn-outline-danger delete'
                                                        onClick={() => handleDeleteUser(item)}
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
                show={isShowModalUser}
                handleClose={handleClose}
                onUserCreated={fetchUserData}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    )
}

export default Users