import { useEffect, useState } from "react";
import playServer from "../server/playServer";
import Spinner from "../components/Slider/Slider";
import Error from "../components/Page/Error/Error";

const useGet = (id =  undefined, request) => {

    const {
        loading,
        error,
        requestGame, 
        requestGames, 
        onErrorFalse, 
        requestAllPlay,
        requestPlatformInfo,
        requestGamePhoto,
        requestGameProgress,
        requestGameDevelopers
    } = playServer();


    const[data, setData] = useState();

    useEffect(() => {
        get();
    }, [])  

    const get = () => {
        request(id)
            .then(data => setData(data));
    }


     if(data !== undefined) {
        return data
     }
};

export default useGet;