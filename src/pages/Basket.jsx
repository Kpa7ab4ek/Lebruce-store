import React, {useEffect, useState} from "react";
import {BuyCard} from "../components/buyCard/BuyCard";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function isAuthenticated() {
    const token = localStorage.getItem("token");
    return token !== null;
}

export const Basket = () => {
    const [basket, setBasket] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            axios
                .get("https://lebruce.ru/api/v1/cart", config)
                .then((response) => {
                    setBasket(response.data);
                    setTotalPrice(response.data.totalPrice);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const handleUpdateTotalPrice = (newTotalPrice) => {
        setTotalPrice(newTotalPrice);
    };


    const handlePlaceOrder = () => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        axios
            .post("https://lebruce.ru/api/v1/orders", {}, config)
            .then((response) => {
                console.log(response);
                localStorage.removeItem('buttonState');
                localStorage.setItem('basket', '0');
                navigate('/paypage');
            })
            .catch((error) => {
                console.log(error);
                navigate("/addadd")
            });
    };


    return (
        <div>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Корзина</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shopping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="shopping__cart__table">
                                <table>
                                    <tbody>
                                    <BuyCard onUpdateTotalPrice={handleUpdateTotalPrice}/>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="cart__total">
                                <h6>Заказ</h6>
                                <ul>
                                    <li>
                                        Итого: <span>{totalPrice} ₽</span>
                                    </li>
                                </ul>
                                <a className="primary-btn" onClick={handlePlaceOrder} >
                                    Оформить заказ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
