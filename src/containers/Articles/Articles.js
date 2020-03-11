import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector} from 'react-redux';

import Article from '../../components/Article/Article';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import * as actions from '../../store/actions/index';

import classes from './Articles.css';

const Articles = props => {
    const dispatch = useDispatch();
    const onInitArticles = useCallback(() => dispatch(actions.initArticles()), [dispatch]);

    const articles = useSelector(state => state.articles.details);


    useEffect(() => {
        onInitArticles();
    }, [onInitArticles])

    return <Aux>
            <h1>KB articles</h1>
            <div className={classes.Articles}>{getArticles()}</div>
        </Aux>;

    function getArticles(){
        return(
            articles.map(article => (
                <Article key={article.id} {...article} />
            ))
        );        
    }
}

export default Articles;