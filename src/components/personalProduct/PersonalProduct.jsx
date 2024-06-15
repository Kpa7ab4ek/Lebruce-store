import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import ImageSlider from "../imageSlider/ImageSlider";
import "./personal.css";
import moment from "moment";


export function PersonalProduct() {

    const [product, setProduct] = useState(null);
    const {productName} = useParams();
    const navigate = useNavigate();
    const [buttonState, setButtonState] = useState({});
    const [selectedSize, setSelectedSize] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [size, setSize] = useState(10);
    const [persRev, setPersRev] = useState(null);
    const token = localStorage.getItem('token');
    const productId = product?.productId;


    useEffect(() => {
        async function fetchReviews() {
            if (productId) {
                const response = await fetch(`https://lebruce.ru/api/v1/products/review?productId=${productId}`);
                const data = await response.json();
                setReviews(data.content.slice(0, size));
            }
        }

        fetchReviews();
    }, [size, productId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://lebruce.ru/api/v1/products/review/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPersRev(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [product]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const review = {
            productId: product.productId,
            rating: form.rating.value,
            comment: form.text.value,
        };

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await axios.post(
                "https://lebruce.ru/api/v1/products/review",
                review,
                config
            );

            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 409) {
                alert("Вы уже отправили свой отзыв");
            }
        }
    };


    const handleLoadMore = () => {
        setSize(size + 10);
    };

    useEffect(() => {
        axios
            .get(`https://lebruce.ru/api/v1/products/${productName}`)
            .then((response) => {
                setProduct(response.data);
                if (response.data.sizes && response.data.sizes.length > 0) {
                    const minSize = response.data.sizes.reduce((min, size) =>
                        size.available && size.id < min.id ? size : min
                    );
                    setSelectedSize(minSize.id);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [productName]);

    useEffect(() => {
        const storedButtonState = localStorage.getItem("buttonState");
        if (storedButtonState) {
            setButtonState(JSON.parse(storedButtonState));
        }
    }, []);

    const handleAddToCart = (productId) => {
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


    const handleDeleteReview = () => {
        if (window.confirm("Вы уверены, что хотите удалить свой отзыв?")) {
            axios
                .delete(`https://lebruce.ru/api/v1/products/review/${persRev.reviewId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setPersRev(null);
                    alert("Отзыв успешно удален");
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Ошибка при удалении отзыва");
                });
        }
    }


    const getButtonText = (productId, selectedSize) => {
        if (buttonState[productId] && buttonState[productId][selectedSize]) {
            return "Уже в корзине";
        }
        return "В корзину";
    };

    if (product === null) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <div className="product-page">
                <div className="product-image">
                    <ImageSlider images={product.imageUrls}/>
                </div>
                <div className="product-info">
                    <h1>{product.productName}</h1>
                    <p className="product-price">Цена: {product.price}</p>
                    <p className="product-brand">Бренд: {product.brand.name}</p>
                    <p>Описание: {product.description}</p>
                    <p>⭐: {product.rating.toFixed(2)}</p>
                    <a
                        href="#reviews"
                        style={{color: "black"}}
                        onClick={(e) => {
                            e.preventDefault();
                            const reviewsSection = document.querySelector(".product__review");
                            if (reviewsSection) {
                                reviewsSection.scrollIntoView({behavior: "smooth"});
                            }
                        }}
                    >
                        <p>Отзывы: {product.reviewCount}</p>
                    </a>

                    {product.characteristics && (
                        <div className="product-characteristics">
                            <h3>Характеристики:</h3>
                            {product.characteristics.map((characteristic) => (
                                <p key={characteristic.characteristicId}>

                                    {characteristic.characteristicName}: {characteristic.characteristicValue}
                                </p>
                            ))}
                        </div>
                    )}
                    <div className="product__sizes">
                        <h3>Размеры:</h3>
                        {product.sizes.map((size) => (
                            <button
                                key={size.id}
                                onClick={() => setSelectedSize(size.id)}
                                disabled={!size.available}
                                className={size.id === selectedSize ? 'active' : ''}
                            >
                                {size.size}
                            </button>
                        ))}
                    </div>


                    <button
                        className="card__add"
                        onClick={() => handleAddToCart(product.productId)}
                        disabled={buttonState[product.productId] && !selectedSize}
                    >
                        {getButtonText(product.productId, selectedSize)}
                    </button>
                </div>
                <div className="product__review">
                    <h2>Отзывы</h2>

                    <form className="review-form" onSubmit={handleSubmit}>
                        <label htmlFor="rating">Оценка:</label>

                        <div>
                            <input type="radio" id="rating1" name="rating" value="1" required/>
                            <label htmlFor="rating1">1</label>
                        </div>

                        <div>
                            <input type="radio" id="rating2" name="rating" value="2"/>
                            <label htmlFor="rating2">2</label>
                        </div>

                        <div>
                            <input type="radio" id="rating3" name="rating" value="3"/>
                            <label htmlFor="rating3">3</label>
                        </div>

                        <div>
                            <input type="radio" id="rating4" name="rating" value="4"/>
                            <label htmlFor="rating4">4</label>
                        </div>

                        <div>
                            <input type="radio" id="rating5" name="rating" value="5"/>
                            <label htmlFor="rating5">5</label>
                        </div>

                        <label htmlFor="text">Текст отзыва:</label>
                        <textarea id="text" name="text" required minLength={20} maxLength={120}></textarea>

                        <button type="submit" className={"sendRev"}>Отправить отзыв</button>
                    </form>


                    <div>
                        {persRev ? (
                            <div className={"persRev"}>
                                <button onClick={handleDeleteReview}>Удалить</button>
                                <h5>{persRev.user.firstName} {persRev.user.lastName}</h5>
                                <h6>{persRev.user.username}</h6>
                                <p>{persRev.comment}</p>
                                <p>Оценка: {persRev.rating}</p>
                                <p>Дата отзыва: {moment(persRev.datePosted).format("DD.MM.YYYY HH:mm")}</p>
                            </div>
                        ) : (
                            <p>Тут будет ваш комментарий</p>
                        )}
                    </div>


                    <div className="reviews">
                        {reviews.map((review) => (

                            <div className="review" key={review.reviewId}>
                                <h5>{review.user.firstName} {review.user.lastName}</h5>
                                <h6>{review.user.username}</h6>
                                <p>{review.comment}</p>
                                <p>Оценка: {review.rating}</p>
                                <p>Дата отзыва: {moment(review.datePosted).format("DD.MM.YYYY HH:mm")}</p>
                            </div>
                        ))}

                        {reviews.length >= size && (
                            <button className="load-more" onClick={handleLoadMore}>
                                Загрузить ещё отзывов
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
