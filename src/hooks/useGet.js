import { useEffect, useState } from "react";
import playServer from "../server/playServer";

const useGet = (id, request) => {

    const {
        requestGame, 
        requestGames, 
        onErrorFalse, 
        requestAllPlay,
        requestPlatformInfo,
        requestGamePhoto,
        requestGameProgress,
        requestGameDevelopers,
        requestGamegTrailers,
        requestGameShops,
        requestGameSeries,
        requestAllShops,
        requestShop,
        requestGamesSearch,
        requestGenres,
        requestTags,
    } = playServer();


    const[data, setData] = useState();

    useEffect(() => {
        get();
    }, [])  

    const get = () => {
        request(id)
            .then(data => setData(data));
    }

    if(data !== undefined) return data
};

export default useGet;