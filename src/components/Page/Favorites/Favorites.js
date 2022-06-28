import { useState, useEffect, useCallback } from "react";
import playServer from "../../../server/playServer";
import useLoad from "../../../hooks/useLoad";


const Favorites = () => {

    const {loading, error, requestGame} = playServer();

    const [favorites, setFavorites] = useState(localStorage.getItem('favorite'));
    const [arr, setArr] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        addToArray();
    }, []);

    useEffect(() => {
        getGames();
    }, [arr]);

    const addToArray = () => setArr(favorites.replace(/"/g, '').split` `);

    const getGames = () => {
        const emptyArray = []
        arr.forEach(item => {
            requestGame(item)
            .then(data => emptyArray.push(data))
            .then(() => setGames(emptyArray));
        })
    };

    const {loaded, mistake} = useLoad(loading, error);
    const contant = loaded || mistake || games === undefined ? null : <Wiev games={games}/>

    return(
        <>
            {loaded}
            {mistake}
            {contant}
        </>
    )
}


const Wiev = (props) =>{
    const {games} = props;

    console.log(games);
}

export default Favorites;