import {useState} from "react";
import {useHistory} from 'react-router-dom';

import {auth} from "../utils/api";
import {getMessage} from "../utils/utils";
import SubmitButton from "../components/FormElements/SubmitButton";

const Login = ({setLoggedIn, setNotificationOpen, setNewCurrentUser}) => {
    const [values, setValues] = useState({email: "sharonova_t@inbox.ru", pwd: "dsfsdfsdfsdf"})
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        auth.postSignIn({
            "password": values.pwd,
            "email": values.email
        }).then(data => {
            setLoggedIn(true);
            localStorage.jwt = data.token;
            setNewCurrentUser({email: values.email})
            history.push("/mesto-react/");
        }).catch(() => {
            setNotificationOpen(true);
            localStorage.clear();
        });
    }
    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: getMessage(e)});
    };
    return (
        <div className='register'>
            <form className="register__form" name='login' id={'loginForm'} noValidate onSubmit={handleSubmit}>
                <h2 className="form__title register_title">Вход</h2>
                <input className="input form__email" id="email" name="email" type="email" placeholder="Email" required
                       value={values.email} onChange={handleChange}/>
                <span className="form__error" id="email-error">{errors.email}</span>
                <input className="input form__email" id="pwd" name="pwd" type="text" required
                       placeholder="Пароль" value={values.pwd}
                       onChange={handleChange}/>
                <span className="form__error" id="pwd-error">{errors.pwd}</span>
                <SubmitButton errors={errors} text='Войти'/>
            </form>
        </div>
    );
}
export default Login;