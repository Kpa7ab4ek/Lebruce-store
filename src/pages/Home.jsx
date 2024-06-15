import {Hero} from "../components/hero/Hero"
import '../../src/css/style.css'
import {News} from "../components/homeBlog/News";


export const Home = () => {
    return (
        <>
            <section className="hero">
                <div className="hero__slider owl-carousel">
                    <Hero/>
                </div>
            </section>

            <section className="banner spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="banner__item banner__item--middle">
                                <div className="banner__item__text">
                                    <h2>Магазин</h2>
                                    <a href={"shop"}>Перейти к покупкам</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="latest spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <span>Последние новости</span>
                                <h2>Мировые новости</h2>
                            </div>
                        </div>
                    </div>
                    <News/>
                </div>
            </section>
        </>
    );
};