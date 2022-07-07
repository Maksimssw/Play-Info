import { useState, useEffect, useRef } from "react";
import playServer from "../../server/playServer";
import useGet from "../../hooks/useGet";
import './filters.scss';

const FilterGenres = (props) => {

    const {getGenres} = props
    const {requestGenres, error} = playServer();

    const data = useGet(undefined, requestGenres);
    const [genres, setGenres] = useState();

    useEffect(() => {
        setGenres(data);
    }, [data])

    const contant = error || genres === undefined ? null: <Wiev genres={genres} getGenres={getGenres}/>

    return(
        <div className="filters-genres">
            {contant}
        </div>
    )
}

const Wiev = (props) => {
    const {genres, getGenres} = props;

    const list = genres.map(item => {
        const {id, name, slug} = item;

        return(
            <option key={id} value={slug}>{name}</option>
        )
    })

    const genresRef = useRef();

    const genresGlug = (e) => {
        localStorage.setItem('Genres', e.target.value);

        getGenres(e.target.value)
    }

    useEffect(() => {
        const plat = localStorage.getItem('Genres');

        genresRef.current.value = plat === null ? 'Все' : plat;
        getGenres(plat)
    }, [])

    return(
        <div className="filters-genres__wrapper">
            <p>Жанр игры:</p>
             <select ref={genresRef} onChange={genresGlug}>
                <option value={null}>Все</option>
                {list}
            </select>
        </div>
    )
}

export default FilterGenres;