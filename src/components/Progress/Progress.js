import './Progress.scss';
import '../Page/GamePage/GamePage.scss';
import { useState, useEffect } from 'react';
import useGet from '../../hooks/useGet';
import useLoad from '../../hooks/useLoad';
import playServer from '../../server/playServer';

const Progress = (props) => {
    
    const {loading, error, requestGameProgress} = playServer();

    const {id} = props;
    const data = useGet(id, requestGameProgress);
    const [progress, setProgress] = useState()

    useEffect(() => {
        setProgress(data);
    }, [data])
    
    const {loaded, mistake} = useLoad(loading, error);
    const contant = loading || error || progress === undefined  ? null : <Wiev progress={progress}/>
    return(
        <section className='progress'>
            <h2 className='progress__title'>Достижения</h2>
            {loaded}
            {mistake}
            {contant}
        </section>
    )
}

const Wiev = (props) => {
    const {progress} = props;


    if(progress.length === 0){
        return(
            <>
                <div className='progress__err'>Достижений к этой игре не найдено 😞</div>
            </>
        )
    } else {
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
        return (
            <ul className='progress__wrapper'>
                {setProgress}
            </ul>
        )
    }
}

export default Progress;