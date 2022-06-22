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

    useEffect(() => {
        setShops(data);
    }, [data]);

    const {loaded, mistake} = useLoad(loading, error);
    const contant = loading || error || shops === undefined ? null : <Wiev shops={shops}/>

    return(
        <section className='game-shop'>
            {loaded}
            {mistake}
            {contant}
        </section>
    )
}

const Wiev = (props) => {

    const {shops} = props;

    const shopsList = shops.map(item => {
        const {id, url} = item;

        return(
            <li className='game-shop__list'>
                <a href={url}>{url}</a>
            </li>
        )
    });

    return(
        <>
            {shopsList.length === 0 ? <h2 className='game-shop__err'>Магазинов не найдено 😞</h2>: 
            <ul className='game-shop__wrapper'> 
                {shopsList}
            </ul>
            }
        </>
    )
}

export default GameShop;