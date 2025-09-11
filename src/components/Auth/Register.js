import './Register.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiService';
import { toast } from 'react-toastify';
import Language from '../Header/Languages';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const { t } = useTranslation();

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
        toast.error(t('register.error.invalidEmail'));
        return;
        }
        if (!isValidPassword) {
        toast.error(
            t('register.error.invalidPassword')
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
        <div className="header"><span>{t('register.alreadyHaveAccount')}</span><button onClick={() => navigate('/login')} className='btn-signup'>{t('register.login')}</button><Language/></div>
        <div className="title col-4 mx-auto">{t('register.title')}</div>
        <div className="welcome col-4 mx-auto">{t('register.welcome')}</div>
        <div className="content-form col-4 mx-auto">
            <div className='form-group'>
                <label>{t('register.email')}</label>
                <input type="email" id="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>{t('register.password')}</label>
                <input type="password" id="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>{t('register.username')}</label>
                <input type="text" id="username" className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <button className='btn-login btn'onClick={() => handleRegister()}>{t('register.createAccount')}</button>
            </div>
            <div className='text-center'><span className='back' onClick={()=> { navigate('/')}}>{t('register.backHome')}</span></div>
        </div>
    </div>
  );
};
export default Register;
