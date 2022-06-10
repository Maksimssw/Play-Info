import './Progress.scss';
import { useState, useEffect } from 'react';
import useGet from '../../hooks/useGet';
import Spinner from '../Spinner/Spinner';
import playServer from '../../server/playServer';
import Error from '../Page/Error/Error';

const Progress = (props) => {
    
    const {loading, error, requestGameProgress} = playServer();

    const {id} = props;
    const data = useGet(id, requestGameProgress);
    const [progress, setProgress] = useState()

    useEffect(() => {
        setProgress(data);
    }, [data])
    
    console.log(progress);

    const loaded = loading ? <Spinner/> : null;
    const mistake = error ? <Error/> : null;
    const contant = loading || error || progress === undefined  ? null : <Wiev progress={progress}/>

    return(
        <section className='progress'>
            {loaded}
            {mistake}
            <ul className='progress__wrapper'>
                {contant}
            </ul>
        </section>
    )
}

const Wiev = (props) => {
    const {progress} = props;

    const setProgress = progress.map(item => {
        const {id, image, name, description} = item;

        return(
            <li key={id} className='progress__list'>
                <div className='progress__ph'>
                    <img src={image} alt='progress'/>
                </div>
                <h2 className='progress__name'>{name}</h2>
                <p className='progress__description'>{description}</p>
            </li>
        )
    })

    return setProgress;
}

export default Progress;