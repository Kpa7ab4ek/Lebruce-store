import axios from "axios";
import ImageSlider from "../imageSlider/ImageSlider";
import "./productCard.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export function ProductList({ products }) {
    const navigate = useNavigate();
    const [buttonState, setButtonState] = useState({});
    const [selectedSizes, setSelectedSizes] = useState({});
    const [hoveredProducts, setHoveredProducts] = useState({});

    useEffect(() => {
        const storedButtonState = localStorage.getItem("buttonState");
        if (storedButtonState) {
            setButtonState(JSON.parse(storedButtonState));
        }
    }, []);

    const handleAddToCart = (productId, selectedSize) => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        if (localStorage.getItem("token") === null) {
            navigate("/login");
        } else {
            const data = JSON.stringify({ productId, quantity: 1, sizeId: selectedSize });

            axios
                .post("https://lebruce.ru/api/v1/cart/item", data, config)
                .then((response) => {
                    console.log(response);

                    let currentQuantity = parseInt(localStorage.getItem('basket')) || 0;

                    currentQuantity++;

                    localStorage.setItem('basket', currentQuantity);

                    setButtonState((prevState) => {
                        const newState = { ...prevState };
                        newState[productId] = { ...newState[productId], [selectedSize]: true };
                        localStorage.setItem("buttonState", JSON.stringify(newState));
                        return newState;
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };



    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    const getButtonText = (productId, selectedSize) => {
        if (buttonState[productId] && buttonState[productId][selectedSize]) {
            return "Уже в корзине";
        }
        return "В корзину";
    };

    const handleMouseEnter = (productId) => {
        setHoveredProducts((prevHoveredProducts) => {
            return { ...prevHoveredProducts, [productId]: true };
        });
    };

    const handleMouseLeave = (productId) => {
        setHoveredProducts((prevHoveredProducts) => {
            return { ...prevHoveredProducts, [productId]: false };
        });
    };

    const handleSizeChange = (productId, sizeId) => {
        setSelectedSizes((prevState) => {
            return { ...prevState, [productId]: sizeId };
        });
    };


    useEffect(() => {
        const allProductsHaveSizes = products.every((product) => product.sizes);

        if (allProductsHaveSizes) {

            products.forEach((product) => {

                if (product.sizes) {

                    const minSize = product.sizes.reduce((min, size) => {
                        if (size.available && size.size < min.size) {
                            return size;
                        }
                        return min;
                    }, product.sizes[0]);

                    setSelectedSizes((prevState) => {
                        return { ...prevState, [product.productId]: minSize.id };
                    });
                }
            });
        }
    }, [products]);



    return (
        <>
            <div className="cards">
                {products.map((item) => (
                    <div
                        key={item.productId}
                        className="card"
                        onMouseEnter={() => handleMouseEnter(item.productId)}
                        onMouseLeave={() => handleMouseLeave(item.productId)}
                    >
                        <div key={item.productId}>
                            <ImageSlider
                                images={item.imageUrls}
                                onImageClick={() => handleProductClick(item.productId)}
                            />
                        </div>

                        <div className="card__bottom">
                            <div className="card__prices">
                                <div className="card__price card__price--discount">
                                    {item.price}
                                </div>
                            </div>
                            <a
                                href=""
                                className="card__title"
                                onClick={() => handleProductClick(item.productId)}
                            >
                                {item.productName}
                            </a>
                            {item.availableQuantity !== null &&
                            item.availableQuantity !== undefined ? (
                                <h4>Осталось: {item.availableQuantity} шт.</h4>
                            ) : null}
                            <span aria-hidden="true">
                ⭐ {item.rating.toFixed(2)} ({item.reviewCount})
              </span>
                            <p>{item.description.slice(0, 100)}...</p>
                            {hoveredProducts[item.productId] && (
                                <div className="card__sizes">
                                    {item.sizes && (
                                        <div className="product__sizes">
                                            <h4>Размеры:</h4>
                                            <div className="btn-group" role="group" aria-label="Sizes">
                                                {item.sizes.map((size) => (
                                                    <button
                                                        key={size.id}
                                                        type="button"
                                                        className={`btn btn-outline-secondary ${selectedSizes[item.productId] === size.id ? 'active' : ''}`}
                                                        onClick={() => handleSizeChange(item.productId, size.id)}
                                                        disabled={!size.available}
                                                    >
                                                        {size.size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            <button
                                className="card__add"
                                onClick={() =>
                                    handleAddToCart(item.productId, selectedSizes[item.productId])
                                }
                                disabled={
                                    buttonState[item.productId] &&
                                    !selectedSizes[item.productId]
                                }
                            >
                                {getButtonText(item.productId, selectedSizes[item.productId])}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
