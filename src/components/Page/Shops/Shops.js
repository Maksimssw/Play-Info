import '../PlatformPage/PatformPage.scss';
import useGet from '../../../hooks/useGet';
import useLoad from '../../../hooks/useLoad';
import playServer from '../../../server/playServer';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Shops = () => {

    const {loading, error, requestAllShops} = playServer();
    const data = useGet(undefined, requestAllShops);

    const [shops, setShops] = useState();

    useEffect(() => {
        setShops(data);
    }, [data]);

    const {loaded, mistake} = useLoad(loading, error);
    const content = loading || error || shops === undefined ? null : <Wiev shops={shops}/>

    return(
        <>
        <Helmet>
            <title>Магазины</title>
        </Helmet>
        <section className='shops'>
            {loaded}
            {mistake}
            {content}
        </section>
        </>
    )
}

const Wiev = (props) => {

    const {shops} = props;

    const platforms = shops.map(item => {
        return (
            <li key={item.id} className="platform__list">
                <div className="platform__ph">
                    <img src={item.image_background} alt="platform"/>
                </div>
                <Link to={`/shops/${item.id}`} className="platform__text">
                    {item.name}
                </Link>
            </li>
        )
    })

    return(
        <section className="platform">
            <div className="container">
                <ul className="platform__wrapper">
                    {platforms}
                </ul>
            </div>
        </section>
    )
}


export default Shops;