import './Developers.scss';
import { useState, useEffect } from 'react';
import useGet from '../../hooks/useGet';
import playServer from '../../server/playServer';
import useLoad from '../../hooks/useLoad';
import '../Page/GamePage/GamePage.scss';
import imageError from '../img/image_error_full.png';

const Developers = (props) => {

    const {id} = props
    const {loading, error, requestGameDevelopers} = playServer();
    const data = useGet(id, requestGameDevelopers);
    
    const [developers, setDevelopers] = useState();
    const [developersText, setDevelopersText] = useState('Разработчики игры');

    useEffect(() => {
        setDevelopers(data);
    }, [data]);

    const {loaded, mistake} = useLoad(loading, error);
    const contant = loading || error || developers === undefined  ? null : <Wiev developers={developers} setDevelopersText={setDevelopersText}/>

    return(
        <section style={{display: developersText === '' ? 'none' : 'block'}} className='developers'>
            <h2 className='progress__title'>{error ? null : developersText}</h2>
            {loaded}
            {mistake}
            {contant}
        </section>
    )
}

const Wiev = (props) =>{
    const {developers, setDevelopersText} = props;

    console.log(developers);

   if(developers.length === 0) {
        setDevelopersText('');
        console.log(1);
   }  else{
    const people = developers.map(item => {
        const {id, image, name} = item;

        return(
            <li key={id} className='developers__list'>
                <div className='developers__ph'>
                    <img src={image  === null ? imageError : image} alt='people'/>
                </div>
                <h2 className='developers__name'>{name}</h2>
            </li>
        )
        })
        return (
            <ul className='developers__wrapper'>
               {people}
            </ul>
        )
   }
}

export default Developers;