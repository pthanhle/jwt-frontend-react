import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import './User.scss'
import { fetchGroup } from '../../services/userService'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { values } from "lodash"

const ModalUser = (props) => {

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [sex, setSex] = useState('')
    const [group, setGroup] = useState('')

    const [userGroups, setUserGroups] = useState([])

    const fetchGroupUser = async () => {
        let res = await fetchGroup()
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT)
        } else {
            toast.error(res.data.EM)
        }
    }

    useEffect(() => {
        fetchGroupUser();
    }, [])
    return (
        <Modal
            size="lg"
            className="modal-user"
            show={props.show}
            onHide={props.handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>{props.title}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="content-body row">
                    <div className="col-12 col-sm-6 form-group">
                        <label>Email address (<span className="red">*</span>) :</label>
                        <input
                            className="form-control"
                            type="email"
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label>Phone number (<span className="red">*</span>) :</label>
                        <input
                            className="form-control"
                            type="text"
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label>Username: </label>
                        <input
                            className="form-control"
                            type="text"
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label>Password:  (<span className="red">*</span>) :</label>
                        <input
                            className="form-control"
                            type="password"
                        />
                    </div>
                    <div className="col-12 col-sm-12 form-group">
                        <label>Address:</label>
                        <input
                            className="form-control"
                            type="text"
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label>Gender: </label>
                        <select
                            className="form-select"
                        >
                            <option defaultValue='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                        </select >
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label>Group:  (<span className="red">*</span>) :</label>
                        <select
                            className="form-select"
                        >
                            {userGroups.length > 0 && userGroups.map((item, index) => {
                                return (
                                    <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                )
                            })
                            }
                        </select >
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUser;