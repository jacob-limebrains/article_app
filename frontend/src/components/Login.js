import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";

import APIService from "../APIService";

const Login = ({history}) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRe_Password] = useState('');
    const [token, setToken] = useCookies(['mytoken'])
    const [usernameCookie, setUsernameCookie] = useCookies(['username'])

    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (token['mytoken']) {
            setUsernameCookie('username', username);
            history.push('/articles')
        }
    }, [token, usernameCookie])

    const handleUsernameChange = (e) => {
        setUserName(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleRe_PasswordChange = (e) => {
        setRe_Password(e.target.value)
    }

    const handleUserLogin = () => {
        APIService.LoginUser({
            username,
            password
        }).then(response => {
            setToken('mytoken', response.token)
        })
            .catch(error => console.log(error));
    }

    const handleUserRegister = () => {
        if (password != re_password) {
            alert("Password and re_password must be the same!!")
        } else {
            APIService.RegisterUser({
                username,
                password,
            }).then(response => console.log(response))
                .then(response => {
                    console.log(response)
                    setIsLogin(true);
                    handleUserLogin();
                    alert("Successed register! Now you can login")
                })
                .catch(err => {
                    console.log(err);
                    alert("Something went wrong! Maybe bad request?")
                })
        }
    }

    return (
        <div className='App bg-dark text-white'>
            <div className='container' style={{marginTop: 30}}>
                {isLogin ? <h1>Login</h1> : <h1>Register</h1>}
                <div className='mb-3'>
                    <label htmlFor='username' className='form-label'>Username:</label>
                    <input type='text' className='form-control' id='username' placeholder='Username'
                           onChange={handleUsernameChange} value={username}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>Password:</label>
                    <input type='password' className='form-control' id='password' placeholder='Password'
                           onChange={handlePasswordChange} value={password}/>
                </div>
                {!isLogin ? <div className='mb-3'>
                    <label htmlFor='re_password' className='form-label'>Re_password:</label>
                    <input type='password' className='form-control' id='re_password' placeholder='Re_password'
                           onChange={handleRe_PasswordChange} value={re_password}/>
                </div> : null}
                {isLogin ? <button className='btn btn-primary' onClick={handleUserLogin}>Login</button> :
                    <button className='btn btn-primary' onClick={handleUserRegister}>Register</button>}

                <div className='mb-3' style={{marginTop: 20}}>
                    {isLogin ?
                        <h5>Don't have ann account? <button className='btn btn-outline-info'
                                                            onClick={() => setIsLogin(false)}>Register</button>
                        </h5> : <h5>Already have an account? <button className='btn btn-outline-info'
                                                                     onClick={() => setIsLogin(true)}>Login</button></h5>}
                </div>
            </div>
        </div>
    );
}

export default Login;