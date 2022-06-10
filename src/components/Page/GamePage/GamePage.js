import './GamePage.scss';
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import playServer from '../../../server/playServer';
import Spinner from '../../Spinner/Spinner';
import Error from '../Error/Error';
import Progress from '../../Progress/Progress';
import Slider from '../../Slider/Slider';
import useGet from '../../../hooks/useGet';

const GamePage = () => {

    const {loading, error, requestGame} = playServer();
    
    const swht = useParams();
    const {idGame} = swht;

    const data = useGet(idGame, requestGame);

    const [game, setGame] = useState(data);

    useEffect(() => {
        setGame(data);
    }, [data]);

    const loaded = loading ? <Spinner/> : null;
    const mistake = error ? <Error/> : null;
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
                    <p className='game__description'>{description_raw}</p>
                </div>
            </div>
            <h3 className='game__website'>Перейти на офицальный сайт можно <a href={website}> тут</a> </h3>
            <Slider slug={slug}/>
            <h2 className='progress__title'>Достижения</h2>
            <Progress id={id}/>
        </>
    )
}

export default GamePage;