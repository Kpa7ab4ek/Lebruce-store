import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import moment from "moment/moment";

const AccountPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');
    const [goodMessage, setGoodMessage] = useState('');
    const goodMsgElem = document.getElementById('goodmsg');
    const msgElem = document.getElementById('message');
    const hasAddress = user && user.addresses && user.addresses.length > 0;
    const [isAdmin, setIsAdmin] = useState(false);
    console.log(localStorage.getItem('token'));


    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            axios.get('https://lebruce.ru/api/v1/users/current')
                .then(response => {
                    setUser(response.data);
                    setName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setUsername(response.data.username);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);


    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            axios.get('https://lebruce.ru/api/v1/users/admin')
                .then(response => {
                    if (response.status === 200) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                })
                .catch(error => {
                    console.error(error);
                    setIsAdmin(false);
                });
        }
    }, []);


    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            axios.get('https://lebruce.ru/api/v1/addresses')
                .then(async response => {
                    setAddresses(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);


    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            axios.get('https://lebruce.ru/api/v1/orders')
                .then(async response => {
                    setOrders(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);


    const handleButtonClick = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };


    const handleChangePass = async (event) => {
        event.preventDefault();

        goodMsgElem.innerHTML = '';
        msgElem.innerHTML = '';

        const response = await fetch('https://lebruce.ru/api/v1/users/password/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            goodMsgElem.innerHTML = await response.text();
            localStorage.removeItem('token');
        } else {
            msgElem.innerHTML = await response.text();
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const username = form.elements.username.value;
        goodMsgElem.innerHTML = '';
        msgElem.innerHTML = '';


        const response = await fetch('https://lebruce.ru/api/v1/users/username/set', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({username}),
        });

        if (response.ok) {
            goodMsgElem.innerHTML = await response.text();
            localStorage.removeItem('token');
        } else {
            msgElem.innerHTML = await response.text();
        }
    };

    if (!user) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="container">


            <div className="account">
                <div className="account__container">
                    <h1 className="account__title">Аккаунт</h1>

                    <div className="account__info">
                        <div className="account__personal-info">
                            <p className="account__text">Имя: {user.firstName}</p>
                            <p className="account__text">Фамилия: {user.lastName}</p>
                            <p className="account__text">Email: {user.username}</p>
                        </div>

                        <div className="account__address-info">
                            {!hasAddress && (
                                <div className="account__add-address">
                                    <p className="account__text">
                                        У вас еще нет адреса.
                                        <a href={"/addadd"}>Добавить адресс</a>
                                    </p>
                                </div>
                            )}
                            <p className="account__text">Страна: {addresses.country}</p>
                            <p className="account__text">Регион: {addresses.state}</p>

                            {addresses && (
                                <div className="account__address-details">
                                    <p className="account__text">Город: {addresses.city}</p>
                                    <p className="account__text">Улица: {addresses.street}</p>
                                    <p className="account__text">Номер дома: {addresses.houseNumber}</p>
                                    <p className="account__text">Номер квартиры: {addresses.apartmentNumber}</p>
                                    <p className="account__text">Индекс: {addresses.zipCode}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="account__container">
                    <h1 className="account__title">Заказы</h1>
                    {orders.map((order, index) => (
                        <div className="account__info" key={order.orderId}>
                            <div className="account__personal-info">
                                {index > 0 && <p className="account__text__last"></p>}
                                <p className="account__text">Номер заказа: {order.orderId}</p>
                                <p className="account__text">Дата заказа: {moment(order.orderDate).format("DD.MM.YYYY HH:mm")}</p>
                                <p className="account__text">Сумма заказа: {order.totalPrice} ₽</p>
                            </div>
                            <div className="account__address-info">
                                {order.orderItems.map((item) => (
                                    <div className="account__address-details" key={item.orderItemId}>
                                        <p className="account__text">Товар: {item.product.productName}</p>
                                        <p className="account__text">Бренд: {item.product.brand.name}</p>
                                        <p className="account__text">Категория: {item.product.category.categoryName}</p>
                                        <p className="account__text">Цена: {item.priceForOne}</p>
                                        <p className="account__text">Количество: {item.quantity}</p>
                                        <p className="account__text">Размер: {item.size.size}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isAdmin && (
                <div className={"chekAdm"}>
                    <a href={"/createprod"}>
                        <button>
                            Создать товар
                        </button>
                    </a>
                </div>
            )}

            <div className={"allMess"}>

                <p id="message" className={"error-message"}>{}</p>
                <p id="goodmsg" className={"good-message"}>{goodMessage}</p>

            </div>

            <form className="form" onSubmit={handleSubmit}>

                <label className="label">
                    Новый email:
                    <input className="input" type="email" id={"username"} placeholder="Почта" required={true}/>
                </label>
                <button className="button" type="submit">Изменить данные</button>

            </form>

            <form className="form" onSubmit={handleChangePass}>
                <label className="label">
                    СБРОСИТЬ ПАРОЛЬ
                </label>
                <button className="button">Сбросить</button>

            </form>

            <label className="label">
                Выйти из аккаунта
            </label>
            <button className="buttonEit" onClick={handleButtonClick}>Выйти из аккаунта</button>
        </div>
    );
};

export default AccountPage;
