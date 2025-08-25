import './Login.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        //validate

        //submit api
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/');
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

  return (
    <div className="login-container">
        <div className="header">Don't have an account yet?<button className='btn-signup'>Sign up</button></div>
        <div className="title col-4 mx-auto">QWQ</div>
        <div className="welcome col-4 mx-auto">Hello, who's this</div>
        <div className="content-form col-4 mx-auto">
            <div className='form-group'>
                <label>Email</label>
                <input type="email" id="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input type="password" id="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <span className='forgot-password'>Forgot your password?</span>
            <div>
                <button className='btn-login btn'onClick={() => handleLogin()}>Log in to QWQ</button>
            </div>
            <div className='text-center'><span className='back' onClick={()=> { navigate('/')}}>&#60;&#60; Go to Homepage</span></div>
        </div>
    </div>
  );
};
export default Login;
