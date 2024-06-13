import {Component} from "react";
import tank from "../../img/img.png";
import dr from "../../img/img_1.png";
import gyj from "../../img/img_2.png";
import './news.css'

const arr = [{
    title: 'Какой хороший день, чтобы пойти на СВО',
    img: tank,
    date: '22 февраля 2022',
    commit: 'Записаться'
}, {
    title: 'День Рождение разработчика',
    img: dr,
    date: '13 марта 2024',
    commit: 'Прийти'
}, {
    title: 'Гужбан',
    img: gyj,
    date: 'После сесии',
    commit: 'Записаться'
},
]

export class News extends Component {
    render() {
        return (
            <div className="blocks">
                    {arr.map((arr) => (
                        <div className="blog__item" style={{flexDirection: 'row'}}>
                            <div className="blog__item__text">
                                <span><img src={arr.img} alt="фото"/> {arr.date}</span>
                                <h5>{arr.title}</h5>
                                <a href="#">{arr.commit}</a>
                            </div>
                        </div>
                    ))}
            </div>
        );
    }
}
