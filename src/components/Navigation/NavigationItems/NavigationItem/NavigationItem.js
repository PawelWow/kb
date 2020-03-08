import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => {

    let style = classes.NavigationItem;
    if(props.isVertical)
    {
        style = classes.VerticalNavigationItem;
    }

    return(
        <li className={style}>
            <NavLink to={props.link} exact={props.exact} className={props.active}>{props.children}</NavLink> 
            {props.extras}
        </li>        
    );
};

export default navigationItem;