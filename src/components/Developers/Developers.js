import './Developers.scss';
import { useState, useEffect } from 'react';
import useGet from '../../hooks/useGet';
import playServer from '../../server/playServer';
import useLoad from '../../hooks/useLoad';

const Developers = (props) => {

    const {id} = props
    const {loading, error, requestGameDevelopers} = playServer();
    const data = useGet(id, requestGameDevelopers);
    
    const[developers, setDevelopers] = useState();

    useEffect(() => {
        setDevelopers(data);
    }, [data]);

    const {loaded, mistake} = useLoad(loading, error);
    const contant = loading || error || developers === undefined  ? null : <Wiev developers={developers}/>

    return(
        <section className='developers'>
            {loaded}
            {mistake}
            {contant}
        </section>
    )
}

const Wiev = props =>{
    const {developers} = props;

   if(developers.length === 0) {
        return <div className='developers__err'>Разработчиков к этой игре не найдено 😞</div>
   }  else{
    const people = developers.map(item => {
        const {id, image, name} = item;

        if(image === null) {
            return
        } else { 
            return(
                    <li key={id} className='developers__list'>
                        <div className='developers__ph'>
                            <img src={image} alt='people'/>
                        </div>
                        <h2 className='developers__name'>{name}</h2>
                    </li>
                )
            }
        })
        return (
            <ul className='developers__wrapper'>
               {people}
            </ul>
        )
   }
}

export default Developers;