import "./filters.scss";
import FilterSeries from "./FilterSeries";
import FilterPlatform from "./FilterPlatform";
import FilterPlatforms from "./FilterPlatforms";
import FilterGenres from "./FilterGenres";
import FilterTags from "./FilterTags";
import FilterPublishers from "./FiltersPublishers";

const Filters = (props) => {

    const {getSeries, getPlatform, getPlatforms, getGenres, getTags, getPublishers} = props;

    return(
        <section className="filters">
            <div className="container">
                <h2 className="filters__title">Фильтрация игр</h2>
                <div className="filters__container">
                    <ul className="filters__wrapper">
                        <FilterSeries getSeries={getSeries}/>
                        <FilterPlatform getPlatform={getPlatform}/>
                        <FilterPlatforms getPlatforms={getPlatforms}/>
                    </ul>
                    <div>
                        <FilterGenres getGenres={getGenres}/>
                        <FilterTags getTags={getTags}/>
                        <FilterPublishers getPublishers={getPublishers}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Filters;