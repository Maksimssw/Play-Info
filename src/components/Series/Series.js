import '../Page/AllGamesPage/AllGamesPage.scss';
import useGet from '../../hooks/useGet';
import useLoad from '../../hooks/useLoad';
import playServer from '../../server/playServer';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Series = (props) => {
    
    const {slug} = props;
    const {loading, error, requestGameSeries} = playServer();

    const data = useGet(slug, requestGameSeries);
    const [series, setSeries] = useState();

    useEffect(() => {
        setSeries(data);
    }, [data]);

    const {loaded, mistake} = useLoad (loading, error);
    const content = loading || error || series === undefined ? null : <Wiev series={series}/>

    return(
        <section className='games'>
            <div className='container'> 
                {loaded}
                {mistake}
                {content}
            </div>
        </section>
    );
}

const Wiev = (props) => {
    const {series} = props;

    console.log(series);

    const games = series.map(item => {
        const {slug, id, background_image, rating, name} = item;

        return(
            <li key={id} className='games__list'>
                <div className='games__ph'>
                    <img src={background_image} alt={name}/>
                </div>
                <div className='games__info'>
                    <a href={`/games/${slug}`} className='games__link'>{name}</a>
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
            {
                games.length === 0 ?  <h2 className='games__err'>Не удалось найти другие серий 😞</h2> : 
                <ul className='games__wrapper'>{games}</ul>
            }
        </>
    )
}

export default Series;