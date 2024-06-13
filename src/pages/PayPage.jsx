import React, { useState } from 'react';

const PayPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь вы можете добавить логику для отправки данных формы на сервер
        console.log(formData);
    };

    return (
        <div>
            <h1>Форма заказа</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">Имя:</label><br/>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} /><br/>
                <label htmlFor="lastName">Фамилия:</label><br/>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} /><br/>
                <label htmlFor="address">Адрес:</label><br/>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} /><br/>
                <label htmlFor="card_number">Номер карты:</label><br/>
                <input type="text" id="card_number" name="cardNumber" maxLength="20" value={formData.cardNumber} onChange={handleInputChange} /><br/>
                <label htmlFor="expiry_date">Срок действия карты (ММ/ГГ):</label><br/>
                <input type="text" id="expiry_date" name="expiryDate" maxLength="5" value={formData.expiryDate} onChange={handleInputChange} /><br/>
                <label htmlFor="cvv">CVV:</label><br/>
                <input type="text" id="cvv" name="cvv" maxLength="3" value={formData.cvv} onChange={handleInputChange} /><br/>
                <input type="submit" value="Отправить заказ"/>
            </form>
        </div>

);
};

export default PayPage;
