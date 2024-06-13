import React, {Component} from "react";
import Carousel from "react-bootstrap/Carousel";
import hero3 from "../../img/hero/hero-3.jpg";
import hero5 from "../../img/hero/hero-5.jpg";
import hero4 from "../../img/hero/hero-4.jpg";
import "./sex.css"


export class Hero extends Component {
    render() {
        return (
            <div>
            <Carousel>
                <Carousel.Item>
                    <img
                        className={"sex"}
                        src={hero3}
                        alt={"Hero3"}
                    />
                    <Carousel.Caption>
                        <h3> Лёнчик</h3>
                        <p> Писька, жопа, член</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className={"sex"}
                        src={hero5}
                        alt={"Hero4"}
                    />
                    <Carousel.Caption>
                        <h3> НеЛёнчик</h3>
                        <p> Писька, жопа, член</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className={"sex"}
                        src={hero4}
                        alt={"Hero4"}
                    />
                    <Carousel.Caption>
                        <h3> НеЛёнчик</h3>
                        <p> Писька, жопа, член</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>
        );
    }
}