import './Slider.scss';
import arrowLeft from '../img/free-icon-left-arrow.png';
import { useState, useEffect,useRef } from 'react';
import playServer from '../../server/playServer';
import Spinner from '../Spinner/Spinner';
import Error from '../Page/Error/Error';
import { set } from 'animejs';

const Slider = (props) => {

    const {slug} = props;
    const {loading, error, requestGamePhoto} = playServer();

    const[id, setId] = useState(); 
    const[photos, setPhotos] = useState();

    useEffect(() => {
        getGamePhoto(slug);
    }, []);

    const getGamePhoto = (id) => {
        requestGamePhoto(id)
            .then(data => setPhotos(data));
    }

    const loaded = loading ? <Spinner/> : null;
    const mistake = error ? <Error/> : null;
    const contant = loading || error ||  photos === undefined  ? null : <Wiev photos={photos}/>

    return(
        <div className='slider'>
            {loaded}
            {mistake}
            {contant}
        </div>
    )
} 

const Wiev = (props) => {

    const {photos} = props;

    const ref = useRef(null);

    useEffect(() => {
        setWidthSlide(ref.current.offsetWidth);
    }, [ref.current])

    const slid = photos.map(item => {

        const {id, image} = item;

        return(
            <li ref={ref} key={id} className='slider__list'>
                <img src={image} alt='game'/>
            </li>
        )
    });

    const[widthSlide, setWidthSlide] = useState(null);
    const[num, setNum] = useState(1);
    const[offset, setOffset] = useState(0);

    const widthWrapper = photos.length * 100 + '%';

    const next = () => {
        if(num >= photos.length){
            setNum(1);
            setOffset(0);
        } else {
            setNum(num + 1);
            setOffset(offset + widthSlide);
        };
    }

    const prev = () => {
        if(num <= 1 ){
            setNum(photos.length);
            setOffset(widthSlide * (photos.length - 1));
        } else {
            setNum(num - 1)
            setOffset(offset - widthSlide);
        };
    }

    const style = {
        width: widthWrapper,
        transform: `translateX(-${offset}px)`
    }

    return(
        <>
            <div className='slider__counter'>
                <span className='slider__num'>{num}</span>
                /
                <span className='slider__total'>{photos.length}</span>
            </div>
            <div className='slider__container'>
                <div className='slider__arrow' onClick={prev}>
                    <img src={arrowLeft} alt='arrowLeft'/>
                </div>
                <ul className='slider__wrapper'
                    style={style}>
                    {slid}
                </ul>
                <div className='slider__arrow' onClick={next}>
                    <img src={arrowLeft} alt='arrowLeft'/>
                </div>
            </div>
        </>
    )
}

export default Slider;