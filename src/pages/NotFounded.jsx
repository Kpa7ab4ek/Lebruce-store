import React from "react";

const NotFoundPage = () => {
    return (
        <>
            <div className="not-found-page">
                <h1>404</h1>
                <h2>Страница не найдена</h2>
                <p>Извините, но запрашиваемая страница не существует или была удалена.</p>
                <a href="/">Вернуться на главную страницу</a>
            </div>

        </>
    );
};

export default NotFoundPage;
