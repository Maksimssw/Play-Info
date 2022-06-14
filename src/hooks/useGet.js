import { useEffect, useState } from "react";
import playServer from "../server/playServer";
import Spinner from "../components/Slider/Slider";

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