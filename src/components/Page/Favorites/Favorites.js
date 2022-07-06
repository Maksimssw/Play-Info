import { useState, useEffect, useRef } from "react";
import playServer from "../../../server/playServer";
import useLoad from "../../../hooks/useLoad";
import './favorites.scss';
import Rating from "../../Rating/Rating";
import { Link } from "react-router-dom";
import trashcan from '../../img/trashcan.png';

const Favorites = () => {

    const {loading, error, requestGame} = playServer();

    const [favorites, setFavorites] = useState(localStorage.getItem('favorite'));
    const [arr, setArr] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        addToArray();
    }, []);

    const addToArray = () => {
        const res = favorites === null ? null : favorites.replace(/"/g, '').split` `;

        setArr(res)
    };

    useEffect(() => {
        getGames()
    }, [arr])


    const switching = () => {
        setGames([]);
        setArr(null);
    };

    const getGames = () => {
        const emptyArray = []
        if(arr !== null){
            arr.forEach(item => {
                requestGame(item)
                .then(data => emptyArray.push(data))
                .then(() => setGames([...games, emptyArray]))
            })
        }
    };

    const {loaded, mistake} = useLoad(loading, error);
    const contant = loaded || mistake || games.length === 0 ? null : <Wiev games={games} switching={switching}/>
    const empryText = loaded || mistake ? null : <h2>Вы ничего не добавили :(</h2>

    return(
        <section className="favorites">
            <div className="container">
                {loaded}
                {mistake}
                {contant}
                {arr === null  ? empryText : null}
            </div>
        </section>
    )
}


const Wiev = (props) =>{
    const {games, switching} = props;

    const list = games[0]

    const idSlug = useRef();

    const game = list.map(item => {
        const {id, rating, name, slug, background_image} = item;

        return(
        <li key={id} className="favorites__list">
                <div className="favorites__photo">
                    <img src={background_image} alt={slug}/>
                </div>

                <div className="favorites__info">
                    <h2 className="favorites__name">{name}</h2>

                    <div className="favorites__container">
                        <Rating rating={rating} volum={50}/>

                        <Link to={`/games/${slug}`} className="favorites__link">Подробнее →</Link>
                    </div>

                </div>

            </li>
        )
    });

    const deletingGame = () => {
        localStorage.clear();
        switching();
    }

    return (
        <>
            <a href="#" ref={idSlug} onClick={deletingGame} className="trashcan"> 
                <img src={trashcan} alt="trashcan"/>
            </a>
            <ul className="favorites__wrapper">
                {game}
            </ul>
        </>
    )
}

export default Favorites;