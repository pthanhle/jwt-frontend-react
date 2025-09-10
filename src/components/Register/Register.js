import './Register.scss'
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';

const Register = (props) => {

    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)
    const handleLogin = () => {
        history.push("/login")
    }

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput)
        if (!email) {
            toast.error("Email is required!")
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false;
        }

        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Please enter a valid email address!")
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false;
        }

        if (!phone) {
            toast.error("Phone is required!")
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false })
            return false;
        }

        if (!password) {
            toast.error("Password is required!")
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Your Password is not the same!")
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false })
            return false;
        }

        return true;
    }

    const handleRegister = async () => {
        let check = isValidInputs();
        if (check === true) {
            let res = await registerNewUser(email, phone, username, password)
            let serverData = res.data
            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                history.push('/login')
            } else {
                toast.error(serverData.EM)
            }
        }
    }

    return (
        <div className="register-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            facebook
                        </div>
                        <div className='detail'>
                            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                        </div>
                    </div>
                    <div className='logo d-sm-none'>
                        facebook
                    </div>
                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
                        <div className='form-group'>
                            <label>Email: </label>
                            <input
                                type='text'
                                className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Email address'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone Number: </label>
                            <input
                                type='text'
                                className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Phone number'
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Username: </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Username'
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password: </label>
                            <input
                                type='password'
                                className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password: </label>
                            <input
                                type='password'
                                className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Re-enter Password'
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <button
                            className='fb-register-btn'
                            onClick={() => handleRegister()}
                        >Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='fb-create-btn' onClick={() => handleLogin()}>
                                Already've an account. Log In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;