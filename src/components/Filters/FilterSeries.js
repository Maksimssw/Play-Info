import {useEffect, useRef } from "react";

const FilterSeries = (props) => {

    const {getSeries} = props;
    
    const series = useRef();

    useEffect(() => {
        const log = localStorage.getItem('excludeGameSeries') === 'false' ? false : true;
        series.current.checked = log;
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