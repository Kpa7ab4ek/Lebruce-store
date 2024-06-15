
const PayPage = () => {

    return (
        <div className="order-success-page">
            <h1>Спасибо за заказ!</h1>
            <p>Ваш заказ успешно оформлен.</p>
            <p>Вы можете отслеживать свой заказ в личном кабинете:</p>
            <a href={"/account"}>Перейти в личный кабинет</a>
        </div>
    );
};

export default PayPage;
