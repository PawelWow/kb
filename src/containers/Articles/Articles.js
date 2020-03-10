import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector} from 'react-redux';

import * as actions from '../../store/actions/index';

const Articles = props => {
    const dispatch = useDispatch();
    const onInitArticles = useCallback(() => dispatch(actions.initArticles()), [dispatch]);

    const articles = useSelector(state => state.articles.collection);


    useEffect(() => {
        onInitArticles();
    }, [onInitArticles])

    console.log("arts:");
    console.log(articles);

    return <div><p>Articles</p> <p>{getArticles()}</p></div>;

    function getArticles(){
        return(
            <ul>
                {articles.map(article => (
                    <li key={article.id}>{article.title}</li>
                ))}
            </ul>

        );
    }
}

export default Articles;