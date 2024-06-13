import React, { useEffect, useState } from "react";
import { BuyCard } from "../components/buyCard/BuyCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function isAuthenticated() {
    const token = localStorage.getItem("token");
    return token !== null;
}

export const Basket = () => {
    const [basket, setBasket] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

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
                    setTotalPrice(response.data.totalPrice); // <-- установите общую цену из ответа сервера
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const handleUpdateTotalPrice = (newTotalPrice) => { // <-- добавьте функцию для обновления общей цены
        setTotalPrice(newTotalPrice);
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
                                    <BuyCard onUpdateTotalPrice={handleUpdateTotalPrice} />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="cart__total">
                                <h6>Заказ</h6>
                                <ul>
                                    <li>
                                        Итого: <span>{totalPrice}Р</span>
                                    </li>
                                </ul>
                                <a href="/PayPage" className="primary-btn">
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
