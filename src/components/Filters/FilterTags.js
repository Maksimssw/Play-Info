import { get } from "animejs";
import { useState, useEffect, useRef } from "react";
import useGet from "../../hooks/useGet";
import playServer from "../../server/playServer";
import './filters.scss';

const FilterTags = (props) => {

    const {getTags} = props;
    const {error, requestTags} = playServer();

    const data = useGet(undefined, requestTags);
    const [tags, setTags] = useState();

    useEffect(() => {
        setTags(data);
    }, [data])

    const contant = error || tags === undefined ? null : <Weiv tags={tags} getTags={getTags}/>

    return(
        <div className="filters-tags">
            {contant}
        </div>
    )
}

const Weiv = (props) => {
    const {tags, getTags} = props;

    const list = tags.map(item => {
        const {id, name, slug} = item;

        return(
            <option key={id} value={slug}>{name}</option>
        )
    });

    const tagsRef = useRef();

    const broadcastTags = (e) => {
        localStorage.setItem('Tags', e.target.value);

        getTags(e.target.value);
    }

    useEffect(() => {
        const plat = localStorage.getItem('Tags');

        tagsRef.current.value = plat === null ? 0 : plat;
        getTags(plat)
    }, [])

    return(
        <div className="filters-tags__wrapper">
            <p>Теги: </p>
            <select ref={tagsRef} onChange={broadcastTags}>
                <option value={0}>Все</option>
                {list}
            </select>
        </div>
    )
}

export default FilterTags;