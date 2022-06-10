import { Http } from "../hooks/http.hook";
import { useEffect } from "react";

const playServer = () =>{
    const{loading, error, request, onErrorFalse} = Http();

    const _key = '?key=3c4146814c2742f9945ad5fb935b27d5'

    const requestAllPlay = async () => {
        const data = await request(`https://api.rawg.io/api/platforms${_key}`);

        return data.results;
    } // Получение всех платформ

    const requestPlatformInfo = async (id) => {
        const data = await request(`https://api.rawg.io/api/platforms/${id}${_key}`);

        return tranformPlatformInfo(data);
    } // Получение платформы

    const tranformPlatformInfo = (platform) => {
        return{
            img: platform.image_background,
            description: platform.description
        }
    }

    const requestGames = async  () => {
        const data = await request(`https://rawg.io/api/games${_key}`);
        
        return data;
    } // Получениение всех игр

    const requestGame = async (id) => {
        const data = request(`https://api.rawg.io/api/games/${id}${_key}`)
        
        return data
    } // Получение одной игры

    const requestGamePhoto = async (id) => {
        const data = await request(`https://api.rawg.io/api/games/${id}/screenshots${_key}`);

        return data.results;
    }  // Получение фоток для одной игры

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'f202c9a36cmsh7d8f25247c5aae9p16cc87jsn2ea9ad210560',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: '[{"Text":"How are you? I am fine. What did you do today?"}]'
    };
    
    fetch('https://microsoft-translator-text.p.rapidapi.com/BreakSentence?api-version=3.0', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    return {
        loading, // Загрузка 
        error, // Ошибка
        requestGame, // Получение одной игры
        requestGames, // Получениение всех игр
        onErrorFalse, // Выключение загрузки
        requestAllPlay, // Получение всех платформ
        requestPlatformInfo, // Получение одной платформы
        requestGamePhoto // Получение фоток для одной игры
    }
}

export default playServer;
