import {useEffect, useState, useRef } from "react";
import useGet from "../../hooks/useGet";
import playServer from "../../server/playServer";

const FilterPlatforms = (props) => {

    const {requestAllPlay} = playServer();
    const {getPlatforms} = props;

    const data = useGet(undefined, requestAllPlay);
    const [platforms, setPlatforms] = useState();
    useEffect(() => {
        setPlatforms(data);
    }, [data]);

    const contant = platforms === undefined ? null : <Wiev platforms={platforms} getPlatforms={getPlatforms}/>

    return(
        <>
            {contant}
        </>
    )
}

const Wiev = (props) => {
    const {platforms, getPlatforms} = props;

    const option = platforms.map(item => {
        const {id, name} = item;

        return(
            <option key={id} value={id}>{name}</option>
        )
    });

    const platform = useRef();

    const choisPlatform = (e) => {
        const plat = e.target.value;
        localStorage.setItem('platform', plat);
        getPlatforms(plat)
    }

    useEffect(() => {
        const plat = localStorage.getItem('platform');
        platform.current.value = plat;
        getPlatforms(plat);
    }, []);

    return(
        <li className="filters__list">
            Выбрать определенную платформу: 
            <select onChange={choisPlatform} ref={platform}>
                {option}
            </select>
        </li>
    )
}

export  default FilterPlatforms;