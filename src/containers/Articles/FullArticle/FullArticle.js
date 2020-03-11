import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector} from 'react-redux';

import * as actions from '../../../store/actions/index';

// TODO spr czy na razie jest zbyt globalnie - Full article powinien mieć chyba tylko dostęp do załadowanego arta

// props.details i props.contentId musi byc ustawione
const FullArticle = props => {
    const dispatch = useDispatch();

    // To powinno być w app.js podobnie jak kategorie
    const onLoadContent = useCallback((contentId) => dispatch(actions.getContent(contentId)), [dispatch]);
    const content = useSelector(state => state.articles.currentContent); 
    const articles = useSelector(state => state.articles.details);

    const [details, setDetails] = useState('');

    useEffect(() =>{
        const detailsFound = articles.filter(article => article.link === props.match.params.link);
        const articleDetails = {...detailsFound[0]};
        

        // TODO obsługa błędów
        setDetails(articleDetails);

        onLoadContent(articleDetails.contentId);
    }, [onLoadContent]);

    return showArticle();

    function showArticle()
    {
        if(!details){
            return <p>Loading...</p>
        }

        return(
            <div>
            <h1>{details.title}</h1>
            <div>
                {content}
            </div>
            <div>
                Author: {details.author}
            </div>
            <div>
                Last modified: {details.edited} by {details.editor}
            </div>
        </div>
        );
    }
    
}

export default FullArticle;