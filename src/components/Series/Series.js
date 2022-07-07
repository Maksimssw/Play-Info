import '../Page/AllGamesPage/AllGamesPage.scss';
import useGet from '../../hooks/useGet';
import useLoad from '../../hooks/useLoad';
import playServer from '../../server/playServer';
import { useState, useEffect } from 'react';
import '../Page/GamePage/GamePage.scss';

const Series = (props) => {
    
    const {slug} = props;
    const {loading, error, requestGameSeries} = playServer();

    const data = useGet(slug, requestGameSeries);
    const [series, setSeries] = useState();
    const [seriesText, setSeriesText] = useState('Другие серий игры')

    useEffect(() => {
        setSeries(data);
    }, [data]);

    const {loaded, mistake} = useLoad (loading, error);
    const content = loading || error || series === undefined ? null : <Wiev series={series} setSeriesText={setSeriesText}/>

    return(
        <section style={{display: seriesText === '' ? 'none' : 'block'}} className='games'>
            <div className='container'> 
                <h2 className='progress__title'>{error ? null : seriesText}</h2>
                {loaded}
                {mistake}
                {content}
            </div>
        </section>
    );
}

const Wiev = (props) => {
    const {series, setSeriesText} = props;

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
                games.length === 0 ?  setSeriesText('') : <ul className='games__wrapper'>{games}</ul>
            }
        </>
    )
}

export default Series;