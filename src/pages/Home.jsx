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
                                    <h2>Accessories</h2>
                                    <a href={"shop"}>Shop now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="instagram spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="instagram__pic">
                                <div className="instagram__pic__item set-bg"
                                     data-setbg="img/instagram/instagram-1.jpg"></div>
                                <div className="instagram__pic__item set-bg"
                                     data-setbg="img/instagram/instagram-2.jpg"></div>
                                <div className="instagram__pic__item set-bg"
                                     data-setbg="img/instagram/instagram-3.jpg"></div>
                                <div className="instagram__pic__item set-bg"
                                     data-setbg="img/instagram/instagram-4.jpg"></div>
                                <div className="instagram__pic__item set-bg"
                                     data-setbg="img/instagram/instagram-5.jpg"></div>
                                <div className="instagram__pic__item set-bg"
                                     data-setbg="img/instagram/instagram-6.jpg"></div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="instagram__text">
                                <h2>Вконтакте</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut
                                    labore et dolore magna aliqua.</p>
                                <h3>#Male_Fashion</h3>
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
                                <span>Latest News</span>
                                <h2>Fashion New Trends</h2>
                            </div>
                        </div>
                    </div>
                    <News/>
                </div>
            </section>
        </>
    );
};