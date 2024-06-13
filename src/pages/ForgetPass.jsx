import React, {useState} from "react";
import '../components/reg/sign.css'


export default function useForgetPass() {
    const [goodMessage, setGoodMessage] = useState('');
    const [passwordInput, setPasswordInput] = useState('');



    function handleEmaleChange(event) {
        setPasswordInput(event.target.value);

        // Если поле "Пароль" не пустое, то скрываем сообщение об ошибке
        if (event.target.value.length > 0) {
            document.getElementById('message').innerHTML = ('');
        }
    }
    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        // Получаем данные из формы
        const form = event.currentTarget;
        const email = form.elements.username.value;

        try {

            const response = await fetch('https://lebruce.ru/api/v1/users/password/forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email}),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            else {
                const data = await response.text();
                document.getElementById('goodmsg').innerHTML = data;
            }


        } catch (error) {
            document.getElementById('message').innerHTML = error.message;
        }
    };

    console.log(goodMessage);

    return (
        <div>
            <div className="login-page">
                <div className="form">
                    <div>
                        <form className="login-form" onSubmit={handleLoginSubmit}>
                            <p id="message" className={"error-message"}>{}</p>
                            <p id="goodmsg" className={"good-message"}>{goodMessage}</p>
                            <input type="email" id={"username"} placeholder="Email" required={true} onChange={handleEmaleChange}/>
                            <button>Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}