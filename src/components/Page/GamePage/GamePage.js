import './GamePage.scss';
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import playServer from '../../../server/playServer';
import Progress from '../../Progress/Progress';
import Slider from '../../Slider/Slider';
import useGet from '../../../hooks/useGet';
import useLoad from '../../../hooks/useLoad';
import Developers from '../../Developers/Developers';
import Trailers from '../../Trailers/Trailers';
import GameShops from '../../GameShops/GameShops';

const GamePage = () => {

    const {loading, error, requestGame} = playServer();
    
    const swht = useParams();
    const {idGame} = swht;

    const data = useGet(idGame, requestGame);

    const [game, setGame] = useState(data);

    useEffect(() => {
        setGame(data);
    }, [data]);

    const {loaded, mistake} = useLoad(loading, error);
    const contant = loading || error || game === undefined  ? null : <Wiev game={game}/>

    return(
        <section className='game'>
            <div className='container'>
                {loaded}
                {mistake}
                {contant}
            </div>
        </section>
    )
}


const Wiev = (props) => {

    const {game} = props;
    const {background_image, id, description_raw, rating, released, updated, slug, name, website} = game

    const upgrade = updated.replace(/T/g, '  ');
    const[style, setStyle] = useState();

    useEffect(() => {
        styleRating();
    }, [])

    const styleRating = useCallback(() => {
        if(rating > 4){
            setStyle('green');
        } else if(rating > 2 && rating < 4){
            setStyle('orange');
        } else{
            setStyle('red');
        }
    }, []);

    const descriptionRaw = description_raw === '' ? <p>К данной игре отсутствует Описание</p> : description_raw

    return (
        <>
            <div className='game__wrapper'>
                <div className='game__ph'>
                    <img src={background_image} alt='game'/>
                    <h2 className='game__name'>{name}</h2>
                    <div className='game__rating' style={{'background': `${style}`}}>
                        {rating}
                    </div>
                    <p className='game__released'>Выпущенно: {released}</p>
                    <p className='game__lastupdate'>Последнее обновление</p>
                    <p className='game__update'>{upgrade}</p>
                    <Link to='/games' className='game__back'>←</Link>
                </div>
                <div className='game__text'>
                    <h2 className='game__title'>Описание</h2>
                    <p className='game__description'>{descriptionRaw}</p>
                </div>
            </div>
            <h3 className='game__website'>Перейти на офицальный сайт можно <a href={website}> тут</a> </h3>
            <Slider slug={slug}/>
            <Trailers id={id}/>
            <h2 className='progress__title'>Достижения</h2>
            <Progress id={id}/>
            <h2 className='progress__title'>Разработчики игры</h2>
            <Developers id={id}/>
            <h2 className='progress__title'>Магазины продающие данную игру</h2>
            <GameShops slug={slug}/>
        </>
    )
}

export default GamePage;