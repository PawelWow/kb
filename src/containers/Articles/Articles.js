import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector} from 'react-redux';

import * as actions from '../../store/actions/index';

const Articles = props => {
    const dispatch = useDispatch();
    const onInitArticles = useCallback(() => dispatch(actions.initArticles()), [dispatch]);

    const articles = useSelector(state => state.articles.details);


    useEffect(() => {
        onInitArticles();
    }, [onInitArticles])



    return <div><p>Articles</p> {getArticles()}</div>;

    function getArticles(){
        console.log("arts:");
        console.log(articles);

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