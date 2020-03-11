import React, {useEffect, useCallback, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Route} from 'react-router-dom';

import Article from '../../components/Article/Article';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import FullArticle from './FullArticle/FullArticle';

import * as actions from '../../store/actions/index';

import classes from './Articles.css';

const Articles = props => {
    const dispatch = useDispatch();

    // To powinno być w app.js podobnie jak kategorie
    const onInitArticles = useCallback(() => dispatch(actions.initArticles()), [dispatch]);

    
    const articles = useSelector(state => state.articles.details);

    const [selectedArticle, setSelectedArticle] = useState('');

    const onArticleSelected = (articleDetails) => {
        setSelectedArticle(articleDetails);
        props.history.push('/art/' + articleDetails.link);
    }

    useEffect(() => {
        onInitArticles();
    }, [onInitArticles])
    
    return <Aux>
            <h1>KB articles</h1>
            <div className={classes.Articles}>{getArticles()}</div>
            
            
        </Aux>

    function getArticles(){
        return(
            articles.map(article => (
                <Article key={article.id} {...article} clicked={() => onArticleSelected(article)} />
            ))
        );        
    }
}

export default Articles;