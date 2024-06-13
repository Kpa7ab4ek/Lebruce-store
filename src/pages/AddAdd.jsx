import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const AddAdd = () => {
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [zipCode, setZipCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newAddress = {
            country,
            state,
            city,
            street,
            houseNumber,
            apartmentNumber,
            zipCode,
        };

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                'https://lebruce.ru/api/v1/addresses',
                newAddress,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            navigate('/account');
        } catch (error) {
            console.error(error);
            // здесь вы можете добавить логику для обработки ошибки от сервера
        }
    };


    return (
        <div className="add-address-page">
            <h1 className="add-address-page__title">Добавить адрес</h1>

            <form className="add-address-page__form" onSubmit={handleSubmit}>
                <label className="add-address-page__label">
                    Страна:
                    <input
                        className="add-address-page__input"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>

                <label className="add-address-page__label">
                    Регион:
                    <input
                        className="add-address-page__input"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>

                <label className="add-address-page__label">
                    Город:
                    <input
                        className="add-address-page__input"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>

                <label className="add-address-page__label">
                    Улица:
                    <input
                        className="add-address-page__input"
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </label>

                <label className="add-address-page__label">
                    Номер дома:
                    <input
                        className="add-address-page__input"
                        type="text"
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                    />
                </label>

                <label className="add-address-page__label">
                    Номер квартиры:
                    <input
                        className="add-address-page__input"
                        type="text"
                        value={apartmentNumber}
                        onChange={(e) => setApartmentNumber(e.target.value)}
                    />
                </label>

                <label className="add-address-page__label">
                    ZIP-код:
                    <input
                        className="add-address-page__input"
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </label>

                <button className="add-address-page__button" type="submit">
                    Добавить
                </button>
            </form>
        </div>
    );
};

export default AddAdd;
