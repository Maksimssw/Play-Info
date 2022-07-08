import { Http } from "../hooks/http.hook";

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
            description: platform.description,
            name: platform.name
        }
    }

    const requestGames = async (page, series, platform, platforms, genres, tags, publishers) => {

        const _page = `&page=${page}`;
        const _series = `&exclude_game_series=${series === null ? false : series}`;
        const _platform = `&platforms_count=${platform}`;
        const _platforms =  platforms == 0 ? null : `&platforms=${platforms === null ? 4 : platforms}`
        const _genres =  `&genres=${genres}`;
        const _tags = tags === '0' || tags === null || tags === undefined ? '' : `&tags=${tags}`;
        const _publishers = publishers == 0 || publishers === undefined || publishers === null ? '' : `&publishers=${publishers}`;

        if(genres === null || genres === 'Все'){
            const data = await request(`https://rawg.io/api/games${_key}${_page}&page_size=20${_series}${_platform}${_platforms}${_tags}${_publishers}`);

            return data.results;
        } else{
            const data = await request(`https://rawg.io/api/games${_key}${_page}&page_size=20${_series}${_platform}${_platforms}${_genres}${_tags}${_publishers}`);
            console.log(data);

            return data.results;
        }
    } // Получениение всех игр

    const requestGamesSearch = async () => {
        const data = await request(`https://rawg.io/api/games${_key}&search_precise=false`);

        return data;
    } // Получениение всех игр (Поиск)

    const requestGame = async (id) => {
        const data = await request(`https://api.rawg.io/api/games/${id}${_key}`)

        return data
    } // Получение одной игры

    const requestGamePhoto = async (id) => {
        const data = await request(`https://api.rawg.io/api/games/${id}/screenshots${_key}`);

        return  data.results;
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

    const requestGameSeries = async (id) => {
        const data = await request(`https://api.rawg.io/api/games/${id}/game-series${_key}`);

        return data.results;
    } // Часть одной серий 

    const requestAllShops = async () => {
        const data = await request(`https://api.rawg.io/api/stores${_key}`);

        return data.results;
    } // Магазины

    const requestShop = async (id) => {
        const data = await request(`https://api.rawg.io/api/stores/${id}${_key}`);

        return data;
    } // Подробная информация о магазине

    const requestGenres = async () => {
        const data = await request(`https://api.rawg.io/api/genres${_key}`);

        return data.results;
    } // Жанры

    const requestTags = async () => {
        const data = await request(`https://api.rawg.io/api/tags${_key}`);

        return data.results;
    } // Теги

    const requestPublishers = async () => {
        const data = await request(`https://api.rawg.io/api/publishers${_key}`);

        return data.results;
    } //  Издатели

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
        requestGameSeries, // Часть одной серий 
        requestAllShops, // Магазины
        requestShop, // Подробная информация о магазине
        requestGamesSearch, // Получениение всех игр (Поиск)
        requestGenres, // Жанры
        requestTags, // Теги
        requestPublishers, // Издатели
    }
}

export default playServer;
