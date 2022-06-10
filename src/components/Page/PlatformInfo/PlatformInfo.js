import './PlatformInfo.scss';
import playServer from '../../../server/playServer';
import { useEffect, useState } from 'react';
import Spinner from '../../Spinner/Spinner';
import Error from '../Error/Error';
import { Link, useParams } from 'react-router-dom';
import useGet from '../../../hooks/useGet';

const PlatformInfo = () => {

    const swth = useParams();
    const {idPlatform} = swth;

    const {requestPlatformInfo, loading, error} = playServer();
    const data = useGet(idPlatform, requestPlatformInfo);

    const [platform, setPlatform] = useState();

    useEffect(() => {
        setPlatform(data);
    }, [data]);



    const loaded = loading ? <Spinner/> : null;
    const mistake = error ? <Error/> : null;
    const contant = loading || error || platform === undefined  ? null : <Wiev platform={platform}/>

    return(
        <section className='platform-info'>
            <div className='container'>
                {loaded}
                {mistake}
                {contant}
            </div>
        </section>
    )
}

const Wiev = (data) => {
    const {platform} = data;

    const description = platform.description
            .replace(/[<br><p>/]/g, '')

    const notDescription = description === '' ? <h2>Инфораций не найдено</h2> : null;

    return (
        <div className='platform-info__wrapper'>
            <div className='platform-info__ph'>
                <img src={platform.img} alt='play'/>
                <Link className='platform-info__back' to='/'>←</Link>
            </div>
            <div className='platform-info__text'>
                <h1 className='platform-info__title'>Описание</h1>
                <p className='platform-info__description'>
                   {description}
                   {notDescription}
                </p>
            </div>
        </div>
    )
}

export default PlatformInfo;