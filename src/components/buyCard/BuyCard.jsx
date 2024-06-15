import "./buyCard.css";
import {useEffect, useState} from "react";
import axios from "axios";

export function BuyCard({buttonState, setButtonState, onUpdateTotalPrice}) {
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        axios
            .get("https://lebruce.ru/api/v1/cart", config)
            .then((response) => {
                setProducts(response.data.items);
                setTotalPrice(response.data.totalPrice);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDeleteToCart = (shoppingCartItemId, productId, productName) => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .delete(`https://lebruce.ru/api/v1/cart/item/${shoppingCartItemId}`, config)
            .then((response) => {
                console.log(response);

                let currentQuantity = parseInt(localStorage.getItem('basket')) || 0;

                currentQuantity--;

                localStorage.setItem('basket', currentQuantity);

                setProducts((prevProducts) =>
                    prevProducts.filter((item) => item.shoppingCartItemId !== shoppingCartItemId)
                );
                const newTotalPrice = totalPrice - getPriceForItem(shoppingCartItemId);
                setTotalPrice(newTotalPrice);
                onUpdateTotalPrice(newTotalPrice);

                const storedButtonState = localStorage.getItem("buttonState");
                if (storedButtonState) {
                    const parsedButtonState = JSON.parse(storedButtonState);
                    delete parsedButtonState[productId];
                    localStorage.setItem("buttonState", JSON.stringify(parsedButtonState));
                }
                setButtonState((prevState) => {
                    const newState = {...prevState};
                    delete newState[productId];
                    return newState;
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleIncrement = (shoppingCartItemId, productId) => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        axios
            .put(
                `https://lebruce.ru/api/v1/cart/item/${shoppingCartItemId}/${1}`,
                {},
                config
            )
            .then((response) => {
                console.log(response);
                setProducts((prevProducts) =>
                    prevProducts.map((item) =>
                        item.shoppingCartItemId === shoppingCartItemId
                            ? {...item, quantity: item.quantity + 1}
                            : item
                    )
                );
                const newTotalPrice = totalPrice + getPriceForOne(shoppingCartItemId);
                setTotalPrice(newTotalPrice);
                onUpdateTotalPrice(newTotalPrice);

                const storedButtonState = localStorage.getItem("buttonState");
                if (storedButtonState) {
                    const parsedButtonState = JSON.parse(storedButtonState);
                    parsedButtonState[productId] = true;
                    localStorage.setItem("buttonState", JSON.stringify(parsedButtonState));
                }
                setButtonState((prevState) => ({
                    ...prevState,
                    [productId]: true,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDecrement = (shoppingCartItemId, productId) => {
        const token = localStorage.getItem("token");

        const item = products.find((item) => item.shoppingCartItemId === shoppingCartItemId);

        if (item.quantity === 1) {
            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            axios
                .delete(`https://lebruce.ru/api/v1/cart/item/${shoppingCartItemId}`, config)
                .then((response) => {
                    console.log(response);
                    setProducts((prevProducts) =>
                        prevProducts.filter((item) => item.shoppingCartItemId !== shoppingCartItemId)
                    );
                    const newTotalPrice = totalPrice - getPriceForItem(shoppingCartItemId);
                    setTotalPrice(newTotalPrice);
                    onUpdateTotalPrice(newTotalPrice);

                    const storedButtonState = localStorage.getItem("buttonState");
                    if (storedButtonState) {
                        const parsedButtonState = JSON.parse(storedButtonState);
                        delete parsedButtonState[productId];
                        localStorage.setItem("buttonState", JSON.stringify(parsedButtonState));
                        let currentQuantity = parseInt(localStorage.getItem('basket')) || 0;

                        currentQuantity--;

                        localStorage.setItem('basket', currentQuantity);
                    }
                    setButtonState((prevState) => {
                        const newState = {...prevState};
                        delete newState[productId];
                        return newState;
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            axios
                .put(
                    `https://lebruce.ru/api/v1/cart/item/${shoppingCartItemId}/${-1}`,
                    {},
                    config
                )
                .then((response) => {
                    console.log(response);
                    setProducts((prevProducts) =>
                        prevProducts.map((item) =>
                            item.shoppingCartItemId === shoppingCartItemId
                                ? {...item, quantity: item.quantity - 1}
                                : item
                        )
                    );
                    const newTotalPrice = totalPrice - getPriceForOne(shoppingCartItemId);
                    setTotalPrice(newTotalPrice);
                    onUpdateTotalPrice(newTotalPrice);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const getPriceForItem = (shoppingCartItemId) => {
        const item = products.find((item) => item.shoppingCartItemId === shoppingCartItemId);
        return item ? item.priceForOne * item.quantity : 0;
    };

    const getPriceForOne = (shoppingCartItemId) => {
        const item = products.find((item) => item.shoppingCartItemId === shoppingCartItemId);
        return item ? item.priceForOne : 0;
    };


    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Товар</th>
                    <th>Кол-во</th>
                    <th className={"size-title"}>Размер</th>
                    <th>Цена</th>
                </tr>
                </thead>
                <tbody>
                {products.map((item) => (
                    <tr key={item.shoppingCartItemId}>
                        <td className="product__cart__item">
                            <div className="product__cart__item__pic">
                                <img
                                    src={`https://lebruce.ru${item.product.imageUrls[0]}`}
                                    alt={item.product.productName}
                                    className="immmggg"
                                />
                            </div>
                            <div className="product__cart__item__text">
                                <h6>{item.product.productName}</h6>
                            </div>
                        </td>
                        <td className="quantity__item">
                            <div className="quantity">
                                <div className="quantity__buttons">
                                    <button
                                        className="cart__close"
                                        onClick={() => {
                                            handleDecrement(item.shoppingCartItemId, item.product.productId);
                                        }}
                                    >
                                        -
                                    </button>
                                    <div className="quantity__value">
                                        <input type="text" value={item.quantity}/>
                                    </div>
                                    <button
                                        className="cart__close"
                                        onClick={() => {
                                            handleIncrement(item.shoppingCartItemId, item.product.productId);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </td>
                        <td className="size__item">
                            <div>
                                {item.size.size}
                            </div>
                        </td>
                        <td className="cart__price">{getPriceForItem(item.shoppingCartItemId)}</td>
                        <td>
                            <a
                                className="cart__del"
                                href={"/basket"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteToCart(
                                        item.shoppingCartItemId,
                                        item.product.productId,
                                        item.product.productName
                                    );
                                }}
                            >
                                Удалить
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

