import './PlatformInfo.scss';
import playServer from '../../../server/playServer';
import { useEffect, useState } from 'react';
import Spinner from '../../Spinner/Spinner';
import Error from '../Error/Error';
import { Link, useParams } from 'react-router-dom';
import useGet from '../../../hooks/useGet';
import useLoad from '../../../hooks/useLoad';

const PlatformInfo = () => {

    const swth = useParams();
    const {idPlatform} = swth;

    const {requestPlatformInfo, loading, error} = playServer();
    const data = useGet(idPlatform, requestPlatformInfo);

    const [platform, setPlatform] = useState();

    useEffect(() => {
        setPlatform(data);
    }, [data]);



    const {loaded, mistake} = useLoad(loading, error);
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

    const notDescription = description === '' ? <h2>Инфораций не найдено</h2> : description;

    return (
        <div className='platform-info__wrapper'>
            <div className='platform-info__ph'>
                <div className='platform-info__photo'>
                    <img src={platform.img} alt='play'/>
                </div>
                <Link className='platform-info__back' to='/'>← Вернутся</Link>
            </div>
            <div className='platform-info__text'>
                <h1 className='platform-info__title'>Описание</h1>
                <p className='platform-info__description'>
                   {notDescription}
                </p>
            </div>
        </div>
    )
}

export default PlatformInfo;