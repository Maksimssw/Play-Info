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
        console.log(data);
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
        
        return data.results;
    } // Получениение всех игр

    const requestGame = async (id) => {
        const data = request(`https://api.rawg.io/api/games/${id}${_key}`)
        
        return data
    } // Получение одной игры

    const requestGamePhoto = async (id) => {
        const data = await request(`https://api.rawg.io/api/games/${id}/screenshots${_key}`);

        return data.results;
    }  // Получение фоток для одной игры

    const requestGameProgress = async (id) => {
        const data = await request(`https://api.rawg.io/api/games/${id}/achievements${_key}`)

        return data.results;
    } // Получение достижений

    const requestGameDevelopers = async (id) => {
        const data = await request(`https://api.rawg.io/api/games/${id}/development-team${_key}`);

        return data.results;
    } // Получение разработчиков

    const requestGamegTrailers = async (id) => {
        const data = await request(`https://api.rawg.io/api/games/${id}/movies${_key}`);

        return await data.results;
    } // Трейлеры игры

    const requestGameShops = async (id) => {
        const data = await request(`https://api.rawg.io/api/games/${id}/stores${_key}`);

        return data.results;
    } // Магазины которые продают игру

    return {
        loading, // Загрузка 
        error, // Ошибка
        requestGame, // Получение одной игры
        requestGames, // Получениение всех игр
        onErrorFalse, // Выключение загрузки
        requestAllPlay, // Получение всех платформ
        requestPlatformInfo, // Получение одной платформы
        requestGamePhoto, // Получение фоток для одной игры
        requestGameProgress, // Получение достижений
        requestGameDevelopers, // Получение разработчиков
        requestGamegTrailers, // Трейлеры игры
        requestGameShops, // Магазины которые продают игру
    }
}

export default playServer;
