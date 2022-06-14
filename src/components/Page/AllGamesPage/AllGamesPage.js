import './AllGamesPage.scss';
import playServer from '../../../server/playServer';
import { useEffect, useState} from 'react';
import useLoad from '../../../hooks/useLoad';
import { Link } from 'react-router-dom';
import useGet from '../../../hooks/useGet';

const AllGamesPage = () => {

    const {requestGames, loading, error} = playServer();

    const data = useGet(undefined, requestGames);

    const [games, setGames] = useState();

    useEffect(() => {
        setGames(data);
    }, [data]);



    const {loaded, mistake} = useLoad(loading, error);
    const content = loading || error || games === undefined ? null : <Wiev games={games}/>

    return(
        <section className='games'>
            <div className='container'> 
                <h1 className='games__title'>Доступные игры</h1>
                {loaded}
                {mistake}
                {content}
            </div>
        </section>
    );
}

const Wiev = (props) => {

    const {games} = props

    const game = games.map(item => {

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