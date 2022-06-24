import {useEffect, useRef } from "react";

const FilterPlatform = (props) =>{
    
    const {getPlatform} = props;
    const platform = useRef();

    useEffect(() => {
        const plat = localStorage.getItem('platformsCount');
        platform.current.value = plat;
        getPlatform(plat);
    }, []);

    const getPlatformCount = (e) => {
        localStorage.setItem('platformsCount', e.target.value)

        getPlatform(e.target.value);
    }

    return(
        <li className="filters__list">Количество платформ:
            <select ref={platform} onChange={e => getPlatformCount(e)}>
                <option value={0}>Все</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
            </select>
        </li>
    )
}

export default FilterPlatform;