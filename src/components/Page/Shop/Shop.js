import '../PlatformInfo/PlatformInfo.scss';
import './shop.scss'
import useGet from '../../../hooks/useGet';
import { useState, useEffect } from 'react';
import useLoad from '../../../hooks/useLoad';
import playServer from '../../../server/playServer';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Shop = () => {
    const {loading, error, requestShop} = playServer();
    const swth = useParams();
    const {idShop}  = swth;        

    const data = useGet(idShop, requestShop);
    const [shop, setShop] = useState();

    useEffect(() => {
        setShop(data);
    }, [data]);

    const {loaded, mistake} = useLoad(loading, error);    
    const content = loading || error || shop === undefined ? null : <Wiev shop={shop}/>

    return(
        <>
        <Helmet>
            <title>{shop !== undefined ? `Магазины (${shop.name})` : 'Магазины'}</title>
        </Helmet>
        <section className='platform-info'>
            <div className='container'>
                {loaded}
                {mistake}
                {content}
            </div>
        </section>
        </>
    )
}

const Wiev = (props) => {
    const {shop} = props;
    const {description, image_background, name, domain} = shop;

    const descr = description.replace(/[<br><p>/]/g, '');

    return(
        <div className='platform-info__wrapper'>
        <div className='platform-info__ph'>
            <div className='platform-info__photo'>
                <img src={image_background} alt='play'/>
            </div>
            <h2 className='shop__name'>{name}</h2>
            <a href={`https://${domain}`} className="shop__site">Офицальный сайт</a>
            <Link className='platform-info__back' to='/shops'>← Вернутся</Link>
        </div>
        <div className='platform-info__text'>
            <h1 className='platform-info__title'>Описание</h1>
            <div className='platform-info__description'>
               {descr === '' ? <p className='shop__err'>Описание отстуствует</p> : descr}
            </div>
        </div>
    </div>
    )
}

export default Shop;