import { useState, useEffect, useRef } from "react";
import './filters.scss';
import playServer from "../../server/playServer";
import useGet from "../../hooks/useGet";

const FilterPublishers = (props) =>{

    const {requestPublishers, error} = playServer();
    const {getPublishers} = props;

    const data = useGet(undefined, requestPublishers)
    const [publishers, setPublishers] = useState();

    useEffect(() => {
        setPublishers(data);
    }, [data]) 

    const contant = error || publishers === undefined ? null : <Weiv publishers={publishers} getPublishers={getPublishers}/>

    return(
        <div className="filters-publishers">
            {contant}
        </div>
    )
}

const Weiv = (props) => {
    const {publishers, getPublishers} = props;

    const list = publishers.map(item => {
        const {id, name, slug} = item;
        
        return(
            <option key={id} value={slug}>{name}</option>
        )
    })

    const broadcastPublishers = (e) => {
        localStorage.setItem('Publishers', e.target.value);

        getPublishers(e.target.value);
    } 

    useEffect(() => {
        const plat = localStorage.getItem('Publishers');

        publishersRef.current.value = plat === null ? 0 : plat;
        getPublishers(plat);
    }, [])

    const publishersRef = useRef();

    return(
        <div className="filters-publishers__wrapper">
            <p>Издатели: </p>
            <select ref={publishersRef} onChange={broadcastPublishers}>
                <option value={0}>Все</option>
                {list}
            </select>
        </div>
    )
}


export default FilterPublishers;