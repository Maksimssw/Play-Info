import './Error.scss';
import error from '../../img/404.png';
import {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';

const Error = () =>{

    useEffect(() => {
        animeError();
    }, []);

    const animeError = () => {
        const selector = anime({
            targets: '.error__title',
            translateY: -20,
            loop: true,
            easing: 'linear',
            duration: 1000
        });

        console.log(anime());
    }

    return (
        <div className='container'>
            <div className='error'>
                <img src={error} alt={error}/>
            </div>
        </div>
    )
}

export default Error;