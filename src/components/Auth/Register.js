import './Register.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiService';
import { toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const validatePassword = (pw) => {
        return /[A-Z]/.test(pw) &&
            /[a-z]/.test(pw) &&
            /[0-9]/.test(pw) &&
            /[^A-Za-z0-9]/.test(pw) &&
            pw.length > 4;
    }

    const handleRegister = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        if (!isValidEmail) {
        toast.error("Invalid email");
        return;
        }
        if (!isValidPassword) {
        toast.error(
            "Password must be at least 5 characters, include uppercase, lowercase, number, and special character"
        );
        return;
        }
        

        //submit api
        let data = await postRegister(email, password, username);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

return (
    <div className="register-container">
        <div className="header"><span>Already have an account?</span><button onClick={() => navigate('/login')} className='btn-signup'>Log in</button></div>
        <div className="title col-4 mx-auto">QWQ</div>
        <div className="welcome col-4 mx-auto">Start your journey?</div>
        <div className="content-form col-4 mx-auto">
            <div className='form-group'>
                <label>Email(*)</label>
                <input type="email" id="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>Password(*)</label>
                <input type="password" id="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>Username</label>
                <input type="text" id="username" className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <button className='btn-login btn'onClick={() => handleRegister()}>Create an account</button>
            </div>
            <div className='text-center'><span className='back' onClick={()=> { navigate('/')}}>&#60;&#60; Go to Homepage</span></div>
        </div>
    </div>
  );
};
export default Register;
