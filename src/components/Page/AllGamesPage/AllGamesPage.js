import './AllGamesPage.scss';
import playServer from '../../../server/playServer';
import { useCallback, useEffect, useState} from 'react';
import useLoad from '../../../hooks/useLoad';
import { Link } from 'react-router-dom';
import Pages from '../../Pages/Pages';
import Filters from '../../Filters/Filters';
import { Helmet } from 'react-helmet';
import imageError from '../../img/image_error_full.png';

const AllGamesPage = () => {

    const {requestGames, loading, error} = playServer();

    const [page, setPage] = useState(1);
    const [series, setSeries] = useState(false);
    const [platform, setPlatform] = useState(0);
    const [platforms, setPlatforms] = useState(4);
    const [genres, setGenres] = useState(null);
    const [tags, setTags] = useState(null);
    const [publishers, setPublishers] = useState(null);

    const [games, setGames] = useState();

    useEffect(() => {
        getAllGames();
    }, [page, series, platform, platforms, genres, tags, publishers]);

    const getPage = (page) => setPage(page)

    const getSeries = (series) => setSeries(series)

    const getPlatform = (platform) => setPlatform(platform)

    const getPlatforms = (platforms) => setPlatforms(platforms);

    const getGenres = (genres) => setGenres(genres);

    const getTags = (tags) => setTags(tags);

    const getPublishers = (publishers) => setPublishers(publishers);

    const getAllGames = () => {
        requestGames(page, series, platform, platforms, genres, tags, publishers)
            .then(data => setGames(data));
    }

    const {loaded, mistake} = useLoad(loading, error);
    const content = loading || error || games === undefined ? null : <Wiev page={page} getPage={getPage} games={games}/>

    return(
        <>
        <Helmet>
            <title>Вcе игры</title>
        </Helmet>
        <section className='games'>
            <div className='container'> 
                <Filters getSeries={getSeries}
                         getPlatform={getPlatform}
                         getPlatforms={getPlatforms}
                         getGenres={getGenres}
                         getTags={getTags}
                         getPublishers={getPublishers}/>
                <h1 className='games__title'>Доступные игры</h1>
                {loaded}
                {mistake}
                {content}
            </div>
        </section>
        </>
    );
}

const Wiev = (props) => {

    const {games, page, getPage} = props

    const game = games.map(item => {

        const {id, background_image, rating, name, slug} = item;

        return(
            <li key={id} className='games__list'>
                <div className='games__ph'>
                    <img src={background_image  === null ? imageError : background_image} alt={name}/>
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
        <>
        <Pages page={page} getPage={getPage} games={games.length}/>
            <ul className='games__wrapper'>{game}</ul>
        <Pages page={page} getPage={getPage} games={games.length}/>
        </>
    )
}

export default AllGamesPage;
