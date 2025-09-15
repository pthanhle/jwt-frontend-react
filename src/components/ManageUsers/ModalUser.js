import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import './User.scss'
import { fetchGroup, updateCurrentUser, createNewUser } from '../../services/userService'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import _ from "lodash"

const ModalUser = (props) => {

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }

    const [validInputs, setValidInputs] = useState(validInputsDefault)
    const [userData, setUserData] = useState(defaultUserData)
    const [userGroups, setUserGroups] = useState([])

    const fetchGroupUser = async () => {
        let res = await fetchGroup()
        if (res && res.EC === 0) {
            setUserGroups(res.DT)
            if (res.DT && res.DT.length > 0) {
                let groups = res.DT
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(res.EM)
        }
    }

    const handleOnChangeInput = (value, name) => {
        const cloneUserData = _.cloneDeep(userData)
        cloneUserData[name] = value

        setUserData(cloneUserData)
    }

    const checkValidInputs = () => {
        if (props.action === 'EDIT') return true;

        // Reset validInputs về giá trị mặc định
        setValidInputs(validInputsDefault);
        let arr = ['email', 'phone', 'password', 'group'];
        let check = true;

        // Regex để kiểm tra định dạng
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email
        const phoneRegex = /^[0-9]{10}$/; // Số điện thoại 10 chữ số
        const passwordMinLength = 6; // Độ dài tối thiểu của mật khẩu

        for (let i = 0; i < arr.length; i++) {
            let field = arr[i];
            let _validInputs = _.cloneDeep(validInputsDefault);

            // Kiểm tra trường rỗng
            if (!userData[field]) {
                _validInputs[field] = false;
                setValidInputs(_validInputs);
                toast.error(`Empty input ${field}`);
                check = false;
                break;
            } else {
                // Kiểm tra định dạng email
                if (field === 'email' && !emailRegex.test(userData[field])) {
                    _validInputs[field] = false;
                    setValidInputs(_validInputs);
                    toast.error(`Invalid email format`);
                    check = false;
                    break;
                }
                // Kiểm tra định dạng số điện thoại
                if (field === 'phone' && !phoneRegex.test(userData[field])) {
                    _validInputs[field] = false;
                    setValidInputs(_validInputs);
                    toast.error(`Invalid phone number. Must be 10 digits`);
                    check = false;
                    break;
                }
                // Kiểm tra độ dài mật khẩu
                if (field === 'password' && userData[field].length < passwordMinLength) {
                    _validInputs[field] = false;
                    setValidInputs(_validInputs);
                    toast.error(`Password must be at least ${passwordMinLength} characters`);
                    check = false;
                    break;
                }
            }
        }

        return check;
    };

    const handleConfirmUser = async () => {
        //create user
        let check = checkValidInputs()
        if (check) {

            let res = props.action === "CREATE" ?
                await createNewUser({ ...userData, groupId: userData['group'] })
                : await updateCurrentUser({ ...userData, groupId: userData['group'] })
            if (res && res.EC === 0) {
                props.handleClose()
                setUserData({ ...defaultUserData, group: userGroups && userGroups.length > 0 ? userGroups[0].id : '' })
                props.onUserCreated();
            }
            if (res && res.EC != 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault)
                _validInputs[res.DT] = false
                setValidInputs(_validInputs)
            }
        }
    }

    const handleCloseModalUser = () => {
        props.handleClose();
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
    }

    useEffect(() => {
        fetchGroupUser();
    }, [])

    useEffect(() => {
        if (props.action === "EDIT") {
            setUserData({
                ...props.dataModalUser,
                group: props.dataModalUser.Group
                    ?
                    props.dataModalUser.Group.id : ''
            })
        }
    }, [props.dataModalUser])

    useEffect(() => {
        if (props.action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id })
            }
        }
    }, [props.action])

    return (
        <Modal
            size="lg"
            className="modal-user"
            show={props.show}
            onHide={props.handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>{props.action === "CREATE" ? 'Create new user' : 'Edit a user'}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="content-body row">
                    <div className="col-12 col-sm-6 form-group">
                        <label>Email address (<span className="red">*</span>) :</label>
                        <input
                            disabled={props.action === "CREATE" ? false : true}
                            className={validInputs.email === true ? 'form-control' : 'form-control is-invalid'}
                            type="email"
                            value={userData.email}
                            onChange={(event) => handleOnChangeInput(event.target.value, "email")}
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label>Phone number (<span className="red">*</span>) :</label>
                        <input
                            disabled={props.action === "CREATE" ? false : true}
                            className={validInputs.phone === true ? 'form-control' : 'form-control is-invalid'}
                            type="text"
                            value={userData.phone}
                            onChange={(event) => handleOnChangeInput(event.target.value, "phone")}

                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label>Username: </label>
                        <input
                            className={validInputs.username === true ? 'form-control' : 'form-control is-invalid'}
                            type="text"
                            value={userData.username}
                            onChange={(event) => handleOnChangeInput(event.target.value, "username")}

                        />
                    </div>

                    <div className="col-12 col-sm-6 form-group">
                        {
                            props.action === 'CREATE' &&
                            <>
                                <label>Password:  (<span className="red">*</span>) :</label>
                                <input
                                    className={validInputs.password === true ? 'form-control' : 'form-control is-invalid'}
                                    type="password"
                                    value={userData.password}
                                    onChange={(event) => handleOnChangeInput(event.target.value, "password")}
                                />
                            </>
                        }
                    </div>


                    <div className="col-12 col-sm-12 form-group">
                        <label>Address:</label>
                        <input
                            className={validInputs.address === true ? 'form-control' : 'form-control is-invalid'}
                            type="text"
                            value={userData.address}
                            onChange={(event) => handleOnChangeInput(event.target.value, "address")}

                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label>Gender: </label>
                        <select
                            className="form-select"
                            onChange={(event) => handleOnChangeInput(event.target.value, "sex")}

                        >
                            <option defaultValue='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                        </select >
                    </div>
                    <div className="col-12 col-sm-6 form-group">
                        <label>Group:  (<span className="red">*</span>) :</label>
                        <select
                            className={validInputs.group === true ? 'form-select' : 'form-select is-invalid'}
                            onChange={(event) => handleOnChangeInput(event.target.value, "group")}
                            value={userData.group}
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
                <Button variant="secondary" onClick={() => handleCloseModalUser()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleConfirmUser()}>
                    {props.action === 'CREATE' ? 'Save' : 'Update'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUser;