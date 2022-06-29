import { useState, useEffect, useCallback } from "react";
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

    const addToArray = () => setArr(favorites.replace(/"/g, '').split` `)

    useEffect(() => {
        getGames()
    }, [arr])

    const getGames = () => {
        const emptyArray = []
        arr.forEach(item => {
            requestGame(item)
            .then(data => emptyArray.push(data))
            .then(() => setGames([...games, emptyArray]))
        })
    };

    const {loaded, mistake} = useLoad(loading, error);
    const contant = loaded || mistake || games.length === 0 ? null : <Wiev games={games}/>

    return(
        <section className="favorites">
            <div className="container">
                {loaded}
                {mistake}
                {contant}
            </div>
        </section>
    )
}


const Wiev = (props) =>{
    const {games} = props;

    const game = games[0].map(item => {
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

                <div className="trashcan"> 
                    <img src={trashcan} alt="trashcan"/>
                </div>

            </li>
        )
    });

    return (
        <ul className="favorites__wrapper">
            {game}
        </ul>
    )
}

export default Favorites;