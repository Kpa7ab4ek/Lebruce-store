import React, {useState} from 'react';
import './sign.css'
import {useNavigate} from 'react-router-dom';

export default function useReg() {
    const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(true);
    const [goodMessage, setGoodMessage] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [passwordInput, setPasswordInput] = useState('');
    const [chekPassInput, setChekPassInput] = useState('');

    const toggleForm = () => {
        setIsRegisterFormVisible(!isRegisterFormVisible);
        setMessage('');
    };
    function handleInputFocus(event) {
        setMessage('');
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const username = form.elements.username.value;
        const password = form.elements.password.value;
        setGoodMessage('');
        setMessage('');
        try {
            const response = await fetch('https://lebruce.ru/api/v1/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            console.log(localStorage.getItem('token'));
            setGoodMessage(data.message);
            navigate('/');
            window.location.reload();
        } catch (error) {
            setMessage(error.message);
        }
    };

    function handlePasswordChange(event) {
        setPasswordInput(event.target.value);

        // Если поле "Пароль" не пустое, то скрываем сообщение об ошибке
        if (event.target.value.length > 0) {
            setMessage('');
        }
    }

    function handleChekPassChange(event) {
        setChekPassInput(event.target.value);

        // Если поле "Подтверждение пароля" не пустое, то скрываем сообщение об ошибке
        if (event.target.value.length > 0) {
            setMessage('');
        }
    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const firstName = form.elements.firstName.value;
        const lastName = form.elements.lastName.value;
        const username = form.elements.username.value;
        const password = form.elements.password.value;
        const chekpass = form.elements.chekPass.value
        setGoodMessage('');
        setMessage('');

        if (password!==chekpass){
            setMessage('Пароли не совпадают');

        }
        else {
            const response = await fetch('https://lebruce.ru/api/v1/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({firstName, lastName, username, password}),
            });

            if (response.ok) {
                setGoodMessage(await response.text());
                navigate('/login');

            } else {
                setMessage(await response.text());
            }
        }
    }

    return (
        <div>
            <div className="login-page">
                <div className="form">
                    {isRegisterFormVisible && (
                        <div>
                            <form className="login-form" onSubmit={handleLoginSubmit}>
                                <p id="message" className={"error-message"}>{message}</p>
                                <input type="email" id={"username"} placeholder="Почта" required={true}  onFocus={handleInputFocus}
                                />
                                <input type="password" id={"password"} placeholder="Пароль" required={true}   onFocus={handleInputFocus}

                                       maxLength={25} onChange={handlePasswordChange}/>
                                <button>Войти</button>
                            </form>
                            <p className="message">Нет аккаунта? <a href="#" onClick={toggleForm}>Создать</a></p>
                            <a className={"message"} href={'/forgetpass'}> Забыл пароль?</a>
                        </div>
                    )}
                    {!isRegisterFormVisible && (
                        <div>
                            <form className="register-form" onSubmit={handleRegisterSubmit}>
                                <p id="message" className={"error-message"}>{message}</p>
                                <p id="goodmsg" className={"good-message"}>{goodMessage}</p>
                                <input type="text" id={"firstName"} placeholder="Имя" required={true} maxLength={25}   onFocus={handleInputFocus}
                                />
                                <input type="text" id={"lastName"} placeholder="Фамилия" maxLength={25}   onFocus={handleInputFocus}
                                />
                                <input type="email" id={"username"} placeholder="Почта" required={true}   onFocus={handleInputFocus}
                                />
                                <input type="password" id={"password"} placeholder="Пароль" required={true}   onFocus={handleInputFocus}

                                       minLength={8} maxLength={25} onChange={handlePasswordChange}/>
                                <input type="password" id={"chekPass"} placeholder="Повторить пароль" required={true}   onFocus={handleInputFocus}

                                       maxLength={25}  onChange={handleChekPassChange}/>
                                <button>Создать</button>
                            </form>
                            <p className="message">Уже есть аккаунт? <a href="#" onClick={toggleForm}>Войти</a></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
