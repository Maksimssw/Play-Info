import { useState, useEffect} from "react";

const Pages = (props) =>{

    const {page, getPage, games} = props;

    const [pages, setPages] = useState(null)
    const [pageStyle, setPageStyle] = useState(page);

    useEffect(() => {
        coutingPages();
        getPage(page);
    }, []);

    const coutingPages = () => {

        const arr = [].sort();

        for(let i = page - 1; i >= page - 3; i--){
            if(i < 1){}else{
                arr.push(i);
            }
        }

        setPages(arr.sort());

        for(let i = page; i <= page + 3; i++){
            if(games < 20){return}else{
                arr.push(i);
            }
        };
    }

    const getNumber = (e, num) => {
        getPage(num);
        setPageStyle(num);
    };

    const pagesLink = pages === null ? null : pages.map(item => {
        return(
            <li className='page__list' key={item} tabIndex={0}>
                <p  onClick={e => getNumber(e, item)} 
                    className='page__link'
                    style={{color: `${pageStyle === item ? "#f49120" : null}`}}>{item}</p>
            </li>
        )
    });

    return(
        <section className='page'>
            <nav>
                <ul className='page__wrapper'>
                    {pagesLink}
                </ul>
            </nav>
        </section>
    )
}

export default Pages