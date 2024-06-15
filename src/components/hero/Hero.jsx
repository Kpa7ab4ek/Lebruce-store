import React, {Component} from "react";
import Carousel from "react-bootstrap/Carousel";
import hero3 from "../../img/hero/hero-3.png";
import hero5 from "../../img/hero/hero-5.jpg";
import hero1 from "../../img/hero/hero-1.png";
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
                        <h3> Любимая модель</h3>
                        <p>мы его зовём шоколадка</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className={"sex"}
                        src={hero5}
                        alt={"Hero4"}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className={"sex"}
                        src={hero1}
                        alt={"Hero1"}
                    />
                    <Carousel.Caption>
                        <h3> Легенда</h3>
                        <h4>На него мы равняемся</h4>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>
            </div>
        );
    }
}