import './Slider.scss';
import useSlider from '../../hooks/useSlider';
import { useState, useEffect,useRef } from 'react';
import playServer from '../../server/playServer';
import useGet from '../../hooks/useGet';
import useLoad from '../../hooks/useLoad';

const Slider = (props) => {

    const {slug} = props;
    const {loading, error, requestGamePhoto} = playServer();

    const[id, setId] = useState(); 
    const data = useGet(slug, requestGamePhoto);
    const[photos, setPhotos] = useState(data);

    useEffect(() => {
        setPhotos(data);
    }, [data])


    const {loaded, mistake} = useLoad(loading, error);
    const contant = loading || error ||  photos === undefined  ? null : <Wiev photos={photos}/>

    return(
        <div className='slider'>
            {contant}
            {loaded}
            {mistake}
        </div>
    )
} 

const Wiev = (props) => {
    const {photos} = props;

    const {prev, style, ref, arrowLeft, num, next} = useSlider(photos);

    const slid = photos.map(item => {

        const {id, image} = item;

        return(
            <li ref={ref} key={id} className='slider__list'>
                <img src={image} alt='game'/>
            </li>
        )
    });


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