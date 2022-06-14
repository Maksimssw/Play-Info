import { useRef, useEffect, useState } from "react";
import arrowLeft from '../components/img/free-icon-left-arrow.png';

const useSlider = (slid) => {
    const ref = useRef(null);

    useEffect(() => {
        setWidthSlide(ref.current.offsetWidth);
    }, [])

    const[widthSlide, setWidthSlide] = useState(null);
    const[num, setNum] = useState(1);
    const[offset, setOffset] = useState(0);

    const next = () => {
        if(num >= slid.length){
            setNum(1);
            setOffset(0);
        } else {
            setNum(num + 1);
            setOffset(offset + widthSlide);
        };
    }

    
    const widthWrapper = slid.length * 100 + '%';

    const prev = () => {
        if(num <= 1 ){
            setNum(slid.length);
            setOffset(widthSlide * (slid.length - 1));
        } else {
            setNum(num - 1)
            setOffset(offset - widthSlide);
        };
    }

    const style = {
        width: widthWrapper,
        transform: `translateX(-${offset}px)`
    }

    return {prev, style, ref, arrowLeft, num, next}
}

export default useSlider;