import {useEffect, useRef } from "react";

const FilterSeries = (props) => {

    const {getSeries} = props;
    
    const series = useRef();

    useEffect(() => {
        const log = localStorage.getItem('excludeGameSeries');
        console.log(log)
        series.current.checked = log === 'false' || log === null ? false : true;
        getSeries(log);
    }, []);

    const excludeGameSeries = (e) => {
        const box = e.target.checked;
        localStorage.setItem('excludeGameSeries', box);
        getSeries(box); 
    };

    return(
        <li className="filters__list">
            <input ref={series} 
            onClick={e => excludeGameSeries(e)} 
            type="checkbox"/>
            Исключите игры, которые включены в серию игр.
        </li>
    )
}

export default FilterSeries;