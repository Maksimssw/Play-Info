import './AllGamesPage.scss';
import playServer from '../../../server/playServer';
import { useEffect, useState} from 'react';
import useLoad from '../../../hooks/useLoad';
import { Link } from 'react-router-dom';
import useGet from '../../../hooks/useGet';

const AllGamesPage = () => {

    const {requestGames, loading, error} = playServer();

    const [games, setGames] = useState();

    useEffect(() => {
        getAllGames();
    }, []);

    const getAllGames = () => {
        requestGames()
            .then(data => {
                setGames({games, data});
            });
    }

    const {loaded, mistake} = useLoad(loading, error);
    const content = loading || error || games === undefined ? null : <Wiev games={games}/>

    return(
        <section className='games'>
            <div className='container'> 
                <h1 className='games__title'>Доступные игры</h1>
                {loaded}
                {mistake}
                {content}
                <button onClick={getAllGames}>Open</button>
            </div>
        </section>
    );
}

const Wiev = (props) => {

    const {games} = props

    console.log(games.data);

    const game = games.data.map(item => {

        const {id, background_image, rating, name, slug} = item;

        return(
            <li key={id} className='games__list'>
                <div className='games__ph'>
                    <img src={background_image} alt={name}/>
                </div>
                <div className='games__info'>
                    <Link to={`/games/${slug}`} className='games__link'>{name}</Link>
                    <div className='games__rating'>
                        <p>Рейтинг</p>
                        <p>{rating}</p>
                    </div>
                </div>
            </li>
        )
    });

    return(
        <ul className='games__wrapper'>{game}</ul>
    )
}

export default AllGamesPage;