import { useCallback, useState, useEffect } from "react";
import playServer from "../../../server/playServer";
import Spinner from "../../Spinner/Spinner";
import Error from "../Error/Error";
import './PatformPage.scss';
import SearchPlatform from "../../SearchPlatform/SearchPlatform";
import { Link } from "react-router-dom";

const PlatformPage = () => {
    const{loading, error, requestAllPlay} = playServer();

    const[data, setData] = useState([]);
    const[filter, setFilter] = useState([]);

    useEffect(() => {
        getPlay();
    }, []);

    const getPlay = () => {

        if(filter.length === 0){
            setFilter(false);
        }

        requestAllPlay()
            .then(data => setData(data))
    }

    const filterPlatform = (search) => {

        const res = data.filter(item => item.name === search);
        setFilter(res);
    }

    const request = filter ? filter : data;

    const loaded = loading ? <Spinner/> : null;
    const mistake = error ? <Error/> : null;
    const contant = loading || error   ? null : <Wiev request={request} getPlay={getPlay}/>

    return (
        <>
            <SearchPlatform 
                            filterPlatform={filterPlatform}/>
            {contant}
            {loaded}
            {mistake}
        </>
    )
}

const Wiev = (props) => {

    const {request, getPlay} = props;

    const notPlatform = request.length === 0 ?  <h2 className="platform__not">Данная платформа отсутсвует<br/> <button onClick={getPlay}>Показать доступные</button></h2> : null;

    const platforms = request.map(item => {
        return (
            <li key={item.id} className="platform__list">
                <div className="platform__ph">
                    <img src={item.image_background} alt="platform"/>
                </div>
                <Link to={`/${item.id}`} className="platform__text">
                    {item.name}
                </Link>
            </li>
        )
    })

    return(
        <section className="platform">
            <div className="container">
                <h2 className="platform__title">Платформы</h2>
                {notPlatform}
                <ul className="platform__wrapper">
                    {platforms}
                </ul>
            </div>
        </section>
    )
}

 
export default PlatformPage;
