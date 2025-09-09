import { useState } from 'react';
import './Login.scss'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';

const Login = (props) => {

    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');

    const defaultobjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    }

    const [objValidInput, setObjValidInput] = useState(defaultobjValidInput)


    let history = useHistory();
    const handleCreateNewAccount = () => {
        history.push("/register")
    }

    const handleLogin = async () => {
        setObjValidInput(defaultobjValidInput)
        if (!valueLogin) {
            setObjValidInput({ ...defaultobjValidInput, isValidValueLogin: false })
            toast.error("Please enter your email address or phone number!")
            return;
        }
        if (!password) {
            setObjValidInput({ ...defaultobjValidInput, isValidPassword: false })
            toast.error("Please enter your password!")
            return;
        }

        let res = await loginUser(valueLogin, password)
    }

    return (
        <div className="login-container">
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
                        <input
                            type='text'
                            className={objValidInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Email address or phone number'
                            value={valueLogin}
                            onChange={(event) => setValueLogin(event.target.value)}
                        />
                        <input
                            type='password'
                            className={objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <button className='fb-login-btn' onClick={() => handleLogin()}>Log In</button>
                        <span className='text-center'>
                            <a className="forgot-password" href='#'>Forgot your password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='fb-create-btn' onClick={() => handleCreateNewAccount()}>
                                Create New Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;