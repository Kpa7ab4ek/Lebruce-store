import React, {Component} from 'react';
import logo from "./1681625377_papik-pro-p-tetrad-smerti-logotip-vektor-28.png"
import basket from "./img.png"

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantityOfPosition: localStorage.getItem('basket') ? parseInt(localStorage.getItem('basket')) : 0
        };
    }


    componentDidMount() {
        this.intervalId = setInterval(() => {
            const basket = localStorage.getItem('basket');
            if (basket) {
                this.setState({quantityOfPosition: parseInt(basket)});
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }


    render() {
        const token = localStorage.getItem('token');

        return (
            <div>
                <header className="header">
                    <div className="header__top">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-5">
                                    <div className="header__top__right">
                                        <div className="header__top__links">
                                            {token ? (
                                                <a className="account-trigger" href={"/account"} data-target="#account"
                                                   data-toggle="modal">
                                                    Личный кабинет
                                                </a>
                                            ) : (
                                                <a className="login-trigger" href={"/login"} data-target="#login"
                                                   data-toggle="modal">
                                                    Войти
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3">
                                <div className="header__logo">
                                    <a href={"/"}> <img src={logo} alt={"home"}/></a>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <nav className="header__menu mobile-menu">
                                    <ul>
                                        <li><a href={"/"}>Главная</a></li>
                                        <li><a href={"/shop"}>Магазин</a></li>
                                        <li><a href={"/about"}>О нас</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-lg-3 col-md-3">
                                <div className="header__nav__option">
                                    <a href="/basket">
                                        <img src={basket} alt={"basket"}/>
                                        {token && this.state.quantityOfPosition > 0 && (
                                            <span className="basket-count">{this.state.quantityOfPosition}</span>
                                        )}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}