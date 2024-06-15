import '../../src/css/style.css'

export function About() {
    return (
        <body>
        <section class="about spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-6">
                        <div class="about__item">
                            <h4>Кто мы?</h4>
                            <p>Мы студенты группы ИВТ-21: <br/> Платонов Леонид Алексеевич<br/>и <br/> Иванов Илья
                                Александрович</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-6">
                        <div class="about__item">
                            <h4>Что мы сделали?</h4>
                            <p>Данный проект представляет собой RESTful веб-приложение, написанное на Java 21 с
                                использованием фреймворка Spring Boot.
                                Приложение предоставляет API для управления пользователями, продуктами, заказами и
                                отзывами.</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-6">
                        <div class="about__item">
                            <h4>Почему мы сделали это?</h4>
                            <p>Данный проект был реализован с целью сдачи экзамена в нашем университете по дисциплине
                                "Алгоритмическое программирование".</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="testimonial">
            <div className="container-fluid">
                <div className="row">
                    <div className="testimonial__container">
                        <div className="testimonial__text">
                            <span className="icon_quotations"></span>
                            <p>Если вы в чем-то не разбираетесь. Начните разбираться! И вы разберётесь 🤯</p>
                            <div className="testimonial__author">
                                <div className="testimonial__author__text">
                                    <h5>Джейсон Стетхем</h5>
                                    <p>Лысый из Brazzers</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial__text">
                            <span className="icon_quotations"></span>
                            <p>Я не негр</p>
                            <div className="testimonial__author">
                                <div className="testimonial__author__text">
                                    <h5>Андрей Замай</h5>
                                    <p>Антихайп</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial__text">
                            <span className="icon_quotations"></span>
                            <p>Кинг ммья итен... кингмьяитенн.....ага</p>
                            <div className="testimonial__author">
                                <div className="testimonial__author__text">
                                    <h5>Иван Zоло</h5>
                                    <p>Отец русского ютуба</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </body>

    );
}