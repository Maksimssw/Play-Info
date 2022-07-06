import { useState, useEffect } from "react";
import './rating.scss';

const Rating = (props) => {

    const {rating, volum} = props;
    const [styleColor, setStyleColor] = useState();

    useEffect(() => {
        styleRating();
    }, [])

    const styleRating = () => {
        if(rating > 4){
            setStyleColor('green');
        } else if(rating > 2 && rating < 4){
            setStyleColor('orange');
        } else setStyleColor('red');
    }

    return(
        <div className='rating' style={{'background': `${styleColor}`, width: volum, height: volum,
                                        fontSize: `${volum === 50 ? '17px' : null}`}}>
            {rating}
        </div>
    )
}

export default Rating;