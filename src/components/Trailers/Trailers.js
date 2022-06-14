import './Trailers.scss';
import { useState, useEffect } from 'react';
import useGet from '../../hooks/useGet';
import playServer from '../../server/playServer';
import useLoad from '../../hooks/useLoad';
import useSlider from '../../hooks/useSlider';

const Trailers = (props) => {
    
    const {loading, error, requestGamegTrailers} = playServer();

    const {id} = props;

    const data = useGet(id, requestGamegTrailers);
    const [trailers, setTrailers] = useState();
    
    useEffect(() => {
        setTrailers(data);
    }, [data]);

    const {loaded} = useLoad(loading);
    const contant = loading || error ||  trailers === undefined || trailers.length === 0  ? null : <Wiev trailers={trailers}/>

    return(
        <section className='trailers'>
            {loaded}
            {contant}
        </section>
    )
}

const Wiev = (props) => {
    const {trailers} = props;

    const {prev, style, ref, arrowLeft, num, next} = useSlider(trailers);

    const slid = trailers.map(item => {
        const {data, id, name} = item;

        return (
            <li ref={ref} key={id} className='slider__list'>
                <video controls="controls">
                    <source src={data.max}/>
                </video>
            </li>
        )
    })
    
    return(
        <>
            <div className='slider__container' style={{marginLeft: 0}}>
                <div className='slider__arrow'>
                    <img src={arrowLeft} onClick={prev} alt='arrowLeft'/>
                </div>
                <ul className='slider__wrapper'
                    style={style}>
                    {slid}
                </ul>
                <div className='slider__arrow'>
                    <img src={arrowLeft} onClick={next} alt='arrowLeft'/>
                </div>
            </div>
        </>
    )
}

export default Trailers;