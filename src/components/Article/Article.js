import React from 'react';

import classes from "./Article.css"

const Article = props => (
    <article className={classes.Article} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <div className={classes.LastModified}>{props.edited} <br/>by {props.editor}</div>
    </article>
);



export default Article;