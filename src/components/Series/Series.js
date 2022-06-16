import './series.scss';
import useGet from '../../hooks/useGet';
import useLoad from '../../hooks/useLoad';
import playServer from '../../server/playServer';
import { useState, useEffect } from 'react';

const Series = (props) => {
    
    const {slug} = props;
    const {loading, error, requestGameSeries} = playServer();

    const data = useGet(slug, requestGameSeries);
    const [series, setSeries] = useState(null);

    useEffect(() => {
        setSeries(data);
    }, [data]);

    const {loaded, mistake} = useLoad(loading, error);

    return(
        <div className='series'>
            
        </div>
    )

}

export default Series;