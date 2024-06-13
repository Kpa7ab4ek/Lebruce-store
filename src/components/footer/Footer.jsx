import React, {Component} from "react";
import logo from "../header/1681625377_papik-pro-p-tetrad-smerti-logotip-vektor-28.png"

export default class Footer extends Component{

    render() {
        return (
            <div>
                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="footer__about">
                                    <div className="footer__logo">
                                        <a href="#"><img src={logo} alt=""/></a>
                                    </div>
                                    <p>Какой-то текст</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="footer__copyright__text">
                                    <p>Copyright ©2024
                                    Очень интересный текст, который все прочтут
                                        <a href="https://www.anekdot.ru/?ysclid=lw7gwfcsfz937522716" target="_blank">Нажми на меня</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

}