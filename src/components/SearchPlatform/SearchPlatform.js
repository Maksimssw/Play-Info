import './SearchPlatform.scss';
import { useState } from 'react';
import sniper from '../img/Platform/sniper.png';
import trevor from '../img/Trevor.png';

const SearchPlatform = (props) => {

    const {filterPlatform} = props;

    const[search, setSearch] = useState();

    const getPlatform = (e) => {
        e.preventDefault();

        filterPlatform(search);
    }

    return(
        <section className="search">
            <div className="container">
                <form onSubmit={(e) => getPlatform(e)}>
                    <h1 className="search__title">Выберите платформу</h1>
                    <input 
                        type="text" 
                        placeholder='Напишите нужную вам платформу...'
                        onChange={(e) => setSearch(e.target.value)}
                        required/>
                    <button className='search__button'>Поиск...</button>
                </form>
                <div className='search__ph'>
                    <img src={sniper} alt="play"/>
                    <img src={trevor} className='search__trevor' alt={trevor}/>
                </div>
            </div>
        </section>
    )
} 

export default SearchPlatform;