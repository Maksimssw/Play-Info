import { useState, useEffect, useRef } from "react";
import "./filters.scss";
import FilterSeries from "./FilterSeries";
import FilterPlatform from "./FilterPlatform";
import FilterPlatforms from "./FilterPlatforms";

const Filters = (props) => {

    const {getSeries, getPlatform, getPlatforms} = props;

    return(
        <section className="filters">
            <div className="container">
                <h2 className="filters__title">Фильтрация игр</h2>
                <ul className="filters__wrapper">
                    <FilterSeries getSeries={getSeries}/>
                    <FilterPlatform getPlatform={getPlatform}/>
                    <FilterPlatforms getPlatforms={getPlatforms}/>
                </ul>
            </div>
        </section>
    )
}

export default Filters;