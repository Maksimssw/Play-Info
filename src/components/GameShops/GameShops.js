import './gameShops.scss';
import useGet from '../../hooks/useGet';
import useLoad from '../../hooks/useLoad';
import playServer from '../../server/playServer';
import { useState, useEffect } from 'react';

const GameShop = (props) => {

    const {loading, error, requestGameShops} = playServer();

    const {slug}  = props;
    const data = useGet(slug, requestGameShops);
    const [shops, setShops] = useState();
    const [shopsText, setShopsText] = useState('Магазины продающие игру')

    useEffect(() => {
        setShops(data);
    }, [data]);

    const {loaded, mistake} = useLoad(loading, error);
    const contant = loading || error || shops === undefined ? null : <Wiev shops={shops} setShopsText={setShopsText}/>

    return(
        <section style={{display: shopsText === '' ? 'none' : 'block'}} className='game-shop'>
            <h2 className='progress__title'>{error ? null : shopsText}</h2>
            {loaded}
            {mistake}
            {contant}
        </section>
    )
}

const Wiev = (props) => {

    const {shops, setShopsText} = props;

    const shopsList = shops.map(item => {
        const {url} = item;

        return(
            <li className='game-shop__list'>
                <a href={url}>{url}</a>
            </li>
        )
    });

    return(
        <>
            {shopsList.length === 0 ?  setShopsText(''): 
            <ul className='game-shop__wrapper'> 
                {shopsList}
            </ul>
            }
        </>
    )
}

export default GameShop;