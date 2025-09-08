import './Register.scss'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';

const Register = (props) => {
    let history = useHistory();
    const handleLogin = () => {
        history.push("/login")
    }

    useEffect(() => {
        axios.get("https://reqres.in/api/users?page=2", {
            headers: {
                'x-api-key': 'reqres-free-v1',
                'Content-Type': 'application/json',
            }
        }).then(data => {
            console.log("✅ Dữ liệu:", data);
        }).catch(err => {
            console.error("❌ Lỗi:", err.response);
        });
    }, []);


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
                            <input type='text' className='form-control' placeholder='Email address' />
                        </div>
                        <div className='form-group'>
                            <label>Phone Number: </label>
                            <input type='text' className='form-control' placeholder='Phone number' />
                        </div>
                        <div className='form-group'>
                            <label>Username: </label>
                            <input type='text' className='form-control' placeholder='Username' />
                        </div>
                        <div className='form-group'>
                            <label>Password: </label>
                            <input type='password' className='form-control' placeholder='Password' />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password: </label>
                            <input type='password' className='form-control' placeholder='Re-enter Password' />
                        </div>
                        <button className='fb-register-btn'>Register</button>
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